
var interestList = new Set();


function interestRangeCheck(){
    if(interestList.size === 3){
        alert("관심사는 최대 3개만 선택해주세요");
        return false;
    }
    return true;
}

//최대 3개
//중복 못선택하게
function interestAddManage(select,id){
    if(!id) id = 0;
    if(!interestRangeCheck()) return false;
    let interestArea = $("#interest-area-" + id);
    let selectedElement = select.options[select.selectedIndex];
    let elementHTML = `<button class='selected-interest-${id} btn btn-dark' value='${selectedElement.value}' onclick='interestDeleteManage(${selectedElement.value},${id})'>${selectedElement.text}  ⨉</button>`;
    if(selectedElement.value === "-1") return false;

    interestArea.append(elementHTML);
    interestList.add(selectedElement.value);
    //disabled 활성화
    $(`.interest-select-${id} > option[value=${selectedElement.value}]`).attr("disabled",true);

}


function interestDeleteManage(idx,id){
    interestList.delete(idx + "");
    //버튼 삭제
    $(`.selected-interest-${id}[value=${idx}]`).remove();
    //관심사 선택으로 초기화하기(이미 선택한 option을 다시 선택할 수 없는 문제에 대한 해결책)
    $(`.interest-select > option[value='-1']`).prop("selected",true);
    //disabled 비활성화
    $(`.interest-select > option[value=${idx}]`).attr("disabled",false);
}

function addInterestIntoForm(){
    let formArea = $(".form-group").first();
    for (const interestIdx of interestList) {
        let interestInputHTML = `<input hidden type="number" value="${interestIdx}" name="interestList">`;
        formArea.append(interestInputHTML);
    }


}

function convertInterestToList(){
    let tmp = new Array();
    for (const interestIdx of interestList) {
        tmp.push(Number(interestIdx));
    }

    return tmp;
}
