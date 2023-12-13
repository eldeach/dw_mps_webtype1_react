// ======================================================================================== [Import Libaray]
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ======================================================================================== [Import Material UI Libaray]

//icon

// ======================================================================================== [Import Component] js


// ======================================================================================== [Import Component] CSS


function SessionTimer (props) { 

    const nevigate = useNavigate();

    useEffect(() => {
        const countdown = setInterval(() => {
            if ( parseInt( props.expireTimeSec ) > 0 ) {
                let updateSec =  parseInt( props.expireTimeSec )  - 1
                props.setExpireTimeSec( updateSec )
            }

            if ( parseInt( props.expireTimeSec ) === 0 ) {
                if ( parseInt( props.expireTimeMin ) === 0 ) {
                    // 여기에 clearInterval을 넣으면 숫자가 정신을 못차림, 이유는 모르겠음
                    props.setLoginStatus ( false )
                    nevigate('/sessionexpired')
                } else {
                    let updateMin =  parseInt( props.expireTimeMin )  - 1
                    props.setExpireTimeMin ( updateMin )
                    props.setExpireTimeSec ( 59 )
                }
            }
        }, 1000)
        return () => clearInterval(countdown);
    },[][props.expireTimeMin, props.expireTimeSec])

    return (
        <div style={{ color : ( props.expireTimeMin === 0 ? ( props.expireTimeSec < 30 ? 'red' : 'white' ) : 'white' )}}>{props.expireTimeMin < 10 ? `0${props.expireTimeMin}` : props.expireTimeMin} : {props.expireTimeSec < 10 ? `0${props.expireTimeSec}` : props.expireTimeSec}</div>
    )
}

export default SessionTimer;