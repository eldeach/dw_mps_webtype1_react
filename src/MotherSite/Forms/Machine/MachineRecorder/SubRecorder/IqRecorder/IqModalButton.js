// ======================================================================================== [Import Libaray]
import { useState } from 'react';
import { Formik } from 'formik';
import cookies from 'react-cookies'
import * as yup from 'yup';


// ======================================================================================== [Import Material UI Libaray]
import { Button, IconButton, Modal, Paper, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//icon
import ClearIcon from '@mui/icons-material/Clear';
import VerifiedIcon from '@mui/icons-material/Verified';
// ======================================================================================== [Import Component] js
import iqModalButtonLang from './iqModalButtonLang.js'


// ======================================================================================== [Import Component] CSS


function IqModalButton(props){

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

        doc_no: yup.string()
        .required(iqModalButtonLang.inputField.doc_no.valMsg.required[cookies.load('site-lang')]), // 필수 입력 필드
        doc_rev_no: yup.string()
        .required(iqModalButtonLang.inputField.doc_rev_no.valMsg.required[cookies.load('site-lang')]), // 필수 입력 필드
        doc_approval_date: yup.string()
        .required(iqModalButtonLang.inputField.doc_approval_date.valMsg.required[cookies.load('site-lang')]), // 필수 입력 필드
      });

    const initialValues = {
        doc_no: '',
        doc_rev_no: 0,
        perform_date_start: null,
        perform_date_end: null,
        doc_approval_date: null,
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
            alert(iqModalButtonLang.alertMsg.duplicated[cookies.load('site-lang')])
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
            {formikProps => (
                <div>
                <Button fullWidth variant="outlined" color = 'sys2' size="small" onClick={()=>setPopup(1)}>ADD</Button>
                <Modal open={(popup === 1)} onClose={handleModalClose}>
                    <Paper sx={style.popup.paper} elevation={3}>
                        <div className = "popup-close-button-box"><button className='popup-close-button' onClick={handleModalClose}>X</button></div>
                        <form
                        noValidate
                        style={{width: '400px', display:'flex', flexDirection:'column', alignItems:'center'}}
                        id = "addIqOneInfo"
                        autoComplete='off'
                        onSubmit={formikProps.handleSubmit}
                        >
                            <div style={style.subtitle.box}>
                                <VerifiedIcon color='sys1'/>
                                <div style={style.subtitle.text}>Add IQ Information</div>
                            </div>
                            <TextField
                            required
                            variant="outlined"
                            id="doc_no"
                            name="doc_no"
                            label={iqModalButtonLang.inputField.doc_no.placeholder[cookies.load('site-lang')]}
                            value={formikProps.values.doc_no}
                            onChange={formikProps.handleChange}
                            onBlur={formikProps.handleBlur}
                            helperText={formikProps.touched.doc_no ? formikProps.errors.doc_no : ""}
                            error={formikProps.touched.doc_no && Boolean(formikProps.errors.doc_no)}
                            size='small'
                            margin="dense"
                            fullWidth
                            InputProps={{
                                endAdornment:(
                                    <IconButton size='small' onClick={()=>{formikProps.setFieldValue('doc_no','')}}>
                                        <ClearIcon size='small'/>
                                    </IconButton>
                                ),
                                style: style.inputTexstField // font size of input text
                            }}
                            InputLabelProps={{style: style.inputTexstField}} // font size of input label
                            />
                            <TextField
                            required
                            variant="outlined"
                            id="doc_rev_no"
                            name="doc_rev_no"
                            type="number"
                            label={iqModalButtonLang.inputField.doc_rev_no.placeholder[cookies.load('site-lang')]}
                            value={formikProps.values.doc_rev_no}
                            onChange={formikProps.handleChange}
                            onBlur={formikProps.handleBlur}
                            helperText={formikProps.touched.doc_rev_no ? formikProps.errors.doc_rev_no : ""}
                            error={formikProps.touched.doc_rev_no && Boolean(formikProps.errors.doc_rev_no)}
                            size='small'
                            margin="dense"
                            fullWidth
                            InputProps={{
                                endAdornment:(
                                    <IconButton size='small' onClick={()=>{formikProps.setFieldValue('rev_no','')}}>
                                        <ClearIcon size='small'/>
                                    </IconButton>
                                ),
                                style: style.inputTexstField // font size of input text
                            }}
                            InputLabelProps={{style: style.inputTexstField}} // font size of input label
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                id="perform_date_start"
                                name="perform_date_start"
                                slotProps={{ textField: { size: 'small', fullWidth: true, style: style.inputTexstField }}}
                                label={<Typography sx={{fontSize:14}}>{iqModalButtonLang.inputField.perform_date_start.placeholder[cookies.load('site-lang')]}</Typography>}
                                format="YYYY-MM-DD"
                                mask={"____-__-__"}
                                value={formikProps.values.perform_date_start}
                                onChange={(newValue) => formikProps.setFieldValue('perform_date_start',newValue)}
                                renderInput={(params) => <TextField {...params}
                                color='sys2'/>}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                sx = {{mt:0.5, mb:0.5}}
                                id="perform_date_end"
                                name="perform_date_end"
                                slotProps={{ textField: { size: 'small', fullWidth: true, style: style.inputTexstField }}}
                                label={<Typography sx={{fontSize:14}}>{iqModalButtonLang.inputField.perform_date_end.placeholder[cookies.load('site-lang')]}</Typography>}
                                format="YYYY-MM-DD"
                                mask={"____-__-__"}
                                value={formikProps.values.perform_date_end}
                                onChange={(newValue) => formikProps.setFieldValue('perform_date_end',newValue)}
                                renderInput={(params) => <TextField {...params}
                                color='sys2'/>}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                id="doc_approval_date"
                                name="doc_approval_date"
                                slotProps={{ textField: { size: 'small', fullWidth: true, style: style.inputTexstField }}}
                                label={<Typography sx={{fontSize:14}}>{iqModalButtonLang.inputField.doc_approval_date.placeholder[cookies.load('site-lang')]}</Typography>}
                                format="YYYY-MM-DD"
                                mask={"____-__-__"}
                                value={formikProps.values.doc_approval_date}
                                onChange={(newValue) => formikProps.setFieldValue('doc_approval_date',newValue)}
                                renderInput={(params) => <TextField {...params}
                                color='sys2'/>}
                                />
                            </LocalizationProvider>
                            <Button sx={{mt:1}} fullWidth variant="contained" color = 'sys1' size="small" type="submit" form="addIqOneInfo">ADD</Button>
                        </form>
                    </Paper>
                </Modal>
            </div>
            )}
        </Formik>
    )

}

export default IqModalButton;