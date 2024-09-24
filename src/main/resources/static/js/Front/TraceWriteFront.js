//글 내용
const TEXT_MIN = 2;
const TEXT_MAX = 1000;
let curTextSize = $("#cur-text-size");
let maxTextSize = $("#max-text-size");

//댓글 내용
let commentContent = $("#comment-text");

if(commentContent.length > 0){
   commentContent.keyup(function (e) {
      curTextSize.text(commentContent.val().length);
   });
}

//TITLE
const TITLE_MIN = 2;
const TITLE_MAX = 40;

let curPostSize = $("#cur-post-size-content");
let maxPostSize = $("#max-post-size-content");
let postContent = $("#post-content");

let curTitleSize = $("#cur-post-size-title");
let maxTitleSize = $("#max-post-size-title");
let postTitle = $("#post-title");

curTitleSize.text(postTitle.val().length);
maxTitleSize.text(' / ' + TITLE_MAX);

curPostSize.text(postContent.val().length);
maxPostSize.text(' / ' + TEXT_MAX);


postContent.keyup(function (e) {
   curPostSize.text(postContent.val().length);
});

postTitle.keyup(function (e) {
   curTitleSize.text(postTitle.val().length);
});


