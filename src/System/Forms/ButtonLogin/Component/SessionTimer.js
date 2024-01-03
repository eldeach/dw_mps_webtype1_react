// ======================================================================================== [Import Libaray]
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from 'moment/moment';

// ======================================================================================== [Import Material UI Libaray]

//icon

// ======================================================================================== [Import Component] js


// ======================================================================================== [Import Component] CSS


function SessionTimer (props) { 

    const navigate = useNavigate();

    useEffect(() => {
        
        const countdown = setInterval(() => {
            let remainedTotalSec = moment().diff(props.expireDateTime, 'seconds') * (-1)
            let remainedMin = moment().diff(props.expireDateTime, 'minutes') * (-1)
            let remainedSec = remainedTotalSec - (remainedMin * 60)

            if ( parseInt( remainedTotalSec ) < 0 ) {
                // 여기에 clearInterval을 넣으면 숫자가 정신을 못차림, 이유는 모르겠음
                props.setLoginStatus ( false )
                props.setExpireTimeMin ( 0 )
                props.setExpireTimeSec ( 0 )
                navigate('/sessionexpired')
            } else {
                props.setExpireTimeMin ( remainedMin )
                props.setExpireTimeSec ( remainedSec )
            }
        }, 500)
        return () => clearInterval(countdown);
    },[][props.expireTimeMin, props.expireTimeSec])

    return (
        <div style={{ color : ( props.expireTimeMin === 0 ? ( props.expireTimeSec < 30 ? 'red' : 'white' ) : 'white' )}}>{props.expireTimeMin < 10 ? `0${props.expireTimeMin}` : props.expireTimeMin} : {props.expireTimeSec < 10 ? `0${props.expireTimeSec}` : props.expireTimeSec}</div>
    )
}

export default SessionTimer;