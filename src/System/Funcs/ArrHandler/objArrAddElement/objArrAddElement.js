// ======================================================================================== [Import Libaray]
import cookies from 'react-cookies'

// ======================================================================================== [Import Component] js
import objArrAddElementLang from './objArrAddElementLang'

const objArrAddElement = function (arr, newElement, pkStr) {
    let duplication = 0
    let tempArr = [...arr];

    if ( pkStr ) { // 내부에 객체가 요소이고 그 객체에 PK로 사용할만한 key가 있는 경우 pkStr 인자를 넣어주면 작동함
        tempArr.map((oneItem, index) => {
            if(oneItem[pkStr] === newElement[pkStr]){
                duplication += 1;
                alert(objArrAddElementLang.alertMsg.pkDuplicated[cookies.load('site-lang')].concat(pkStr+" : "+newElement[pkStr]+" )"))
            }
        })
    }

    if (duplication === 0){
        tempArr.push(newElement);
    }
    else {
        
    }
    console.log(tempArr)
    return tempArr;
};

export default objArrAddElement;