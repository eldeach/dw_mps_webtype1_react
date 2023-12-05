// ======================================================================================== [Import Libaray]
import cookies from 'react-cookies';

// ======================================================================================== [Import Material UI Libaray]

//icon
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import InfoIcon from '@mui/icons-material/Info';

// ======================================================================================== [Import Component] js


// ======================================================================================== [Import Component] CSS

function NoCardVeiw () {

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
                <SentimentVeryDissatisfiedIcon color='sys1' sx={{fontSize:'60px'}}/>
            </div>
            <div style={style.descriptionBox}>
                <InfoIcon color = 'sys1' fontSize="medium"/>
                <p style={style.description}>{{ kor : "현재 화면에는 카드뷰 화면이 없습니다." , eng : "There is no card view screen on the current display."}[cookies.load('site-lang')]}</p>
            </div>
        </div>
    )

}

export default NoCardVeiw;