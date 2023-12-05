// ======================================================================================== [Import Libaray]
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import axios from 'axios';
import cookies from 'react-cookies'
import * as yup from 'yup';

// ======================================================================================== [Import Material UI Libaray]
import { Button, IconButton, Modal, Paper, TextField } from '@mui/material';
//icon
import DrawIcon from '@mui/icons-material/Draw';

// ======================================================================================== [Import Component] js
import withdrawElecSignLang from './withdrawElecSignLang'

// ======================================================================================== [Import Component] CSS

function LoginButton(props){
    
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
        .required(withdrawElecSignLang.elecSignForm.inputField.user_account.valMsg.required[cookies.load('site-lang')]),
    
        user_pw: yup.string()
        .required(withdrawElecSignLang.elecSignForm.inputField.user_pw.valMsg.required[cookies.load('site-lang')])
      });

      const initialValues = {
        user_account: '',
        user_pw:'',
    }

    const [popup,setPopup] = useState(0);
    const handleModalClose = () => setPopup(0);

 
    const [chosenApproval, setChosenApproval] = useState(0);

    const onSubmitFunc = async function (values, actions){
        const valuePayload = {
            user_account : values.user_account, // 이 form에서 가져옴
            user_pw : values.user_pw, // 이 form에서 가져옴
            approval_payload_id : props.oneItem.approval_payload_id, // 승인할 데이터는 항상 이 값이 있어야함.
            tbl_name : props.oneItem.tbl_name // 승인할 데이터는 항상 이 값이 있어야함.
        }

        let rs = await axios.put("/withdrawelecsign",valuePayload)
        .then(( res ) => {
            console.log(res.data)
            alert(res.data[cookies.load('site-lang')])
            handleModalClose()
            return res
        })
        .catch( (error) => {
            console.log(error.response)
             alert(error.response.data[cookies.load('site-lang')])
             return error.response
         })         
    }

    useEffect(() => {

    }, [])

    return (
        <div style = {{display : 'flex', flexDirection : 'row', justifyContent : 'center'}}>
            {
                props.oneItem.approval_status === 'PREPARED' ?
                <IconButton size = "small" edge = "end" color = 'sys1' sx = {{  m : 0, p : 0 }} onClick={()=> setPopup(1) }><DrawIcon/></IconButton>
                :<div/>
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
                                id = "withdrawElecSignForm"
                                autoComplete='off'
                                onSubmit={formikProps.handleSubmit}
                                >
                                    <div>
                                        <div style={style.subtitle.box}>
                                            <DrawIcon color='sys1' sx={{fontSize : 'xx-large'}}/>
                                            <div style={style.subtitle.text}>{withdrawElecSignLang.displayedButton.elecSign[cookies.load('site-lang')]}</div>
                                        </div>
                                        <TextField
                                        required
                                        variant="outlined"
                                        id="user_account"
                                        name="user_account"
                                        label={withdrawElecSignLang.elecSignForm.inputField.user_account.placeholder[cookies.load('site-lang')]}
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
                                        label={withdrawElecSignLang.elecSignForm.inputField.user_pw.placeholder[cookies.load('site-lang')]}
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
                                    <Button id='submit' sx={{mt:1}} fullWidth variant="contained" size='small' color = 'sys1' type='submit' form='withdrawElecSignForm' >{withdrawElecSignLang.elecSignForm.button.submit[cookies.load('site-lang')]}</Button>
                                </form>
                            )}
                    </Formik>
                </Paper>
          </Modal>  
        </div>
    )
}

export default LoginButton;