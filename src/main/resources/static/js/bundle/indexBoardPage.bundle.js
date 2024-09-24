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

/***/ "./src/main/resources/static/js/Board/board.js":
/*!*****************************************************!*\
  !*** ./src/main/resources/static/js/Board/board.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getBoardIndex: () => (/* binding */ getBoardIndex)
/* harmony export */ });
/* harmony import */ var _Ajax_AjaxSend_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Ajax/AjaxSend.js */ "./src/main/resources/static/js/Ajax/AjaxSend.js");


/**
 * @extends AJaxSend
 */
class Board extends _Ajax_AjaxSend_js__WEBPACK_IMPORTED_MODULE_0__.AJaxSend{
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

function getBoardIndex(){
    return boardIndex;
}





/***/ }),

/***/ "./src/main/resources/static/js/Comment/Comment.js":
/*!*********************************************************!*\
  !*** ./src/main/resources/static/js/Comment/Comment.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCommentIndex: () => (/* binding */ getCommentIndex)
/* harmony export */ });
/* harmony import */ var _Ajax_AjaxSend_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Ajax/AjaxSend.js */ "./src/main/resources/static/js/Ajax/AjaxSend.js");


/**
 * @extends AJaxSend
 */
class Comment extends _Ajax_AjaxSend_js__WEBPACK_IMPORTED_MODULE_0__.AJaxSend{
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

function getCommentIndex(){
    return commentIndex;
}





/***/ }),

/***/ "./src/main/resources/static/js/Front/CommentEditFront.js":
/*!****************************************************************!*\
  !*** ./src/main/resources/static/js/Front/CommentEditFront.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCommentEditFrontIndex: () => (/* binding */ getCommentEditFrontIndex)
/* harmony export */ });
/* harmony import */ var _EditArea_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditArea.js */ "./src/main/resources/static/js/Front/EditArea.js");


class CommentEditFront extends _EditArea_js__WEBPACK_IMPORTED_MODULE_0__.EditArea{

}

let commentEditFrontIndex = {
    getEditComment(args) {
        return new CommentEditFront(args);
    }
};

function getCommentEditFrontIndex(){
    let btnParent = "comment-edit-btn-";
    let textId = "comment-text-";
    let submitOnclick = "commentIndex.update();";
    let cancelOnclick = "frontEditCommentIndex.toggleEdit();";
    let args = {btnParent,textId,submitOnclick,cancelOnclick};
    return commentEditFrontIndex.getEditComment(args);
}





/***/ }),

/***/ "./src/main/resources/static/js/Front/EditArea.js":
/*!********************************************************!*\
  !*** ./src/main/resources/static/js/Front/EditArea.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EditArea: () => (/* binding */ EditArea),
/* harmony export */   getEdit: () => (/* binding */ getEdit)
/* harmony export */ });
class EditArea {
    // constructor($textArea,$textAreaParent,$btnParent,textId,submitOnclick,cancelOnclick) {

    constructor(args) {
        if(args){
            for (let arg in args) {
                this[arg] = args[arg];
            }
        }
    }

    toggleEdit(id){
        this.toggleTextarea(id);
        this.toggleBtn(id);
        this.editMode = !this.editMode;
    }

    //id가 undef면 0으로
    toggleTextarea(id){
        id = id ? id : '';
        let textId = this.textId + id;
        let $textArea = $("#"+textId);
        let text = $textArea.text();
        text = text.length === 0 ? "" : text;
        let html;
        let parent = $textArea.parent();

        if(!this.editMode) html = `<textarea id="${textId}" class="form-control" row="5" maxlength="1000" style="resize: none">${text}</textarea>`;
        else html = `<p id="${textId}">${text}</p>`;
        parent.html(html);
    }

    //id가 undef면 0으로
    toggleBtn(id){
        id = id ? id : '';
        let parent = $("#" + this.btnParent + id);
        if(!this.editMode){
            let tmpSubmitOnclick = this.submitOnclick.replace("()",`(${id})`);
            let tmpCancelOnclick = this.cancelOnclick.replace("()",`(${id})`);
            let submitBtnHTML = `<button class="btn btn-dark float-right ml-3" onclick="${tmpSubmitOnclick}">수정</button>`;
            let cancelBtnHTML = `<button class="btn btn-dark float-right" onclick="${tmpCancelOnclick}">취소</button>`;
            parent.html(submitBtnHTML + cancelBtnHTML);
        }else{
            parent.html("");
        }
    }
}

let editAreaIndex = {
    getEdit(args) {
        return new EditArea(args);
    }
};

function getEdit($textArea,$textAreaParent,$btnParent,textId,submitOnclick,cancelOnclick){
    return editAreaIndex.getEdit(arguments);
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
/*!**************************************************************!*\
  !*** ./src/main/resources/static/js/Index/indexBoardPage.js ***!
  \**************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Comment_Comment_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Comment/Comment.js */ "./src/main/resources/static/js/Comment/Comment.js");
/* harmony import */ var _Front_CommentEditFront_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Front/CommentEditFront.js */ "./src/main/resources/static/js/Front/CommentEditFront.js");
/* harmony import */ var _Board_board_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Board/board.js */ "./src/main/resources/static/js/Board/board.js");




commentIndex = (0,_Comment_Comment_js__WEBPACK_IMPORTED_MODULE_0__.getCommentIndex)();
commentEditFrontIndex = (0,_Front_CommentEditFront_js__WEBPACK_IMPORTED_MODULE_1__.getCommentEditFrontIndex)();
boardIndex = (0,_Board_board_js__WEBPACK_IMPORTED_MODULE_2__.getBoardIndex)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQzNEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOc0Q7QUFDZ0I7QUFDdEI7QUFDaEQ7QUFDQSxlQUFlLG9FQUFlO0FBQzlCLHdCQUF3QixvRkFBd0I7QUFDaEQsYUFBYSw4REFBYSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXhwcmVzc2RyaXZlLy4vc3JjL21haW4vcmVzb3VyY2VzL3N0YXRpYy9qcy9BamF4L0FqYXhTZW5kLmpzIiwid2VicGFjazovL2V4cHJlc3Nkcml2ZS8uL3NyYy9tYWluL3Jlc291cmNlcy9zdGF0aWMvanMvQm9hcmQvYm9hcmQuanMiLCJ3ZWJwYWNrOi8vZXhwcmVzc2RyaXZlLy4vc3JjL21haW4vcmVzb3VyY2VzL3N0YXRpYy9qcy9Db21tZW50L0NvbW1lbnQuanMiLCJ3ZWJwYWNrOi8vZXhwcmVzc2RyaXZlLy4vc3JjL21haW4vcmVzb3VyY2VzL3N0YXRpYy9qcy9Gcm9udC9Db21tZW50RWRpdEZyb250LmpzIiwid2VicGFjazovL2V4cHJlc3Nkcml2ZS8uL3NyYy9tYWluL3Jlc291cmNlcy9zdGF0aWMvanMvRnJvbnQvRWRpdEFyZWEuanMiLCJ3ZWJwYWNrOi8vZXhwcmVzc2RyaXZlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2V4cHJlc3Nkcml2ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZXhwcmVzc2RyaXZlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZXhwcmVzc2RyaXZlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZXhwcmVzc2RyaXZlLy4vc3JjL21haW4vcmVzb3VyY2VzL3N0YXRpYy9qcy9JbmRleC9pbmRleEJvYXJkUGFnZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogIEBjbGFzc1xyXG4gKiAgQHBhcmFtIHtzdHJpbmd9IG1ldGhvZCAtIO2GteyLoOyXkCDsgqzsmqnrkKAgSFRNTCBtZXRob2RcclxuICogIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSDthrXsi6DtlaAgdXJsXHJcbiAqICBAcGFyYW0ge3N0cmluZ30gJHByaW50QXJlYSAtIOqysOqzvOulvCDstpzroKXtlaAgSFRNTCBFTEVNRU5UXHJcbiAqICBAcGFyYW0ge3N0cmluZ30gcmVkaXJlY3QgLSBhamF4IO2GteyLoCDtm4QgcmVkaXJlY3TtlaAg7KO87IaMXHJcbiAqICBAcGFyYW0ge3N0cmluZ30gYXN5bmMgLSBhamF4IGFzeW5jIOyXrOu2gFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFKYXhTZW5kIHtcclxuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCx1cmwsJHByaW50QXJlYSxyZWRpcmVjdCxhc3luYykge1xyXG4gICAgICAgIHRoaXMubWV0aG9kID0gbWV0aG9kO1xyXG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xyXG4gICAgICAgIHRoaXMuJHByaW50QXJlYSA9ICRwcmludEFyZWE7XHJcbiAgICAgICAgdGhpcy5kYXRhID0ge307XHJcbiAgICAgICAgdGhpcy5zZXRYaHJJbmZvKCk7XHJcbiAgICAgICAgdGhpcy5yZWRpcmVjdCA9IHJlZGlyZWN0O1xyXG4gICAgICAgIHRoaXMuYXN5bmMgPSBhc3luYyB8fCBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcmVkaXJlY3RNZXRob2QocmVkaXJlY3RVUkwpIHtcclxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gcmVkaXJlY3RVUkw7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0WGhySW5mbygpe1xyXG4gICAgICAgIHRoaXMudG9rZW4gPSAkKFwibWV0YVtuYW1lPSdfY3NyZiddXCIpLmF0dHIoXCJjb250ZW50XCIpO1xyXG4gICAgICAgIHRoaXMuaGVhZGVyID0gJChcIm1ldGFbbmFtZT0nX2NzcmZfaGVhZGVyJ11cIikuYXR0cihcImNvbnRlbnRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgYWpheFNlbmQoKXtcclxuICAgICAgICBsZXQgaGVhZGVyID0gdGhpcy5oZWFkZXI7XHJcbiAgICAgICAgbGV0IHRva2VuID0gdGhpcy50b2tlblxyXG4gICAgICAgIGxldCAkcHJpbnRBcmVhID0gdGhpcy4kcHJpbnRBcmVhO1xyXG4gICAgICAgIGxldCByZWRpcmVjdCA9IHRoaXMucmVkaXJlY3Q7XHJcbiAgICAgICAgbGV0IHJlc3VsdFJlcztcclxuICAgICAgICBsZXQgcmVkaXJlY3RNZXRob2QgPSB0aGlzLnJlZGlyZWN0TWV0aG9kO1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9uID0ge1xyXG4gICAgICAgICAgICB1cmw6IHRoaXMudXJsLFxyXG4gICAgICAgICAgICBtZXRob2Q6IHRoaXMubWV0aG9kLFxyXG4gICAgICAgICAgICBkYXRhOiB0aGlzLmRhdGEsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0aGlzLmFzeW5jLFxyXG4gICAgICAgICAgICBwcm9jZXNzRGF0YTogdGhpcy5wcm9jZXNzRGF0YSxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IHRoaXMuY29udGVudFR5cGUsXHJcbiAgICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgdG9rZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkLmFqYXgob3B0aW9uKS5kb25lKGZ1bmN0aW9uIChyZXNwb25zZSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxyXG4gICAgICAgICAgICBpZihyZXNwb25zZS5jb2RlID09IDIwMCB8fCByZXNwb25zZS5zdGF0dXMgPT0gMjAwKXtcclxuICAgICAgICAgICAgICAgIGlmKHJlZGlyZWN0ICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3RNZXRob2QocmVkaXJlY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sMTAwKTsgLy8gMzAwMOuwgOumrOy0iCA9IDPstIhcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRSZXMgPSByZXNwb25zZTtcclxuICAgICAgICAgICAgICAgICRwcmludEFyZWEudGV4dChyZXNwb25zZS5tc2cpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICAgICAgaWYoIXJlc3BvbnNlKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmKHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5lcnJvcnMpe1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBlcnJvciBvZiByZXNwb25zZS5yZXNwb25zZUpTT04uZXJyb3JzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoZXJyb3IuZGVmYXVsdE1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0UmVzO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQge0FKYXhTZW5kfSBmcm9tICcuLi9BamF4L0FqYXhTZW5kLmpzJztcclxuXHJcbi8qKlxyXG4gKiBAZXh0ZW5kcyBBSmF4U2VuZFxyXG4gKi9cclxuY2xhc3MgQm9hcmQgZXh0ZW5kcyBBSmF4U2VuZHtcclxuICAgIGJvYXJkUmVhY3Rpb24oYm9hcmRJZCxtb2RlKXtcclxuICAgICAgICB0aGlzLmRhdGEgPSB7XHJcbiAgICAgICAgICAgIGJvYXJkSWQgOiBib2FyZElkLFxyXG4gICAgICAgICAgICBtb2RlIDogbW9kZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5hamF4U2VuZCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZWRpcmVjdE1ldGhvZChyZWRpcmVjdFVSTCkge1xyXG4gICAgICAgIGlmKHN1cGVyLmlzQm9hcmRDb21tZW50KXtcclxuICAgICAgICAgICAgc3VwZXIucmVkaXJlY3RNZXRob2QocmVkaXJlY3RVUkwpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgfSwxMDApOyAvLyAzMDAw67CA66as7LSIID0gM+y0iFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubGV0IGJvYXJkSW5kZXggPSB7XHJcbiAgICB1cmwgOiBcIi9BUEkvYm9hcmQvXCIsXHJcbiAgICByZWRpcmVjdDogbG9jYXRpb24uaHJlZixcclxuXHJcbiAgICBib2FyZFJlYWN0aW9uKGJvYXJkSWQsbW9kZSl7XHJcbiAgICAgICAgbGV0IG1ldGhvZCA9IFwiUEFUQ0hcIjtcclxuICAgICAgICByZXR1cm4gbmV3IEJvYXJkKG1ldGhvZCx0aGlzLnVybCxudWxsLHRoaXMucmVkaXJlY3QpLmJvYXJkUmVhY3Rpb24oYm9hcmRJZCxtb2RlKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEJvYXJkSW5kZXgoKXtcclxuICAgIHJldHVybiBib2FyZEluZGV4O1xyXG59XHJcblxyXG5cclxuXHJcbiIsImltcG9ydCB7QUpheFNlbmR9IGZyb20gJy4uL0FqYXgvQWpheFNlbmQuanMnO1xyXG5cclxuLyoqXHJcbiAqIEBleHRlbmRzIEFKYXhTZW5kXHJcbiAqL1xyXG5jbGFzcyBDb21tZW50IGV4dGVuZHMgQUpheFNlbmR7XHJcbiAgICBhZGQoYm9hcmRJZCl7XHJcbiAgICAgICAgc3VwZXIuaXNCb2FyZENvbW1lbnQgPSBib2FyZElkO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IHtcclxuICAgICAgICAgICAgdGV4dCA6ICQoXCIjY29tbWVudC10ZXh0XCIpLnZhbCgpLFxyXG4gICAgICAgICAgICBwYWdlT3duZXJVc2VybmFtZSA6IHBhZ2VPd25lclVzZXJuYW1lLFxyXG4gICAgICAgICAgICBib2FyZElkIDogYm9hcmRJZFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFqYXhTZW5kKCk7XHJcbiAgICB9XHJcbiAgICBkZWxldGUoaWQpe1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IHtcclxuICAgICAgICAgICAgaWQgOiBpZFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFqYXhTZW5kKCk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoaWQpe1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IHtcclxuICAgICAgICAgICAgaWQgOiBpZCxcclxuICAgICAgICAgICAgdGV4dCA6ICQoXCIjY29tbWVudC10ZXh0LVwiICsgaWQpLnZhbCgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWpheFNlbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICByZWRpcmVjdE1ldGhvZChyZWRpcmVjdFVSTCkge1xyXG4gICAgICAgIGlmKHN1cGVyLmlzQm9hcmRDb21tZW50KXtcclxuICAgICAgICAgICAgc3VwZXIucmVkaXJlY3RNZXRob2QocmVkaXJlY3RVUkwpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgfSwxMDApOyAvLyAzMDAw67CA66as7LSIID0gM+y0iFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubGV0IGNvbW1lbnRJbmRleCA9IHtcclxuICAgIHVybCA6IFwiL0FQSS9jb21tZW50L1wiLFxyXG4gICAgJHByaW50QXJlYSA6ICQoXCIjcHJpbnQtcmVzdWx0LWFyZWFcIiksXHJcbiAgICByZWRpcmVjdCA6IFwiLi90cmFjZVwiLFxyXG5cclxuICAgIGFkZChib2FyZElkKSB7XHJcbiAgICAgICAgbGV0IG1ldGhvZCA9IFwiUE9TVFwiO1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29tbWVudChtZXRob2QsIHRoaXMudXJsLCB0aGlzLiRwcmludEFyZWEsdGhpcy5yZWRpcmVjdCkuYWRkKGJvYXJkSWQpO1xyXG4gICAgfSxcclxuICAgIGRlbGV0ZShpZCkge1xyXG4gICAgICAgIGxldCBtZXRob2QgPSBcIkRFTEVURVwiO1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29tbWVudChtZXRob2QsIHRoaXMudXJsLCB0aGlzLiRwcmludEFyZWEsdGhpcy5yZWRpcmVjdCkuZGVsZXRlKGlkKTtcclxuICAgIH0sXHJcbiAgICB1cGRhdGUoaWQpIHtcclxuICAgICAgICBsZXQgbWV0aG9kID0gXCJQQVRDSFwiO1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29tbWVudChtZXRob2QsIHRoaXMudXJsLCB0aGlzLiRwcmludEFyZWEsdGhpcy5yZWRpcmVjdCkudXBkYXRlKGlkKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb21tZW50SW5kZXgoKXtcclxuICAgIHJldHVybiBjb21tZW50SW5kZXg7XHJcbn1cclxuXHJcblxyXG5cclxuIiwiaW1wb3J0IHtFZGl0QXJlYX0gZnJvbSAnLi9FZGl0QXJlYS5qcyc7XHJcblxyXG5jbGFzcyBDb21tZW50RWRpdEZyb250IGV4dGVuZHMgRWRpdEFyZWF7XHJcblxyXG59XHJcblxyXG5sZXQgY29tbWVudEVkaXRGcm9udEluZGV4ID0ge1xyXG4gICAgZ2V0RWRpdENvbW1lbnQoYXJncykge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29tbWVudEVkaXRGcm9udChhcmdzKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb21tZW50RWRpdEZyb250SW5kZXgoKXtcclxuICAgIGxldCBidG5QYXJlbnQgPSBcImNvbW1lbnQtZWRpdC1idG4tXCI7XHJcbiAgICBsZXQgdGV4dElkID0gXCJjb21tZW50LXRleHQtXCI7XHJcbiAgICBsZXQgc3VibWl0T25jbGljayA9IFwiY29tbWVudEluZGV4LnVwZGF0ZSgpO1wiO1xyXG4gICAgbGV0IGNhbmNlbE9uY2xpY2sgPSBcImZyb250RWRpdENvbW1lbnRJbmRleC50b2dnbGVFZGl0KCk7XCI7XHJcbiAgICBsZXQgYXJncyA9IHtidG5QYXJlbnQsdGV4dElkLHN1Ym1pdE9uY2xpY2ssY2FuY2VsT25jbGlja307XHJcbiAgICByZXR1cm4gY29tbWVudEVkaXRGcm9udEluZGV4LmdldEVkaXRDb21tZW50KGFyZ3MpO1xyXG59XHJcblxyXG5cclxuXHJcbiIsImV4cG9ydCBjbGFzcyBFZGl0QXJlYSB7XHJcbiAgICAvLyBjb25zdHJ1Y3RvcigkdGV4dEFyZWEsJHRleHRBcmVhUGFyZW50LCRidG5QYXJlbnQsdGV4dElkLHN1Ym1pdE9uY2xpY2ssY2FuY2VsT25jbGljaykge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFyZ3MpIHtcclxuICAgICAgICBpZihhcmdzKXtcclxuICAgICAgICAgICAgZm9yIChsZXQgYXJnIGluIGFyZ3MpIHtcclxuICAgICAgICAgICAgICAgIHRoaXNbYXJnXSA9IGFyZ3NbYXJnXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVFZGl0KGlkKXtcclxuICAgICAgICB0aGlzLnRvZ2dsZVRleHRhcmVhKGlkKTtcclxuICAgICAgICB0aGlzLnRvZ2dsZUJ0bihpZCk7XHJcbiAgICAgICAgdGhpcy5lZGl0TW9kZSA9ICF0aGlzLmVkaXRNb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vaWTqsIAgdW5kZWbrqbQgMOycvOuhnFxyXG4gICAgdG9nZ2xlVGV4dGFyZWEoaWQpe1xyXG4gICAgICAgIGlkID0gaWQgPyBpZCA6ICcnO1xyXG4gICAgICAgIGxldCB0ZXh0SWQgPSB0aGlzLnRleHRJZCArIGlkO1xyXG4gICAgICAgIGxldCAkdGV4dEFyZWEgPSAkKFwiI1wiK3RleHRJZCk7XHJcbiAgICAgICAgbGV0IHRleHQgPSAkdGV4dEFyZWEudGV4dCgpO1xyXG4gICAgICAgIHRleHQgPSB0ZXh0Lmxlbmd0aCA9PT0gMCA/IFwiXCIgOiB0ZXh0O1xyXG4gICAgICAgIGxldCBodG1sO1xyXG4gICAgICAgIGxldCBwYXJlbnQgPSAkdGV4dEFyZWEucGFyZW50KCk7XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLmVkaXRNb2RlKSBodG1sID0gYDx0ZXh0YXJlYSBpZD1cIiR7dGV4dElkfVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcm93PVwiNVwiIG1heGxlbmd0aD1cIjEwMDBcIiBzdHlsZT1cInJlc2l6ZTogbm9uZVwiPiR7dGV4dH08L3RleHRhcmVhPmA7XHJcbiAgICAgICAgZWxzZSBodG1sID0gYDxwIGlkPVwiJHt0ZXh0SWR9XCI+JHt0ZXh0fTwvcD5gO1xyXG4gICAgICAgIHBhcmVudC5odG1sKGh0bWwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vaWTqsIAgdW5kZWbrqbQgMOycvOuhnFxyXG4gICAgdG9nZ2xlQnRuKGlkKXtcclxuICAgICAgICBpZCA9IGlkID8gaWQgOiAnJztcclxuICAgICAgICBsZXQgcGFyZW50ID0gJChcIiNcIiArIHRoaXMuYnRuUGFyZW50ICsgaWQpO1xyXG4gICAgICAgIGlmKCF0aGlzLmVkaXRNb2RlKXtcclxuICAgICAgICAgICAgbGV0IHRtcFN1Ym1pdE9uY2xpY2sgPSB0aGlzLnN1Ym1pdE9uY2xpY2sucmVwbGFjZShcIigpXCIsYCgke2lkfSlgKTtcclxuICAgICAgICAgICAgbGV0IHRtcENhbmNlbE9uY2xpY2sgPSB0aGlzLmNhbmNlbE9uY2xpY2sucmVwbGFjZShcIigpXCIsYCgke2lkfSlgKTtcclxuICAgICAgICAgICAgbGV0IHN1Ym1pdEJ0bkhUTUwgPSBgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGFyayBmbG9hdC1yaWdodCBtbC0zXCIgb25jbGljaz1cIiR7dG1wU3VibWl0T25jbGlja31cIj7siJjsoJU8L2J1dHRvbj5gO1xyXG4gICAgICAgICAgICBsZXQgY2FuY2VsQnRuSFRNTCA9IGA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kYXJrIGZsb2F0LXJpZ2h0XCIgb25jbGljaz1cIiR7dG1wQ2FuY2VsT25jbGlja31cIj7st6jshow8L2J1dHRvbj5gO1xyXG4gICAgICAgICAgICBwYXJlbnQuaHRtbChzdWJtaXRCdG5IVE1MICsgY2FuY2VsQnRuSFRNTCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHBhcmVudC5odG1sKFwiXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubGV0IGVkaXRBcmVhSW5kZXggPSB7XHJcbiAgICBnZXRFZGl0KGFyZ3MpIHtcclxuICAgICAgICByZXR1cm4gbmV3IEVkaXRBcmVhKGFyZ3MpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEVkaXQoJHRleHRBcmVhLCR0ZXh0QXJlYVBhcmVudCwkYnRuUGFyZW50LHRleHRJZCxzdWJtaXRPbmNsaWNrLGNhbmNlbE9uY2xpY2spe1xyXG4gICAgcmV0dXJuIGVkaXRBcmVhSW5kZXguZ2V0RWRpdChhcmd1bWVudHMpO1xyXG59XHJcblxyXG5cclxuXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtnZXRDb21tZW50SW5kZXh9IGZyb20gXCIuLi9Db21tZW50L0NvbW1lbnQuanNcIjtcclxuaW1wb3J0IHtnZXRDb21tZW50RWRpdEZyb250SW5kZXh9IGZyb20gXCIuLi9Gcm9udC9Db21tZW50RWRpdEZyb250LmpzXCI7XHJcbmltcG9ydCB7Z2V0Qm9hcmRJbmRleH0gZnJvbSBcIi4uL0JvYXJkL2JvYXJkLmpzXCI7XHJcblxyXG5jb21tZW50SW5kZXggPSBnZXRDb21tZW50SW5kZXgoKTtcclxuY29tbWVudEVkaXRGcm9udEluZGV4ID0gZ2V0Q29tbWVudEVkaXRGcm9udEluZGV4KCk7XHJcbmJvYXJkSW5kZXggPSBnZXRCb2FyZEluZGV4KCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9