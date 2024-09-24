
function addFormData(id,isModify){
    let formData = new FormData();
    if(isModify){
        formData.append("id",id);
    }

    formData.append("content",$("#content-" + id).val());
    formData.append("until",$("#datepicker-" + id).val());
    //0이면 todo 1이면 post
    formData.append("mode","0");

    formData.append("interestList",convertInterestToList());
    formData.append( "img", $("#file-upload-" + id)[0].files[0]);
    let todoElemList = [];
    for (let newTodoElem of $(".todoElem-"+id)){
        todoElemList.push(newTodoElem.value);
    }

    formData.append("todoElemContentList",todoElemList);
    return formData;
}

function todoSubmit(id,isModify){
    $.ajax({
        contentType : false,
        processData: false,
        enctype: "multipart/form-data",
        type : isModify ? "PATCH" :"POST",
        data : addFormData(id,isModify),
        url : "/API/trace/"

    }).done(function () {
        location.href = location.href;
    }).fail(function (response){
        alert(response.responseJSON.message);
    });
}

modifyIndex = {
    modify(data) {
        $.ajax({
            type: "PATCH",
            data: data,
            url: "/API/trace/"
        }).done(function () {
            if(data.mode == "TodoElemCheck"){
                let $todoElemCheck =$(`#todoElem-check-${data.id}`);
                let checked = $todoElemCheck.attr("checked");
                $todoElemCheck.prop("checked",!checked);
                $todoElemCheck.attr("checked",!checked);
            }else{
                location.href = location.href;
            }

        }).fail(function (response) {
            alert(response.responseJSON.message);
        })
    }

}

