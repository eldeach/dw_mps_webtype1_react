// ======================================================================================== [Import Libaray]
import { useState } from 'react';
import cookies from 'react-cookies';

// Formik & 관련 라이브러리
import { Formik } from 'formik';
import * as yup from 'yup';

// ======================================================================================== [Import Material UI Libaray]
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

//icon
import ClearIcon from '@mui/icons-material/Clear';


// ======================================================================================== [Import Component] js
// StepperForm
import StepperForm from '../StepperForm/StepperForm';

// ======================================================================================== [Import Component] CSS
// N/A

const style = {
    subtitle: { // SubRecorder subtitle div 스타일
        box: {
            display: 'flex', flexDirection: 'row', alignItems: 'center', fontSize: 'medium'
        },
        text: {
            marginTop: '4px', marginLeft: '2px', fontSize: '13px'
        }
    },
    paper: { // SubRecorder Paper 객체 스타일
        minWidth: 500,
        width: 500,
        p: 2,
        mb: 2,
        ml: 2,
        flexGrow: 0
    },
    inputTexstField: {
        fontSize: 14,
        paddingRight: 0
    },
    arrItem: { // SubRecorder에서 다루는 값이 배열이면 이 속성이 있음
        oneItem: {
            padding: '10px',
            marginTop: '5px',
            marginBottom: '5px',
            borderRadius: '5px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'row',
            border: '#D3D3D3 solid 1px'
        },
        delItem: {
            height: 'auto',
            paddingLeft: '10px',
            boxSizing: 'border-box'
        },
        itemInfo: {
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
        },
        subInfo: {
            marginTop: '7px',
            display: 'flex',
            flexDirection: 'row'
        }

    },
}

const yupSchema = yup.object().shape({
    email_address: yup.string()
        .required("입력필요"),
});

const steps = [
    {
        label: { kor: `대상 선택`, eng: `Target selection.` }[cookies.load(`site-lang`)],
        description: { kor: `이메일 알람을 지정할 대상을 선택해주세요.`, eng: `Please select the target for email alerts.` }[cookies.load(`site-lang`)],
        errStat: (formikProps) => {
            return (formikProps.touched.email_address && Boolean(formikProps.errors.email_address))
        },
        content: ({ formikProps }) => {
            return (
                <div>
                    <TextField
                        required
                        variant="outlined"
                        id="email_address"
                        name="email_address"
                        label="Email Address"
                        value={formikProps.values.email_address}
                        onChange={(e) => {
                            formikProps.handleChange(e);
                            formikProps.setFieldValue('email_address', e.target.value.trim()); // 입력 값의 양 옆 공백 제거 후 저장
                        }}
                        onBlur={formikProps.handleBlur}
                        helperText={formikProps.touched.email_address ? formikProps.errors.email_address : ""}
                        error={formikProps.touched.email_address && Boolean(formikProps.errors.email_address)}
                        size='small'
                        margin="dense"
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <IconButton size='small' onClick={() => { formikProps.setFieldValue('email_address', '') }}>
                                    <ClearIcon size='small' />
                                </IconButton>
                            ),
                            style: style.inputTexstField // font size of input text
                        }}
                        InputLabelProps={{ style: style.inputTexstField }} // font size of input label
                    />
                </div>
            )
        }
    },
    {
        label: { kor: `이메일 입력`, eng: `Enter Email Address` }[cookies.load(`site-lang`)],
        description: { kor: `알람을 수신할 이메일을 입력해주세요.`, eng: `Please enter the email to receive the alerts.` }[cookies.load(`site-lang`)],
        errStat: (formikProps) => {
            return (true)
        },
        content: ({ formikProps }) => {
            return (<div>step2</div>)
        }
    },
    {
        label: { kor: `역할명`, eng: `Role Name` }[cookies.load(`site-lang`)],
        description: { kor: `이메일 수신자의 역할을 지정해주세요.`, eng: `Please designate the role of the email recipient.` }[cookies.load(`site-lang`)],
        errStat: (formikProps) => {
            return (false)
        },
        content: ({ formikProps }) => {
            return (<div>step3</div>)
        }
    },
];


const initialValues = {
    email_address : ''
}

function MailerAddEmail() {


    async function onSubmitFunc() {
        alert("submit!")
    }

    return (
        <StepperForm
            size={{
                width: '1200px'
            }}
            muiColor = 'sys1'
            yupSchema={yupSchema}
            steps={steps}
            initialValues = {initialValues}
            onSubmitFunc={onSubmitFunc}
            formId={"mailer_add_email"}

        />
    );
}


export default MailerAddEmail;


