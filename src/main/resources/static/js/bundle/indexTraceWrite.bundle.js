/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main/resources/static/js/Ajax/AjaxSend.js":
/*!*******************************************************!*\
  !*** ./src/main/resources/static/js/Ajax/AjaxSend.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AJaxSend: () => (/* binding */ AJaxSend)
/* harmony export */ });
/**
 *  @class
 *  @param {string} method - 통신에 사용될 HTML method
 *  @param {string} url - 통신할 url
 *  @param {string} $printArea - 결과를 출력할 HTML ELEMENT
 *  @param {string} redirect - ajax 통신 후 redirect할 주소
 *  @param {string} async - ajax async 여부
 */
class AJaxSend {
    constructor(method,url,$printArea,redirect,async) {
        this.method = method;
        this.url = url;
        this.$printArea = $printArea;
        this.data = {};
        this.setXhrInfo();
        this.redirect = redirect;
        this.async = async || false;
    }


    redirectMethod(redirectURL) {
        location.href = redirectURL;
    }

    setXhrInfo(){
        this.token = $("meta[name='_csrf']").attr("content");
        this.header = $("meta[name='_csrf_header']").attr("content");
    }

    ajaxSend(){
        let header = this.header;
        let token = this.token
        let $printArea = this.$printArea;
        let redirect = this.redirect;
        let resultRes;
        let redirectMethod = this.redirectMethod;

        let option = {
            url: this.url,
            method: this.method,
            data: this.data,
            async: this.async,
            processData: this.processData,
            contentType: this.contentType,
            beforeSend: function (xhr) {
                xhr.setRequestHeader(header, token);
            }
        }

        $.ajax(option).done(function (response){
            console.log(response)
            if(response.code == 200 || response.status == 200){
                if(redirect !== undefined){
                    setTimeout(function(){
                        redirectMethod(redirect);
                    },100); // 3000밀리초 = 3초
                }
            }else{
                resultRes = response;
                $printArea.text(response.msg);

            }

        }).fail(function(response){
            if(!response) return;
            if(response.responseJSON.errors){
                for (const error of response.responseJSON.errors) {
                    alert(error.defaultMessage);
                    break;
                }
            }else{
                alert(response.responseJSON.message);
            }

        });
        return resultRes;
    }

}








/***/ }),

/***/ "./src/main/resources/static/js/Trace/TraceWrite.js":
/*!**********************************************************!*\
  !*** ./src/main/resources/static/js/Trace/TraceWrite.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   changeMode: () => (/* binding */ changeMode),
/* harmony export */   getTraceWrite: () => (/* binding */ getTraceWrite)
/* harmony export */ });
/* harmony import */ var _Ajax_AjaxSend_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Ajax/AjaxSend.js */ "./src/main/resources/static/js/Ajax/AjaxSend.js");


/**
 * @extends AJaxSend
 */
class TraceWrite extends _Ajax_AjaxSend_js__WEBPACK_IMPORTED_MODULE_0__.AJaxSend{
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

function getTraceWrite(){
    return traceInfo.getTraceWrite();
}

function changeMode(){
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





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************************************************!*\
  !*** ./src/main/resources/static/js/Index/indexTraceWrite.js ***!
  \***************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Trace_TraceWrite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Trace/TraceWrite.js */ "./src/main/resources/static/js/Trace/TraceWrite.js");

traceWrite = (0,_Trace_TraceWrite_js__WEBPACK_IMPORTED_MODULE_0__.getTraceWrite)();
changeInputMode = _Trace_TraceWrite_js__WEBPACK_IMPORTED_MODULE_0__.changeMode;
let isPost = "[[${post != null}]]";
if(isPost === "true"){
    changeInputMode();
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXhUcmFjZVdyaXRlLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEIsWUFBWSxRQUFRO0FBQ3BCLFlBQVksUUFBUTtBQUNwQixZQUFZLFFBQVE7QUFDcEIsWUFBWSxRQUFRO0FBQ3BCO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixPQUFPO0FBQzVCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwRjZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLHVEQUFRO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsVUFBVTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ25KQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTmdFO0FBQ2hFLGFBQWEsbUVBQWE7QUFDMUIsa0JBQWtCLDREQUFVO0FBQzVCLGtCQUFrQixhQUFhO0FBQy9CO0FBQ0E7QUFDQSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXhwcmVzc2RyaXZlLy4vc3JjL21haW4vcmVzb3VyY2VzL3N0YXRpYy9qcy9BamF4L0FqYXhTZW5kLmpzIiwid2VicGFjazovL2V4cHJlc3Nkcml2ZS8uL3NyYy9tYWluL3Jlc291cmNlcy9zdGF0aWMvanMvVHJhY2UvVHJhY2VXcml0ZS5qcyIsIndlYnBhY2s6Ly9leHByZXNzZHJpdmUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZXhwcmVzc2RyaXZlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9leHByZXNzZHJpdmUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9leHByZXNzZHJpdmUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9leHByZXNzZHJpdmUvLi9zcmMvbWFpbi9yZXNvdXJjZXMvc3RhdGljL2pzL0luZGV4L2luZGV4VHJhY2VXcml0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogIEBjbGFzc1xyXG4gKiAgQHBhcmFtIHtzdHJpbmd9IG1ldGhvZCAtIO2GteyLoOyXkCDsgqzsmqnrkKAgSFRNTCBtZXRob2RcclxuICogIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSDthrXsi6DtlaAgdXJsXHJcbiAqICBAcGFyYW0ge3N0cmluZ30gJHByaW50QXJlYSAtIOqysOqzvOulvCDstpzroKXtlaAgSFRNTCBFTEVNRU5UXHJcbiAqICBAcGFyYW0ge3N0cmluZ30gcmVkaXJlY3QgLSBhamF4IO2GteyLoCDtm4QgcmVkaXJlY3TtlaAg7KO87IaMXHJcbiAqICBAcGFyYW0ge3N0cmluZ30gYXN5bmMgLSBhamF4IGFzeW5jIOyXrOu2gFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFKYXhTZW5kIHtcclxuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCx1cmwsJHByaW50QXJlYSxyZWRpcmVjdCxhc3luYykge1xyXG4gICAgICAgIHRoaXMubWV0aG9kID0gbWV0aG9kO1xyXG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xyXG4gICAgICAgIHRoaXMuJHByaW50QXJlYSA9ICRwcmludEFyZWE7XHJcbiAgICAgICAgdGhpcy5kYXRhID0ge307XHJcbiAgICAgICAgdGhpcy5zZXRYaHJJbmZvKCk7XHJcbiAgICAgICAgdGhpcy5yZWRpcmVjdCA9IHJlZGlyZWN0O1xyXG4gICAgICAgIHRoaXMuYXN5bmMgPSBhc3luYyB8fCBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcmVkaXJlY3RNZXRob2QocmVkaXJlY3RVUkwpIHtcclxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gcmVkaXJlY3RVUkw7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0WGhySW5mbygpe1xyXG4gICAgICAgIHRoaXMudG9rZW4gPSAkKFwibWV0YVtuYW1lPSdfY3NyZiddXCIpLmF0dHIoXCJjb250ZW50XCIpO1xyXG4gICAgICAgIHRoaXMuaGVhZGVyID0gJChcIm1ldGFbbmFtZT0nX2NzcmZfaGVhZGVyJ11cIikuYXR0cihcImNvbnRlbnRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgYWpheFNlbmQoKXtcclxuICAgICAgICBsZXQgaGVhZGVyID0gdGhpcy5oZWFkZXI7XHJcbiAgICAgICAgbGV0IHRva2VuID0gdGhpcy50b2tlblxyXG4gICAgICAgIGxldCAkcHJpbnRBcmVhID0gdGhpcy4kcHJpbnRBcmVhO1xyXG4gICAgICAgIGxldCByZWRpcmVjdCA9IHRoaXMucmVkaXJlY3Q7XHJcbiAgICAgICAgbGV0IHJlc3VsdFJlcztcclxuICAgICAgICBsZXQgcmVkaXJlY3RNZXRob2QgPSB0aGlzLnJlZGlyZWN0TWV0aG9kO1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9uID0ge1xyXG4gICAgICAgICAgICB1cmw6IHRoaXMudXJsLFxyXG4gICAgICAgICAgICBtZXRob2Q6IHRoaXMubWV0aG9kLFxyXG4gICAgICAgICAgICBkYXRhOiB0aGlzLmRhdGEsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0aGlzLmFzeW5jLFxyXG4gICAgICAgICAgICBwcm9jZXNzRGF0YTogdGhpcy5wcm9jZXNzRGF0YSxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IHRoaXMuY29udGVudFR5cGUsXHJcbiAgICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgdG9rZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkLmFqYXgob3B0aW9uKS5kb25lKGZ1bmN0aW9uIChyZXNwb25zZSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxyXG4gICAgICAgICAgICBpZihyZXNwb25zZS5jb2RlID09IDIwMCB8fCByZXNwb25zZS5zdGF0dXMgPT0gMjAwKXtcclxuICAgICAgICAgICAgICAgIGlmKHJlZGlyZWN0ICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3RNZXRob2QocmVkaXJlY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sMTAwKTsgLy8gMzAwMOuwgOumrOy0iCA9IDPstIhcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRSZXMgPSByZXNwb25zZTtcclxuICAgICAgICAgICAgICAgICRwcmludEFyZWEudGV4dChyZXNwb25zZS5tc2cpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICAgICAgaWYoIXJlc3BvbnNlKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmKHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5lcnJvcnMpe1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBlcnJvciBvZiByZXNwb25zZS5yZXNwb25zZUpTT04uZXJyb3JzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoZXJyb3IuZGVmYXVsdE1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0UmVzO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQge0FKYXhTZW5kfSBmcm9tICcuLi9BamF4L0FqYXhTZW5kLmpzJztcclxuXHJcbi8qKlxyXG4gKiBAZXh0ZW5kcyBBSmF4U2VuZFxyXG4gKi9cclxuY2xhc3MgVHJhY2VXcml0ZSBleHRlbmRzIEFKYXhTZW5ke1xyXG4gICAgd3JpdGUobW9kZSxpZCl7XHJcbiAgICAgICAgbGV0IGlzVXBkYXRlID0gaWQgIT09IHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xyXG5cclxuICAgICAgICBpZihtb2RlID09PSAwKXtcclxuICAgICAgICAgICAgZm9ybS5hcHBlbmQoXCJpbnRlcmVzdExpc3RcIixjb252ZXJ0SW50ZXJlc3RUb0xpc3QoKSk7XHJcbiAgICAgICAgICAgIGZvcm0uYXBwZW5kKFwiY29udGVudFwiLCQoXCIjdG9kby1jb250ZW50XCIpLnZhbCgpKTtcclxuICAgICAgICAgICAgZm9ybS5hcHBlbmQoXCJ1bnRpbFwiLCQoXCIjZGF0ZXBpY2tlclwiKS52YWwoKSk7XHJcblxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBmb3JtLmFwcGVuZChcInRpdGxlXCIsJChcIiNwb3N0LXRpdGxlXCIpLnZhbCgpKTtcclxuICAgICAgICAgICAgZm9ybS5hcHBlbmQoXCJjb250ZW50XCIsJChcIiNwb3N0LWNvbnRlbnRcIikudmFsKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9ybS5hcHBlbmQoIFwiaW1nXCIsICQoXCIjZmlsZS11cGxvYWRcIilbMF0uZmlsZXNbMF0pO1xyXG4gICAgICAgIGZvcm0uYXBwZW5kKFwibW9kZVwiLG1vZGUpO1xyXG4gICAgICAgIGlmKGlkKXtcclxuICAgICAgICAgICAgZm9ybS5hcHBlbmQoXCJpZFwiLGlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YSA9IGZvcm07XHJcbiAgICAgICAgdGhpcy5jb250ZW50VHlwZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucHJvY2Vzc0RhdGEgPSBmYWxzZTtcclxuICAgICAgICBpZihpc1VwZGF0ZSl7XHJcbiAgICAgICAgICAgIHRoaXMubWV0aG9kPSBcIlBBVENIXCIgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hamF4U2VuZCgpO1xyXG5cclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmxldCB0cmFjZUluZm8gPSB7XHJcbiAgICAvL21vZGUgPT0gMSA9PiBwb3N0XHJcbiAgICBtb2RlIDogMCxcclxuICAgIGlkQXJyIDogW1widG9kby1hcmVhXCIsXCJwb3N0LWFyZWFcIl0sXHJcbiAgICBjaGVja2JveFRleHRBcnIgOiBbXCLsnpHshLEg66qo65OcIOuwlOq+uOq4sCDtmITsnqwgOiBUb2RvXCIsXCLsnpHshLEg66qo65OcIOuwlOq+uOq4sCDtmITsnqwgOiDtj6zsiqTtirhcIl0sXHJcbiAgICAvL+ydgOuLiVxyXG5cclxuICAgIGNoYW5nZU1vZGUoKXtcclxuICAgICAgICAkKFwiI1wiK3RoaXMuaWRBcnJbdGhpcy5tb2RlXSkuYXR0cihcImhpZGRlblwiLHRydWUpO1xyXG4gICAgICAgICQoXCIjY2hlY2tib3gtbGFiZWxcIikudGV4dCh0aGlzLmNoZWNrYm94VGV4dEFyclt0aGlzLm1vZGVdKTtcclxuICAgICAgICB0aGlzLm1vZGUgPSAodGhpcy5tb2RlID09PSAwKSArIDA7XHJcbiAgICAgICAgJChcIiNcIit0aGlzLmlkQXJyW3RoaXMubW9kZV0pLnJlbW92ZUF0dHIoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgJChcIiNjaGVja2JveC1sYWJlbFwiKS50ZXh0KHRoaXMuY2hlY2tib3hUZXh0QXJyW3RoaXMubW9kZV0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRUcmFjZVdyaXRlKCkge1xyXG4gICAgICAgIGxldCB1cmwgPSBcIi9BUEkvdHJhY2UvXCI7XHJcbiAgICAgICAgbGV0IG1ldGhvZCA9IFwiUE9TVFwiO1xyXG4gICAgICAgIGxldCAkcHJpbnRBcmVhID0gJChcIiNwcmludC1yZXN1bHQtYXJlYVwiKTtcclxuICAgICAgICBsZXQgcmVkaXJlY3QgPSBcIi4uL3RyYWNlXCI7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUcmFjZVdyaXRlKG1ldGhvZCwgdXJsLCAkcHJpbnRBcmVhLHJlZGlyZWN0KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFjZVdyaXRlKCl7XHJcbiAgICByZXR1cm4gdHJhY2VJbmZvLmdldFRyYWNlV3JpdGUoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZU1vZGUoKXtcclxuICAgIHJldHVybiB0cmFjZUluZm8uY2hhbmdlTW9kZSgpO1xyXG59XHJcblxyXG5cclxuLy/rsLHsl4VcclxuLy8gaW1wb3J0IHtBSmF4U2VuZH0gZnJvbSAnLi4vQWpheC9BamF4U2VuZC5qcyc7XHJcbi8vXHJcbi8vIC8qKlxyXG4vLyAgKiBAZXh0ZW5kcyBBSmF4U2VuZFxyXG4vLyAgKi9cclxuLy8gY2xhc3MgVHJhY2VXcml0ZSBleHRlbmRzIEFKYXhTZW5ke1xyXG4vLyAgICAgd3JpdGUobW9kZSxpZCl7XHJcbi8vICAgICAgICAgbGV0IGlzVXBkYXRlID0gaWQgIT09IHVuZGVmaW5lZDtcclxuLy8gICAgICAgICBsZXQgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4vL1xyXG4vLyAgICAgICAgIGlmKG1vZGUgPT09IDApe1xyXG4vLyAgICAgICAgICAgICBmb3JtLmFwcGVuZChcImludGVyZXN0TGlzdFwiLGNvbnZlcnRJbnRlcmVzdFRvTGlzdCgpKTtcclxuLy8gICAgICAgICAgICAgZm9ybS5hcHBlbmQoXCJjb250ZW50XCIsJChcIiN0b2RvLWNvbnRlbnRcIikudmFsKCkpO1xyXG4vLyAgICAgICAgICAgICBmb3JtLmFwcGVuZChcInVudGlsXCIsJChcIiNkYXRlcGlja2VyXCIpLnZhbCgpKTtcclxuLy8gICAgICAgICB9ZWxzZXtcclxuLy8gICAgICAgICAgICAgZm9ybS5hcHBlbmQoXCJ0aXRsZVwiLCQoXCIjcG9zdC10aXRsZVwiKS52YWwoKSk7XHJcbi8vICAgICAgICAgICAgIGZvcm0uYXBwZW5kKFwiY29udGVudFwiLCQoXCIjcG9zdC1jb250ZW50XCIpLnZhbCgpKTtcclxuLy8gICAgICAgICB9XHJcbi8vXHJcbi8vICAgICAgICAgZm9ybS5hcHBlbmQoIFwiaW1nXCIsICQoXCIjZmlsZS11cGxvYWRcIilbMF0uZmlsZXNbMF0pO1xyXG4vLyAgICAgICAgIGZvcm0uYXBwZW5kKFwibW9kZVwiLG1vZGUpO1xyXG4vLyAgICAgICAgIGlmKGlkKXtcclxuLy8gICAgICAgICAgICAgZm9ybS5hcHBlbmQoXCJpZFwiLGlkKTtcclxuLy8gICAgICAgICB9XHJcbi8vXHJcbi8vICAgICAgICAgdGhpcy5kYXRhID0gZm9ybTtcclxuLy8gICAgICAgICB0aGlzLmNvbnRlbnRUeXBlID0gZmFsc2U7XHJcbi8vICAgICAgICAgdGhpcy5wcm9jZXNzRGF0YSA9IGZhbHNlO1xyXG4vLyAgICAgICAgIGlmKGlzVXBkYXRlKXtcclxuLy8gICAgICAgICAgICAgdGhpcy5tZXRob2Q9IFwiUEFUQ0hcIiA7XHJcbi8vICAgICAgICAgfVxyXG4vL1xyXG4vLyAgICAgICAgIHRoaXMuYWpheFNlbmQoKTtcclxuLy9cclxuLy9cclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vLyBsZXQgdHJhY2VJbmZvID0ge1xyXG4vLyAgICAgLy9tb2RlID09IDEgPT4gcG9zdFxyXG4vLyAgICAgbW9kZSA6IDAsXHJcbi8vICAgICBpZEFyciA6IFtcInRvZG8tYXJlYVwiLFwicG9zdC1hcmVhXCJdLFxyXG4vLyAgICAgY2hlY2tib3hUZXh0QXJyIDogW1wi7J6R7ISxIOuqqOuTnCDrsJTqvrjquLAg7ZiE7J6sIDogVG9kb1wiLFwi7J6R7ISxIOuqqOuTnCDrsJTqvrjquLAg7ZiE7J6sIDog7Y+s7Iqk7Yq4XCJdLFxyXG4vLyAgICAgLy/snYDri4lcclxuLy9cclxuLy8gICAgIGNoYW5nZU1vZGUoKXtcclxuLy8gICAgICAgICAkKFwiI1wiK3RoaXMuaWRBcnJbdGhpcy5tb2RlXSkuYXR0cihcImhpZGRlblwiLHRydWUpO1xyXG4vLyAgICAgICAgICQoXCIjY2hlY2tib3gtbGFiZWxcIikudGV4dCh0aGlzLmNoZWNrYm94VGV4dEFyclt0aGlzLm1vZGVdKTtcclxuLy8gICAgICAgICB0aGlzLm1vZGUgPSAodGhpcy5tb2RlID09PSAwKSArIDA7XHJcbi8vICAgICAgICAgJChcIiNcIit0aGlzLmlkQXJyW3RoaXMubW9kZV0pLnJlbW92ZUF0dHIoXCJoaWRkZW5cIik7XHJcbi8vICAgICAgICAgJChcIiNjaGVja2JveC1sYWJlbFwiKS50ZXh0KHRoaXMuY2hlY2tib3hUZXh0QXJyW3RoaXMubW9kZV0pO1xyXG4vLyAgICAgfSxcclxuLy9cclxuLy8gICAgIGdldFRyYWNlV3JpdGUoKSB7XHJcbi8vICAgICAgICAgbGV0IHVybCA9IFwiL0FQSS90cmFjZS9cIjtcclxuLy8gICAgICAgICBsZXQgbWV0aG9kID0gXCJQT1NUXCI7XHJcbi8vICAgICAgICAgbGV0ICRwcmludEFyZWEgPSAkKFwiI3ByaW50LXJlc3VsdC1hcmVhXCIpO1xyXG4vLyAgICAgICAgIGxldCByZWRpcmVjdCA9IFwiLi4vdHJhY2VcIjtcclxuLy8gICAgICAgICByZXR1cm4gbmV3IFRyYWNlV3JpdGUobWV0aG9kLCB1cmwsICRwcmludEFyZWEscmVkaXJlY3QpO1xyXG4vLyAgICAgfVxyXG4vLyB9O1xyXG4vL1xyXG4vLyBleHBvcnQgZnVuY3Rpb24gZ2V0VHJhY2VXcml0ZSgpe1xyXG4vLyAgICAgcmV0dXJuIHRyYWNlSW5mby5nZXRUcmFjZVdyaXRlKCk7XHJcbi8vIH1cclxuLy9cclxuLy8gZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZU1vZGUoKXtcclxuLy8gICAgIHJldHVybiB0cmFjZUluZm8uY2hhbmdlTW9kZSgpO1xyXG4vLyB9XHJcbi8vXHJcbi8vXHJcbi8vXHJcblxyXG5cclxuXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtnZXRUcmFjZVdyaXRlLGNoYW5nZU1vZGV9IGZyb20gXCIuLi9UcmFjZS9UcmFjZVdyaXRlLmpzXCI7XHJcbnRyYWNlV3JpdGUgPSBnZXRUcmFjZVdyaXRlKCk7XHJcbmNoYW5nZUlucHV0TW9kZSA9IGNoYW5nZU1vZGU7XHJcbmxldCBpc1Bvc3QgPSBcIltbJHtwb3N0ICE9IG51bGx9XV1cIjtcclxuaWYoaXNQb3N0ID09PSBcInRydWVcIil7XHJcbiAgICBjaGFuZ2VJbnB1dE1vZGUoKTtcclxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==