// ======================================================================================== [Import Libaray]
import cookies from 'react-cookies';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import dayjs from "dayjs";
import { useEffect, useState } from 'react';

// ======================================================================================== [Import Material UI Libaray]
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import FormControl from '@mui/material/FormControl';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

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
    RUN_PERIOD: yup.string()
        .required("입력필요"),
    PERIOD_UNIT: yup.string()
        .required("입력필요"),
});

const steps = [
    {
        label: { kor: "작동 주기", eng: "Run Period" }[cookies.load(`site-lang`)],
        description: { kor: `작동 주기를 숫자로 입력하세요.`, eng: `Please enter the operating cycle in numbers.` }[cookies.load(`site-lang`)],
        errStat: (formikProps) => {
            return (formikProps.touched.RUN_PERIOD && Boolean(formikProps.errors.RUN_PERIOD))
        },
        Content: ({ formikProps, otherState }) => {
            let location = useLocation()
            return (
                <div>
                    <TextField
                        required
                        disabled={location.pathname == "/mailingupdlist"}
                        variant="outlined"
                        type='number'
                        id="RUN_PERIOD"
                        name="RUN_PERIOD"
                        label="Mailing Object"
                        value={formikProps.values.RUN_PERIOD}
                        onChange={(e) => {
                            formikProps.handleChange(e);
                            formikProps.setFieldValue('RUN_PERIOD', e.target.value.trim()); // 입력 값의 양 옆 공백 제거 후 저장
                        }}
                        onBlur={formikProps.handleBlur}
                        helperText={formikProps.touched.RUN_PERIOD ? formikProps.errors.RUN_PERIOD : ""}
                        error={formikProps.touched.RUN_PERIOD && Boolean(formikProps.errors.RUN_PERIOD)}
                        size='small'
                        margin="dense"
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <IconButton size='small' onClick={() => { formikProps.setFieldValue('RUN_PERIOD', '') }}>
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
        label: { kor: "주기 단위", eng: "Period Unit" }[cookies.load(`site-lang`)],
        description: { kor: `작동 주기 단위를 선택하세요.`, eng: `Please select the unit for the operating cycle.` }[cookies.load(`site-lang`)],
        errStat: (formikProps) => {
            return (formikProps.touched.PERIOD_UNIT && Boolean(formikProps.errors.PERIOD_UNIT))
        },
        Content: ({ formikProps, otherState }) => {
            return (
                <div>
                    <Autocomplete
                        value={formikProps.values.PERIOD_UNIT}
                        onChange={formikProps.handleChange}
                        disablePortal
                        size="small"
                        margin="dense"
                        fullWidth
                        id="PERIOD_UNIT"
                        options={["SECOND", "MINUTE", "HOUR", "DAY", "MONTH", "YEAR"]}
                        renderInput={(params) => <TextField {...params} color="sys1" label={`${{ kor: "주기 단위", eng: "Period Unit" }[cookies.load(`site-lang`)]}`} />}
                    />
                </div>
            )
        }
    },
    {
        label: { kor: "종료일", eng: "END DATE" }[cookies.load(`site-lang`)],
        description: { kor: `종료일을 선택하세요.`, eng: `Please select the end date.` }[cookies.load(`site-lang`)],
        errStat: (formikProps) => {
            return (false)
        },
        Content: ({ formikProps, otherState }) => {
            return (
                <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker
                            label="End Date"
                            orientation="landscape"
                            value={dayjs(formikProps.values.END_DATE)}
                            onChange={(v) => {
                                formikProps.setFieldValue('END_DATE', dayjs(v).toISOString());
                            }}
                            renderInput={(params) => <TextField {...params} color="sys1" />}
                        />
                    </LocalizationProvider>
                </div>
            )
        }
    },
    {
        label: { kor: "사용여부", eng: "Usage status" }[cookies.load(`site-lang`)],
        description: { kor: `사용여부를 선택하세요.`, eng: `Please select whether to use it.` }[cookies.load(`site-lang`)],
        errStat: (formikProps) => {
            return (false)
        },
        Content: ({ formikProps, otherState }) => {
            return (
                <FormControl style={{ border: '#D3D3D3 solid 1px', borderRadius: '5px', marginTop: '5px', marginBottom: '2px', paddingLeft: '10px', width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <FormLabel
                        id="USE_YN"
                        sx={{ mr: 1 }}
                        color='sys1'
                    >
                        {<Typography sx={{ fontSize: 14 }}>{{ kor: "사용여부", eng: "Usage status" }[cookies.load('site-lang')]}</Typography>}
                    </FormLabel>
                    <RadioGroup
                        row
                        name="USE_YN"
                        value={formikProps.values.USE_YN}
                        onChange={formikProps.handleChange}
                    >
                        <FormControlLabel
                            value="Y"
                            control={<Radio color='sys1' />}
                            label={<Typography sx={{ fontSize: 14 }}>{{ kor: "사용", eng: "In Use" }[cookies.load('site-lang')]}</Typography>}
                        />
                        <FormControlLabel
                            value="N"
                            control={<Radio color='sys1' />}
                            label={<Typography sx={{ fontSize: 14 }}>{{ kor: "미사용", eng: "Not In Use" }[cookies.load('site-lang')]}</Typography>}
                        />
                    </RadioGroup>
                </FormControl>
            )
        }
    },
];

function SchedulerUpdList() {

    let location = useLocation();
    let initialValues = location.state.initialValues;

    let navigate = useNavigate()

    const onSubmitFunc = async function (values, actions) {
        const valuePayload = {
            UUID_STR: values.UUID_STR,
            RUN_PERIOD: values.RUN_PERIOD,
            PERIOD_UNIT: values.PERIOD_UNIT,
            END_DATE: values.END_DATE,
            USE_YN: values.USE_YN,
        }

        let reqMethod = ''
        let reqUrl = ''

        if (location.pathname == '/scheduleraddlist') {
            // reqMethod = 'post'
            // reqUrl = '/reqscheduleraddlist'
        } else if (location.pathname == '/schedulerupdlist') {
            reqMethod = 'put'
            reqUrl = '/reqschedulerupdlist'
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
        console.log(reqParam)
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
                initialValues={initialValues}
                onSubmitFunc={onSubmitFunc}
                formId={"scheduler_upd_list"}
            />
        </div>
    );
}


export default SchedulerUpdList;


