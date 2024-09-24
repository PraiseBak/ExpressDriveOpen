import {EditArea} from './EditArea.js';

class CommentEditFront extends EditArea{

}

let commentEditFrontIndex = {
    getEditComment(args) {
        return new CommentEditFront(args);
    }
};

export function getCommentEditFrontIndex(){
    let btnParent = "comment-edit-btn-";
    let textId = "comment-text-";
    let submitOnclick = "commentIndex.update();";
    let cancelOnclick = "frontEditCommentIndex.toggleEdit();";
    let args = {btnParent,textId,submitOnclick,cancelOnclick};
    return commentEditFrontIndex.getEditComment(args);
}



