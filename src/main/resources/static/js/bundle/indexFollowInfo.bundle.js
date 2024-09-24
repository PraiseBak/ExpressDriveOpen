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

/***/ "./src/main/resources/static/js/User/FollowInfo.js":
/*!*********************************************************!*\
  !*** ./src/main/resources/static/js/User/FollowInfo.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getFollowInfo: () => (/* binding */ getFollowInfo)
/* harmony export */ });
/* harmony import */ var _Ajax_AjaxSend_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Ajax/AjaxSend.js */ "./src/main/resources/static/js/Ajax/AjaxSend.js");


/**
 * @extends AJaxSend
 */
class FollowInfo extends _Ajax_AjaxSend_js__WEBPACK_IMPORTED_MODULE_0__.AJaxSend{
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

function getFollowInfo(){
    return followInfo;
}

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
  !*** ./src/main/resources/static/js/Index/indexFollowInfo.js ***!
  \***************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _User_FollowInfo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../User/FollowInfo.js */ "./src/main/resources/static/js/User/FollowInfo.js");

followInfoIndex = (0,_User_FollowInfo_js__WEBPACK_IMPORTED_MODULE_0__.getFollowInfo)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXhGb2xsb3dJbmZvLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEIsWUFBWSxRQUFRO0FBQ3BCLFlBQVksUUFBUTtBQUNwQixZQUFZLFFBQVE7QUFDcEIsWUFBWSxRQUFRO0FBQ3BCO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixPQUFPO0FBQzVCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3BGNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsdURBQVE7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELFNBQVMsd0JBQXdCLGFBQWE7QUFDbEc7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7Ozs7OztVQ2pDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTm9EO0FBQ3BELGtCQUFrQixrRUFBYSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXhwcmVzc2RyaXZlLy4vc3JjL21haW4vcmVzb3VyY2VzL3N0YXRpYy9qcy9BamF4L0FqYXhTZW5kLmpzIiwid2VicGFjazovL2V4cHJlc3Nkcml2ZS8uL3NyYy9tYWluL3Jlc291cmNlcy9zdGF0aWMvanMvVXNlci9Gb2xsb3dJbmZvLmpzIiwid2VicGFjazovL2V4cHJlc3Nkcml2ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9leHByZXNzZHJpdmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2V4cHJlc3Nkcml2ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2V4cHJlc3Nkcml2ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2V4cHJlc3Nkcml2ZS8uL3NyYy9tYWluL3Jlc291cmNlcy9zdGF0aWMvanMvSW5kZXgvaW5kZXhGb2xsb3dJbmZvLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiAgQGNsYXNzXHJcbiAqICBAcGFyYW0ge3N0cmluZ30gbWV0aG9kIC0g7Ya17Iug7JeQIOyCrOyaqeuQoCBIVE1MIG1ldGhvZFxyXG4gKiAgQHBhcmFtIHtzdHJpbmd9IHVybCAtIO2GteyLoO2VoCB1cmxcclxuICogIEBwYXJhbSB7c3RyaW5nfSAkcHJpbnRBcmVhIC0g6rKw6rO866W8IOy2nOugpe2VoCBIVE1MIEVMRU1FTlRcclxuICogIEBwYXJhbSB7c3RyaW5nfSByZWRpcmVjdCAtIGFqYXgg7Ya17IugIO2bhCByZWRpcmVjdO2VoCDso7zshoxcclxuICogIEBwYXJhbSB7c3RyaW5nfSBhc3luYyAtIGFqYXggYXN5bmMg7Jes67aAXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQUpheFNlbmQge1xyXG4gICAgY29uc3RydWN0b3IobWV0aG9kLHVybCwkcHJpbnRBcmVhLHJlZGlyZWN0LGFzeW5jKSB7XHJcbiAgICAgICAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XHJcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XHJcbiAgICAgICAgdGhpcy4kcHJpbnRBcmVhID0gJHByaW50QXJlYTtcclxuICAgICAgICB0aGlzLmRhdGEgPSB7fTtcclxuICAgICAgICB0aGlzLnNldFhockluZm8oKTtcclxuICAgICAgICB0aGlzLnJlZGlyZWN0ID0gcmVkaXJlY3Q7XHJcbiAgICAgICAgdGhpcy5hc3luYyA9IGFzeW5jIHx8IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZWRpcmVjdE1ldGhvZChyZWRpcmVjdFVSTCkge1xyXG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSByZWRpcmVjdFVSTDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRYaHJJbmZvKCl7XHJcbiAgICAgICAgdGhpcy50b2tlbiA9ICQoXCJtZXRhW25hbWU9J19jc3JmJ11cIikuYXR0cihcImNvbnRlbnRcIik7XHJcbiAgICAgICAgdGhpcy5oZWFkZXIgPSAkKFwibWV0YVtuYW1lPSdfY3NyZl9oZWFkZXInXVwiKS5hdHRyKFwiY29udGVudFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBhamF4U2VuZCgpe1xyXG4gICAgICAgIGxldCBoZWFkZXIgPSB0aGlzLmhlYWRlcjtcclxuICAgICAgICBsZXQgdG9rZW4gPSB0aGlzLnRva2VuXHJcbiAgICAgICAgbGV0ICRwcmludEFyZWEgPSB0aGlzLiRwcmludEFyZWE7XHJcbiAgICAgICAgbGV0IHJlZGlyZWN0ID0gdGhpcy5yZWRpcmVjdDtcclxuICAgICAgICBsZXQgcmVzdWx0UmVzO1xyXG4gICAgICAgIGxldCByZWRpcmVjdE1ldGhvZCA9IHRoaXMucmVkaXJlY3RNZXRob2Q7XHJcblxyXG4gICAgICAgIGxldCBvcHRpb24gPSB7XHJcbiAgICAgICAgICAgIHVybDogdGhpcy51cmwsXHJcbiAgICAgICAgICAgIG1ldGhvZDogdGhpcy5tZXRob2QsXHJcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YSxcclxuICAgICAgICAgICAgYXN5bmM6IHRoaXMuYXN5bmMsXHJcbiAgICAgICAgICAgIHByb2Nlc3NEYXRhOiB0aGlzLnByb2Nlc3NEYXRhLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogdGhpcy5jb250ZW50VHlwZSxcclxuICAgICAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLCB0b2tlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQuYWpheChvcHRpb24pLmRvbmUoZnVuY3Rpb24gKHJlc3BvbnNlKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXHJcbiAgICAgICAgICAgIGlmKHJlc3BvbnNlLmNvZGUgPT0gMjAwIHx8IHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApe1xyXG4gICAgICAgICAgICAgICAgaWYocmVkaXJlY3QgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjdE1ldGhvZChyZWRpcmVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwxMDApOyAvLyAzMDAw67CA66as7LSIID0gM+y0iFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJlc3VsdFJlcyA9IHJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgJHByaW50QXJlYS50ZXh0KHJlc3BvbnNlLm1zZyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICBpZighcmVzcG9uc2UpIHJldHVybjtcclxuICAgICAgICAgICAgaWYocmVzcG9uc2UucmVzcG9uc2VKU09OLmVycm9ycyl7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGVycm9yIG9mIHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5lcnJvcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChlcnJvci5kZWZhdWx0TWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgYWxlcnQocmVzcG9uc2UucmVzcG9uc2VKU09OLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHRSZXM7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiIsImltcG9ydCB7QUpheFNlbmR9IGZyb20gJy4uL0FqYXgvQWpheFNlbmQuanMnO1xyXG5cclxuLyoqXHJcbiAqIEBleHRlbmRzIEFKYXhTZW5kXHJcbiAqL1xyXG5jbGFzcyBGb2xsb3dJbmZvIGV4dGVuZHMgQUpheFNlbmR7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBsZXQgdXJsID0gXCIvQVBJL2ZvbGxvd0luZm8vXCI7XHJcbiAgICAgICAgbGV0IG1ldGhvZCA9IFwiR0VUXCI7XHJcbiAgICAgICAgbGV0ICRwcmludEFyZWEgPSAkKFwiI3ByaW50LXJlc3VsdC1hcmVhXCIpO1xyXG4gICAgICAgIHN1cGVyKG1ldGhvZCx1cmwsJHByaW50QXJlYSx1bmRlZmluZWQsZmFsc2UpO1xyXG4gICAgfVxyXG59XHJcblxyXG5sZXQgZm9sbG93SW5mbyA9IHtcclxuICAgIGZvbGxvd0luZGV4IDogbmV3IEZvbGxvd0luZm8oKSxcclxuXHJcbiAgICBnZXQoKXtcclxuICAgICAgICBpZigkKFwiLm5hdmJhci10b2dnbGVyXCIpLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIpID09PSBcInRydWVcIikgcmV0dXJuO1xyXG4gICAgICAgIGxldCByZWNlbnRXcml0ZXMgPSB0aGlzLmZvbGxvd0luZGV4LmFqYXhTZW5kKCk7XHJcbiAgICAgICAgbGV0ICRmb2xsb3dJbmZvID0gJChcIiNmb2xsb3ctaW5mb1wiKTtcclxuICAgICAgICAkZm9sbG93SW5mby5odG1sKFwiXCIpO1xyXG4gICAgICAgIGZvciAoY29uc3QgcmVjZW50V3JpdGUgb2YgcmVjZW50V3JpdGVzKSB7XHJcbiAgICAgICAgICAgIGxldCB1c2VybmFtZSA9IHJlY2VudFdyaXRlLnNwbGl0KCcgJylbMF0ucmVwbGFjZShcIuuLmOydmFwiLFwiXCIpO1xyXG4gICAgICAgICAgICBsZXQgaW5wdXRIVE1MID0gYDxhIGhyZWY9Jy91c2VyL3RyYWNlLyR7dXNlcm5hbWV9JyBjbGFzcz0ndGV4dC13aGl0ZSc+ICR7cmVjZW50V3JpdGV9IDwvYT48YnI+YDtcclxuICAgICAgICAgICAgJGZvbGxvd0luZm8uYXBwZW5kKGlucHV0SFRNTCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9sbG93SW5mbygpe1xyXG4gICAgcmV0dXJuIGZvbGxvd0luZm87XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7Z2V0Rm9sbG93SW5mb30gZnJvbSBcIi4uL1VzZXIvRm9sbG93SW5mby5qc1wiO1xyXG5mb2xsb3dJbmZvSW5kZXggPSBnZXRGb2xsb3dJbmZvKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9