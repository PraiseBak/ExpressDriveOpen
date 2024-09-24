import {AJaxSend} from "../Ajax/AjaxSend.js";

class EditProfile extends AJaxSend {

    edit() {
        let form = new FormData();
        form.append("img", $("#file-upload")[0].files[0]);
        form.append("text", $("#profile-text").val());
        form.append("linkA", $("#linkA-input").val());
        form.append("linkB", $("#linkB-input").val());

        this.data = form;
        this.contentType = false;
        this.processData = false;
        this.ajaxSend();
    }
}

let editProfileIndex = {
    getEditProfile() {
        let url = "/API/trace/editProfile";
        let method = "POST";
        let redirect = "./trace";
        let $printArea = $("#print-result-area");
        return new EditProfile(method, url,$printArea,redirect,false);
    }
};

export function getEditProfile(){
    return editProfileIndex.getEditProfile();
}



