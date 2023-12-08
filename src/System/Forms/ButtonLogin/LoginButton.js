// ======================================================================================== [Import Libaray]
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import axios from 'axios';
import cookies from 'react-cookies'
import * as yup from 'yup';

// ======================================================================================== [Import Material UI Libaray]
import { Button, Modal, Paper, TextField } from '@mui/material';
//icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// ======================================================================================== [Import Component] js
import loginButtonLang from './loginButtonLang'
import SessionTimer from './Component/SessionTimer'

// ======================================================================================== [Import Component] CSS

function LoginButton(){
    
    const style = {
        subtitle:{
            box : {
                display:'flex', flexDirection:'column', alignItems:'center', fontSize:'medium'
            },
            text : {
                fontSize : '20px', marginTop:'4px', marginLeft:'2px'
            }
        },
        popupPaper : {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: 24,
            p: 2,
        },
        inputTexstField : {
            fontSize: 14,
            paddingRight:0
        },
        button : {
            submitButton : {
                width:534,
            },
        }

    }

    const yupSchema = yup.object().shape({
        user_account: yup.string()
        .required(loginButtonLang.loginForm.inputField.user_account.valMsg.required[cookies.load('site-lang')]),
    
        user_pw: yup.string()
        .required(loginButtonLang.loginForm.inputField.user_pw.valMsg.required[cookies.load('site-lang')])
      });

      const initialValues = {
        user_account: '',
        user_pw:'',
    }

    const [popup,setPopup] = useState(0);
    const handleModalClose = () => setPopup(0);

    const [loginStatus,setLoginStatus] = useState (false);
    const [expireTimeMin, setExpireTimeMin] = useState (0)
    const [expireTimeSec, setExpireTimeSec] = useState (0)
    
    const loginStatusUpdate = (expireTime) => {
        setLoginStatus (true)
        setExpireTimeMin(Math.floor( expireTime / 1 ))
        setExpireTimeSec(Math.round(( expireTime % 1 ) * 60))
    }
    const loginStatusExpired = () => {
        setLoginStatus (false)
        setExpireTimeMin(0)
        setExpireTimeSec(0)
    }

    const onSubmitFunc = async function (values, actions){
        await axios.post('/local-login' , values)
        .then((res) => {
            if (res.status === 200){
                console.log(res.data)
                loginStatusUpdate(res.data.expireTimeMinutes)
            }
            else {

            }
        })
        .catch((error) => {
            if (error.response.status === 452){
                console.log(error.response.data)
            }
            else {
                console.log("알수 없는 에러")
                console.log(error)
            }
            loginStatusExpired()
        })
        .finally(()=>{
            handleModalClose();
        })
    }


    const navigate = useNavigate();

    const logoutFunc = async function () {
        await axios.get("/local-logout")
        .then((res) => {
            loginStatusExpired()
            navigate('/sessionexpired')
        })
        .catch((err) => console.log(err))
    }

    

    const sessioncheck = async function () {
        await axios.get('/sessioncheck')
        .then((res) => {
            if (res.status === 200){
                console.log(res.data)
                loginStatusUpdate(res.data.expireTimeMinutes)
            }
            else {

            }
        })
        .catch((error) => {
            if (error.response.status === 452){
                console.log(error.response.data)
            }
            else {
                console.log("알수 없는 에러")
                console.log(error)
            }
            loginStatusExpired()
        })
    }

    useEffect(() => {
        sessioncheck()
    }, [])

    return (
        <div style = {{display : 'flex', flexDirection : 'row'}}>
            <Button variant="outlined" color = "white" size="small" onClick={()=>{ loginStatus ? logoutFunc() : setPopup(1) }}>
                {loginStatus ? loginButtonLang.displayedButton.logout[cookies.load('site-lang')] : loginButtonLang.displayedButton.login[cookies.load('site-lang')]}
            </Button>
            {
                ( expireTimeMin + expireTimeSec + loginStatus ) === 0 ? <div/> : 
                <div style = {{width: '64px', display : 'flex', justifyContent : 'center', alignItems: 'center', marginLeft : '10px', borderRadius : '5px', boxSizing : 'border-box', border : ( expireTimeMin === 0 ? ( expireTimeSec < 30 ? 'red solid 0.5px' : '#98B9F4 solid 1px' ) : '#98B9F4 solid 1px' )}}>
                    <SessionTimer expireTimeMin = { expireTimeMin } expireTimeSec = { expireTimeSec } setExpireTimeMin = { setExpireTimeMin } setExpireTimeSec = { setExpireTimeSec } loginStatus = { loginStatus } setLoginStatus = { setLoginStatus }/>
                </div>
            }
            <Modal open={( popup === 1 )} onClose={ handleModalClose }>
                <Paper sx={style.popupPaper} elevation={3}>
                    <div className = "popup-close-button-box"><button className='popup-close-button' onClick={handleModalClose}>X</button></div>
                    <Formik
                        validationSchema={yupSchema}
                        initialValues={initialValues}
                        onSubmit={async (values, actions)=>{
                            await onSubmitFunc(values, actions)
                        }}
                        >
                            {formikProps => (
                                <form
                                noValidate
                                style={{width:'350px', hegith:'240px', display:'flex', flexDirection:'column'}}
                                id = "loginForm"
                                autoComplete='off'
                                onSubmit={formikProps.handleSubmit}
                                >
                                    <div>
                                        <div style={style.subtitle.box}>
                                            <AccountCircleIcon color='sys1' sx={{fontSize : 'xx-large'}}/>
                                            <div style={style.subtitle.text}>{loginButtonLang.displayedButton.login[cookies.load('site-lang')]}</div>
                                        </div>
                                        <TextField
                                        required
                                        variant="outlined"
                                        id="user_account"
                                        name="user_account"
                                        label={loginButtonLang.loginForm.inputField.user_account.placeholder[cookies.load('site-lang')]}
                                        value={formikProps.values.user_account}
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur}
                                        helperText={formikProps.touched.user_account ? formikProps.errors.user_account : ""}
                                        error={formikProps.touched.user_account && Boolean(formikProps.errors.user_account)}
                                        size='small'
                                        margin="dense"
                                        fullWidth
                                        inputProps={{style: style.inputTexstField}} // font size of input text
                                        InputLabelProps={{style: style.inputTexstField}} // font size of input label
                                        />
                                        <TextField
                                        required
                                        variant="outlined"
                                        id="user_pw"
                                        name="user_pw"
                                        label={loginButtonLang.loginForm.inputField.user_pw.placeholder[cookies.load('site-lang')]}
                                        type="password"
                                        value={formikProps.values.user_pw}
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur}
                                        helperText={formikProps.touched.user_pw ? formikProps.errors.user_pw : ""}
                                        error={formikProps.touched.user_pw && Boolean(formikProps.errors.user_pw)}
                                        size='small'
                                        margin="dense"
                                        fullWidth
                                        inputProps={{style: style.inputTexstField}} // font size of input text
                                        InputLabelProps={{style: style.inputTexstField}} // font size of input label
                                        />
                                    </div>
                                    <Button sx={{mt:1}} color='sys1' fullWidth variant="contained" size='small' type="submit" form="loginForm">{loginButtonLang.loginForm.button.submit[cookies.load('site-lang')]}</Button>
                                </form>
                            )}
                    </Formik>
                </Paper>
          </Modal>  
        </div>
    )
}

export default LoginButton;