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
import PhoneIcon from '@mui/icons-material/Phone';

// ======================================================================================== [Import Component] js
import phoneModalButtonLang from './phoneModalButtonLang'


// ======================================================================================== [Import Component] CSS


function AddPositionButton(props){

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

        phone_number: yup.string()
        .matches(/[0-9]/,phoneModalButtonLang.inputField.phone_number.valMsg.pattern[cookies.load('site-lang')])
        .required(phoneModalButtonLang.inputField.phone_number.valMsg.required[cookies.load('site-lang')]), // 필수 입력 필드
      });

    const initialValues = {
        phone_number: '',
        phone_usage: 'PERSONAL',
        phone_affiliation: ''
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
            alert(phoneModalButtonLang.alertMsg.duplicated[cookies.load('site-lang')])
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
                            id = "addPhone"
                            autoComplete='off'
                            onSubmit={formikProps.handleSubmit}
                            >
                                <div style={style.subtitle.box}>
                                    <PhoneIcon color='sys1'/>
                                    <div style={style.subtitle.text}>Add Phone Number</div>
                                </div>
                                <TextField
                                required
                                variant="outlined"
                                id="phone_number"
                                name="phone_number"
                                label={phoneModalButtonLang.inputField.phone_number.placeholder[cookies.load('site-lang')]}
                                value={formikProps.values.phone_number}
                                onChange={formikProps.handleChange}
                                onBlur={formikProps.handleBlur}
                                helperText={formikProps.touched.phone_number ? formikProps.errors.phone_number : ""}
                                error={formikProps.touched.phone_number && Boolean(formikProps.errors.phone_number)}
                                size='small'
                                margin="dense"
                                fullWidth
                                InputProps={{
                                    endAdornment:(
                                        <IconButton size='small' onClick={()=>{formikProps.setFieldValue('phone_number','')}}>
                                            <ClearIcon size='small'/>
                                        </IconButton>
                                    ),
                                    style: style.inputTexstField // font size of input text
                                }}
                                InputLabelProps={{style: style.inputTexstField}} // font size of input label
                                />
                                <FormControl style={{ border:'#D3D3D3 solid 1px', borderRadius:'5px', marginTop:'5px', marginBottom:'2px', paddingLeft:'10px', width:'100%', boxSizing:'border-box', display: 'flex', flexDirection: 'row', alignItems:'center' }}>
                                    <FormLabel id="phone_usage" sx={{mr:1, fontSize:14}}>{phoneModalButtonLang.inputField.phone_usage.placeholder[cookies.load('site-lang')]}</FormLabel>
                                        <RadioGroup
                                        row
                                        defaultValue={formikProps.initialValues.phone_usage}
                                        name="phone_usage"
                                        value={formikProps.values.phone_usage}
                                        onChange={formikProps.handleChange}
                                        >
                                            <FormControlLabel
                                            value="PERSONAL"
                                            control={<Radio />}
                                            label={<Typography sx={{fontSize:14}}>{phoneModalButtonLang.inputField.phone_usage.optionLabel.personal[cookies.load('site-lang')]}</Typography>}
                                            />
                                            <FormControlLabel
                                            value="WORK"
                                            control={<Radio />}
                                            label={<Typography sx={{fontSize:14}}>{phoneModalButtonLang.inputField.phone_usage.optionLabel.work[cookies.load('site-lang')]}</Typography>}
                                            />
                                            <FormControlLabel
                                            value="OTHER"
                                            control={<Radio />}
                                            label={<Typography sx={{fontSize:14}}>{phoneModalButtonLang.inputField.phone_usage.optionLabel.other[cookies.load('site-lang')]}</Typography>}
                                            />
                                        </RadioGroup>
                                </FormControl>
                                <TextField
                                variant="outlined"
                                id="phone_affiliation"
                                name="phone_affiliation"
                                label={phoneModalButtonLang.inputField.phone_affiliation.placeholder[cookies.load('site-lang')]}
                                value={formikProps.values.phone_affiliation}
                                onChange={formikProps.handleChange}
                                onBlur={formikProps.handleBlur}
                                helperText={formikProps.touched.phone_affiliation ? formikProps.errors.phone_affiliation : ""}
                                error={formikProps.touched.phone_affiliation && Boolean(formikProps.errors.phone_affiliation)}
                                size='small'
                                margin="dense"
                                fullWidth
                                InputProps={{
                                    endAdornment:(
                                        <IconButton size='small' onClick={()=>{formikProps.setFieldValue('phone_affiliation','')}}>
                                            <ClearIcon size='small'/>
                                        </IconButton>
                                    ),
                                    style: style.inputTexstField // font size of input text
                                }}
                                InputLabelProps={{style: style.inputTexstField}} // font size of input label
                                />
                                <Button sx={{mt:1}} fullWidth variant="contained" color = 'sys1' size="small" type="submit" form="addPhone">ADD</Button>
                            </form>
                        </Paper>
                    </Modal>
                </div>
            )}
        </Formik>
    )

}

export default AddPositionButton;