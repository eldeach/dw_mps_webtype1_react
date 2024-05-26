// ======================================================================================== [Import Libaray]
import cookies from 'react-cookies';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

// ======================================================================================== [Import Material UI Libaray]
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
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
    MNG_CODE: yup.object()
        .required("입력필요"),
    EMAIL_ADDRESS: yup.string()
        .required("입력필요"),
    RECEIVE_TYPE: yup.object()
        .required("입력필요"),
});

const steps = [
    {
        label: { kor: `대상 선택`, eng: `Target selection.` }[cookies.load(`site-lang`)],
        description: { kor: `이메일 알람을 지정할 대상을 선택해주세요.`, eng: `Please select the target for email alerts.` }[cookies.load(`site-lang`)],
        errStat: (formikProps) => {
            return (formikProps.touched.MNG_CODE && Boolean(formikProps.errors.MNG_CODE))
        },
        Content: ({ formikProps, otherState }) => {
            let location = useLocation()
            let machineNameList = otherState.machineNameList;

            return (
                <div>
                    <Autocomplete
                        disabled={location.pathname == "/mailingupdlist"}
                        value={formikProps.values.MNG_CODE}
                        onChange={(e, v) => {
                            formikProps.handleChange(e)
                            formikProps.setFieldValue('MNG_CODE', v);
                        }}
                        disablePortal
                        size="small"
                        margin="dense"
                        fullWidth
                        id="MNG_CODE"
                        options={machineNameList}
                        getOptionLabel={(option) => option.mng_name}
                        renderOption={(props, option) => (
                            <Box component="li" {...props}>
                                {`(${option.mng_code}) ${option.mng_name} / ${option.mng_team}`}
                            </Box>
                        )}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                color="sys1"
                                label={`${{ kor: `메일링 대상`, eng: `Machine that provides information via mailing` }[cookies.load(`site-lang`)]}`}
                                inputProps={{
                                    ...params.inputProps,
                                }}
                            />}
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
        Content: ({ formikProps, otherState}) => {
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
        label: { kor: `수신 유형`, eng: `Receiving Type` }[cookies.load(`site-lang`)],
        description: { kor: `이메일 수신자 유형을 지정해주세요.`, eng: `Please specify the type of email recipient.` }[cookies.load(`site-lang`)],
        errStat: (formikProps) => {
            return (formikProps.touched.RECEIVE_TYPE && Boolean(formikProps.errors.RECEIVE_TYPE))
        },
        Content: ({ formikProps, otherState }) => {
            let typeList = [
                { typeCode: 'TO', typeName: { kor: `수신`, eng: `Recipient` }[cookies.load(`site-lang`)] },
                { typeCode: 'CC', typeName: { kor: `참조`, eng: `Carbon Copy` }[cookies.load(`site-lang`)] },
            ]
            return (
                <div>
                    <Autocomplete
                        id="RECEIVE_TYPE"
                        value={formikProps.values.RECEIVE_TYPE}
                        onChange={(e, v) => {
                            formikProps.handleChange(e)
                            formikProps.setFieldValue('RECEIVE_TYPE', v);
                        }}
                        disablePortal
                        size="small"
                        margin="dense"
                        fullWidth
                        options={typeList}
                        getOptionLabel={(option) => option.typeName}
                        renderOption={(props, option) => (
                            <Box component="li" {...props}>
                                {`(${option.typeCode}) ${option.typeName}`}
                            </Box>
                        )}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                color="sys1"
                                label={`${{ kor: `수신 유형`, eng: `Receiving Type` }[cookies.load(`site-lang`)]}`}
                                inputProps={{
                                    ...params.inputProps,
                                }}
                            />}
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
        Content: ({ formikProps, otherState }) => {

            let roleList = [
                { roleCode: 'P', roleName: { kor: `수행자`, eng: `Performer` }[cookies.load(`site-lang`)] },
                { roleCode: 'CP', roleName: { kor: `연락 담당자`, eng: `Contact Person` }[cookies.load(`site-lang`)] },
                { roleCode: 'PL', roleName: { kor: `파트장`, eng: `Part Leader` }[cookies.load(`site-lang`)] },
                { roleCode: 'TL', roleName: { kor: `팀장`, eng: `Team Leader` }[cookies.load(`site-lang`)] },
                { roleCode: 'SME', roleName: { kor: `SME`, eng: `SME` }[cookies.load(`site-lang`)] },
            ]
            return (
                <div>
                    <Autocomplete
                        id="EMAIL_ROLE"
                        value={formikProps.values.EMAIL_ROLE}
                        onChange={(e, v) => {
                            formikProps.handleChange(e)
                            formikProps.setFieldValue('EMAIL_ROLE', v);
                            console.log(formikProps.values.EMAIL_ROLE)
                        }}
                        options={roleList}
                        getOptionLabel={(option) => option.roleName}
                        renderOption={(props, option) => (
                            <Box component="li" {...props}>
                                {`(${option.roleCode}) ${option.roleName}`}
                            </Box>
                        )}
                        disablePortal
                        size="small"
                        margin="dense"
                        fullWidth
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                color="sys1"
                                label={`${{ kor: "이메일 역할", eng: "EMAIL ROLE" }[cookies.load(`site-lang`)]}`}
                                inputProps={{
                                    ...params.inputProps,
                                }}
                            />}
                    />
                </div>
            )
        }
    },
];

function MailingAddListitem() {

    let location = useLocation();
    let initialValues = location.state.initialValues;
    let otherState = location.state.otherState;

    let navigate = useNavigate()

    const onSubmitFunc = async function (values, actions) {
        const valuePayload = {
            MNG_CODE: values.MNG_CODE.mng_code,
            EMAIL_ADDRESS: values.EMAIL_ADDRESS,
            RECEIVE_TYPE: values.RECEIVE_TYPE.typeCode,
            EMAIL_ROLE: values.EMAIL_ROLE.roleCode,
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
                    width: '738px'
                }}
                muiColor='sys1'
                yupSchema={yupSchema}
                steps={steps}
                initialValues = {initialValues}
                otherState={otherState}
                onSubmitFunc={onSubmitFunc}
                formId={"mailer_add_email"}
            />
        </div>
    );
}


export default MailingAddListitem;


