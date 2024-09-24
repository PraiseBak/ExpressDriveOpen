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





/***/ }),

/***/ "./src/main/resources/static/js/Front/EditProfileFront.js":
/*!****************************************************************!*\
  !*** ./src/main/resources/static/js/Front/EditProfileFront.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getEditProfileFrontIndex: () => (/* binding */ getEditProfileFrontIndex)
/* harmony export */ });
/* harmony import */ var _EditArea_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditArea.js */ "./src/main/resources/static/js/Front/EditArea.js");


class EditProfileFront extends _EditArea_js__WEBPACK_IMPORTED_MODULE_0__.EditArea{
    toggleImgAdd() {
        let imgBtn = $("#img-add-btn");
        imgBtn.toggle();
    }

    toggleLink() {
        let linkA = "#linkA";
        let linkB = "#linkB";
        $(linkA + "-text").toggle();
        $(linkA + "-input-area").toggle();
        $(linkB + "-text").toggle();
        $(linkB + "-input-area").toggle();

    }

    toggleEdit(){
        this.toggleTextarea();
        this.toggleBtn();
        this.toggleImgAdd();
        this.toggleLink();
        this.editMode = !this.editMode;
    }
}

let editProfileIndex = {
    getEditProfile(args) {
        return new EditProfileFront(args);
    }
};

function getEditProfileFrontIndex(){
    let btnParent = "edit-btn";
    let textId = "profile-text";
    let submitOnclick = "editProfileIndex.edit();";
    let cancelOnclick = "frontEditProfileIndex.toggleEdit();";
    let args = {btnParent,textId,submitOnclick,cancelOnclick};
    return editProfileIndex.getEditProfile(args);
}





/***/ }),

/***/ "./src/main/resources/static/js/Trace/EditProfile.js":
/*!***********************************************************!*\
  !*** ./src/main/resources/static/js/Trace/EditProfile.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getEditProfile: () => (/* binding */ getEditProfile)
/* harmony export */ });
/* harmony import */ var _Ajax_AjaxSend_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Ajax/AjaxSend.js */ "./src/main/resources/static/js/Ajax/AjaxSend.js");


class EditProfile extends _Ajax_AjaxSend_js__WEBPACK_IMPORTED_MODULE_0__.AJaxSend {

    edit() {
        let form = new FormData();
        form.append("img", $("#file-upload")[0].files[0]);
        form.append("text", $("#profile-text").val());
        form.append("linkA", $("#linkA-input").val());
        form.append("linkB", $("#linkB-input").val());

        this.data = form;
        this.contentType = false;
        this.processData = false;
        this.ajaxSend();
    }
}

let editProfileIndex = {
    getEditProfile() {
        let url = "/API/trace/editProfile";
        let method = "POST";
        let redirect = "./trace";
        let $printArea = $("#print-result-area");
        return new EditProfile(method, url,$printArea,redirect,false);
    }
};

function getEditProfile(){
    return editProfileIndex.getEditProfile();
}





/***/ }),

/***/ "./src/main/resources/static/js/Trace/TraceCheck.js":
/*!**********************************************************!*\
  !*** ./src/main/resources/static/js/Trace/TraceCheck.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getTraceCheck: () => (/* binding */ getTraceCheck)
/* harmony export */ });
/* harmony import */ var _Ajax_AjaxSend_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Ajax/AjaxSend.js */ "./src/main/resources/static/js/Ajax/AjaxSend.js");


/**
 * @extends AJaxSend
 */
class TraceCheck extends _Ajax_AjaxSend_js__WEBPACK_IMPORTED_MODULE_0__.AJaxSend{
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

function getTraceCheck(){
    return traceCheckInfo.getTraceCheck();
}





/***/ }),

/***/ "./src/main/resources/static/js/Trace/TraceRemove.js":
/*!***********************************************************!*\
  !*** ./src/main/resources/static/js/Trace/TraceRemove.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getTraceRemove: () => (/* binding */ getTraceRemove)
/* harmony export */ });
/* harmony import */ var _Ajax_AjaxSend_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Ajax/AjaxSend.js */ "./src/main/resources/static/js/Ajax/AjaxSend.js");


/**
 * @extends AJaxSend
 */
class TraceRemove extends _Ajax_AjaxSend_js__WEBPACK_IMPORTED_MODULE_0__.AJaxSend{
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

function getTraceRemove(){
    return traceRemoveInfo.getTraceRemove();
}







/***/ }),

/***/ "./src/main/resources/static/js/User/follow.js":
/*!*****************************************************!*\
  !*** ./src/main/resources/static/js/User/follow.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getFollow: () => (/* binding */ getFollow)
/* harmony export */ });
/* harmony import */ var _Ajax_AjaxSend_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Ajax/AjaxSend.js */ "./src/main/resources/static/js/Ajax/AjaxSend.js");


/**
 * @extends AJaxSend
 */
class Follow extends _Ajax_AjaxSend_js__WEBPACK_IMPORTED_MODULE_0__.AJaxSend{
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

function getFollow(){
    return follow;
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
/*!***********************************************!*\
  !*** ./src/main/resources/static/js/index.js ***!
  \***********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Trace_TraceRemove_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Trace/TraceRemove.js */ "./src/main/resources/static/js/Trace/TraceRemove.js");
/* harmony import */ var _User_follow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./User/follow.js */ "./src/main/resources/static/js/User/follow.js");
/* harmony import */ var _Trace_TraceCheck_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Trace/TraceCheck.js */ "./src/main/resources/static/js/Trace/TraceCheck.js");
/* harmony import */ var _Trace_EditProfile_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Trace/EditProfile.js */ "./src/main/resources/static/js/Trace/EditProfile.js");
/* harmony import */ var _Front_EditProfileFront_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Front/EditProfileFront.js */ "./src/main/resources/static/js/Front/EditProfileFront.js");
/* harmony import */ var _Comment_Comment_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Comment/Comment.js */ "./src/main/resources/static/js/Comment/Comment.js");
/* harmony import */ var _Front_CommentEditFront_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Front/CommentEditFront.js */ "./src/main/resources/static/js/Front/CommentEditFront.js");








traceRemoveIndex = (0,_Trace_TraceRemove_js__WEBPACK_IMPORTED_MODULE_0__.getTraceRemove)();
following = (0,_User_follow_js__WEBPACK_IMPORTED_MODULE_1__.getFollow)();
traceCheck = (0,_Trace_TraceCheck_js__WEBPACK_IMPORTED_MODULE_2__.getTraceCheck)();
editProfileIndex = (0,_Trace_EditProfile_js__WEBPACK_IMPORTED_MODULE_3__.getEditProfile)();
editProfileFrontIndex = (0,_Front_EditProfileFront_js__WEBPACK_IMPORTED_MODULE_4__.getEditProfileFrontIndex)();
commentIndex = (0,_Comment_Comment_js__WEBPACK_IMPORTED_MODULE_5__.getCommentIndex)();
commentEditFrontIndex = (0,_Front_CommentEditFront_js__WEBPACK_IMPORTED_MODULE_6__.getCommentEditFrontIndex)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7Ozs7OztVQ3hEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnNEO0FBQ1g7QUFDUztBQUNFO0FBQ2U7QUFDaEI7QUFDZ0I7QUFDckU7QUFDQSxtQkFBbUIscUVBQWM7QUFDakMsWUFBWSwwREFBUztBQUNyQixhQUFhLG1FQUFhO0FBQzFCLG1CQUFtQixxRUFBYztBQUNqQyx3QkFBd0Isb0ZBQXdCO0FBQ2hELGVBQWUsb0VBQWU7QUFDOUIsd0JBQXdCLG9GQUF3QixHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXhwcmVzc2RyaXZlLy4vc3JjL21haW4vcmVzb3VyY2VzL3N0YXRpYy9qcy9BamF4L0FqYXhTZW5kLmpzIiwid2VicGFjazovL2V4cHJlc3Nkcml2ZS8uL3NyYy9tYWluL3Jlc291cmNlcy9zdGF0aWMvanMvQ29tbWVudC9Db21tZW50LmpzIiwid2VicGFjazovL2V4cHJlc3Nkcml2ZS8uL3NyYy9tYWluL3Jlc291cmNlcy9zdGF0aWMvanMvRnJvbnQvQ29tbWVudEVkaXRGcm9udC5qcyIsIndlYnBhY2s6Ly9leHByZXNzZHJpdmUvLi9zcmMvbWFpbi9yZXNvdXJjZXMvc3RhdGljL2pzL0Zyb250L0VkaXRBcmVhLmpzIiwid2VicGFjazovL2V4cHJlc3Nkcml2ZS8uL3NyYy9tYWluL3Jlc291cmNlcy9zdGF0aWMvanMvRnJvbnQvRWRpdFByb2ZpbGVGcm9udC5qcyIsIndlYnBhY2s6Ly9leHByZXNzZHJpdmUvLi9zcmMvbWFpbi9yZXNvdXJjZXMvc3RhdGljL2pzL1RyYWNlL0VkaXRQcm9maWxlLmpzIiwid2VicGFjazovL2V4cHJlc3Nkcml2ZS8uL3NyYy9tYWluL3Jlc291cmNlcy9zdGF0aWMvanMvVHJhY2UvVHJhY2VDaGVjay5qcyIsIndlYnBhY2s6Ly9leHByZXNzZHJpdmUvLi9zcmMvbWFpbi9yZXNvdXJjZXMvc3RhdGljL2pzL1RyYWNlL1RyYWNlUmVtb3ZlLmpzIiwid2VicGFjazovL2V4cHJlc3Nkcml2ZS8uL3NyYy9tYWluL3Jlc291cmNlcy9zdGF0aWMvanMvVXNlci9mb2xsb3cuanMiLCJ3ZWJwYWNrOi8vZXhwcmVzc2RyaXZlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2V4cHJlc3Nkcml2ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZXhwcmVzc2RyaXZlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZXhwcmVzc2RyaXZlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZXhwcmVzc2RyaXZlLy4vc3JjL21haW4vcmVzb3VyY2VzL3N0YXRpYy9qcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogIEBjbGFzc1xyXG4gKiAgQHBhcmFtIHtzdHJpbmd9IG1ldGhvZCAtIO2GteyLoOyXkCDsgqzsmqnrkKAgSFRNTCBtZXRob2RcclxuICogIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSDthrXsi6DtlaAgdXJsXHJcbiAqICBAcGFyYW0ge3N0cmluZ30gJHByaW50QXJlYSAtIOqysOqzvOulvCDstpzroKXtlaAgSFRNTCBFTEVNRU5UXHJcbiAqICBAcGFyYW0ge3N0cmluZ30gcmVkaXJlY3QgLSBhamF4IO2GteyLoCDtm4QgcmVkaXJlY3TtlaAg7KO87IaMXHJcbiAqICBAcGFyYW0ge3N0cmluZ30gYXN5bmMgLSBhamF4IGFzeW5jIOyXrOu2gFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFKYXhTZW5kIHtcclxuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCx1cmwsJHByaW50QXJlYSxyZWRpcmVjdCxhc3luYykge1xyXG4gICAgICAgIHRoaXMubWV0aG9kID0gbWV0aG9kO1xyXG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xyXG4gICAgICAgIHRoaXMuJHByaW50QXJlYSA9ICRwcmludEFyZWE7XHJcbiAgICAgICAgdGhpcy5kYXRhID0ge307XHJcbiAgICAgICAgdGhpcy5zZXRYaHJJbmZvKCk7XHJcbiAgICAgICAgdGhpcy5yZWRpcmVjdCA9IHJlZGlyZWN0O1xyXG4gICAgICAgIHRoaXMuYXN5bmMgPSBhc3luYyB8fCBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcmVkaXJlY3RNZXRob2QocmVkaXJlY3RVUkwpIHtcclxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gcmVkaXJlY3RVUkw7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0WGhySW5mbygpe1xyXG4gICAgICAgIHRoaXMudG9rZW4gPSAkKFwibWV0YVtuYW1lPSdfY3NyZiddXCIpLmF0dHIoXCJjb250ZW50XCIpO1xyXG4gICAgICAgIHRoaXMuaGVhZGVyID0gJChcIm1ldGFbbmFtZT0nX2NzcmZfaGVhZGVyJ11cIikuYXR0cihcImNvbnRlbnRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgYWpheFNlbmQoKXtcclxuICAgICAgICBsZXQgaGVhZGVyID0gdGhpcy5oZWFkZXI7XHJcbiAgICAgICAgbGV0IHRva2VuID0gdGhpcy50b2tlblxyXG4gICAgICAgIGxldCAkcHJpbnRBcmVhID0gdGhpcy4kcHJpbnRBcmVhO1xyXG4gICAgICAgIGxldCByZWRpcmVjdCA9IHRoaXMucmVkaXJlY3Q7XHJcbiAgICAgICAgbGV0IHJlc3VsdFJlcztcclxuICAgICAgICBsZXQgcmVkaXJlY3RNZXRob2QgPSB0aGlzLnJlZGlyZWN0TWV0aG9kO1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9uID0ge1xyXG4gICAgICAgICAgICB1cmw6IHRoaXMudXJsLFxyXG4gICAgICAgICAgICBtZXRob2Q6IHRoaXMubWV0aG9kLFxyXG4gICAgICAgICAgICBkYXRhOiB0aGlzLmRhdGEsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0aGlzLmFzeW5jLFxyXG4gICAgICAgICAgICBwcm9jZXNzRGF0YTogdGhpcy5wcm9jZXNzRGF0YSxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IHRoaXMuY29udGVudFR5cGUsXHJcbiAgICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgdG9rZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkLmFqYXgob3B0aW9uKS5kb25lKGZ1bmN0aW9uIChyZXNwb25zZSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxyXG4gICAgICAgICAgICBpZihyZXNwb25zZS5jb2RlID09IDIwMCB8fCByZXNwb25zZS5zdGF0dXMgPT0gMjAwKXtcclxuICAgICAgICAgICAgICAgIGlmKHJlZGlyZWN0ICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3RNZXRob2QocmVkaXJlY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sMTAwKTsgLy8gMzAwMOuwgOumrOy0iCA9IDPstIhcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRSZXMgPSByZXNwb25zZTtcclxuICAgICAgICAgICAgICAgICRwcmludEFyZWEudGV4dChyZXNwb25zZS5tc2cpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICAgICAgaWYoIXJlc3BvbnNlKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmKHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5lcnJvcnMpe1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBlcnJvciBvZiByZXNwb25zZS5yZXNwb25zZUpTT04uZXJyb3JzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoZXJyb3IuZGVmYXVsdE1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0UmVzO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQge0FKYXhTZW5kfSBmcm9tICcuLi9BamF4L0FqYXhTZW5kLmpzJztcclxuXHJcbi8qKlxyXG4gKiBAZXh0ZW5kcyBBSmF4U2VuZFxyXG4gKi9cclxuY2xhc3MgQ29tbWVudCBleHRlbmRzIEFKYXhTZW5ke1xyXG4gICAgYWRkKGJvYXJkSWQpe1xyXG4gICAgICAgIHN1cGVyLmlzQm9hcmRDb21tZW50ID0gYm9hcmRJZDtcclxuICAgICAgICB0aGlzLmRhdGEgPSB7XHJcbiAgICAgICAgICAgIHRleHQgOiAkKFwiI2NvbW1lbnQtdGV4dFwiKS52YWwoKSxcclxuICAgICAgICAgICAgcGFnZU93bmVyVXNlcm5hbWUgOiBwYWdlT3duZXJVc2VybmFtZSxcclxuICAgICAgICAgICAgYm9hcmRJZCA6IGJvYXJkSWRcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hamF4U2VuZCgpO1xyXG4gICAgfVxyXG4gICAgZGVsZXRlKGlkKXtcclxuICAgICAgICB0aGlzLmRhdGEgPSB7XHJcbiAgICAgICAgICAgIGlkIDogaWRcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hamF4U2VuZCgpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKGlkKXtcclxuICAgICAgICB0aGlzLmRhdGEgPSB7XHJcbiAgICAgICAgICAgIGlkIDogaWQsXHJcbiAgICAgICAgICAgIHRleHQgOiAkKFwiI2NvbW1lbnQtdGV4dC1cIiArIGlkKS52YWwoKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFqYXhTZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVkaXJlY3RNZXRob2QocmVkaXJlY3RVUkwpIHtcclxuICAgICAgICBpZihzdXBlci5pc0JvYXJkQ29tbWVudCl7XHJcbiAgICAgICAgICAgIHN1cGVyLnJlZGlyZWN0TWV0aG9kKHJlZGlyZWN0VVJMKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgIH0sMTAwKTsgLy8gMzAwMOuwgOumrOy0iCA9IDPstIhcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmxldCBjb21tZW50SW5kZXggPSB7XHJcbiAgICB1cmwgOiBcIi9BUEkvY29tbWVudC9cIixcclxuICAgICRwcmludEFyZWEgOiAkKFwiI3ByaW50LXJlc3VsdC1hcmVhXCIpLFxyXG4gICAgcmVkaXJlY3QgOiBcIi4vdHJhY2VcIixcclxuXHJcbiAgICBhZGQoYm9hcmRJZCkge1xyXG4gICAgICAgIGxldCBtZXRob2QgPSBcIlBPU1RcIjtcclxuICAgICAgICByZXR1cm4gbmV3IENvbW1lbnQobWV0aG9kLCB0aGlzLnVybCwgdGhpcy4kcHJpbnRBcmVhLHRoaXMucmVkaXJlY3QpLmFkZChib2FyZElkKTtcclxuICAgIH0sXHJcbiAgICBkZWxldGUoaWQpIHtcclxuICAgICAgICBsZXQgbWV0aG9kID0gXCJERUxFVEVcIjtcclxuICAgICAgICByZXR1cm4gbmV3IENvbW1lbnQobWV0aG9kLCB0aGlzLnVybCwgdGhpcy4kcHJpbnRBcmVhLHRoaXMucmVkaXJlY3QpLmRlbGV0ZShpZCk7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlKGlkKSB7XHJcbiAgICAgICAgbGV0IG1ldGhvZCA9IFwiUEFUQ0hcIjtcclxuICAgICAgICByZXR1cm4gbmV3IENvbW1lbnQobWV0aG9kLCB0aGlzLnVybCwgdGhpcy4kcHJpbnRBcmVhLHRoaXMucmVkaXJlY3QpLnVwZGF0ZShpZCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tbWVudEluZGV4KCl7XHJcbiAgICByZXR1cm4gY29tbWVudEluZGV4O1xyXG59XHJcblxyXG5cclxuXHJcbiIsImltcG9ydCB7RWRpdEFyZWF9IGZyb20gJy4vRWRpdEFyZWEuanMnO1xyXG5cclxuY2xhc3MgQ29tbWVudEVkaXRGcm9udCBleHRlbmRzIEVkaXRBcmVhe1xyXG5cclxufVxyXG5cclxubGV0IGNvbW1lbnRFZGl0RnJvbnRJbmRleCA9IHtcclxuICAgIGdldEVkaXRDb21tZW50KGFyZ3MpIHtcclxuICAgICAgICByZXR1cm4gbmV3IENvbW1lbnRFZGl0RnJvbnQoYXJncyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tbWVudEVkaXRGcm9udEluZGV4KCl7XHJcbiAgICBsZXQgYnRuUGFyZW50ID0gXCJjb21tZW50LWVkaXQtYnRuLVwiO1xyXG4gICAgbGV0IHRleHRJZCA9IFwiY29tbWVudC10ZXh0LVwiO1xyXG4gICAgbGV0IHN1Ym1pdE9uY2xpY2sgPSBcImNvbW1lbnRJbmRleC51cGRhdGUoKTtcIjtcclxuICAgIGxldCBjYW5jZWxPbmNsaWNrID0gXCJmcm9udEVkaXRDb21tZW50SW5kZXgudG9nZ2xlRWRpdCgpO1wiO1xyXG4gICAgbGV0IGFyZ3MgPSB7YnRuUGFyZW50LHRleHRJZCxzdWJtaXRPbmNsaWNrLGNhbmNlbE9uY2xpY2t9O1xyXG4gICAgcmV0dXJuIGNvbW1lbnRFZGl0RnJvbnRJbmRleC5nZXRFZGl0Q29tbWVudChhcmdzKTtcclxufVxyXG5cclxuXHJcblxyXG4iLCJleHBvcnQgY2xhc3MgRWRpdEFyZWEge1xyXG4gICAgLy8gY29uc3RydWN0b3IoJHRleHRBcmVhLCR0ZXh0QXJlYVBhcmVudCwkYnRuUGFyZW50LHRleHRJZCxzdWJtaXRPbmNsaWNrLGNhbmNlbE9uY2xpY2spIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhcmdzKSB7XHJcbiAgICAgICAgaWYoYXJncyl7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGFyZyBpbiBhcmdzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzW2FyZ10gPSBhcmdzW2FyZ107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlRWRpdChpZCl7XHJcbiAgICAgICAgdGhpcy50b2dnbGVUZXh0YXJlYShpZCk7XHJcbiAgICAgICAgdGhpcy50b2dnbGVCdG4oaWQpO1xyXG4gICAgICAgIHRoaXMuZWRpdE1vZGUgPSAhdGhpcy5lZGl0TW9kZTtcclxuICAgIH1cclxuXHJcbiAgICAvL2lk6rCAIHVuZGVm66m0IDDsnLzroZxcclxuICAgIHRvZ2dsZVRleHRhcmVhKGlkKXtcclxuICAgICAgICBpZCA9IGlkID8gaWQgOiAnJztcclxuICAgICAgICBsZXQgdGV4dElkID0gdGhpcy50ZXh0SWQgKyBpZDtcclxuICAgICAgICBsZXQgJHRleHRBcmVhID0gJChcIiNcIit0ZXh0SWQpO1xyXG4gICAgICAgIGxldCB0ZXh0ID0gJHRleHRBcmVhLnRleHQoKTtcclxuICAgICAgICB0ZXh0ID0gdGV4dC5sZW5ndGggPT09IDAgPyBcIlwiIDogdGV4dDtcclxuICAgICAgICBsZXQgaHRtbDtcclxuICAgICAgICBsZXQgcGFyZW50ID0gJHRleHRBcmVhLnBhcmVudCgpO1xyXG5cclxuICAgICAgICBpZighdGhpcy5lZGl0TW9kZSkgaHRtbCA9IGA8dGV4dGFyZWEgaWQ9XCIke3RleHRJZH1cIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHJvdz1cIjVcIiBtYXhsZW5ndGg9XCIxMDAwXCIgc3R5bGU9XCJyZXNpemU6IG5vbmVcIj4ke3RleHR9PC90ZXh0YXJlYT5gO1xyXG4gICAgICAgIGVsc2UgaHRtbCA9IGA8cCBpZD1cIiR7dGV4dElkfVwiPiR7dGV4dH08L3A+YDtcclxuICAgICAgICBwYXJlbnQuaHRtbChodG1sKTtcclxuICAgIH1cclxuXHJcbiAgICAvL2lk6rCAIHVuZGVm66m0IDDsnLzroZxcclxuICAgIHRvZ2dsZUJ0bihpZCl7XHJcbiAgICAgICAgaWQgPSBpZCA/IGlkIDogJyc7XHJcbiAgICAgICAgbGV0IHBhcmVudCA9ICQoXCIjXCIgKyB0aGlzLmJ0blBhcmVudCArIGlkKTtcclxuICAgICAgICBpZighdGhpcy5lZGl0TW9kZSl7XHJcbiAgICAgICAgICAgIGxldCB0bXBTdWJtaXRPbmNsaWNrID0gdGhpcy5zdWJtaXRPbmNsaWNrLnJlcGxhY2UoXCIoKVwiLGAoJHtpZH0pYCk7XHJcbiAgICAgICAgICAgIGxldCB0bXBDYW5jZWxPbmNsaWNrID0gdGhpcy5jYW5jZWxPbmNsaWNrLnJlcGxhY2UoXCIoKVwiLGAoJHtpZH0pYCk7XHJcbiAgICAgICAgICAgIGxldCBzdWJtaXRCdG5IVE1MID0gYDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRhcmsgZmxvYXQtcmlnaHQgbWwtM1wiIG9uY2xpY2s9XCIke3RtcFN1Ym1pdE9uY2xpY2t9XCI+7IiY7KCVPC9idXR0b24+YDtcclxuICAgICAgICAgICAgbGV0IGNhbmNlbEJ0bkhUTUwgPSBgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGFyayBmbG9hdC1yaWdodFwiIG9uY2xpY2s9XCIke3RtcENhbmNlbE9uY2xpY2t9XCI+7Leo7IaMPC9idXR0b24+YDtcclxuICAgICAgICAgICAgcGFyZW50Lmh0bWwoc3VibWl0QnRuSFRNTCArIGNhbmNlbEJ0bkhUTUwpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBwYXJlbnQuaHRtbChcIlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmxldCBlZGl0QXJlYUluZGV4ID0ge1xyXG4gICAgZ2V0RWRpdChhcmdzKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFZGl0QXJlYShhcmdzKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRFZGl0KCR0ZXh0QXJlYSwkdGV4dEFyZWFQYXJlbnQsJGJ0blBhcmVudCx0ZXh0SWQsc3VibWl0T25jbGljayxjYW5jZWxPbmNsaWNrKXtcclxuICAgIHJldHVybiBlZGl0QXJlYUluZGV4LmdldEVkaXQoYXJndW1lbnRzKTtcclxufVxyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQge0VkaXRBcmVhfSBmcm9tICcuL0VkaXRBcmVhLmpzJztcclxuXHJcbmNsYXNzIEVkaXRQcm9maWxlRnJvbnQgZXh0ZW5kcyBFZGl0QXJlYXtcclxuICAgIHRvZ2dsZUltZ0FkZCgpIHtcclxuICAgICAgICBsZXQgaW1nQnRuID0gJChcIiNpbWctYWRkLWJ0blwiKTtcclxuICAgICAgICBpbWdCdG4udG9nZ2xlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlTGluaygpIHtcclxuICAgICAgICBsZXQgbGlua0EgPSBcIiNsaW5rQVwiO1xyXG4gICAgICAgIGxldCBsaW5rQiA9IFwiI2xpbmtCXCI7XHJcbiAgICAgICAgJChsaW5rQSArIFwiLXRleHRcIikudG9nZ2xlKCk7XHJcbiAgICAgICAgJChsaW5rQSArIFwiLWlucHV0LWFyZWFcIikudG9nZ2xlKCk7XHJcbiAgICAgICAgJChsaW5rQiArIFwiLXRleHRcIikudG9nZ2xlKCk7XHJcbiAgICAgICAgJChsaW5rQiArIFwiLWlucHV0LWFyZWFcIikudG9nZ2xlKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZUVkaXQoKXtcclxuICAgICAgICB0aGlzLnRvZ2dsZVRleHRhcmVhKCk7XHJcbiAgICAgICAgdGhpcy50b2dnbGVCdG4oKTtcclxuICAgICAgICB0aGlzLnRvZ2dsZUltZ0FkZCgpO1xyXG4gICAgICAgIHRoaXMudG9nZ2xlTGluaygpO1xyXG4gICAgICAgIHRoaXMuZWRpdE1vZGUgPSAhdGhpcy5lZGl0TW9kZTtcclxuICAgIH1cclxufVxyXG5cclxubGV0IGVkaXRQcm9maWxlSW5kZXggPSB7XHJcbiAgICBnZXRFZGl0UHJvZmlsZShhcmdzKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFZGl0UHJvZmlsZUZyb250KGFyZ3MpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEVkaXRQcm9maWxlRnJvbnRJbmRleCgpe1xyXG4gICAgbGV0IGJ0blBhcmVudCA9IFwiZWRpdC1idG5cIjtcclxuICAgIGxldCB0ZXh0SWQgPSBcInByb2ZpbGUtdGV4dFwiO1xyXG4gICAgbGV0IHN1Ym1pdE9uY2xpY2sgPSBcImVkaXRQcm9maWxlSW5kZXguZWRpdCgpO1wiO1xyXG4gICAgbGV0IGNhbmNlbE9uY2xpY2sgPSBcImZyb250RWRpdFByb2ZpbGVJbmRleC50b2dnbGVFZGl0KCk7XCI7XHJcbiAgICBsZXQgYXJncyA9IHtidG5QYXJlbnQsdGV4dElkLHN1Ym1pdE9uY2xpY2ssY2FuY2VsT25jbGlja307XHJcbiAgICByZXR1cm4gZWRpdFByb2ZpbGVJbmRleC5nZXRFZGl0UHJvZmlsZShhcmdzKTtcclxufVxyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQge0FKYXhTZW5kfSBmcm9tIFwiLi4vQWpheC9BamF4U2VuZC5qc1wiO1xyXG5cclxuY2xhc3MgRWRpdFByb2ZpbGUgZXh0ZW5kcyBBSmF4U2VuZCB7XHJcblxyXG4gICAgZWRpdCgpIHtcclxuICAgICAgICBsZXQgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIGZvcm0uYXBwZW5kKFwiaW1nXCIsICQoXCIjZmlsZS11cGxvYWRcIilbMF0uZmlsZXNbMF0pO1xyXG4gICAgICAgIGZvcm0uYXBwZW5kKFwidGV4dFwiLCAkKFwiI3Byb2ZpbGUtdGV4dFwiKS52YWwoKSk7XHJcbiAgICAgICAgZm9ybS5hcHBlbmQoXCJsaW5rQVwiLCAkKFwiI2xpbmtBLWlucHV0XCIpLnZhbCgpKTtcclxuICAgICAgICBmb3JtLmFwcGVuZChcImxpbmtCXCIsICQoXCIjbGlua0ItaW5wdXRcIikudmFsKCkpO1xyXG5cclxuICAgICAgICB0aGlzLmRhdGEgPSBmb3JtO1xyXG4gICAgICAgIHRoaXMuY29udGVudFR5cGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnByb2Nlc3NEYXRhID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hamF4U2VuZCgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5sZXQgZWRpdFByb2ZpbGVJbmRleCA9IHtcclxuICAgIGdldEVkaXRQcm9maWxlKCkge1xyXG4gICAgICAgIGxldCB1cmwgPSBcIi9BUEkvdHJhY2UvZWRpdFByb2ZpbGVcIjtcclxuICAgICAgICBsZXQgbWV0aG9kID0gXCJQT1NUXCI7XHJcbiAgICAgICAgbGV0IHJlZGlyZWN0ID0gXCIuL3RyYWNlXCI7XHJcbiAgICAgICAgbGV0ICRwcmludEFyZWEgPSAkKFwiI3ByaW50LXJlc3VsdC1hcmVhXCIpO1xyXG4gICAgICAgIHJldHVybiBuZXcgRWRpdFByb2ZpbGUobWV0aG9kLCB1cmwsJHByaW50QXJlYSxyZWRpcmVjdCxmYWxzZSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWRpdFByb2ZpbGUoKXtcclxuICAgIHJldHVybiBlZGl0UHJvZmlsZUluZGV4LmdldEVkaXRQcm9maWxlKCk7XHJcbn1cclxuXHJcblxyXG5cclxuIiwiaW1wb3J0IHtBSmF4U2VuZH0gZnJvbSAnLi4vQWpheC9BamF4U2VuZC5qcyc7XHJcblxyXG4vKipcclxuICogQGV4dGVuZHMgQUpheFNlbmRcclxuICovXHJcbmNsYXNzIFRyYWNlQ2hlY2sgZXh0ZW5kcyBBSmF4U2VuZHtcclxuICAgIGNoZWNrKGlkKXtcclxuICAgICAgICB0aGlzLmRhdGEgPSB7XHJcbiAgICAgICAgICAgIGlkOiBpZFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRhdGEuY2F1c2UgPSAkKFwiI3RvZG8tbW9kYWwtXCIgKyBpZCkudmFsKCk7XHJcbiAgICAgICAgdGhpcy5hamF4U2VuZCgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5sZXQgdHJhY2VDaGVja0luZm8gPSB7XHJcbiAgICBnZXRUcmFjZUNoZWNrKCkge1xyXG4gICAgICAgIGxldCB1cmwgPSBcIi9BUEkvdHJhY2UvY2hlY2tcIjtcclxuICAgICAgICBsZXQgbWV0aG9kID0gXCJQQVRDSFwiO1xyXG4gICAgICAgIGxldCAkcHJpbnRBcmVhID0gJChcIiNwcmludC1yZXN1bHQtYXJlYVwiKTtcclxuICAgICAgICBsZXQgcmVkaXJlY3QgPSBcIi4vdHJhY2VcIjtcclxuICAgICAgICByZXR1cm4gbmV3IFRyYWNlQ2hlY2sobWV0aG9kLCB1cmwsICRwcmludEFyZWEscmVkaXJlY3QpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYWNlQ2hlY2soKXtcclxuICAgIHJldHVybiB0cmFjZUNoZWNrSW5mby5nZXRUcmFjZUNoZWNrKCk7XHJcbn1cclxuXHJcblxyXG5cclxuIiwiaW1wb3J0IHtBSmF4U2VuZH0gZnJvbSAnLi4vQWpheC9BamF4U2VuZC5qcyc7XHJcblxyXG4vKipcclxuICogQGV4dGVuZHMgQUpheFNlbmRcclxuICovXHJcbmNsYXNzIFRyYWNlUmVtb3ZlIGV4dGVuZHMgQUpheFNlbmR7XHJcbiAgICByZW1vdmUobW9kZSxpZCl7XHJcbiAgICAgICAgdGhpcy5kYXRhID0ge1xyXG4gICAgICAgICAgICBtb2RlOiBtb2RlLFxyXG4gICAgICAgICAgICBpZDogaWRcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobW9kZSAhPSAtMSl7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5jYXVzZSA9ICQoXCIjdG9kby1tb2RhbC1cIiArIGlkKS52YWwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYWpheFNlbmQoKTtcclxuICAgIH1cclxufVxyXG5cclxubGV0IHRyYWNlUmVtb3ZlSW5mbyA9IHtcclxuICAgIGdldFRyYWNlUmVtb3ZlKCkge1xyXG4gICAgICAgIGxldCB1cmwgPSBcIi9BUEkvdHJhY2UvXCI7XHJcbiAgICAgICAgbGV0IG1ldGhvZCA9IFwiREVMRVRFXCI7XHJcbiAgICAgICAgbGV0ICRwcmludEFyZWEgPSAkKFwiI3ByaW50LXJlc3VsdC1hcmVhXCIpO1xyXG4gICAgICAgIGxldCByZWRpcmVjdCA9IFwiLi90cmFjZVwiO1xyXG4gICAgICAgIHJldHVybiBuZXcgVHJhY2VSZW1vdmUobWV0aG9kLCB1cmwsICRwcmludEFyZWEscmVkaXJlY3QpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYWNlUmVtb3ZlKCl7XHJcbiAgICByZXR1cm4gdHJhY2VSZW1vdmVJbmZvLmdldFRyYWNlUmVtb3ZlKCk7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQge0FKYXhTZW5kfSBmcm9tICcuLi9BamF4L0FqYXhTZW5kLmpzJztcclxuXHJcbi8qKlxyXG4gKiBAZXh0ZW5kcyBBSmF4U2VuZFxyXG4gKi9cclxuY2xhc3MgRm9sbG93IGV4dGVuZHMgQUpheFNlbmR7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBsZXQgdXJsID0gXCIvQVBJL2ZvbGxvdy9cIjtcclxuICAgICAgICBsZXQgbWV0aG9kID0gXCJERUxFVEVcIjtcclxuICAgICAgICBsZXQgJHByaW50QXJlYSA9ICQoXCIjcHJpbnQtcmVzdWx0LWFyZWFcIik7XHJcbiAgICAgICAgc3VwZXIobWV0aG9kLHVybCwkcHJpbnRBcmVhLGxvY2F0aW9uLmhyZWYpO1xyXG4gICAgfVxyXG59XHJcblxyXG5sZXQgZm9sbG93SW5kZXggPSB7XHJcbiAgICBmb2xsb3dJbmRleCA6IG5ldyBGb2xsb3coKSxcclxuXHJcbiAgICBzZXRNZXRob2QobW9kZSl7XHJcbiAgICAgICAgaWYobW9kZSA9PT0gMSl7XHJcbiAgICAgICAgICAgIHRoaXMuZm9sbG93SW5kZXgubWV0aG9kID0gXCJQT1NUXCI7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuZm9sbG93SW5kZXgubWV0aG9kID0gXCJERUxFVEVcIjtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGFkZChvd25lcil7XHJcbiAgICAgICAgdGhpcy5zZXRNZXRob2QoMSk7XHJcbiAgICAgICAgdGhpcy5mb2xsb3dJbmRleC5kYXRhID0ge29ialVzZXJuYW1lIDogb3duZXJ9O1xyXG4gICAgICAgIHRoaXMuZm9sbG93SW5kZXguYWpheFNlbmQoKTtcclxuICAgICAgICB0aGlzLmNoYW5nZUZvbGxvd0J0bk1vZGUoMSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGRlbGV0ZShvd25lcil7XHJcbiAgICAgICAgdGhpcy5zZXRNZXRob2QoMCk7XHJcbiAgICAgICAgdGhpcy5mb2xsb3dJbmRleC5kYXRhID0ge29ialVzZXJuYW1lIDogb3duZXJ9O1xyXG4gICAgICAgIHRoaXMuZm9sbG93SW5kZXguYWpheFNlbmQoKTtcclxuICAgICAgICB0aGlzLmNoYW5nZUZvbGxvd0J0bk1vZGUoMCk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBjaGFuZ2VGb2xsb3dCdG5Nb2RlKG1vZGUpIHtcclxuICAgICAgICBsZXQgJGJ0biA9ICQoXCIjZm9sbG93aW5nLWJ0blwiKTtcclxuICAgICAgICAkYnRuLnZhbCghbW9kZSArIDApO1xyXG4gICAgfVxyXG59O1xyXG5cclxubGV0IGZvbGxvdyA9IGZ1bmN0aW9uIChtb2RlLG93bmVyKXtcclxuICAgIGlmKG1vZGUgPT09IFwiMVwiKXtcclxuICAgICAgICBmb2xsb3dJbmRleC5hZGQob3duZXIpO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgZm9sbG93SW5kZXguZGVsZXRlKG93bmVyKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZvbGxvdygpe1xyXG4gICAgcmV0dXJuIGZvbGxvdztcclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtnZXRUcmFjZVJlbW92ZX0gZnJvbSBcIi4vVHJhY2UvVHJhY2VSZW1vdmUuanNcIjtcclxuaW1wb3J0IHtnZXRGb2xsb3d9IGZyb20gXCIuL1VzZXIvZm9sbG93LmpzXCI7XHJcbmltcG9ydCB7Z2V0VHJhY2VDaGVja30gZnJvbSBcIi4vVHJhY2UvVHJhY2VDaGVjay5qc1wiO1xyXG5pbXBvcnQge2dldEVkaXRQcm9maWxlfSBmcm9tIFwiLi9UcmFjZS9FZGl0UHJvZmlsZS5qc1wiO1xyXG5pbXBvcnQge2dldEVkaXRQcm9maWxlRnJvbnRJbmRleH0gZnJvbSBcIi4vRnJvbnQvRWRpdFByb2ZpbGVGcm9udC5qc1wiO1xyXG5pbXBvcnQge2dldENvbW1lbnRJbmRleH0gZnJvbSBcIi4vQ29tbWVudC9Db21tZW50LmpzXCI7XHJcbmltcG9ydCB7Z2V0Q29tbWVudEVkaXRGcm9udEluZGV4fSBmcm9tIFwiLi9Gcm9udC9Db21tZW50RWRpdEZyb250LmpzXCI7XHJcblxyXG50cmFjZVJlbW92ZUluZGV4ID0gZ2V0VHJhY2VSZW1vdmUoKTtcclxuZm9sbG93aW5nID0gZ2V0Rm9sbG93KCk7XHJcbnRyYWNlQ2hlY2sgPSBnZXRUcmFjZUNoZWNrKCk7XHJcbmVkaXRQcm9maWxlSW5kZXggPSBnZXRFZGl0UHJvZmlsZSgpO1xyXG5lZGl0UHJvZmlsZUZyb250SW5kZXggPSBnZXRFZGl0UHJvZmlsZUZyb250SW5kZXgoKTtcclxuY29tbWVudEluZGV4ID0gZ2V0Q29tbWVudEluZGV4KCk7XHJcbmNvbW1lbnRFZGl0RnJvbnRJbmRleCA9IGdldENvbW1lbnRFZGl0RnJvbnRJbmRleCgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==