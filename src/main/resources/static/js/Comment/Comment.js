import {AJaxSend} from '../Ajax/AjaxSend.js';

/**
 * @extends AJaxSend
 */
class Comment extends AJaxSend{
    add(boardId){
        super.isBoardComment = boardId;
        this.data = {
            text : $("#comment-text").val(),
            pageOwnerUsername : pageOwnerUsername,
            boardId : boardId
        }
        this.ajaxSend();
    }
    delete(id){
        this.data = {
            id : id
        }
        this.ajaxSend();
    }
    update(id){
        this.data = {
            id : id,
            text : $("#comment-text-" + id).val()
        }
        this.ajaxSend();
    }

    redirectMethod(redirectURL) {
        if(super.isBoardComment){
            super.redirectMethod(redirectURL);
        }else{
            setTimeout(function(){
                location.reload();
            },100); // 3000밀리초 = 3초
        }
    }
}

let commentIndex = {
    url : "/API/comment/",
    $printArea : $("#print-result-area"),
    redirect : "./trace",

    add(boardId) {
        let method = "POST";
        return new Comment(method, this.url, this.$printArea,this.redirect).add(boardId);
    },
    delete(id) {
        let method = "DELETE";
        return new Comment(method, this.url, this.$printArea,this.redirect).delete(id);
    },
    update(id) {
        let method = "PATCH";
        return new Comment(method, this.url, this.$printArea,this.redirect).update(id);
    }
};

export function getCommentIndex(){
    return commentIndex;
}



