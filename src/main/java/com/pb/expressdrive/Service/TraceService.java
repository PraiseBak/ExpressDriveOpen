package com.pb.expressdrive.Service;

import com.pb.expressdrive.Domain.Dto.TodoDto;
import com.pb.expressdrive.Domain.Dto.TraceDto;
import com.pb.expressdrive.Domain.Dto.TraceHeatmapDto;
import com.pb.expressdrive.Domain.Entity.*;
import com.pb.expressdrive.Domain.Repository.PostRepository;
import com.pb.expressdrive.Domain.Repository.TodoElemRepository;
import com.pb.expressdrive.Domain.Repository.TodoRepository;
import com.pb.expressdrive.Helper.Error.*;
import com.pb.expressdrive.Util.InterestValidCheck;
import com.pb.expressdrive.Util.TraceValidCheck;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.time.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TraceService implements TraceServiceInterface {
    private final TraceValidCheck traceValidCheck;
    private final PostRepository postRepository;
    private final TodoRepository todoRepository;
    private final UserService userService;
    private final FollowService followService;
    private final AuthService authService;

    private final ImgService imgService;

    private final InterestService interestService;

    private final InterestValidCheck interestValidCheck = new InterestValidCheck();

    private final PageService pageService;

    private final TodoElemRepository todoElemRepository;

    @Transactional
    public <T> void write(T writeObj, Authentication authentication, List<Integer> interestIdxList, String imgSrc, List<String> todoElemContentList) {
        User user = userService.getUserByAuth(authentication);
        if (!traceValidCheck.isValidTrace(writeObj))
            throw new ValidCheckError(ErrorInfo.VALID_CHECK_ERROR.getCode(), ErrorInfo.VALID_CHECK_ERROR.getMessage());

        if(!interestValidCheck.isInterestsValid(interestIdxList, true)) throw new InternalServerError(ErrorInfo.COMMON_ERROR.getCode(),ErrorInfo.COMMON_ERROR.getMessage());
        if (writeObj instanceof Todo) {
            Todo writeTodo = (Todo) writeObj;
            writeTodo.setUser(user);
            List<Interest> interestList = interestService.convertToInterests(interestIdxList,null, writeTodo);
            writeTodo.setInterests(interestList);
            writeTodo.setImgSrc(imgSrc);
            user.getTodos().add((Todo) writeObj);
            for(String todoElemContent : todoElemContentList){
                TodoElem todoElem = TodoElem.builder()
                        .todoElemContent(todoElemContent)
                        .todo(writeTodo)
                        .build();
                writeTodo.getTodoElemList().add(todoElem);
            }

        } else {
            Post writePost = (Post) writeObj;
            writePost.setUser(user);
            writePost.setImgSrc(imgSrc);
            user.getPosts().add(writePost);
        }
        followService.setReads(user, false);
        followService.writeBroadcast(user, writeObj);
    }

    @Override
    @Transactional
    public <T> void delete(Integer mode, Long deleteObjId, Authentication authentication,String cause) {
        User user = userService.getUserByAuth(authentication);
        List<T> l = getTraceByMode(user, mode);
        T t = getTraceOrThrow(deleteObjId, l);
        if (mode == 1)
            user.getPosts().remove(t);
        else{
            Todo todo = user.getTodos().stream()
                    .filter(o -> (Objects.equals(o.getId(), ((Todo) t).getId())))
                    .findFirst()
                    .orElseThrow(() -> new InternalServerError(ErrorInfo.COMMON_ERROR.getCode(),ErrorInfo.COMMON_ERROR.getMessage()));
            todo.setDeleted(true);
            todo.setChecked(false);
            todo.setCause(cause);
            todo.setObjDate(LocalDateTime.now());
            if(mode == -1)todo.setHide(true);
        }

    }

    private <T> List<T> getTraceByMode(User user, Integer mode) {
        List<T> l = mode == 1 ? (List<T>) user.getPosts() : (List<T>) user.getTodos();
        return l;
    }

    private <T> T getTraceOrThrow(Long id, List<T> l) {
        return l.stream()
                .filter(o -> o instanceof Todo ? ((Todo) o).getId() == id : ((Post) o).getId() == id)
                .findFirst()
                .orElseThrow(() -> new UserAuthDenied(ErrorInfo.USER_AUTH_DENIED.getCode(), ErrorInfo.USER_AUTH_DENIED.getMessage()));
    }


    public <T> T getSameUsersTraceOrThrow(Authentication authentication, int mode, long id) {
        User user = userService.getUserByAuth(authentication);
        List<T> l = getTraceByMode(user, mode);
        return getTraceOrThrow(id, l);
    }


    @Override
    @Transactional
    public <T> void update(T writeObj, Long updateId, Authentication authentication, List<Integer> interests, List<String> todoElemContentList, String imgSrc) {
        User user = userService.getUserByAuth(authentication);
        List<T> l = writeObj instanceof Post ? (List<T>) user.getPosts() : (List<T>) user.getTodos();
        T t = getTraceOrThrow(updateId, l);
        if (t instanceof Todo) {
            ((Todo) t).setImgSrc(imgSrc);
        } else {
            ((Post) t).setImgSrc(imgSrc);
        }

        refObjUpdateByWriteObj(t, writeObj,interests,todoElemContentList);
    }

    private <T> void refObjUpdateByWriteObj(T refObj, T writeObj, List<Integer> interests, List<String> todoElemContentList) {
        if (writeObj instanceof Todo) {
            List<Interest> interestList = interestService.convertToInterests(interests,null, (Todo) writeObj);
            ((Todo) refObj).update((Todo) writeObj,interestList,todoElemContentList);
        } else {
            ((Post) refObj).update((Post) writeObj);
        }
    }


    public List<TraceHeatmapDto> getTodoHeatmapInfo(String username) {
        LocalDateTime startDatetime = LocalDateTime.of(LocalDate.now().minusDays(365), LocalTime.of(0, 0, 0));
        LocalDateTime endDatetime = LocalDateTime.of(LocalDate.now(), LocalTime.of(23, 59, 59));

        List<Todo> todoList = todoRepository.findAllByCreatedDateBetweenAndUserUsername(startDatetime, endDatetime, username);
        List<Post> postList = postRepository.findAllByCreatedDateBetweenAndUserUsername(startDatetime, endDatetime, username);
        List<TraceHeatmapDto> traceHeatmapDtoList = new ArrayList<>();
        for (Todo t : todoList) {
            traceHeatmapDtoList.add(t.convertHeatmapDto());
        }
        for (Post p : postList) {
            traceHeatmapDtoList.add(p.convertHeatmapDto());
        }
        return traceHeatmapDtoList;
    }

    @Transactional
    public void check(Long id, Authentication authentication,String cause) {
        Todo curTodo = todoRepository.findById(id).get();
        if (curTodo.getUser() == userService.getUserByAuth(authentication)) {
            curTodo.setChecked(true);
            curTodo.setDeleted(false);
            curTodo.setCause(cause);
            curTodo.setObjDate(LocalDateTime.now());
        }
    }

    @Transactional
    public void editProfile(String text, String linkA,String linkB,Authentication authentication) {
        if (text.length() > 256) {
            throw new ValidCheckError(ErrorInfo.VALID_CHECK_ERROR.getCode(), ErrorInfo.VALID_CHECK_ERROR.getMessage());
        }
        User curUser = userService.getUserByAuth(authentication);
        curUser.setInfo(text);
        curUser.setLinkA(linkA);
        curUser.setLinkB(linkB);
    }

    @Transactional
    public String addImg(MultipartFile multipartFile) {
        if(multipartFile == null) return null;
        List<MultipartFile> multipartFiles = new ArrayList<>();
        multipartFiles.add(multipartFile);
        return imgService.addImg(multipartFiles, true).get(0).getFilename();

    }

    public List<Todo> getSucceedTodoList(String username) {
        return todoRepository.findAllByUserUsernameAndCheckedOrderByObjDateDesc(username,true);

    }

    public List<Todo> getTodoList(String username) {
        return todoRepository.findAllByUserUsername(username);

    }

    public List<Todo> getFailTodoList(String username) {
        return todoRepository.findAllByUserUsernameAndCheckedOrderByObjDateDesc(username,false);
    }

    public List<TraceDto> getAllTraceList(Integer page,boolean isTodo) {
        Pageable pageable = pageService.getPageable(page);
        Page<Todo> todoList;
        Page<Post> postList;
        List<TraceDto> traceDtoList = new ArrayList<>();

        if(isTodo){
            todoList = todoRepository.findAll(pageable);
            for(Todo todo : todoList) traceDtoList.add(new TraceDto(todo,null));
        }else{
            postList = postRepository.findAll(pageable);
            for(Post post : postList) traceDtoList.add(new TraceDto(null,post));
        }

        Collections.sort(traceDtoList);

        return traceDtoList.subList(0,Math.min(pageable.getPageSize(),traceDtoList.size()));
    }

    public Long getTraceSize(boolean isTodo) {
        if (isTodo) return todoRepository.count();
        return postRepository.count();
    }

    public List<TodoDto> getTodoDtoList(List<Todo> todos) {
        List<TodoDto> todoDtoList = new ArrayList<>();
        LocalDateTime curTime = LocalDateTime.now();


        for(Todo t : todos){
            Period period = null;
            if(t.getUntil() != null){
                LocalDateTime untilTime = t.getUntil()
                        .toInstant()
                        .atZone(ZoneId.systemDefault())  // Instant -> ZonedDateTime
                        .toLocalDateTime().plusDays(1L);
                period = Period.between(curTime.toLocalDate(),untilTime.toLocalDate());
            }
            TodoDto todoDto = TodoDto.builder()
                    .hide(t.getHide())
                    .deleted(t.getDeleted())
                    .checked(t.getChecked())
                    .content(t.getContent())
                    .objDate(t.getObjDate())
                    .until(t.getUntil())
                    .id(t.getId())
                    .leftDate(period==null ? null : period.getDays() + "")
                    .imgSrc(t.getImgSrc())
                    .todoElemList(t.getTodoElemList())
                    .interests(t.getInterests())
                    .build();
            todoDtoList.add(todoDto);
        }
        return todoDtoList;


    }

    @Transactional
    public void checkTodoElem(Long id,Authentication authentication) {
        TodoElem todoElme = todoElemRepository.findById(id).orElseThrow(() -> new CustomException(ErrorInfo.CANNOT_FIND_DATA));
        if(!todoElme.getTodo().getUser().getUsername().equals(authService.getUsername(authentication))) throw new CustomException(ErrorInfo.VALID_CHECK_ERROR);
        todoElme.setChecked(!todoElme.isChecked());
    }

    public Long getChckedTodoCount(List<TodoDto> todoList) {
        Long result = 0L;
        for (TodoDto todoDto : todoList){
            if (todoDto.getChecked()) {
                result++;
            }
        }

        return result;
    }


//    public List<String> getUsernameList(int page, String requestUsername)
//    {
//        Pageable pageable = getPageable(page);
//        Page<User> userList;
//        if(requestUsername.length() == 0) userList = userRepository.findAll(pageable);
//        else userList = userRepository.findAllByUsernameLike(pageable,requestUsername);
//        ArrayList<String> usernameList = new ArrayList<>();
//        for (User user: userList) {
//            usernameList.add(user.getUsername());
//        }
//        return usernameList;
//    }
//
//    private Pageable getPageable(int startPage){
//        return PageRequest.of(startPage,startPage+PAGE_UNIT+1, Sort.by("id").descending());
//    }

}
