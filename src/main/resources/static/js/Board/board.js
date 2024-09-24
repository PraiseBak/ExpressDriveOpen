import {AJaxSend} from '../Ajax/AjaxSend.js';

/**
 * @extends AJaxSend
 */
class Board extends AJaxSend{
    boardReaction(boardId,mode){
        this.data = {
            boardId : boardId,
            mode : mode
        };
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

let boardIndex = {
    url : "/API/board/",
    redirect: location.href,

    boardReaction(boardId,mode){
        let method = "PATCH";
        return new Board(method,this.url,null,this.redirect).boardReaction(boardId,mode);
    }
}

export function getBoardIndex(){
    return boardIndex;
}



