import {AJaxSend} from '../Ajax/AjaxSend.js';

/**
 * @extends AJaxSend
 */
class Follow extends AJaxSend{
    constructor() {
        let url = "/API/follow/";
        let method = "DELETE";
        let $printArea = $("#print-result-area");
        super(method,url,$printArea,location.href);
    }
}

let followIndex = {
    followIndex : new Follow(),

    setMethod(mode){
        if(mode === 1){
            this.followIndex.method = "POST";
        }else{
            this.followIndex.method = "DELETE";
        }
    },

    add(owner){
        this.setMethod(1);
        this.followIndex.data = {objUsername : owner};
        this.followIndex.ajaxSend();
        this.changeFollowBtnMode(1);
    },

    delete(owner){
        this.setMethod(0);
        this.followIndex.data = {objUsername : owner};
        this.followIndex.ajaxSend();
        this.changeFollowBtnMode(0);

    },

    changeFollowBtnMode(mode) {
        let $btn = $("#following-btn");
        $btn.val(!mode + 0);
    }
};

let follow = function (mode,owner){
    if(mode === "1"){
        followIndex.add(owner);
    }else{
        followIndex.delete(owner);
    }
}

export function getFollow(){
    return follow;
}