function viewMore(id,mode){
   let $fullContent = $(`#${mode}-full-text-${id}`);
   let aTagId = "view-more-" +id;
   let $aTag = $(`#${aTagId}`);
   let contentId = mode + '-' + id + '-content';
   let $content = $(`#${contentId}`);

   if($aTag.val() === ''){
      $aTag.val("1");
   }

   let modeNum = $aTag.val() === "1" ? 1 : -1;
   let modeStr = modeNum === 1 ? '간추리기' : '더보기';
   let className = modeNum === 1 ? 'up' : 'down';
   let viewMoreHTML = `<i class='fas fa-sort-${className} text-gray-400'> ${modeStr}</i>`;

   let s = new String($fullContent.text());
   console.log(s)
   if(modeNum === 1){
      $content.text(s);
   }else{
      $content.text(s.substring(0,100));
   }
   $aTag.val(modeNum * -1);
   $aTag.html(viewMoreHTML);
}

let checkSwitch = false;
window.onload = function() {
   // let headerList = [$(".header-checked"),$(".header-deleted"),$(".header-unchecked")];
   // let prefix = ["성공한","실패한",""];
   // let idx = 0;
   // for (const headerListElement of headerList) {
   //    $(headerListElement[0]).text(prefix[idx++] + ' Todo');
   // }

}

function checkTodo(){
   checkSwitch = true;
}

function updateModeSelect(id){
   if(checkSwitch){
      traceCheck.check(id);
   }else{
      traceRemoveIndex.remove(0,id);
   }
   checkSwitch = false;
}

//이미지 미리보기
let sel_file;
$(document).ready(function() {
   $("#file-upload").on("change", handleImgFileSelect);
});

function handleImgFileSelect(e) {
   var files = e.target.files;
   var filesArr = Array.prototype.slice.call(files);
   var reg = /(.*?)\/(jpg|jpeg|png|bmp|gif)$/;
   filesArr.forEach(function(f) {
      if (!f.type.match(reg)) {
         alert("확장자는 이미지 확장자만 가능합니다.");
         return;
      }

      sel_file = f;

      var reader = new FileReader();
      reader.onload = function(e) {
         $("#profile-img").attr("src", e.target.result);
      }
      reader.readAsDataURL(f);
   });
}

