// ======================================================================================== [Import Libaray]
import cookies from 'react-cookies'

// ======================================================================================== [Import Material UI Libaray]
import { Button } from '@mui/material';
// icon

import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import InfoIcon from '@mui/icons-material/Info';


// ======================================================================================== [Import Component] js
import submitSuccessLang from './submitSuccessLang'

// ======================================================================================== [Import Component] CSS

function NoAuthPage(){
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
                <DoneOutlineIcon color='submitted' sx={{fontSize:'60px'}}/>
                <div style={style.subtitle.text}>{submitSuccessLang.sessionExpiredMsgPage.pageTitle[cookies.load('site-lang')]}</div>
            </div>
            <div style={style.descriptionBox}>
                <InfoIcon color = 'sys1' fontSize="medium"/>
                <p style={style.description}>{submitSuccessLang.sessionExpiredMsgPage.text.p1[cookies.load('site-lang')]}</p>
            </div>
            <div style ={{widht: '100%', textAlign : 'center'}}>
                <Button sx={{ mt:1 }} color = 'sys1' variant="contained" size='small' href = { '/' } >{ submitSuccessLang.sessionExpiredMsgPage.returnButton[cookies.load('site-lang')] }</Button>
            </div>
        </div>
    )
}

export default NoAuthPage;