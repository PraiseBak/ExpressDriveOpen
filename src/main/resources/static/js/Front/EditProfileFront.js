import {EditArea} from './EditArea.js';

class EditProfileFront extends EditArea{
    toggleImgAdd() {
        let imgBtn = $("#img-add-btn");
        imgBtn.toggle();
    }

    toggleLink() {
        let linkA = "#linkA";
        let linkB = "#linkB";
        $(linkA + "-text").toggle();
        $(linkA + "-input-area").toggle();
        $(linkB + "-text").toggle();
        $(linkB + "-input-area").toggle();

    }

    toggleEdit(){
        this.toggleTextarea();
        this.toggleBtn();
        this.toggleImgAdd();
        this.toggleLink();
        this.editMode = !this.editMode;
    }
}

let editProfileIndex = {
    getEditProfile(args) {
        return new EditProfileFront(args);
    }
};

export function getEditProfileFrontIndex(){
    let btnParent = "edit-btn";
    let textId = "profile-text";
    let submitOnclick = "editProfileIndex.edit();";
    let cancelOnclick = "frontEditProfileIndex.toggleEdit();";
    let args = {btnParent,textId,submitOnclick,cancelOnclick};
    return editProfileIndex.getEditProfile(args);
}



