// ======================================================================================== [Import Libaray]
import { useState } from 'react';
import cookies from 'react-cookies';

// Formik & 관련 라이브러리
import { Formik } from 'formik';

// ======================================================================================== [Import Material UI Libaray]
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
//icon
import Check from "@mui/icons-material/Check";

// ======================================================================================== [Import Component] js
// N/A

// ======================================================================================== [Import Component] CSS
// N/A

function StepperForm({ size, muiColor, yupSchema, steps, initialValues, otherState, onSubmitFunc, formId }) {

    const [backdrop, setBackdrop] = useState(false);
    const backdropClose = () => {
        setBackdrop(false);
    };
    const backdropOpen = () => {
        setBackdrop(true);
    };

    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 25,
        height: 25,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...(ownerState.active && {
            backgroundColor: theme.palette.sys1.main,
        }),
        ...(ownerState.completed && {
            backgroundColor: theme.palette.sys1.main,
        }),
        ...(ownerState.error && {
            backgroundColor: theme.palette.denied.main,
        }),
    }));

    function ColorlibStepIcon(props) {
        const { active, completed, error, className } = props;

        return (
            <ColorlibStepIconRoot ownerState={{ completed, active, error }} className={className}>
                {!completed && !error &&
                    <div>
                        {String(props.icon)}
                    </div>
                }
                {error &&
                    <div>
                        !
                    </div>
                }
                {/* {icons[String(props.icon)]} */}
                {completed && !error && <Check fontSize='12px' />}
            </ColorlibStepIconRoot>
        );
    }
    return (
        <Formik
            validationSchema={yupSchema}
            initialValues={initialValues}
            onSubmit={async (values, actions) => {
                backdropOpen()
                await onSubmitFunc(values, actions)
                backdropClose()
            }}
        >
            {formikProps => (
                <form
                    noValidate
                    style={{ width: size.width, display: 'flex', flexDirection: 'column' }}
                    id={formId}
                    autoComplete='off'
                    onSubmit={formikProps.handleSubmit}
                >
                    <Stepper activeStep={activeStep} orientation="vertical" >
                        {steps.map((step, index) => (
                            <Step key={step.label}>
                                <StepLabel
                                    StepIconComponent={ColorlibStepIcon}
                                    optional={
                                        index === (steps.length - 1) ? (
                                            <Typography variant="caption">Last step</Typography>
                                        ) : null
                                    }
                                    error={step.errStat(formikProps)}

                                >
                                    <div style={{
                                        cursor: 'pointer',
                                        // backgroundColor: 'transparent',
                                        // border: '0px'
                                    }}
                                        onClick={() => { setActiveStep(index) }}
                                    >
                                        {step.label}
                                    </div>
                                </StepLabel>
                                <StepContent>
                                    <Typography>{step.description}</Typography>
                                    <step.Content formikProps={formikProps} otherState = {otherState}/>
                                    <Box sx={{ mb: 2 }}>
                                        <div>
                                            <Button
                                                color={muiColor}
                                                variant="contained"
                                                onClick={handleNext}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                {index === steps.length - 1 ? {kor:'완료', eng:'Finish'}[cookies.load('site-lang')] : {kor:'계속', eng:'Continue'}[cookies.load('site-lang')]}
                                            </Button>
                                            <Button
                                                color={muiColor}
                                                disabled={index === 0}
                                                onClick={handleBack}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                {{kor:'뒤로', eng:'Back'}[cookies.load('site-lang')]}
                                            </Button>
                                        </div>
                                    </Box>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length && (
                        <Paper square elevation={0} sx={{ p: 3 }}>
                            <Typography>{{kor:'모든 스텝이 완료되었습니다.', eng:'All steps have been completed'}[cookies.load('site-lang')]}</Typography>
                            <Button
                                color={muiColor}
                                type="submit"
                                form={formId}
                                sx={{ mt: 1, mr: 1 }}>
                                {{kor:'제출', eng:'Submit'}[cookies.load('site-lang')]}
                            </Button>
                            <Button
                                color={muiColor}
                                onClick={handleBack}
                                sx={{ mt: 1, mr: 1 }}>
                                {{kor:'뒤로', eng:'Back'}[cookies.load('site-lang')]}
                            </Button>
                        </Paper>
                    )}
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={backdrop}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </form>
            )}
        </Formik>
    );
}


export default StepperForm;


