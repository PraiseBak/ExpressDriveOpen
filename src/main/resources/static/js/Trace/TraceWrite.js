import {AJaxSend} from '../Ajax/AjaxSend.js';

/**
 * @extends AJaxSend
 */
class TraceWrite extends AJaxSend{
    write(mode,id){
        let isUpdate = id !== undefined;
        let form = new FormData();

        if(mode === 0){
            form.append("interestList",convertInterestToList());
            form.append("content",$("#todo-content").val());
            form.append("until",$("#datepicker").val());

        }else{
            form.append("title",$("#post-title").val());
            form.append("content",$("#post-content").val());
        }

        form.append( "img", $("#file-upload")[0].files[0]);
        form.append("mode",mode);
        if(id){
            form.append("id",id);
        }

        this.data = form;
        this.contentType = false;
        this.processData = false;
        if(isUpdate){
            this.method= "PATCH" ;
        }

        this.ajaxSend();


    }
}

let traceInfo = {
    //mode == 1 => post
    mode : 0,
    idArr : ["todo-area","post-area"],
    checkboxTextArr : ["작성 모드 바꾸기 현재 : Todo","작성 모드 바꾸기 현재 : 포스트"],
    //은닉

    changeMode(){
        $("#"+this.idArr[this.mode]).attr("hidden",true);
        $("#checkbox-label").text(this.checkboxTextArr[this.mode]);
        this.mode = (this.mode === 0) + 0;
        $("#"+this.idArr[this.mode]).removeAttr("hidden");
        $("#checkbox-label").text(this.checkboxTextArr[this.mode]);
    },

    getTraceWrite() {
        let url = "/API/trace/";
        let method = "POST";
        let $printArea = $("#print-result-area");
        let redirect = "../trace";
        return new TraceWrite(method, url, $printArea,redirect);
    }
};

export function getTraceWrite(){
    return traceInfo.getTraceWrite();
}

export function changeMode(){
    return traceInfo.changeMode();
}


//백업
// import {AJaxSend} from '../Ajax/AjaxSend.js';
//
// /**
//  * @extends AJaxSend
//  */
// class TraceWrite extends AJaxSend{
//     write(mode,id){
//         let isUpdate = id !== undefined;
//         let form = new FormData();
//
//         if(mode === 0){
//             form.append("interestList",convertInterestToList());
//             form.append("content",$("#todo-content").val());
//             form.append("until",$("#datepicker").val());
//         }else{
//             form.append("title",$("#post-title").val());
//             form.append("content",$("#post-content").val());
//         }
//
//         form.append( "img", $("#file-upload")[0].files[0]);
//         form.append("mode",mode);
//         if(id){
//             form.append("id",id);
//         }
//
//         this.data = form;
//         this.contentType = false;
//         this.processData = false;
//         if(isUpdate){
//             this.method= "PATCH" ;
//         }
//
//         this.ajaxSend();
//
//
//     }
// }
//
// let traceInfo = {
//     //mode == 1 => post
//     mode : 0,
//     idArr : ["todo-area","post-area"],
//     checkboxTextArr : ["작성 모드 바꾸기 현재 : Todo","작성 모드 바꾸기 현재 : 포스트"],
//     //은닉
//
//     changeMode(){
//         $("#"+this.idArr[this.mode]).attr("hidden",true);
//         $("#checkbox-label").text(this.checkboxTextArr[this.mode]);
//         this.mode = (this.mode === 0) + 0;
//         $("#"+this.idArr[this.mode]).removeAttr("hidden");
//         $("#checkbox-label").text(this.checkboxTextArr[this.mode]);
//     },
//
//     getTraceWrite() {
//         let url = "/API/trace/";
//         let method = "POST";
//         let $printArea = $("#print-result-area");
//         let redirect = "../trace";
//         return new TraceWrite(method, url, $printArea,redirect);
//     }
// };
//
// export function getTraceWrite(){
//     return traceInfo.getTraceWrite();
// }
//
// export function changeMode(){
//     return traceInfo.changeMode();
// }
//
//
//



