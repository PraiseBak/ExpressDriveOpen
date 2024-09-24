

//이미지 미리보기
$(document).ready(function() {
    $("#imgList").on("change", handleImgFileSelect);
    $("#imgList").on("change", function(e) {
        addImg(e);
    });

});

var fileCount = 0;
var totalCount = 10;
var fileNum = 0;
var inputFileList = new Array();
var isDeleteList = new Array();


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
            let thumbnailParent = `<div id="thumbnail-parent-${fileCount}">`;
            $("#img-thumbnail").append(thumbnailParent);

            let thumbnailId = `thumbnail-${fileCount}`;
            let imgAddHtml = `<img id="thumbnail-${fileCount}" src="${e.target.result}" style="width:200px; height:150px;" >`;
            $(`#thumbnail-parent-${fileCount}`).append(imgAddHtml);
            $("#" + thumbnailId).before(`<a class="overlay" onclick="delImg(${fileCount} + '')">✖</a>`);
        }
        reader.readAsDataURL(f);

        let formData = new FormData();
        formData.append("img",f);
        $.ajax({
            url:"/API/img/validation",
            method:"post",
            // enctype: "multipart/form-data",
            contentType : false,
            processData: false,
            data : formData,


            error : function (e){
                console.log(e);
                alert(e.responseJSON.message);
            }
        });
    });


}


function delImg(fileNum){
    var no = fileNum.replace(/[^0-9]/g, "");
    isDeleteList[no] = true;
    $('#thumbnail-parent-' + no).remove();
    fileCount--;
}


function addImg(e){
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
    if (fileCount + filesArr.length > totalCount) {
        alert('파일은 최대 ' + totalCount + '개까지 업로드 할 수 있습니다.');
        return;
    } else {
        fileCount = fileCount + filesArr.length;
    }

    filesArr.forEach(function(f) {
        var reader = new FileReader();
        reader.onload = function(e) {
            inputFileList.push(f);
            isDeleteList.push(false);
            fileNum++;
        };
        reader.readAsDataURL(f);
    });
    $("#imgAddBtn").val("");
}


//AJAX Form


$(function(){
    $("#saveBtn").click(function(){
        $("#frm").submit();
    })

    //ajax form submit
    $('#frm').ajaxForm({
        contentType : false,
        processData: false,
        enctype: "multipart/form-data",
        type : "POST",
        dataType : 'json',

        beforeSubmit: function (data,form,option) {
            for (var i = 0; i < inputFileList.length; i++) {
                if(!isDeleteList[i]){
                    var obj = {
                        name : "imgList[]",
                        value : inputFileList[i],
                        type : "file"
                    };
                    data.push(obj);
                }
            }

            //막기위해서는 return false를 잡아주면됨
            return true;
        },
        success: function(response,status){
            //성공후 서버에서 받은 데이터 처리
            done(response);
        },
        error: function(error){
            //에러발생을 위한 code페이지
            alert(error.responseJSON.message);
            console.log(error);
        }
    });
})
function done(response) {
    if (typeof(execAttach) == 'undefined') { //Virtual Function
        return;
    }

    for (const res of response) {
        // var response_object = $.parseJSON(~ response.toString() );
        // var response_object = response;
        execAttach(res);
        closeWindow();
    }
}

function initUploader(){
    var _opener = PopupUtil.getOpener();
    if (!_opener) {
        alert('잘못된 경로로 접근하셨습니다.');
        return;
    }

    var _attacher = getAttacher('image', _opener);
    registerAction(_attacher);
}