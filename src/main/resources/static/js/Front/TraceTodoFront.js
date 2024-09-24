var todoElemSize = 0;
var prevView = null;
var prevModify = null;

//새 todo 만들기
function toggleTodoInput(){
    $("#new-todo-btn").toggle();
    $("#new-todo-area").toggle();
}

function addTodoElem(parentId,id){
    let $parentNode = $(`${parentId}`).last();
    ++todoElemSize;

    let childHTML = `
    <div class="datepicker-area col-sm-12 mt-2}" id="todoElemArea-${todoElemSize}">
        <input name="todoElem" class="todoElem-${id} form-control mt-2">
        <button id="deleteBtn-${todoElemSize}" class="btn btn-dark position-absolute" onclick="deleteTodoElem(this.parentNode)" style="right: 4px;top: 0">✖</button>
    </div>
`;
    $parentNode.append(childHTML);
}

function todoAddCancel(){
    todoElemSize = 0;
    // prevData
}

function deleteTodoElem(delTodoElem){
    if(todoElemSize == 1){
        alert("todo는 최소 한개 이상 있어야합니다!");
        return;
    }

    todoElemSize--;
    delTodoElem.remove();
}



function check(todoElemId){
    let data = {
        id : todoElemId,
        mode : "TodoElemCheck"
    }
    modifyIndex.modify(data);
}


//기존 todo 수정
function updateToggle(todoId){
    let todoView = $("#todo-front-" + todoId);
    let todoModify = $("#todo-modify-" + todoId);
    let todoInterest = $(".todo-interest-" + todoId);
    todoInterest.toggle();


    if(prevView && prevView[0] != todoView[0]){
        prevView.toggle();
        prevModify.toggle();
    }

    todoView.toggle();
    todoModify.toggle();

    prevView = todoView;
    prevModify = todoModify;
    //기존 이미지는 가져와줘야함 그거 말고는
    //이전에 수정하던거 취소했다가 다시 수정눌러도 값 가지고 있게 하는게 더 나은 것 같아서 값을 굳이 취소할때마다 초기화안하는걸로
    if(todoModify.css("display") == "block"){
        let size =$(`.todoElemParent-${todoId}`).find("input").length;
        todoElemSize = size;
    }

    console.log(todoElemSize)
    //toggle하면 이전 data도 다 가지고 오는걸로하자
    //이전 toggle이 어떤 toggle이었는지


}


function showCheckedTodo(){
    $(".checked").toggle();

}