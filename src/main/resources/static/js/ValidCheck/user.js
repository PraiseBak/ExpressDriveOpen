
let auth = {
    validInputCheckArr : [false,false,false],
    existsCheckArr : [true,true,false],

    signup()
    {
        if(interestList.size !== 3){
            alert("관심사를 3개 선택해주세요!");
            return false;
        }

        for(let i=0;i<this.validInputCheckArr.length;i++){
            if(!this.validInputCheckArr[i] || this.existsCheckArr[i]){
                return false;
            }
        }

        addInterestIntoForm();
        return true;
    }
};
