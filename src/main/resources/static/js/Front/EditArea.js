export class EditArea {
    // constructor($textArea,$textAreaParent,$btnParent,textId,submitOnclick,cancelOnclick) {

    constructor(args) {
        if(args){
            for (let arg in args) {
                this[arg] = args[arg];
            }
        }
    }

    toggleEdit(id){
        this.toggleTextarea(id);
        this.toggleBtn(id);
        this.editMode = !this.editMode;
    }

    //id가 undef면 0으로
    toggleTextarea(id){
        id = id ? id : '';
        let textId = this.textId + id;
        let $textArea = $("#"+textId);
        let text = $textArea.text();
        text = text.length === 0 ? "" : text;
        let html;
        let parent = $textArea.parent();

        if(!this.editMode) html = `<textarea id="${textId}" class="form-control" row="5" maxlength="1000" style="resize: none">${text}</textarea>`;
        else html = `<p id="${textId}">${text}</p>`;
        parent.html(html);
    }

    //id가 undef면 0으로
    toggleBtn(id){
        id = id ? id : '';
        let parent = $("#" + this.btnParent + id);
        if(!this.editMode){
            let tmpSubmitOnclick = this.submitOnclick.replace("()",`(${id})`);
            let tmpCancelOnclick = this.cancelOnclick.replace("()",`(${id})`);
            let submitBtnHTML = `<button class="btn btn-dark float-right ml-3" onclick="${tmpSubmitOnclick}">수정</button>`;
            let cancelBtnHTML = `<button class="btn btn-dark float-right" onclick="${tmpCancelOnclick}">취소</button>`;
            parent.html(submitBtnHTML + cancelBtnHTML);
        }else{
            parent.html("");
        }
    }
}

let editAreaIndex = {
    getEdit(args) {
        return new EditArea(args);
    }
};

export function getEdit($textArea,$textAreaParent,$btnParent,textId,submitOnclick,cancelOnclick){
    return editAreaIndex.getEdit(arguments);
}



