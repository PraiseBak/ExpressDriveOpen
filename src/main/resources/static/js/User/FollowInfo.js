import {AJaxSend} from '../Ajax/AjaxSend.js';

/**
 * @extends AJaxSend
 */
class FollowInfo extends AJaxSend{
    constructor() {
        let url = "/API/followInfo/";
        let method = "GET";
        let $printArea = $("#print-result-area");
        super(method,url,$printArea,undefined,false);
    }
}

let followInfo = {
    followIndex : new FollowInfo(),

    get(){
        if($(".navbar-toggler").attr("aria-expanded") === "true") return;
        let recentWrites = this.followIndex.ajaxSend();
        let $followInfo = $("#follow-info");
        $followInfo.html("");
        for (const recentWrite of recentWrites) {
            let username = recentWrite.split(' ')[0].replace("님의","");
            let inputHTML = `<a href='/user/trace/${username}' class='text-white'> ${recentWrite} </a><br>`;
            $followInfo.append(inputHTML);
        }
    },

};

export function getFollowInfo(){
    return followInfo;
}