import {AJaxSend} from '../Ajax/AjaxSend.js';

/**
 * @extends AJaxSend
 */
class TraceRemove extends AJaxSend{
    remove(mode,id){
        this.data = {
            mode: mode,
            id: id
        }
        if(mode != -1){
            this.data.cause = $("#todo-modal-" + id).val();
        }

        this.ajaxSend();
    }
}

let traceRemoveInfo = {
    getTraceRemove() {
        let url = "/API/trace/";
        let method = "DELETE";
        let $printArea = $("#print-result-area");
        let redirect = "./trace";
        return new TraceRemove(method, url, $printArea,redirect);
    }
};

export function getTraceRemove(){
    return traceRemoveInfo.getTraceRemove();
}





