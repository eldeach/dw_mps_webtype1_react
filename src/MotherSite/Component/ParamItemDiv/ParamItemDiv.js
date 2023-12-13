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
        min_value : props.oneItem.min_value,
        max_value : props.oneItem.max_value
    }

    const yupSchema = yup.object().shape({
        min_value: yup.string()
        .required('필수'),
        max_value: yup.string()
        .required('필수'),
    });

    const handleMinValue = function(newValue){
        props.oneItem.min_value = parseInt(newValue)
    }
    const handleMaxValue = function(newValue){
        props.oneItem.max_value = parseInt(newValue)
    }

    useEffect(() => {
        if ( !props.oneItem.min_value ) props.oneItem.min_value = parseInt(0)
        if ( !props.oneItem.max_value ) props.oneItem.max_value = parseInt(0)
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
                    id="min_value"
                    name="min_value"
                    type='number'
                    label={paramItemDivLang.inputField.min_value.placeholder[cookies.load('site-lang')]}
                    value={formikProps.values.min_value}
                    onChange={(e) => {
                        e.target.value = parseInt(e.target.value)
                        formikProps.handleChange(e);
                        handleMinValue(e.target.value);
                    }}
                    onBlur={formikProps.handleBlur}
                    helperText={formikProps.touched.min_value ? formikProps.errors.min_value : ""}
                    error={formikProps.touched.min_value && Boolean(formikProps.errors.min_value)}
                    size='small'
                    margin="dense"
                    fullWidth
                    InputProps={{
                        endAdornment:(
                            <IconButton size='small' onClick={()=>{formikProps.setFieldValue('min_value','')}}>
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
                    id="max_value"
                    name="max_value"
                    type='number'
                    label={paramItemDivLang.inputField.max_value.placeholder[cookies.load('site-lang')]}
                    value={formikProps.values.max_value}
                    onChange={(e) => {
                        e.target.value = parseInt(e.target.value)
                        formikProps.handleChange(e);
                        handleMaxValue(e.target.value);
                    }}
                    onBlur={formikProps.handleBlur}
                    helperText={formikProps.touched.max_value ? formikProps.errors.max_value : ""}
                    error={formikProps.touched.max_value && Boolean(formikProps.errors.max_value)}
                    size='small'
                    margin="dense"
                    fullWidth
                    InputProps={{
                        endAdornment:(
                            <IconButton size='small' onClick={()=>{formikProps.setFieldValue('max_value','')}}>
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