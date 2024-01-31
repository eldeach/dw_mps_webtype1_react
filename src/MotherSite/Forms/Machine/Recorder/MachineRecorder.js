// ======================================================================================== [Import Libaray]
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import cookies from 'react-cookies'
import * as yup from 'yup';
import axios from 'axios';

// ======================================================================================== [Import Material UI Libaray]
import { Button, Checkbox, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup, Switch, IconButton, Paper, TextField, Typography, CircularProgress, Backdrop } from '@mui/material';
import { pink } from '@mui/material/colors';
//icon
import ClearIcon from '@mui/icons-material/Clear';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import VerifiedIcon from '@mui/icons-material/Verified';
import BallotIcon from '@mui/icons-material/Ballot';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SaveIcon from '@mui/icons-material/Save';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// ======================================================================================== [Import Component] js
import machineRecorderLang from './machineRecorderLang'

// Sub Recorder
import CdmsSelectorMB from '../../../Component/ModalButton/CdmsSelector/CdmsSelectorMB'

// Const Object
import actCodeBook from '../../../Component/CodeBook/actCodeBook'
import prmCodeBook from '../../../Component/CodeBook/prmCodeBook'

// Component
import ParamItemDiv from '../../../Component/ParamItemDiv/ParamItemDiv'
import DocItemDiv from '../../../Component/DocItemDiv/DocItemDiv';
import PeriodicMngChkBox from './Component/PeriodicMngChkBox'
import ParamChkBox from './Component/ParamChkBox';

// Popup Form
import ApprovalLine from '../../../../System/ApprovalSystem/ApprovalLine/ApprovalLine';

//System Func
import arrDelElement from '../../../../System/Funcs/ArrHandler/arrDelElement'

// ======================================================================================== [Import Component] CSS


function MachineRecorder(props) {

    const { handlePageTitle, handleSystemCode } = props

    let navigate = useNavigate()

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
        mng_code: yup.string()
            .required(machineRecorderLang.mcInfoPaper.inputField.mng_code.valMsg.required[cookies.load('site-lang')]),
        mng_name: yup.string()
            .required(machineRecorderLang.mcInfoPaper.inputField.mng_name.valMsg.required[cookies.load('site-lang')]),
        mng_team: yup.string()
            .required(machineRecorderLang.mcInfoPaper.inputField.mng_team.valMsg.required[cookies.load('site-lang')]),
    });

    // 제정/개정에서 같이 쓰기 위해 initialValues는 외부에서 props로 전달함
    // const initialValues = {
    //     prepared_type : 'NEW',
    //     approval_payload :[[]],
    //     revision_history : '',
    //     previous_approval_payload_id : null,
    //     mng_code : '',
    //     mng_code_alt : '',
    //     mng_code_alt2 : '',
    //     mng_name : '',
    //     mng_team : '',
    //     periodic_qual : [],
    //     periodic_ster : [],
    //     periodic_review : [],
    //     iq : [],
    //     oq : [],
    //     pq : [],
    //     param : [],
    //     periodic_cv : [],
    //     cv : [],
    //     periodic_mt : [],
    //     mt : [],
    // }

    const [bRowFold, setBRowFold] = useState(true);
    const [cRowFold, setCRowFold] = useState(true);
    const [dRowFold, setDRowFold] = useState(true);
    const [eRowFold, setERowFold] = useState(true);
    const [fRowFold, setFRowFold] = useState(true);

    const handleAllFold = function () {
        if (bRowFold && cRowFold && dRowFold && eRowFold && fRowFold) {
            setBRowFold(false)
            setCRowFold(false)
            setDRowFold(false)
            setERowFold(false)
            setFRowFold(false)
        } else {
            setBRowFold(true)
            setCRowFold(true)
            setDRowFold(true)
            setERowFold(true)
            setFRowFold(true)
        }

    }

    const [immediateEffective, setImmediateEffective] = useState(false);

    const onSubmitFunc = async function (values, actions) {

        if (immediateEffective) {
            actions.setFieldValue('approval_payload', [[]])
        }

        if (!immediateEffective && values.approval_payload.length === 1 && values.approval_payload[0].length === 0) {
            alert({ kor: '결재라인을 확인해주세요.', eng: 'Please check the approval line.' }[cookies.load('site-lang')])
        } else {
            const valuePayload = {
                immediate_effective: immediateEffective,
                prepared_type: props.preparedType,
                approval_payload: values.approval_payload,
                revision_history: values.revision_history,
                previous_approval_payload_id: values.previous_approval_payload_id,
                mng_code: values.mng_code,
                mng_code_alt: values.mng_code_alt,
                mng_code_alt2: values.mng_code_alt2,
                mng_name: values.mng_name,
                mng_team: values.mng_team,
                machine_type: values.machine_type,
                gmp_impact: values.gmp_impact,
                not_in_use: values.not_in_use,
                vmp_group: values.vmp_group,
                periodic_mng_1y_qual: values.periodic_mng_1y_qual,
                periodic_mng_qual: values.periodic_mng_qual,
                periodic_mng_ster: values.periodic_mng_ster,
                periodic_mng_vhp: values.periodic_mng_vhp,
                periodic_mng_review: values.periodic_mng_review,
                periodic_mng_cv: values.periodic_mng_cv,
                periodic_mng_1y_mt: values.periodic_mng_1y_mt,
                periodic_mng_mt: values.periodic_mng_mt,
                periodic_mng_season_mt: values.periodic_mng_season_mt,
                mc_periodic_1y_qual: values.mc_periodic_1y_qual,
                mc_periodic_qual: values.mc_periodic_qual,
                mc_periodic_ster: values.mc_periodic_ster,
                mc_periodic_vhp: values.mc_periodic_vhp,
                mc_periodic_review: values.mc_periodic_review,
                mc_iq: values.mc_iq,
                mc_oq: values.mc_oq,
                mc_pq: values.mc_pq,
                mc_periodic_cv: values.mc_periodic_cv,
                mc_cv: values.mc_cv,
                mc_periodic_1y_mt: values.mc_periodic_1y_mt,
                mc_periodic_mt: values.mc_periodic_mt,
                mc_periodic_season_mt: values.mc_periodic_season_mt,
                mc_mt: values.mc_mt,
                prm_list: values.prm_list,
                prm_batchsize: values.prm_batchsize,
                prm_batchsize_kg: values.prm_batchsize_kg,
                prm_batchsize_vial: values.prm_batchsize_vial,
                prm_batchsize_syringe: values.prm_batchsize_syringe,
                prm_gentlewing: values.prm_gentlewing,
                prm_chopper: values.prm_chopper,
                prm_spray: values.prm_spray,
                prm_spray_kgmin: values.prm_spray_kgmin,
                prm_spray_rpm: values.prm_spray_rpm,
                prm_gra_spray_air: values.prm_gra_spray_air,
                prm_gra_micro_prs: values.prm_gra_micro_prs,
                prm_inlet_air_temp: values.prm_inlet_air_temp,
                prm_exh_air_temp: values.prm_exh_air_temp,
                prm_inlet_air_vol: values.prm_inlet_air_vol,
                prm_inlet_air_vol_rpm: values.prm_inlet_air_vol_rpm,
                prm_exh_air_vol_rpm: values.prm_exh_air_vol_rpm,
                prm_roller_speed: values.prm_roller_speed,
                prm_roller_gap: values.prm_roller_gap,
                prm_grate: values.prm_grate,
                prm_blendrpm: values.prm_blendrpm,
                prm_filling_depth: values.prm_filling_depth,
                prm_cforece: values.prm_cforece,
                prm_feeder: values.prm_feeder,
                prm_feeder_2nd: values.prm_feeder_2nd,
                prm_turret: values.prm_turret,
                prm_pforce: values.prm_pforce,
                prm_mforce: values.prm_mforce,
                prm_pforce_2nd: values.prm_pforce_2nd,
                prm_mforce_2nd: values.prm_mforce_2nd,
                prm_pforce_kgf: values.prm_pforce_kgf,
                prm_mforce_kgf: values.prm_mforce_kgf,
                prm_drum: values.prm_drum,
                prm_paair: values.prm_paair,
                prm_atair: values.prm_atair,
                prm_fill: values.prm_fill,
                prm_timer: values.prm_timer

            }

            let rs = await axios.post('/addmachine', valuePayload)
                .then((res) => {
                    console.log(res)
                    navigate('/submitsuccess')
                    return res
                })
                .catch((error) => {
                    return error.response
                })

            console.log(rs.status)
            if (rs.status === 200) {
                actions.resetForm()
            } else if (rs.status === 452) {
                alert(rs.data[cookies.load('site-lang')])
            } else if (rs.status === 512) {
                alert(rs.data[cookies.load('site-lang')])
            }
            else {
                alert(rs)
            }
        }
    }

    const actionsa = [
        { icon: <FileCopyIcon />, name: 'Copy' },
        { icon: <SaveIcon />, name: 'Save' },
    ];

    const [backdrop, setBackdrop] = useState(false);
    const backdropClose = () => {
        setBackdrop(false);
    };
    const backdropOpen = () => {
        setBackdrop(true);
    };

    useEffect(() => {
        console.log(props.initialValues.prm_batchsize)
        handlePageTitle(machineRecorderLang.formTitle[cookies.load('site-lang')])
        handleSystemCode('sys1')
    }, [])

    return (
        <Formik
            validationSchema={yupSchema}
            initialValues={props.initialValues}
            onSubmit={async (values, actions) => {
                backdropOpen()
                await onSubmitFunc(values, actions)
                backdropClose()
            }}
        >
            {formikProps => (
                <form
                    noValidate
                    style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
                    id="machine_recorder"
                    autoComplete='off'
                    onSubmit={formikProps.handleSubmit}
                >
                    <div id='machine-recorder-row-a' style={{ display: 'flex', flexDirection: 'row', marginLeft: '16px', boxSizing: 'border-box' }} >
                        <div>
                            <ApprovalLine
                                sysCode='sys1'
                                forId='machine_recorder'
                                inheritedArr={formikProps.values.approval_payload}
                                updateValue={function (newValue) { formikProps.setFieldValue('approval_payload', newValue) }}
                                immediateEffective={immediateEffective}
                                setImmediateEffective={setImmediateEffective}
                            />
                        </div>
                        <div>
                            <Paper id='mcInfoPaper' sx={style.paper} elevation={3}>
                                <div style={style.subtitle.box}>
                                    <FingerprintIcon color='sys1' />
                                    <div style={style.subtitle.text}>{"System Identifiable Information (SII)"}</div>
                                </div>
                                <TextField
                                    required
                                    disabled={!(props.preparedType == "NEW")}
                                    variant="outlined"
                                    id="mng_code"
                                    name="mng_code"
                                    label={machineRecorderLang.mcInfoPaper.inputField.mng_code.placeholder[cookies.load('site-lang')]}
                                    value={formikProps.values.mng_code}
                                    // onChange={formikProps.handleChange}
                                    onChange={(e) => {
                                        formikProps.handleChange(e);
                                        formikProps.setFieldValue('mng_code', e.target.value.trim()); // 입력 값의 양 옆 공백 제거 후 저장
                                    }}
                                    onBlur={formikProps.handleBlur}
                                    helperText={formikProps.touched.mng_code ? formikProps.errors.mng_code : ""}
                                    error={formikProps.touched.mng_code && Boolean(formikProps.errors.mng_code)}
                                    size='small'
                                    margin="dense"
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton size='small' onClick={() => { formikProps.setFieldValue('mng_code', '') }}>
                                                <ClearIcon size='small' />
                                            </IconButton>
                                        ),
                                        style: style.inputTexstField // font size of input text
                                    }}
                                    InputLabelProps={{ style: style.inputTexstField }} // font size of input label
                                />
                                <TextField
                                    variant="outlined"
                                    id="mng_code_alt"
                                    name="mng_code_alt"
                                    label={machineRecorderLang.mcInfoPaper.inputField.mng_code_alt.placeholder[cookies.load('site-lang')]}
                                    value={formikProps.values.mng_code_alt}
                                    onChange={formikProps.handleChange}
                                    onBlur={formikProps.handleBlur}
                                    helperText={formikProps.touched.mng_code_alt ? formikProps.errors.mng_code_alt : ""}
                                    error={formikProps.touched.mng_code_alt && Boolean(formikProps.errors.mng_code_alt)}
                                    size='small'
                                    margin="dense"
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton size='small' onClick={() => { formikProps.setFieldValue('mng_code_alt', '') }}>
                                                <ClearIcon size='small' />
                                            </IconButton>
                                        ),
                                        style: style.inputTexstField // font size of input text
                                    }}
                                    InputLabelProps={{ style: style.inputTexstField }} // font size of input label
                                />
                                <TextField
                                    variant="outlined"
                                    id="mng_code_alt2"
                                    name="mng_code_alt2"
                                    label={machineRecorderLang.mcInfoPaper.inputField.mng_code_alt2.placeholder[cookies.load('site-lang')]}
                                    value={formikProps.values.mng_code_alt2}
                                    onChange={formikProps.handleChange}
                                    onBlur={formikProps.handleBlur}
                                    helperText={formikProps.touched.mng_code_alt2 ? formikProps.errors.mng_code_alt2 : ""}
                                    error={formikProps.touched.mng_code_alt2 && Boolean(formikProps.errors.mng_code_alt2)}
                                    size='small'
                                    margin="dense"
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton size='small' onClick={() => { formikProps.setFieldValue('mng_code_alt2', '') }}>
                                                <ClearIcon size='small' />
                                            </IconButton>
                                        ),
                                        style: style.inputTexstField // font size of input text
                                    }}
                                    InputLabelProps={{ style: style.inputTexstField }} // font size of input label
                                />
                                <TextField
                                    required
                                    variant="outlined"
                                    id="mng_name"
                                    name="mng_name"
                                    label={machineRecorderLang.mcInfoPaper.inputField.mng_name.placeholder[cookies.load('site-lang')]}
                                    value={formikProps.values.mng_name}
                                    onChange={formikProps.handleChange}
                                    onBlur={formikProps.handleBlur}
                                    helperText={formikProps.touched.mng_name ? formikProps.errors.mng_name : ""}
                                    error={formikProps.touched.mng_name && Boolean(formikProps.errors.mng_name)}
                                    size='small'
                                    margin="dense"
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton size='small' onClick={() => { formikProps.setFieldValue('mng_name', '') }}>
                                                <ClearIcon size='small' />
                                            </IconButton>
                                        ),
                                        style: style.inputTexstField // font size of input text
                                    }}
                                    InputLabelProps={{ style: style.inputTexstField }} // font size of input label
                                />
                                <TextField
                                    required
                                    variant="outlined"
                                    id="mng_team"
                                    name="mng_team"
                                    label={machineRecorderLang.mcInfoPaper.inputField.mng_team.placeholder[cookies.load('site-lang')]}
                                    value={formikProps.values.mng_team}
                                    onChange={formikProps.handleChange}
                                    onBlur={formikProps.handleBlur}
                                    helperText={formikProps.touched.mng_team ? formikProps.errors.mng_team : ""}
                                    error={formikProps.touched.mng_team && Boolean(formikProps.errors.mng_team)}
                                    size='small'
                                    margin="dense"
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton size='small' onClick={() => { formikProps.setFieldValue('mng_team', '') }}>
                                                <ClearIcon size='small' />
                                            </IconButton>
                                        ),
                                        style: style.inputTexstField // font size of input text
                                    }}
                                    InputLabelProps={{ style: style.inputTexstField }} // font size of input label
                                />
                                <FormControl style={{ border: '#D3D3D3 solid 1px', borderRadius: '5px', marginTop: '5px', marginBottom: '2px', paddingLeft: '10px', width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <FormLabel
                                        id="machine_type"
                                        sx={{ mr: 1 }}
                                        color='sys1'
                                    >
                                        {<Typography sx={{ fontSize: 14 }}>{machineRecorderLang.mcInfoPaper.inputField.machine_type.placeholder[cookies.load('site-lang')]}</Typography>}
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        name="machine_type"
                                        value={formikProps.values.machine_type}
                                        onChange={formikProps.handleChange}
                                    >
                                        <FormControlLabel
                                            value="EQ"
                                            control={<Radio color='sys1' />}
                                            label={<Typography sx={{ fontSize: 14 }}>{machineRecorderLang.mcInfoPaper.inputField.machine_type.eq[cookies.load('site-lang')]}</Typography>}
                                        />
                                        <FormControlLabel
                                            value="ROOM"
                                            control={<Radio color='sys1' />}
                                            label={<Typography sx={{ fontSize: 14 }}>{machineRecorderLang.mcInfoPaper.inputField.machine_type.room[cookies.load('site-lang')]}</Typography>}
                                        />
                                        <FormControlLabel
                                            value="COM"
                                            control={<Radio color='sys1' />}
                                            label={<Typography sx={{ fontSize: 14 }}>{machineRecorderLang.mcInfoPaper.inputField.machine_type.com[cookies.load('site-lang')]}</Typography>}
                                        />
                                    </RadioGroup>
                                </FormControl>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            color='sys1'
                                            checked={formikProps.values.gmp_impact}
                                            onChange={(e) => {
                                                formikProps.setFieldValue('gmp_impact', e.target.checked)
                                            }}
                                            name="gmp_impact" />
                                    }
                                    label={
                                        <Typography size="small" sx={{ fontSize: '14px', color: (formikProps.values.gmp_impact ? 'orange' : 'black') }}>{`GMP IMPACT System`}</Typography>
                                    }
                                />
                                <FormControl style={{ border: '#D3D3D3 solid 1px', borderRadius: '5px', marginTop: '5px', marginBottom: '2px', paddingLeft: '10px', width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <FormLabel
                                        id="not_in_use"
                                        sx={{ mr: 1 }}
                                        color='sys1'
                                    >
                                        {<Typography sx={{ fontSize: 14 }}>{machineRecorderLang.mcInfoPaper.inputField.not_in_use.placeholder[cookies.load('site-lang')]}</Typography>}
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        name="not_in_use"
                                        value={formikProps.values.not_in_use}
                                        onChange={formikProps.handleChange}
                                    >
                                        <FormControlLabel
                                            value="IN USE"
                                            control={<Radio color='sys1' />}
                                            label={<Typography sx={{ fontSize: 14 }}>{machineRecorderLang.mcInfoPaper.inputField.not_in_use.in_use[cookies.load('site-lang')]}</Typography>}
                                        />
                                        <FormControlLabel
                                            value="NOT IN USE"
                                            control={<Radio color='sys1' />}
                                            label={<Typography sx={{ fontSize: 14 }}>{machineRecorderLang.mcInfoPaper.inputField.not_in_use.not_in_use[cookies.load('site-lang')]}</Typography>}
                                        />
                                        <FormControlLabel
                                            value="DISCARDED"
                                            control={<Radio color='sys1' />}
                                            label={<Typography sx={{ fontSize: 14 }}>{machineRecorderLang.mcInfoPaper.inputField.not_in_use.discarded[cookies.load('site-lang')]}</Typography>}
                                        />
                                    </RadioGroup>
                                </FormControl>
                                <div>
                                    <FormControlLabel
                                        color='sys1'
                                        fontSize='inherit'
                                        control={
                                            <Checkbox
                                                size="small"
                                                sx={{
                                                    color: pink[800],
                                                    '&.Mui-checked': {
                                                        color: pink[600],
                                                    },
                                                }}
                                                checked={formikProps.values.periodic_mng_1y_qual}
                                                onChange={(e) => { formikProps.setFieldValue('periodic_mng_1y_qual', Boolean(e.target.checked)) }}
                                            />
                                        }
                                        label={<Typography fontSize={12}>{actCodeBook.mc_periodic_1y_qual[cookies.load('site-lang')]}</Typography>}
                                    />
                                    <FormControlLabel
                                        color='sys1'
                                        fontSize='inherit'
                                        control={
                                            <Checkbox
                                                size="small"
                                                sx={{
                                                    color: pink[800],
                                                    '&.Mui-checked': {
                                                        color: pink[600],
                                                    },
                                                }}
                                                checked={formikProps.values.periodic_mng_qual}
                                                onChange={(e) => { formikProps.setFieldValue('periodic_mng_qual', Boolean(e.target.checked)) }}
                                            />
                                        }
                                        label={<Typography fontSize={12}>{actCodeBook.mc_periodic_qual[cookies.load('site-lang')]}</Typography>}
                                    />
                                    <FormControlLabel
                                        color='sys1'
                                        fontSize='inherit'
                                        control={
                                            <Checkbox
                                                size="small"
                                                sx={{
                                                    color: pink[800],
                                                    '&.Mui-checked': {
                                                        color: pink[600],
                                                    },
                                                }}
                                                checked={formikProps.values.periodic_mng_ster}
                                                onChange={(e) => { formikProps.setFieldValue('periodic_mng_ster', Boolean(e.target.checked)) }}
                                            />
                                        }
                                        label={<Typography fontSize={12}>{actCodeBook.mc_periodic_ster[cookies.load('site-lang')]}</Typography>}
                                    />
                                    <FormControlLabel
                                        color='sys1'
                                        fontSize='inherit'
                                        control={
                                            <Checkbox
                                                size="small"
                                                sx={{
                                                    color: pink[800],
                                                    '&.Mui-checked': {
                                                        color: pink[600],
                                                    },
                                                }}
                                                checked={formikProps.values.periodic_mng_vhp}
                                                onChange={(e) => { formikProps.setFieldValue('periodic_mng_vhp', Boolean(e.target.checked)) }}
                                            />
                                        }
                                        label={<Typography fontSize={12}>{actCodeBook.mc_periodic_vhp[cookies.load('site-lang')]}</Typography>}
                                    />
                                    <FormControlLabel
                                        color='sys1'
                                        fontSize='inherit'
                                        control={
                                            <Checkbox
                                                size="small"
                                                sx={{
                                                    color: pink[800],
                                                    '&.Mui-checked': {
                                                        color: pink[600],
                                                    },
                                                }}
                                                checked={formikProps.values.periodic_mng_review}
                                                onChange={(e) => { formikProps.setFieldValue('periodic_mng_review', Boolean(e.target.checked)) }}
                                            />
                                        }
                                        label={<Typography fontSize={12}>{actCodeBook.mc_periodic_review[cookies.load('site-lang')]}</Typography>}
                                    />
                                    <FormControlLabel
                                        color='sys1'
                                        fontSize='inherit'
                                        control={
                                            <Checkbox
                                                size="small"
                                                sx={{
                                                    color: pink[800],
                                                    '&.Mui-checked': {
                                                        color: pink[600],
                                                    },
                                                }}
                                                checked={formikProps.values.periodic_mng_cv}
                                                onChange={(e) => { formikProps.setFieldValue('periodic_mng_cv', Boolean(e.target.checked)) }}
                                            />
                                        }
                                        label={<Typography fontSize={12}>{actCodeBook.mc_periodic_cv[cookies.load('site-lang')]}</Typography>}
                                    />
                                    <FormControlLabel
                                        color='sys1'
                                        fontSize='inherit'
                                        control={
                                            <Checkbox
                                                size="small"
                                                sx={{
                                                    color: pink[800],
                                                    '&.Mui-checked': {
                                                        color: pink[600],
                                                    },
                                                }}
                                                checked={formikProps.values.periodic_mng_1y_mt}
                                                onChange={(e) => { formikProps.setFieldValue('periodic_mng_1y_mt', Boolean(e.target.checked)) }}
                                            />
                                        }
                                        label={<Typography fontSize={12}>{actCodeBook.mc_periodic_1y_mt[cookies.load('site-lang')]}</Typography>}
                                    />
                                    <FormControlLabel
                                        color='sys1'
                                        fontSize='inherit'
                                        control={
                                            <Checkbox
                                                size="small"
                                                sx={{
                                                    color: pink[800],
                                                    '&.Mui-checked': {
                                                        color: pink[600],
                                                    },
                                                }}
                                                checked={formikProps.values.periodic_mng_mt}
                                                onChange={(e) => { formikProps.setFieldValue('periodic_mng_mt', Boolean(e.target.checked)) }}
                                            />
                                        }
                                        label={<Typography fontSize={12}>{actCodeBook.mc_periodic_mt[cookies.load('site-lang')]}</Typography>}
                                    />
                                    <PeriodicMngChkBox formikProps={formikProps} mngChkCode='periodic_mng_season_mt' mngCode='mc_periodic_season_mt' />
                                </div>
                                <TextField
                                    multiline
                                    maxRows={4}
                                    variant="outlined"
                                    id="revision_history"
                                    name="revision_history"
                                    label={machineRecorderLang.mcInfoPaper.inputField.revision_history.placeholder[cookies.load('site-lang')]}
                                    value={formikProps.values.revision_history}
                                    onChange={formikProps.handleChange}
                                    onBlur={formikProps.handleBlur}
                                    helperText={formikProps.touched.revision_history ? formikProps.errors.revision_history : ""}
                                    error={formikProps.touched.revision_history && Boolean(formikProps.errors.revision_history)}
                                    size='small'
                                    margin="dense"
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton size='small' onClick={() => { formikProps.setFieldValue('revision_history', '') }}>
                                                <ClearIcon size='small' />
                                            </IconButton>
                                        ),
                                        style: style.inputTexstField // font size of input text
                                    }}
                                    InputLabelProps={{ style: style.inputTexstField }} // font size of input label
                                />
                            </Paper>
                        </div>
                        <div>
                            <Paper id='prmListPaper' sx={style.paper} elevation={3}>
                                <div style={style.subtitle.box}>
                                    <BallotIcon color='sys1' />
                                    <div style={style.subtitle.text}>{`Param List`}</div>
                                </div>
                                <div id='prmListPaper_row_A' style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div id='prmListPaper_col_A' style={{ display: 'flex', flexDirection: 'column' }}>
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_batchsize' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_batchsize_kg' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_batchsize_vial' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_batchsize_syringe' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_gentlewing' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_chopper' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_spray' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_spray_kgmin' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_spray_rpm' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_gra_spray_air' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_paair' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_atair' />
                                    </div>
                                    <div id='prmListPaper_col_B' style={{ display: 'flex', flexDirection: 'column' }}>
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_gra_micro_prs' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_inlet_air_temp' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_exh_air_temp' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_inlet_air_vol' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_inlet_air_vol_rpm' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_exh_air_vol_rpm' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_roller_speed' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_roller_gap' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_cforece' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_grate' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_blendrpm' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_filling_depth' />
                                    </div>
                                    <div id='prmListPaper_col_C' style={{ display: 'flex', flexDirection: 'column' }}>
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_turret' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_feeder' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_feeder_2nd' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_pforce' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_pforce_2nd' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_mforce' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_mforce_2nd' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_pforce_kgf' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_mforce_kgf' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_drum' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_timer' />
                                        <ParamChkBox formikProps={formikProps} prmCode='prm_fill' />
                                    </div>
                                </div>
                            </Paper>
                        </div>
                    </div>
                    <Button
                        sx={{ ml: 2, mb: 1, width: 260 }}
                        color='sys1'
                        variant='contained'
                        size='small'
                        onClick={() => handleAllFold()}
                        startIcon={bRowFold && cRowFold && dRowFold && eRowFold && fRowFold ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}>
                        {<Typography sx={{ mr: 'auto', fontSize: 13 }}
                        >
                            {
                                bRowFold && cRowFold && dRowFold && eRowFold && fRowFold ?
                                    machineRecorderLang.allUnfoldButton[cookies.load('site-lang')] :
                                    machineRecorderLang.allFoldButton[cookies.load('site-lang')]
                            }
                        </Typography>}
                    </Button>
                    <div id='machine-recorder-row-b'>
                        <Button sx={{ ml: 2, mb: 1, width: 260 }} color='sys1' variant='contained' size='small' onClick={() => setBRowFold(!bRowFold)} startIcon={bRowFold ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}>{<Typography sx={{ mr: 'auto', fontSize: 13 }}>Periodic Qualification</Typography>}</Button>

                        {
                            bRowFold ? <div /> :
                                <div style={{ display: 'flex', flexWrap: 'wrap', boxSizing: 'border-box' }} >
                                    <div>
                                        <Paper id='mc_periodic_1y_qual_Paper' sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${actCodeBook.mc_periodic_1y_qual[cookies.load('site-lang')]} (Items : ${formikProps.values.mc_periodic_1y_qual.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.mc_periodic_1y_qual.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <DocItemDiv oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('mc_periodic_1y_qual', arrDelElement(formikProps.values.mc_periodic_1y_qual, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Periodic'
                                                inheritedArr={formikProps.values.mc_periodic_1y_qual}
                                                updateValue={function (newValue) { formikProps.setFieldValue('mc_periodic_1y_qual', newValue) }}
                                            />
                                        </Paper>
                                    </div>
                                    <div>
                                        <Paper id='mc_periodic_qual_Paper' sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${actCodeBook.mc_periodic_qual[cookies.load('site-lang')]} (Items : ${formikProps.values.mc_periodic_qual.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.mc_periodic_qual.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <DocItemDiv oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('mc_periodic_qual', arrDelElement(formikProps.values.mc_periodic_qual, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Periodic'
                                                inheritedArr={formikProps.values.mc_periodic_qual}
                                                updateValue={function (newValue) { formikProps.setFieldValue('mc_periodic_qual', newValue) }}
                                            />
                                        </Paper>
                                    </div>
                                    <div>
                                        <Paper id='mc_periodic_ster_Paper' sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${actCodeBook.mc_periodic_ster[cookies.load('site-lang')]} (Items : ${formikProps.values.mc_periodic_ster.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.mc_periodic_ster.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <DocItemDiv oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('mc_periodic_ster', arrDelElement(formikProps.values.mc_periodic_ster, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='STER'
                                                inheritedArr={formikProps.values.mc_periodic_ster}
                                                updateValue={function (newValue) { formikProps.setFieldValue('mc_periodic_ster', newValue) }}
                                            />
                                        </Paper>
                                    </div>
                                    <div>
                                        <Paper id='mc_periodic_vhp_Paper' sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${actCodeBook.mc_periodic_vhp[cookies.load('site-lang')]} (Items : ${formikProps.values.mc_periodic_vhp.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.mc_periodic_vhp.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <DocItemDiv oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('mc_periodic_vhp', arrDelElement(formikProps.values.mc_periodic_vhp, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='VHP'
                                                inheritedArr={formikProps.values.mc_periodic_vhp}
                                                updateValue={function (newValue) { formikProps.setFieldValue('mc_periodic_vhp', newValue) }}
                                            />
                                        </Paper>
                                    </div>
                                    <div>
                                        <Paper id='mc_periodic_review_Paper' sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${actCodeBook.mc_periodic_review[cookies.load('site-lang')]} (Items : ${formikProps.values.mc_periodic_review.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.mc_periodic_review.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <DocItemDiv oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('mc_periodic_review', arrDelElement(formikProps.values.mc_periodic_review, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Periodic'
                                                inheritedArr={formikProps.values.mc_periodic_review}
                                                updateValue={function (newValue) { formikProps.setFieldValue('mc_periodic_review', newValue) }}
                                            />
                                        </Paper>
                                    </div>
                                </div>
                        }
                    </div>
                    <div id='machine-recorder-row-c' >
                        <Button sx={{ ml: 2, mb: 1, width: 260 }} color='sys1' variant='contained' size='small' onClick={() => setCRowFold(!cRowFold)} startIcon={cRowFold ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}>{<Typography sx={{ mr: 'auto', fontSize: 13 }}>Qualification</Typography>}</Button>
                        {
                            cRowFold ? <div /> :
                                <div style={{ display: 'flex', flexDirection: 'row', boxSizing: 'border-box' }} >
                                    <div>
                                        <Paper id='mc_iqPaper' sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${actCodeBook.mc_iq[cookies.load('site-lang')]} (Items : ${formikProps.values.mc_iq.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.mc_iq.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <DocItemDiv oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('mc_iq', arrDelElement(formikProps.values.mc_iq, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='IQ'
                                                inheritedArr={formikProps.values.mc_iq}
                                                updateValue={function (newValue) { formikProps.setFieldValue('mc_iq', newValue) }}
                                            />
                                        </Paper>
                                    </div>
                                    <div>
                                        <Paper id='mc_oqPaper' sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${actCodeBook.mc_oq[cookies.load('site-lang')]} (Items : ${formikProps.values.mc_oq.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.mc_oq.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <DocItemDiv oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('mc_oq', arrDelElement(formikProps.values.mc_oq, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='OQ'
                                                inheritedArr={formikProps.values.mc_oq}
                                                updateValue={function (newValue) { formikProps.setFieldValue('mc_oq', newValue) }}
                                            />
                                        </Paper>
                                    </div>
                                    <div>
                                        <Paper id='mc_pqPaper' sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${actCodeBook.mc_pq[cookies.load('site-lang')]} (Items : ${formikProps.values.mc_pq.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.mc_pq.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <DocItemDiv oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('mc_pq', arrDelElement(formikProps.values.mc_pq, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='PQ'
                                                inheritedArr={formikProps.values.mc_pq}
                                                updateValue={function (newValue) { formikProps.setFieldValue('mc_pq', newValue) }}
                                            />
                                        </Paper>
                                    </div>
                                </div>
                        }
                    </div>
                    <div id='machine-recorder-row-d' >
                        <Button sx={{ ml: 2, mb: 1, width: 260 }} color='sys1' variant='contained' size='small' onClick={() => setDRowFold(!dRowFold)} startIcon={dRowFold ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}>{<Typography sx={{ mr: 'auto', fontSize: 13 }}>Qualifying Process Parameter</Typography>}</Button>
                        <div style={{ height: dRowFold ? '0px' : 'auto', visibility: dRowFold ? 'hidden' : 'visible', display: 'flex', flexWrap: 'wrap', boxSizing: 'border-box' }} >
                            <div id='paramItem1'>
                                {
                                    !formikProps.values.prm_list[0].prm_batchsize ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_batchsize[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_batchsize.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_batchsize.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            valueUnit={oneItem.valueUnit}
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_batchsize', arrDelElement(formikProps.values.prm_batchsize, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_batchsize}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_batchsize', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem2'>
                                {
                                    !formikProps.values.prm_list[0].prm_batchsize_kg ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_batchsize_kg[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_batchsize_kg.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_batchsize_kg.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            valueUnit={oneItem.valueUnit}
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_batchsize_kg', arrDelElement(formikProps.values.prm_batchsize_kg, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_batchsize_kg}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_batchsize_kg', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem34'>
                                {
                                    !formikProps.values.prm_list[0].prm_batchsize_vial ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_batchsize_vial[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_batchsize_vial.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_batchsize_vial.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            valueUnit={oneItem.valueUnit}
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_batchsize_vial', arrDelElement(formikProps.values.prm_batchsize_vial, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_batchsize_vial}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_batchsize_vial', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem35'>
                                {
                                    !formikProps.values.prm_list[0].prm_batchsize_syringe ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_batchsize_syringe[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_batchsize_syringe.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_batchsize_syringe.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            valueUnit={oneItem.valueUnit}
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_batchsize_syringe', arrDelElement(formikProps.values.prm_batchsize_syringe, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_batchsize_syringe}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_batchsize_syringe', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem3'>
                                {
                                    !formikProps.values.prm_list[0].prm_gentlewing ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_gentlewing[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_gentlewing.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_gentlewing.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            decimalPoint={1}
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_gentlewing', arrDelElement(formikProps.values.prm_gentlewing, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_gentlewing}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_gentlewing', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem4'>
                                {
                                    !formikProps.values.prm_list[0].prm_chopper ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_chopper[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_chopper.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_chopper.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_chopper', arrDelElement(formikProps.values.prm_chopper, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_chopper}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_chopper', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem5'>
                                {
                                    !formikProps.values.prm_list[0].prm_spray ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_spray[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_spray.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_spray.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            decimalPoint={2}
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_spray', arrDelElement(formikProps.values.prm_spray, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_spray}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_spray', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem6'>
                                {
                                    !formikProps.values.prm_list[0].prm_spray_kgmin ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_spray_kgmin[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_spray_kgmin.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_spray_kgmin.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            decimalPoint={2}
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_spray_kgmin', arrDelElement(formikProps.values.prm_spray_kgmin, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_spray_kgmin}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_spray_kgmin', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem7'>
                                {
                                    !formikProps.values.prm_list[0].prm_spray_rpm ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_spray_rpm[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_spray_rpm.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_spray_rpm.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_spray_rpm', arrDelElement(formikProps.values.prm_spray_rpm, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_spray_rpm}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_spray_rpm', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem23'>
                                {
                                    !formikProps.values.prm_list[0].prm_gra_spray_air ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_gra_spray_air[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_gra_spray_air.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_gra_spray_air.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            decimalPoint = { 1 }
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_gra_spray_air', arrDelElement(formikProps.values.prm_gra_spray_air, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_gra_spray_air}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_gra_spray_air', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem24'>
                                {
                                    !formikProps.values.prm_list[0].prm_gra_micro_prs ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_gra_micro_prs[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_gra_micro_prs.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_gra_micro_prs.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_gra_micro_prs', arrDelElement(formikProps.values.prm_gra_micro_prs, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_gra_micro_prs}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_gra_micro_prs', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem21'>
                                {
                                    !formikProps.values.prm_list[0].prm_inlet_air_temp ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_inlet_air_temp[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_inlet_air_temp.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_inlet_air_temp.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_inlet_air_temp', arrDelElement(formikProps.values.prm_inlet_air_temp, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_inlet_air_temp}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_inlet_air_temp', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem31'>
                                {
                                    !formikProps.values.prm_list[0].prm_exh_air_temp ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_exh_air_temp[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_exh_air_temp.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_exh_air_temp.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_exh_air_temp', arrDelElement(formikProps.values.prm_exh_air_temp, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_exh_air_temp}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_exh_air_temp', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem22'>
                                {
                                    !formikProps.values.prm_list[0].prm_inlet_air_vol ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_inlet_air_vol[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_inlet_air_vol.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_inlet_air_vol.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_inlet_air_vol', arrDelElement(formikProps.values.prm_inlet_air_vol, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_inlet_air_vol}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_inlet_air_vol', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem32'>
                                {
                                    !formikProps.values.prm_list[0].prm_inlet_air_vol_rpm ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_inlet_air_vol_rpm[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_inlet_air_vol_rpm.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_inlet_air_vol_rpm.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_inlet_air_vol_rpm', arrDelElement(formikProps.values.prm_inlet_air_vol_rpm, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_inlet_air_vol_rpm}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_inlet_air_vol_rpm', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem36'>
                                {
                                    !formikProps.values.prm_list[0].prm_exh_air_vol_rpm ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_exh_air_vol_rpm[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_exh_air_vol_rpm.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_exh_air_vol_rpm.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_exh_air_vol_rpm', arrDelElement(formikProps.values.prm_exh_air_vol_rpm, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_exh_air_vol_rpm}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_exh_air_vol_rpm', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem25'>
                                {
                                    !formikProps.values.prm_list[0].prm_roller_speed ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_roller_speed[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_roller_speed.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_roller_speed.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_roller_speed', arrDelElement(formikProps.values.prm_roller_speed, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_roller_speed}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_roller_speed', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem26'>
                                {
                                    !formikProps.values.prm_list[0].prm_roller_gap ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_roller_gap[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_roller_gap.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_roller_gap.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            decimalPoint={2}
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_roller_gap', arrDelElement(formikProps.values.prm_roller_gap, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_roller_gap}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_roller_gap', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem8'>
                                {
                                    !formikProps.values.prm_list[0].prm_grate ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_grate[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_grate.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_grate.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_grate', arrDelElement(formikProps.values.prm_grate, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_grate}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_grate', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem9'>
                                {
                                    !formikProps.values.prm_list[0].prm_blendrpm ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_blendrpm[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_blendrpm.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_blendrpm.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_blendrpm', arrDelElement(formikProps.values.prm_blendrpm, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_blendrpm}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_blendrpm', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem27'>
                                {
                                    !formikProps.values.prm_list[0].prm_filling_depth ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_filling_depth[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_filling_depth.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_filling_depth.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_filling_depth', arrDelElement(formikProps.values.prm_filling_depth, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_filling_depth}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_filling_depth', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem10'>
                                {
                                    !formikProps.values.prm_list[0].prm_cforece ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_cforece[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_cforece.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_cforece.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_cforece', arrDelElement(formikProps.values.prm_cforece, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_cforece}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_cforece', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem11'>
                                {
                                    !formikProps.values.prm_list[0].prm_turret ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_turret[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_turret.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_turret.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_turret', arrDelElement(formikProps.values.prm_turret, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_turret}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_turret', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem12'>
                                {
                                    !formikProps.values.prm_list[0].prm_feeder ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_feeder[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_feeder.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_feeder.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_feeder', arrDelElement(formikProps.values.prm_feeder, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_feeder}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_feeder', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem30'>
                                {
                                    !formikProps.values.prm_list[0].prm_feeder_2nd ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_feeder_2nd[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_feeder_2nd.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_feeder_2nd.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_feeder_2nd', arrDelElement(formikProps.values.prm_feeder_2nd, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_feeder_2nd}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_feeder_2nd', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem13'>
                                {
                                    !formikProps.values.prm_list[0].prm_pforce ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_pforce[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_pforce.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_pforce.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            decimalPoint={2}
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_pforce', arrDelElement(formikProps.values.prm_pforce, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_pforce}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_pforce', newValue) }}
                                            />
                                        </Paper>

                                }
                            </div>
                            <div id='paramItem14'>
                                {
                                    !formikProps.values.prm_list[0].prm_mforce ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_mforce[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_mforce.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_mforce.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            decimalPoint={2}
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_mforce', arrDelElement(formikProps.values.prm_mforce, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_mforce}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_mforce', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem28'>
                                {
                                    !formikProps.values.prm_list[0].prm_pforce_2nd ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_pforce_2nd[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_pforce_2nd.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_pforce_2nd.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            decimalPoint={2}
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_pforce_2nd', arrDelElement(formikProps.values.prm_pforce_2nd, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_pforce_2nd}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_pforce_2nd', newValue) }}
                                            />
                                        </Paper>

                                }
                            </div>
                            <div id='paramItem29'>
                                {
                                    !formikProps.values.prm_list[0].prm_mforce_2nd ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_mforce_2nd[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_mforce_2nd.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_mforce_2nd.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            decimalPoint={2}
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_mforce_2nd', arrDelElement(formikProps.values.prm_mforce_2nd, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_mforce_2nd}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_mforce_2nd', newValue) }}
                                            />
                                        </Paper>

                                }
                            </div>
                            <div id='paramItem15'>
                                {
                                    !formikProps.values.prm_list[0].prm_pforce_kgf ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_pforce_kgf[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_pforce_kgf.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_pforce_kgf.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_pforce_kgf', arrDelElement(formikProps.values.prm_pforce_kgf, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_pforce_kgf}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_pforce_kgf', newValue) }}
                                            />
                                        </Paper>

                                }
                            </div>
                            <div id='paramItem16'>
                                {
                                    !formikProps.values.prm_list[0].prm_mforce_kgf ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_mforce_kgf[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_mforce_kgf.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_mforce_kgf.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_mforce_kgf', arrDelElement(formikProps.values.prm_mforce_kgf, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_mforce_kgf}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_mforce_kgf', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem17'>
                                {
                                    !formikProps.values.prm_list[0].prm_drum ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_drum[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_drum.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_drum.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_drum', arrDelElement(formikProps.values.prm_drum, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_drum}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_drum', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem18'>
                                {
                                    !formikProps.values.prm_list[0].prm_paair ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_paair[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_paair.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_paair.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            decimalPoint={1}
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_paair', arrDelElement(formikProps.values.prm_paair, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_paair}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_paair', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem19'>
                                {
                                    !formikProps.values.prm_list[0].prm_atair ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_atair[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_atair.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_atair.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            decimalPoint={1}
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_atair', arrDelElement(formikProps.values.prm_atair, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_atair}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_atair', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem20'>
                                {
                                    !formikProps.values.prm_list[0].prm_fill ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_fill[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_fill.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_fill.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_fill', arrDelElement(formikProps.values.prm_fill, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_fill}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_fill', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                            <div id='paramItem33'>
                                {
                                    !formikProps.values.prm_list[0].prm_timer ? <div /> :
                                        <Paper sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${prmCodeBook.prm_timer[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_timer.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.prm_timer.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <ParamItemDiv
                                                            oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('prm_timer', arrDelElement(formikProps.values.prm_timer, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='Q'
                                                inheritedArr={formikProps.values.prm_timer}
                                                updateValue={function (newValue) { formikProps.setFieldValue('prm_timer', newValue) }}
                                            />
                                        </Paper>
                                }
                            </div>
                        </div>
                    </div>
                    <div id='machine-recorder-row-e'>
                        <Button sx={{ ml: 2, mb: 1, width: 260 }} color='sys1' variant='contained' size='small' onClick={() => setERowFold(!eRowFold)} startIcon={eRowFold ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}>{<Typography sx={{ mr: 'auto', fontSize: 13 }}>Cleaning Validation</Typography>}</Button>
                        {
                            eRowFold ? <div /> :
                                <div style={{ display: 'flex', flexDirection: 'row', boxSizing: 'border-box' }} >
                                    <div>
                                        <Paper id='mc_periodic_cvPaper' sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${actCodeBook.mc_periodic_cv[cookies.load('site-lang')]} (Items : ${formikProps.values.mc_periodic_cv.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.mc_periodic_cv.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <DocItemDiv oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('mc_periodic_cv', arrDelElement(formikProps.values.mc_periodic_cv, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='valAtt'
                                                qualAtt='CV'
                                                inheritedArr={formikProps.values.mc_periodic_cv}
                                                updateValue={function (newValue) { formikProps.setFieldValue('mc_periodic_cv', newValue) }}
                                            />
                                        </Paper>
                                    </div>
                                </div>
                        }
                    </div>
                    <div id='machine-recorder-row-f'>
                        <Button sx={{ ml: 2, mb: 1, width: 260 }} color='sys1' variant='contained' size='small' onClick={() => setFRowFold(!fRowFold)} startIcon={fRowFold ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}>{<Typography sx={{ mr: 'auto', fontSize: 13 }}>Mapping Test</Typography>}</Button>
                        {
                            fRowFold ? <div /> :
                                <div style={{ display: 'flex', flexDirection: 'row', boxSizing: 'border-box' }} >
                                    <div>
                                        <Paper id='mc_periodic_1y_mtPaper' sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${actCodeBook.mc_periodic_1y_mt[cookies.load('site-lang')]} (Items : ${formikProps.values.mc_periodic_1y_mt.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.mc_periodic_1y_mt.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <DocItemDiv oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('mc_periodic_1y_mt', arrDelElement(formikProps.values.mc_periodic_1y_mt, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='MT'
                                                inheritedArr={formikProps.values.mc_periodic_1y_mt}
                                                updateValue={function (newValue) { formikProps.setFieldValue('mc_periodic_1y_mt', newValue) }}
                                            />
                                        </Paper>
                                    </div>
                                    <div>
                                        <Paper id='mc_periodic_mtPaper' sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${actCodeBook.mc_periodic_mt[cookies.load('site-lang')]} (Items : ${formikProps.values.mc_periodic_mt.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.mc_periodic_mt.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <DocItemDiv oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('mc_periodic_mt', arrDelElement(formikProps.values.mc_periodic_mt, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='MT'
                                                inheritedArr={formikProps.values.mc_periodic_mt}
                                                updateValue={function (newValue) { formikProps.setFieldValue('mc_periodic_mt', newValue) }}
                                            />
                                        </Paper>
                                    </div>
                                    <div>
                                        <Paper id='mc_periodic_season_mtPaper' sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${actCodeBook.mc_periodic_season_mt[cookies.load('site-lang')]} (Items : ${formikProps.values.mc_periodic_season_mt.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.mc_periodic_season_mt.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <DocItemDiv oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('mc_periodic_season_mt', arrDelElement(formikProps.values.mc_periodic_season_mt, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='MT'
                                                inheritedArr={formikProps.values.mc_periodic_season_mt}
                                                updateValue={function (newValue) { formikProps.setFieldValue('mc_periodic_season_mt', newValue) }}
                                            />
                                        </Paper>
                                    </div>
                                    <div>
                                        <Paper id='mc_mtPaper' sx={style.paper} elevation={3}>
                                            <div style={style.subtitle.box}>
                                                <VerifiedIcon color='sys1' />
                                                <div style={style.subtitle.text}>{`${actCodeBook.mc_mt[cookies.load('site-lang')]} (Items : ${formikProps.values.mc_mt.length})`}</div>
                                            </div>
                                            { // 현재 배열 객체 정보 출력 iterator
                                                formikProps.values.mc_mt.map((oneItem, index) => (
                                                    <div style={style.arrItem.oneItem}>
                                                        <DocItemDiv oneItem={oneItem} />
                                                        <div style={style.arrItem.delItem}>
                                                            <Button size="small" variant='contained' style={{ height: '100%' }} sx={{ p: 0 }} color='error' onClick={() => formikProps.setFieldValue('mc_mt', arrDelElement(formikProps.values.mc_mt, index))}><DeleteForeverIcon /></Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <CdmsSelectorMB
                                                colName='qualAtt'
                                                qualAtt='MT'
                                                inheritedArr={formikProps.values.mc_mt}
                                                updateValue={function (newValue) { formikProps.setFieldValue('mc_mt', newValue) }}
                                            />
                                        </Paper>
                                    </div>
                                </div>
                        }
                    </div>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={backdrop}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </form>
            )}
        </Formik>
    )

}

export default MachineRecorder;