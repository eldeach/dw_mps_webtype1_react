// ======================================================================================== [Import Libaray]
import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import cookies from 'react-cookies'
import * as yup from 'yup';
// ======================================================================================== [Import Material UI Libaray]
import { IconButton, TextField } from '@mui/material';
//icon
import ClearIcon from '@mui/icons-material/Clear';

// ======================================================================================== [Import Component] js
// Component
import DocItemDiv from '../DocItemDiv/DocItemDiv'
import paramItemDivLang from './paramItemDivLang'

// ======================================================================================== [Import Component] CSS
import './ParamItemDiv.css'

function ParamItemDiv (props) {

    const style = {
        inputTexstField : {
            fontSize: 14,
            paddingRight:0
        },
    }

    const initialValues = {
        minValue : 0,
        maxValue : 0
    }

    const yupSchema = yup.object().shape({
        minValue: yup.string()
        .required('필수'),
        maxValue: yup.string()
        .required('필수'),
    });

    const handleMinValue = function(newValue){
        props.oneItem.minValue = parseInt(newValue)
    }
    const handleMaxValue = function(newValue){
        props.oneItem.maxValue = parseInt(newValue)
    }

    useEffect(() => {
        props.oneItem.minValue = 0
        props.oneItem.maxValue = 0
    }, [])

    return (
        <Formik
        validationSchema={yupSchema}
        initialValues={initialValues}
        onSubmit={async (values, actions)=>{

        }}
        >
            { formikProps => (
                <form
                noValidate
                style={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}
                id = "machine_recorder"
                autoComplete='off'
                onSubmit={formikProps.handleSubmit}
                >
                <div style={{display : 'flex', flexDirection : 'row'}}>
                    <TextField
                    required
                    sx={{width : '200px'}}
                    variant="outlined"
                    id="minValue"
                    name="minValue"
                    type='number'
                    label={paramItemDivLang.inputField.minValue.placeholder[cookies.load('site-lang')]}
                    value={formikProps.values.minValue}
                    onChange={(e) => {
                        e.target.value = parseInt(e.target.value)
                        formikProps.handleChange(e);
                        handleMinValue(e.target.value);
                    }}
                    onBlur={formikProps.handleBlur}
                    helperText={formikProps.touched.minValue ? formikProps.errors.minValue : ""}
                    error={formikProps.touched.minValue && Boolean(formikProps.errors.minValue)}
                    size='small'
                    margin="dense"
                    fullWidth
                    InputProps={{
                        endAdornment:(
                            <IconButton size='small' onClick={()=>{formikProps.setFieldValue('minValue','')}}>
                                <ClearIcon size='small'/>
                            </IconButton>
                        ),
                        style: style.inputTexstField // font size of input text
                    }}
                    InputLabelProps={{style: style.inputTexstField}} // font size of input label
                    />
                    <TextField
                    required
                    sx={{width : '200px'}}
                    variant="outlined"
                    id="maxValue"
                    name="maxValue"
                    type='number'
                    label={paramItemDivLang.inputField.maxValue.placeholder[cookies.load('site-lang')]}
                    value={formikProps.values.maxValue}
                    onChange={(e) => {
                        e.target.value = parseInt(e.target.value)
                        formikProps.handleChange(e);
                        handleMaxValue(e.target.value);
                    }}
                    onBlur={formikProps.handleBlur}
                    helperText={formikProps.touched.maxValue ? formikProps.errors.maxValue : ""}
                    error={formikProps.touched.maxValue && Boolean(formikProps.errors.maxValue)}
                    size='small'
                    margin="dense"
                    fullWidth
                    InputProps={{
                        endAdornment:(
                            <IconButton size='small' onClick={()=>{formikProps.setFieldValue('maxValue','')}}>
                                <ClearIcon size='small'/>
                            </IconButton>
                        ),
                        style: style.inputTexstField // font size of input text
                    }}
                    InputLabelProps={{style: style.inputTexstField}} // font size of input label
                    />
                </div>
                <DocItemDiv
                oneItem = { props.oneItem }/>
                </form>
            )}
        </Formik>
    )
}

export default ParamItemDiv;