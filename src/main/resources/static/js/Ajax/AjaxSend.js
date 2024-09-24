/**
 *  @class
 *  @param {string} method - 통신에 사용될 HTML method
 *  @param {string} url - 통신할 url
 *  @param {string} $printArea - 결과를 출력할 HTML ELEMENT
 *  @param {string} redirect - ajax 통신 후 redirect할 주소
 *  @param {string} async - ajax async 여부
 */
export class AJaxSend {
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






