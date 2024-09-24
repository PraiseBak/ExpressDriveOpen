import {AJaxSend} from '../Ajax/AjaxSend.js';

/**
 * @extends AJaxSend
 */
class TraceCheck extends AJaxSend{
    check(id){
        this.data = {
            id: id
        }
        this.data.cause = $("#todo-modal-" + id).val();
        this.ajaxSend();
    }
}

let traceCheckInfo = {
    getTraceCheck() {
        let url = "/API/trace/check";
        let method = "PATCH";
        let $printArea = $("#print-result-area");
        let redirect = "./trace";
        return new TraceCheck(method, url, $printArea,redirect);
    }
};

export function getTraceCheck(){
    return traceCheckInfo.getTraceCheck();
}



