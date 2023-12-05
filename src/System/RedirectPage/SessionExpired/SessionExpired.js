// ======================================================================================== [Import Libaray]
import cookies from 'react-cookies'

// ======================================================================================== [Import Material UI Libaray]
import { Button } from '@mui/material';
// icon
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import InfoIcon from '@mui/icons-material/Info';

// ======================================================================================== [Import Component] js
import sessionExpiredLang from './sessionExpiredLang'
import { useNavigate } from 'react-router-dom';

// ======================================================================================== [Import Component] CSS


function SessionExpired(){
    const style = {
        subtitle:{
            box : {
                display:'flex', flexDirection:'column', alignItems:'center', fontSize:'medium',marginTop:'200px'
            },
            text : {
                fontSize : '20px', marginTop:'4px', marginLeft:'2px'
            }
        },
        descriptionBox : {
            marginTop:'20px',
            marginBottom : '46px',
            boxSizing : 'border-box',
            fontSzie : 'small',
            color : 'orange',
            whiteSpace : 'pre-wrap',
            worWrap : 'break-word',
            textAlign : 'center',
            flexGrow : 1
        },
        description : {
            marginTop : '0px',
            marginBottom : '6px',
        },
    }

    return (
        <div id='sessionExpiredMsgPage'>
            <div style={style.subtitle.box}>
                <MeetingRoomIcon color='sys1' sx={{fontSize:'60px'}}/>
                <div style={style.subtitle.text}>{sessionExpiredLang.sessionExpiredMsgPage.pageTitle[cookies.load('site-lang')]}</div>
            </div>
            <div style={style.descriptionBox}>
                <InfoIcon color = 'sys1' fontSize="medium"/>
                <p style={style.description}>{sessionExpiredLang.sessionExpiredMsgPage.text.p1[cookies.load('site-lang')]}</p>
                <p style={style.description}>{sessionExpiredLang.sessionExpiredMsgPage.text.p2[cookies.load('site-lang')]}</p>
            </div>
            <div style ={{widht: '100%', textAlign : 'center'}}>
                <Button sx={{ mt:1 }} color = 'sys1' variant="contained" size='small' href = { '/' } >{ sessionExpiredLang.sessionExpiredMsgPage.returnButton[cookies.load('site-lang')] }</Button>
            </div>
        </div>
    )
}

export default SessionExpired;