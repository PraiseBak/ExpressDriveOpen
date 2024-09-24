
$(function(){
    $("#deleteBtn").click(function(){
        $("#deleteBoardForm").submit();
    })

    //ajax form submit
    $('#deleteBoardForm').ajaxForm({
        method : "delete",

        error: function(error){
            //에러발생을 위한 code페이지
            alert(error.responseJSON.message);
            console.log(error);
        },

        success: function (){
            window.location = "../" + community;
        }
    });
});



