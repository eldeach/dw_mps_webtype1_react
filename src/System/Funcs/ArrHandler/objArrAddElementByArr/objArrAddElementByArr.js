// ======================================================================================== [Import Libaray]
import cookies from 'react-cookies'

// ======================================================================================== [Import Component] js
import objArrAddElementByArrLang from './objArrAddElementByArrLang'

const objArrAddElementByArr = function (arr, newElementByArr, pkStr) {
    
    let duplication = 0
    let tempArr = [...arr];
    let newTempArr = []

    if ( pkStr ) { // 내부에 객체가 요소이고 그 객체에 PK로 사용할만한 key가 있는 경우 pkStr 인자를 넣어주면 작동함
        newElementByArr.map((oneSelect, osIndex) => {
            tempArr.map((oneItem, index) => {
                if(oneItem[pkStr] === oneSelect[pkStr]){
                    duplication += 1;
                    alert(objArrAddElementByArrLang.alertMsg.pkDuplicated[cookies.load('site-lang')].concat(pkStr+" : "+oneSelect[pkStr]+" )"))
                }
            })
            if (duplication === 0) {
                tempArr.push(oneSelect)
            }
            duplication =0
        })
    }

    return tempArr;
};

export default objArrAddElementByArr;