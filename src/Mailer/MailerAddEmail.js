// ======================================================================================== [Import Libaray]
import cookies from 'react-cookies';
import * as yup from 'yup';

// ======================================================================================== [Import Material UI Libaray]
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

//icon
import ClearIcon from '@mui/icons-material/Clear';


// ======================================================================================== [Import Component] js
// StepperForm
import StepperForm from '../StepperForm/StepperForm';

// ======================================================================================== [Import Component] CSS
// N/A

const style = {

    inputTexstField: {
        fontSize: 14,
        paddingRight: 0
    },
}

const yupSchema = yup.object().shape({
    mailing_object: yup.string()
        .required("입력필요"),
    email_address: yup.string()
        .required("입력필요"),
});

const steps = [
    {
        label: { kor: `대상 선택`, eng: `Target selection.` }[cookies.load(`site-lang`)],
        description: { kor: `이메일 알람을 지정할 대상을 선택해주세요.`, eng: `Please select the target for email alerts.` }[cookies.load(`site-lang`)],
        errStat: (formikProps) => {
            return (formikProps.touched.mailing_object && Boolean(formikProps.errors.mailing_object))
        },
        content: ({ formikProps }) => {
            return (
                <div>
                    <TextField
                        required
                        variant="outlined"
                        id="mailing_object"
                        name="mailing_object"
                        label="Mailing Object"
                        value={formikProps.values.mailing_object}
                        onChange={(e) => {
                            formikProps.handleChange(e);
                            formikProps.setFieldValue('mailing_object', e.target.value.trim()); // 입력 값의 양 옆 공백 제거 후 저장
                        }}
                        onBlur={formikProps.handleBlur}
                        helperText={formikProps.touched.mailing_object ? formikProps.errors.mailing_object : ""}
                        error={formikProps.touched.mailing_object && Boolean(formikProps.errors.mailing_object)}
                        size='small'
                        margin="dense"
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <IconButton size='small' onClick={() => { formikProps.setFieldValue('mailing_object', '') }}>
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
        label: { kor: `역할명`, eng: `Role Name` }[cookies.load(`site-lang`)],
        description: { kor: `이메일 수신자의 역할을 지정해주세요.`, eng: `Please designate the role of the email recipient.` }[cookies.load(`site-lang`)],
        errStat: (formikProps) => {
            return (false)
        },
        content: ({ formikProps }) => {
            return (
                <div>
                    <TextField
                        required
                        variant="outlined"
                        id="mailing_role"
                        name="mailing_role"
                        label="Email Role"
                        value={formikProps.values.mailing_role}
                        onChange={(e) => {
                            formikProps.handleChange(e);
                            formikProps.setFieldValue('mailing_role', e.target.value.trim()); // 입력 값의 양 옆 공백 제거 후 저장
                        }}
                        onBlur={formikProps.handleBlur}
                        helperText={formikProps.touched.mailing_role ? formikProps.errors.mailing_role : ""}
                        error={formikProps.touched.mailing_role && Boolean(formikProps.errors.mailing_role)}
                        size='small'
                        margin="dense"
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <IconButton size='small' onClick={() => { formikProps.setFieldValue('mailing_role', '') }}>
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

function MailerAddEmail({ initialValues }) {


    async function onSubmitFunc() {
        alert("submit!")
    }

    return (
        <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
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


export default MailerAddEmail;


