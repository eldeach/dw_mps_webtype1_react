// ======================================================================================== [Import Libaray]
import { useState } from 'react';
import { Formik } from 'formik';
import cookies from 'react-cookies'
import * as yup from 'yup';

// ======================================================================================== [Import Material UI Libaray]
import { Button, IconButton, Typography, Modal, Paper, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
//icon
import ClearIcon from '@mui/icons-material/Clear';
import EmailIcon from '@mui/icons-material/Email';


// ======================================================================================== [Import Component] js
import emailModalButtonLang from './emailModalButtonLang'


// ======================================================================================== [Import Component] CSS


function AddEmail(props){

    const style = {
        subtitle:{
            box : {
                display:'flex', flexDirection:'row', alignItems:'center', fontSize:'medium'
            },
            text : {
                marginTop:'4px', marginLeft:'2px'
            }
        },
        paper : {
            width:500,
            p: 2,
            mb:2
        },
        popup : {
            paper : {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: 24,
                p: 2,
            },
        },
        inputTexstField : {
            fontSize: 14,
            paddingRight:0
        }
    }

    const yupSchema = yup.object().shape({

        email_address: yup.string()
        .email(emailModalButtonLang.inputField.email_address.valMsg.pattern[cookies.load('site-lang')]) // 이메일 유효성 검사
        .required(emailModalButtonLang.inputField.email_address.valMsg.required[cookies.load('site-lang')]), // 필수 입력 필드
      });

    const initialValues = {
        email_address: '',
        email_usage: 'PERSONAL',
        email_affiliation: ''
    }

    const [popup,setPopup] = useState(0);
    const handleModalClose = () => setPopup(0);

    const arrAddElement = function (arr, newElement) {
        let duplication = 0
        let tempArr = [...arr];
        tempArr.map((oneItem, index) => {
            if(oneItem[Object.keys(oneItem)[0]] === newElement[Object.keys(newElement)[0]]){
                duplication += 1;
            }
        })
        if (duplication === 0){
            tempArr.push(newElement);
        }
        else {
            alert(emailModalButtonLang.alertMsg.duplicated[cookies.load('site-lang')])
        }
        return tempArr;
    };

    return(
        <Formik
        validationSchema={yupSchema}
        initialValues={initialValues}
        onSubmit={(values, actions)=>{
            props.updateValue ( arrAddElement( props.inheritedArr, values ) )
            actions.resetForm()
            handleModalClose()
        }}
        >
            { formikProps => (
                <div>
                    <Button fullWidth variant="outlined" color = 'sys1' size="small" onClick={()=>setPopup(1)}>ADD</Button>
                    <Modal open={(popup === 1)} onClose={handleModalClose}>
                        <Paper sx={style.popup.paper} elevation={3}>
                            <div className = "popup-close-button-box"><button className='popup-close-button' onClick={handleModalClose}>X</button></div>
                            <form
                            noValidate
                            style={{width: '400px', display:'flex', flexDirection:'column', alignItems:'center'}}
                            id = "addEmail"
                            autoComplete='off'
                            onSubmit={formikProps.handleSubmit}
                            >
                                <div style={style.subtitle.box}>
                                    <EmailIcon color='sys1'/>
                                    <div style={style.subtitle.text}>Add E-Mail</div>
                                </div>
                                <TextField
                                required
                                variant="outlined"
                                id="email_address"
                                name="email_address"
                                label={emailModalButtonLang.inputField.email_address.placeholder[cookies.load('site-lang')]}
                                value={formikProps.values.email_address}
                                onChange={formikProps.handleChange}
                                onBlur={formikProps.handleBlur}
                                helperText={formikProps.touched.email_address ? formikProps.errors.email_address : ""}
                                error={formikProps.touched.email_address && Boolean(formikProps.errors.email_address)}
                                size='small'
                                margin="dense"
                                fullWidth
                                InputProps={{
                                    endAdornment:(
                                        <IconButton size='small' onClick={()=>{formikProps.setFieldValue('email_address','')}}>
                                            <ClearIcon size='small'/>
                                        </IconButton>
                                    ),
                                    style: style.inputTexstField // font size of input text
                                }}
                                InputLabelProps={{style: style.inputTexstField}} // font size of input label
                                />
                                <FormControl style={{ border:'#D3D3D3 solid 1px', borderRadius:'5px', marginTop:'5px', marginBottom:'2px', paddingLeft:'10px', width:'100%', boxSizing:'border-box', display: 'flex', flexDirection: 'row', alignItems:'center' }}>
                                    <FormLabel id="email_usage" sx={{mr:1, fontSize:14}}>{emailModalButtonLang.inputField.email_usage.placeholder[cookies.load('site-lang')]}</FormLabel>
                                        <RadioGroup
                                        row
                                        defaultValue={formikProps.initialValues.email_usage}
                                        name="email_usage"
                                        value={formikProps.values.email_usage}
                                        onChange={formikProps.handleChange}
                                        >
                                            <FormControlLabel
                                            value="PERSONAL"
                                            control={<Radio />}
                                            label={<Typography sx={{fontSize:14}}>{emailModalButtonLang.inputField.email_usage.optionLabel.personal[cookies.load('site-lang')]}</Typography>}
                                            />
                                            <FormControlLabel
                                            value="WORK"
                                            control={<Radio />}
                                            label={<Typography sx={{fontSize:14}}>{emailModalButtonLang.inputField.email_usage.optionLabel.work[cookies.load('site-lang')]}</Typography>}
                                            />
                                            <FormControlLabel
                                            value="OTHER"
                                            control={<Radio />}
                                            label={<Typography sx={{fontSize:14}}>{emailModalButtonLang.inputField.email_usage.optionLabel.other[cookies.load('site-lang')]}</Typography>}
                                            />
                                        </RadioGroup>
                                </FormControl>
                                <TextField
                                variant="outlined"
                                id="email_affiliation"
                                name="email_affiliation"
                                label={emailModalButtonLang.inputField.email_affiliation.placeholder[cookies.load('site-lang')]}
                                value={formikProps.values.email_affiliation}
                                onChange={formikProps.handleChange}
                                onBlur={formikProps.handleBlur}
                                helperText={formikProps.touched.email_affiliation ? formikProps.errors.email_affiliation : ""}
                                error={formikProps.touched.email_affiliation && Boolean(formikProps.errors.email_affiliation)}
                                size='small'
                                margin="dense"
                                fullWidth
                                InputProps={{
                                    endAdornment:(
                                        <IconButton size='small' onClick={()=>{formikProps.setFieldValue('email_affiliation','')}}>
                                            <ClearIcon size='small'/>
                                        </IconButton>
                                    ),
                                    style: style.inputTexstField // font size of input text
                                }}
                                InputLabelProps={{style: style.inputTexstField}} // font size of input label
                                />
                                <Button sx={{mt:1}} fullWidth variant="contained" color = 'sys1' size="small" type="submit" form="addEmail">ADD</Button>
                            </form>
                        </Paper>
                    </Modal>
                </div>
            )}
        </Formik>
    )

}

export default AddEmail;