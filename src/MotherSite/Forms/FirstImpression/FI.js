// ======================================================================================== [Import Libaray]
import { useEffect } from 'react';
import cookies from 'react-cookies'

// ======================================================================================== [Import Material UI Libaray]
//icon


// ======================================================================================== [Import Component] js


// ======================================================================================== [Import Component] CSS


function FI(props) {
    const { handlePageTitle, handleSystemCode } = props

    useEffect(()=>{
        if(!{kor : '환영합니다', eng : 'Welcome'}[cookies.load('site-lang')]){
            handlePageTitle('Welcome')
        } else {
            handlePageTitle(`${{kor : '환영합니다', eng : 'Welcome'}[cookies.load('site-lang')]}`)
        }
        handleSystemCode('sys1')
    },[])
    return(
        <div/>
    )
}

export default FI;