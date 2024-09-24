

 /** 유저의 중복 체크를 위한 추상 클래스
 * @class
 * @param {string} parentDivId  - 체크할 요소에 감싸진 div요소 id
 * @param {string} failMsg - 실패했을 시 출력할 메시지
 * @param {string} successMsg - 성공했을 시 출력할 메시지
 * @param {int} mode - 0:유저네임 1:이메일
*  @param {string} regex - 유저 유효성 체크를 위한 정규표현식
 */
 class ValidCheck {
    constructor(parentDivId, failMsg, successMsg, mode,regex) {
        this.$inputDiv = $("#" + parentDivId);
        this.$input = this.$inputDiv.children('input');
        this.$msg = this.$inputDiv.children('p');
        this.mode = mode;
        this.successMsg = successMsg;
        this.failMsg = failMsg;
        this.regex = regex;
    }
}

 /**
  * @extends ValidCheck
  */
 class UserValidCheck extends ValidCheck {
    checkValid() {
        if (!this.regex.test(this.$input.val())) {
            this.$msg.text(this.failMsg);
            auth.validInputCheckArr[this.mode] = false;
            return false;
        } else {
            this.$msg.text("");
            auth.validInputCheckArr[this.mode] = true;
            return true;
        }
    }
}

 /**
  * @extends ValidCheck
  */
 class UserDuplicateCheck extends ValidCheck {
    constructor(... args) {
        super(... args);
        this.data = {};
    }

    getExists(){
        let exists = true;
        $.ajax({
            url: "/API/user/existsUserInfo",
            method: "GET",
            data: this.data,
            //async : 비동기란 뜻
            async: false,
        }).done(function (result) {
            exists = result;
        });

        return exists;
    }

    checkExists() {
        if (this.mode === 0) this.data.username = this.$input.val();
        else this.data.email = this.$input.val();

        if(this.getExists()) {
            auth.existsCheckArr[this.mode] = true;
            this.$msg.text(this.failMsg);
        }else{
            auth.existsCheckArr[this.mode] = false;
            this.$msg.text(this.successMsg);
        }
        console.log(auth);
    }

}

