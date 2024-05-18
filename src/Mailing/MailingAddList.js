// ======================================================================================== [Import Libaray]
import cookies from 'react-cookies';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

// ======================================================================================== [Import Material UI Libaray]
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

//icon
import ClearIcon from '@mui/icons-material/Clear';


// ======================================================================================== [Import Component] js
// StepperForm
import StepperForm from '../StepperForm/StepperForm';
import { useEffect } from 'react';

// ======================================================================================== [Import Component] CSS
// N/A

const style = {

    inputTexstField: {
        fontSize: 14,
        paddingRight: 0
    },
}

const yupSchema = yup.object().shape({
    MNG_CODE: yup.string()
        .required("입력필요"),
    EMAIL_ADDRESS: yup.string()
        .required("입력필요"),
});

const steps = [
    {
        label: { kor: `대상 선택`, eng: `Target selection.` }[cookies.load(`site-lang`)],
        description: { kor: `이메일 알람을 지정할 대상을 선택해주세요.`, eng: `Please select the target for email alerts.` }[cookies.load(`site-lang`)],
        errStat: (formikProps) => {
            return (formikProps.touched.MNG_CODE && Boolean(formikProps.errors.MNG_CODE))
        },
        Content: ({ formikProps }) => {
            let location = useLocation()
            return (
                <div>
                    <TextField
                        required
                        disabled={location.pathname == "/mailingupdlist"}
                        variant="outlined"
                        id="MNG_CODE"
                        name="MNG_CODE"
                        label="Mailing Object"
                        value={formikProps.values.MNG_CODE}
                        onChange={(e) => {
                            formikProps.handleChange(e);
                            formikProps.setFieldValue('MNG_CODE', e.target.value.trim()); // 입력 값의 양 옆 공백 제거 후 저장
                        }}
                        onBlur={formikProps.handleBlur}
                        helperText={formikProps.touched.MNG_CODE ? formikProps.errors.MNG_CODE : ""}
                        error={formikProps.touched.MNG_CODE && Boolean(formikProps.errors.MNG_CODE)}
                        size='small'
                        margin="dense"
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <IconButton size='small' onClick={() => { formikProps.setFieldValue('MNG_CODE', '') }}>
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
            return (formikProps.touched.EMAIL_ADDRESS && Boolean(formikProps.errors.EMAIL_ADDRESS))
        },
        Content: ({ formikProps }) => {
            return (
                <div>
                    <TextField
                        required
                        variant="outlined"
                        id="EMAIL_ADDRESS"
                        name="EMAIL_ADDRESS"
                        label="Email Address"
                        value={formikProps.values.EMAIL_ADDRESS}
                        onChange={(e) => {
                            formikProps.handleChange(e);
                            formikProps.setFieldValue('EMAIL_ADDRESS', e.target.value.trim()); // 입력 값의 양 옆 공백 제거 후 저장
                        }}
                        onBlur={formikProps.handleBlur}
                        helperText={formikProps.touched.EMAIL_ADDRESS ? formikProps.errors.EMAIL_ADDRESS : ""}
                        error={formikProps.touched.EMAIL_ADDRESS && Boolean(formikProps.errors.EMAIL_ADDRESS)}
                        size='small'
                        margin="dense"
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <IconButton size='small' onClick={() => { formikProps.setFieldValue('EMAIL_ADDRESS', '') }}>
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
        label: { kor: `역할명`, eng: `Role Name` }[cookies.load(`site-lang`)],
        description: { kor: `이메일 수신자의 역할을 지정해주세요.`, eng: `Please designate the role of the email recipient.` }[cookies.load(`site-lang`)],
        errStat: (formikProps) => {
            return (false)
        },
        Content: ({ formikProps }) => {
            return (
                <div>
                    <TextField
                        required
                        variant="outlined"
                        id="EMAIL_ROLE"
                        name="EMAIL_ROLE"
                        label="Email Role"
                        value={formikProps.values.EMAIL_ROLE}
                        onChange={(e) => {
                            formikProps.handleChange(e);
                            formikProps.setFieldValue('EMAIL_ROLE', e.target.value.trim()); // 입력 값의 양 옆 공백 제거 후 저장
                        }}
                        onBlur={formikProps.handleBlur}
                        helperText={formikProps.touched.EMAIL_ROLE ? formikProps.errors.EMAIL_ROLE : ""}
                        error={formikProps.touched.EMAIL_ROLE && Boolean(formikProps.errors.EMAIL_ROLE)}
                        size='small'
                        margin="dense"
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <IconButton size='small' onClick={() => { formikProps.setFieldValue('EMAIL_ROLE', '') }}>
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
];

function MailingAddListitem() {



    let location = useLocation();
    let initialValues = location.state.initialValues;

    let navigate = useNavigate()

    const onSubmitFunc = async function (values, actions) {
        const valuePayload = {
            MNG_CODE: values.MNG_CODE,
            EMAIL_ADDRESS: values.EMAIL_ADDRESS,
            EMAIL_ROLE: values.EMAIL_ROLE,
            UUID_STR: values.UUID_STR
        }

        let reqMethod = ''
        let reqUrl = ''

        if (location.pathname == '/mailingaddlist') {
            reqMethod = 'post'
            reqUrl = 'reqmailingaddlist'
        } else if (location.pathname == '/mailingupdlist') {
            reqMethod = 'put'
            reqUrl = 'reqmailingupdlist'
        }

        let reqParam = {
            method: reqMethod,
            url: reqUrl,
            params: {
                valuePayload: valuePayload
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }
        await axios(reqParam)
            .then((res) => {
                let rs = res.data;
                if (rs.output.P_RESULT == "SUCCESS") {
                    actions.resetForm();
                    navigate('/submitsuccess');
                } else if (rs.output.P_RESULT == "ERROR") {
                    alert(`${rs.output.P_VALUE}`)
                }
            })
            .catch((error) => {
                console.log(error)
                alert(error.response)
            })
    }

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <StepperForm
                size={{
                    width: '800px'
                }}
                muiColor='sys1'
                yupSchema={yupSchema}
                steps={steps}
                initialValues={initialValues}
                onSubmitFunc={onSubmitFunc}
                formId={"mailer_add_email"}
            />
        </div>
    );
}


export default MailingAddListitem;


