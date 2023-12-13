// ======================================================================================== [Import Libaray]
import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import cookies from 'react-cookies'
import * as yup from 'yup';

import axios from 'axios';

import moment from 'moment';
import 'moment/locale/ko';	//대한민국

// ======================================================================================== [Import Material UI Libaray]
import { Button, Checkbox, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup, Switch, IconButton, Paper, TextField, Typography } from '@mui/material';
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
import QualModalButton from './ModalRecorder/QualModalButton/QualModalButton'

// Const Object
import prmCodeBook from '../PrmCodeBook/prmCodeBook'

// Component
import ParamItemDiv from '../../../Component/ParamItemDiv/ParamItemDiv'
import DocItemDiv from '../../../Component/DocItemDiv/DocItemDiv';

// Popup Form
import ApprovalLine from '../../../../System/ApprovalSystem/ApprovalLine/ApprovalLine';

//System Func
import arrDelElement from '../../../../System/Funcs/ArrHandler/arrDelElement'

// ======================================================================================== [Import Component] CSS


function MachineRecorder(props){

    const { handlePageTitle, handleSystemCode } = props
    
    const style = {
        subtitle:{ // SubRecorder subtitle div 스타일
            box : {
                display:'flex', flexDirection:'row', alignItems:'center', fontSize:'medium'
            },
            text : {
                marginTop:'4px', marginLeft:'2px'
            }
        },
        paper : { // SubRecorder Paper 객체 스타일
            minWidth:500,
            width:500,
            p: 2,
            mb:2,
            ml:2,
            flexGrow : 0
        },
        inputTexstField : {
            fontSize: 14,
            paddingRight:0
        },
        arrItem : { // SubRecorder에서 다루는 값이 배열이면 이 속성이 있음
            oneItem : {
                padding:'10px',
                marginTop:'5px',
                marginBottom:'5px',
                borderRadius:'5px',
                boxSizing:'border-box',
                display:'flex',
                flexDirection:'row',
                border:'#D3D3D3 solid 1px'
            },
            delItem : {
                height: 'auto',
                paddingLeft:'10px',
                boxSizing:'border-box'
            },
            itemInfo : {
                flexGrow : 1,
                display : 'flex',
                flexDirection : 'column',
            },
            subInfo : {
                marginTop : '7px',
                display : 'flex',
                flexDirection : 'row'
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

    const handleAllFold = function (){
        if (bRowFold && cRowFold && dRowFold && eRowFold && fRowFold){
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

    
    const [ immediateEffective, setImmediateEffective ] = useState(false);

    const onSubmitFunc = async function (values, actions){

        if ( immediateEffective ) {
            actions.setFieldValue('approval_payload', [[]])
        }

        if ( !immediateEffective && values.approval_payload.length===1 && values.approval_payload[0].length === 0) {
            alert ("결재라인!")
        } else {          
            const valuePayload = {
                immediate_effective : immediateEffective,
                prepared_type : props.preparedType,
                approval_payload : values.approval_payload,
                revision_history : values.revision_history,
                previous_approval_payload_id : values.previous_approval_payload_id,
                mng_code : values.mng_code,
                mng_code_alt : values.mng_code_alt,
                mng_code_alt2 : values.mng_code_alt2,
                mng_name : values.mng_name,
                mng_team : values.mng_team,
                machine_type : values.machine_type,
                gmp_impact : values.gmp_impact,
                periodic_mng_qual : values.periodic_mng_qual,
                periodic_mng_ster : values.periodic_mng_ster,
                periodic_mng_vhp : values.periodic_mng_vhp,
                periodic_mng_review : values.periodic_mng_review,
                periodic_mng_cv : values.periodic_mng_cv,
                periodic_mng_mt : values.periodic_mng_mt,
                mc_periodic_qual : values.mc_periodic_qual,
                mc_periodic_ster : values.mc_periodic_ster,
                mc_periodic_vhp : values.mc_periodic_vhp,
                mc_periodic_review : values.mc_periodic_review,
                mc_iq : values.mc_iq,
                mc_oq : values.mc_oq,
                mc_pq : values.mc_pq,
                mc_periodic_cv : values.mc_periodic_cv,
                mc_cv : values.mc_cv,
                mc_periodic_mt : values.mc_periodic_mt,
                mc_mt : values.mc_mt,
                prm_list : values.prm_list,
                prm_batchsize : values.prm_batchsize,
                prm_batchsize_kg : values.prm_batchsize_kg,
                prm_gentlewing : values.prm_gentlewing,
                prm_chopper : values.prm_chopper,
                prm_spray : values.prm_spray,
                prm_spray_kgmin : values.prm_spray_kgmin,
                prm_spray_rpm : values.prm_spray_rpm,
                prm_grate : values.prm_grate,
                prm_blendrpm : values.prm_blendrpm,
                prm_cforece : values.prm_cforece,
                prm_feeder : values.prm_feeder,
                prm_turret : values.prm_turret,
                prm_pforce : values.prm_pforce,
                prm_mforce : values.prm_mforce,
                prm_pforce_kgf : values.prm_pforce_kgf,
                prm_mforce_kgf : values.prm_mforce_kgf,
                prm_drum : values.prm_drum,
                prm_paair : values.prm_paair,
                prm_atair : values.prm_atair,
                prm_fill : values.prm_fill

            }
            
            let rs = await axios.post('/addmachine', valuePayload)
            .then(( res ) => {
               return res
            })
            .catch( (error) => {
                return error.response
            })
    
            if (rs.status === 200) {
                actions.resetForm()
            } else if ( rs.status === 452 ) {
                alert (rs.data[cookies.load('site-lang')])
            } else if ( rs.status === 512 ) {
                alert (rs.data[cookies.load('site-lang')])
            }
            console.log(rs)
            if (props.preparedType == "REVISE") props.handleModalClose() // 부모가 modal이면 닫아주기
        }
    }

    const actionsa = [
        { icon: <FileCopyIcon />, name: 'Copy' },
        { icon: <SaveIcon />, name: 'Save' },
      ];
      


    useEffect(()=>{
        console.log(props.initialValues.prm_batchsize)
        handlePageTitle(machineRecorderLang.formTitle[cookies.load('site-lang')])
        handleSystemCode('sys1')
    },[])

    return(
        <Formik
        validationSchema={yupSchema}
        initialValues={props.initialValues}
        onSubmit={async (values, actions)=>{
            await onSubmitFunc(values, actions)
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
                    <div id='machine-recorder-row-a' style={{display:'flex', flexDirection:'row', marginLeft:'16px', boxSizing:'border-box'}} >
                        <div>
                            <ApprovalLine
                            sysCode = 'sys1'
                            forId = 'machine_recorder'
                            inheritedArr = { formikProps.values.approval_payload }
                            updateValue = { function ( newValue ) { formikProps.setFieldValue( 'approval_payload', newValue )}}
                            immediateEffective = { immediateEffective }
                            setImmediateEffective = { setImmediateEffective }
                            />
                        </div>
                        <div>
                            <Paper id='mcInfoPaper' sx={style.paper} elevation={3}>
                                <div style={style.subtitle.box}>
                                    <FingerprintIcon color='sys1'/>
                                    <div style={style.subtitle.text}>{"System Identifiable Information (SII)"}</div>
                                </div>
                                <TextField
                                required
                                disabled = {!(props.preparedType == "NEW")}
                                variant="outlined"
                                id="mng_code"
                                name="mng_code"
                                label={machineRecorderLang.mcInfoPaper.inputField.mng_code.placeholder[cookies.load('site-lang')]}
                                value={formikProps.values.mng_code}
                                onChange={formikProps.handleChange}
                                onBlur={formikProps.handleBlur}
                                helperText={formikProps.touched.mng_code ? formikProps.errors.mng_code : ""}
                                error={formikProps.touched.mng_code && Boolean(formikProps.errors.mng_code)}
                                size='small'
                                margin="dense"
                                fullWidth
                                InputProps={{
                                    endAdornment:(
                                        <IconButton size='small' onClick={()=>{formikProps.setFieldValue('mng_code','')}}>
                                            <ClearIcon size='small'/>
                                        </IconButton>
                                    ),
                                    style: style.inputTexstField // font size of input text
                                }}
                                InputLabelProps={{style: style.inputTexstField}} // font size of input label
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
                                    endAdornment:(
                                        <IconButton size='small' onClick={()=>{formikProps.setFieldValue('mng_code_alt','')}}>
                                            <ClearIcon size='small'/>
                                        </IconButton>
                                    ),
                                    style: style.inputTexstField // font size of input text
                                }}
                                InputLabelProps={{style: style.inputTexstField}} // font size of input label
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
                                    endAdornment:(
                                        <IconButton size='small' onClick={()=>{formikProps.setFieldValue('mng_code_alt2','')}}>
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
                                    endAdornment:(
                                        <IconButton size='small' onClick={()=>{formikProps.setFieldValue('mng_name','')}}>
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
                                    endAdornment:(
                                        <IconButton size='small' onClick={()=>{formikProps.setFieldValue('mng_team','')}}>
                                            <ClearIcon size='small'/>
                                        </IconButton>
                                    ),
                                    style: style.inputTexstField // font size of input text
                                }}
                                InputLabelProps={{style: style.inputTexstField}} // font size of input label
                                />
                                <FormControl style={{ border:'#D3D3D3 solid 1px', borderRadius:'5px', marginTop:'5px', marginBottom:'2px', paddingLeft:'10px', width:'100%', boxSizing:'border-box', display: 'flex', flexDirection: 'row', alignItems:'center' }}>
                                    <FormLabel
                                    id="machine_type"
                                    sx={{mr:1}}
                                    color='sys1'
                                    >
                                        {<Typography sx={{fontSize:14}}>{machineRecorderLang.mcInfoPaper.inputField.machine_type.placeholder[cookies.load('site-lang')]}</Typography>}
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
                                        label={<Typography sx={{fontSize:14}}>{machineRecorderLang.mcInfoPaper.inputField.machine_type.eq[cookies.load('site-lang')]}</Typography>}
                                        />
                                        <FormControlLabel
                                        value="ROOM"
                                        control={<Radio color='sys1' />}
                                        label={<Typography sx={{fontSize:14}}>{machineRecorderLang.mcInfoPaper.inputField.machine_type.room[cookies.load('site-lang')]}</Typography>}
                                        />     
                                        <FormControlLabel
                                        value="COM"
                                        control={<Radio color='sys1' />}
                                        label={<Typography sx={{fontSize:14}}>{machineRecorderLang.mcInfoPaper.inputField.machine_type.com[cookies.load('site-lang')]}</Typography>}
                                        />     
                                    </RadioGroup>
                                </FormControl>
                                <FormControlLabel
                                control={ <Switch color = 'sys1' checked={ formikProps.values.gmp_impact } onChange={ ( e ) => {formikProps.setFieldValue('gmp_impact',e.target.checked)} } name="gmp_impact" /> }
                                label={
                                    <Typography size="small" sx = {{ fontSize : '14px', color : (formikProps.values.gmp_impact ? 'orange' : 'black') }}>{`GMP IMPACT System`}</Typography>     
                                }
                                />
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
                                        checked = {formikProps.values.periodic_mng_qual}
                                        onChange={(e)=>{ formikProps.setFieldValue('periodic_mng_qual', Boolean(e.target.checked))}}
                                        />
                                    }
                                    label={<Typography fontSize={12}>{machineRecorderLang.mcInfoPaper.checkbox.periodic_mng_qual[cookies.load('site-lang')]}</Typography> }
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
                                        checked = {formikProps.values.periodic_mng_ster}
                                        onChange={(e)=>{ formikProps.setFieldValue('periodic_mng_ster', Boolean(e.target.checked))}}
                                        />
                                    }
                                    label={<Typography fontSize={12}>{machineRecorderLang.mcInfoPaper.checkbox.periodic_mng_ster[cookies.load('site-lang')]}</Typography> }
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
                                        checked = {formikProps.values.periodic_mng_vhp}
                                        onChange={(e)=>{ formikProps.setFieldValue('periodic_mng_vhp', Boolean(e.target.checked))}}
                                        />
                                    }
                                    label={<Typography fontSize={12}>{machineRecorderLang.mcInfoPaper.checkbox.periodic_mng_vhp[cookies.load('site-lang')]}</Typography> }
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
                                        checked = {formikProps.values.periodic_mng_review}
                                        onChange={(e)=>{ formikProps.setFieldValue('periodic_mng_review', Boolean(e.target.checked))}}
                                        />
                                    }
                                    label={<Typography fontSize={12}>{machineRecorderLang.mcInfoPaper.checkbox.periodic_mng_review[cookies.load('site-lang')]}</Typography> }
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
                                        checked = {formikProps.values.periodic_mng_cv}
                                        onChange={(e)=>{ formikProps.setFieldValue('periodic_mng_cv', Boolean(e.target.checked))}}
                                        />
                                    }
                                    label={<Typography fontSize={12}>{machineRecorderLang.mcInfoPaper.checkbox.periodic_mng_cv[cookies.load('site-lang')]}</Typography> }
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
                                        checked = {formikProps.values.periodic_mng_mt}
                                        onChange={(e)=>{ formikProps.setFieldValue('periodic_mng_mt', Boolean(e.target.checked))}}
                                        />
                                    }
                                    label={<Typography fontSize={12}>{machineRecorderLang.mcInfoPaper.checkbox.periodic_mng_mt[cookies.load('site-lang')]}</Typography> }
                                    />
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
                                    endAdornment:(
                                        <IconButton size='small' onClick={()=>{formikProps.setFieldValue('revision_history','')}}>
                                            <ClearIcon size='small'/>
                                        </IconButton>
                                    ),
                                    style: style.inputTexstField // font size of input text
                                }}
                                InputLabelProps={{style: style.inputTexstField}} // font size of input label
                                />
                            </Paper>
                        </div>
                        <div>
                            <Paper id='prmListPaper' sx={style.paper} elevation={3}>
                                <div style={style.subtitle.box}>
                                    <BallotIcon color='sys1'/>
                                    <div style={style.subtitle.text}>{`Param List`}</div>
                                </div>
                                <div id = 'prmListPaper_row_A' style={{display:'flex', flexDirection : 'row'}}>
                                    <div id = 'prmListPaper_col_A' style={{display : 'flex', flexDirection : 'column'}}>
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
                                            checked = {formikProps.values.prm_list[0].prm_batchsize}
                                            onChange={(e)=>{
                                                let temp = [...formikProps.values.prm_list]
                                                temp[0].prm_batchsize = Boolean(e.target.checked)
                                                formikProps.setFieldValue('prm_list', temp)
                                            }}
                                            />
                                        }
                                        label={<Typography fontSize={12}>{prmCodeBook.prm_batchsize[cookies.load('site-lang')]}</Typography> }/>
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
                                            checked = {formikProps.values.prm_list[0].prm_batchsize_kg}
                                            onChange={(e)=>{
                                                let temp = [...formikProps.values.prm_list]
                                                temp[0].prm_batchsize_kg = Boolean(e.target.checked)
                                                formikProps.setFieldValue('prm_list', temp)
                                            }}
                                            />
                                        }
                                        label={<Typography fontSize={12}>{prmCodeBook.prm_batchsize_kg[cookies.load('site-lang')]}</Typography> }/>
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
                                            checked = {formikProps.values.prm_list[0].prm_gentlewing}
                                            onChange={(e)=>{
                                                let temp = [...formikProps.values.prm_list]
                                                temp[0].prm_gentlewing = Boolean(e.target.checked)
                                                formikProps.setFieldValue('prm_list', temp)
                                            }}
                                            />
                                        }
                                        label={<Typography fontSize={12}>{prmCodeBook.prm_gentlewing[cookies.load('site-lang')]}</Typography> }/>
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
                                            checked = {formikProps.values.prm_list[0].prm_chopper}
                                            onChange={(e)=>{
                                                let temp = [...formikProps.values.prm_list]
                                                temp[0].prm_chopper = Boolean(e.target.checked)
                                                formikProps.setFieldValue('prm_list', temp)
                                            }}
                                            />
                                        }
                                        label={<Typography fontSize={12}>{prmCodeBook.prm_chopper[cookies.load('site-lang')]}</Typography> }/>
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
                                            checked = {formikProps.values.prm_list[0].prm_spray}
                                            onChange={(e)=>{
                                                let temp = [...formikProps.values.prm_list]
                                                temp[0].prm_spray = Boolean(e.target.checked)
                                                formikProps.setFieldValue('prm_list', temp)
                                            }}
                                            />
                                        }
                                        label={<Typography fontSize={12}>{prmCodeBook.prm_spray[cookies.load('site-lang')]}</Typography> }/>
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
                                            checked = {formikProps.values.prm_list[0].prm_spray_kgmin}
                                            onChange={(e)=>{
                                                let temp = [...formikProps.values.prm_list]
                                                temp[0].prm_spray_kgmin = Boolean(e.target.checked)
                                                formikProps.setFieldValue('prm_list', temp)
                                            }}
                                            />
                                        }
                                        label={<Typography fontSize={12}>{prmCodeBook.prm_spray_kgmin[cookies.load('site-lang')]}</Typography> }/>
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
                                            checked = {formikProps.values.prm_list[0].prm_spray_rpm}
                                            onChange={(e)=>{
                                                let temp = [...formikProps.values.prm_list]
                                                temp[0].prm_spray_rpm = Boolean(e.target.checked)
                                                formikProps.setFieldValue('prm_list', temp)
                                            }}
                                            />
                                        }
                                        label={<Typography fontSize={12}>{prmCodeBook.prm_spray_rpm[cookies.load('site-lang')]}</Typography> }/>
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
                                            checked = {formikProps.values.prm_list[0].prm_grate}
                                            onChange={(e)=>{
                                                let temp = [...formikProps.values.prm_list]
                                                temp[0].prm_grate = Boolean(e.target.checked)
                                                formikProps.setFieldValue('prm_list', temp)
                                            }}
                                            />
                                        }
                                        label={<Typography fontSize={12}>{prmCodeBook.prm_grate[cookies.load('site-lang')]}</Typography> }/>
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
                                            checked = {formikProps.values.prm_list[0].prm_blendrpm}
                                            onChange={(e)=>{
                                                let temp = [...formikProps.values.prm_list]
                                                temp[0].prm_blendrpm = Boolean(e.target.checked)
                                                formikProps.setFieldValue('prm_list', temp)
                                            }}
                                            />
                                        }
                                        label={<Typography fontSize={12}>{prmCodeBook.prm_blendrpm[cookies.load('site-lang')]}</Typography> }/>
                                    </div>
                                    <div id = 'prmListPaper_col_B'style={{display : 'flex', flexDirection : 'column'}}>
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
                                            checked = {formikProps.values.prm_list[0].prm_cforece}
                                            onChange={(e)=>{
                                                let temp = [...formikProps.values.prm_list]
                                                temp[0].prm_cforece = Boolean(e.target.checked)
                                                formikProps.setFieldValue('prm_list', temp)
                                            }}
                                            />
                                        }
                                        label={<Typography fontSize={12}>{prmCodeBook.prm_cforece[cookies.load('site-lang')]}</Typography> }/>
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
                                            checked = {formikProps.values.prm_list[0].prm_turret}
                                            onChange={(e)=>{
                                                let temp = [...formikProps.values.prm_list]
                                                temp[0].prm_turret = Boolean(e.target.checked)
                                                formikProps.setFieldValue('prm_list', temp)
                                            }}
                                            />
                                        }
                                        label={<Typography fontSize={12}>{prmCodeBook.prm_turret[cookies.load('site-lang')]}</Typography> }/>
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
                                            checked = {formikProps.values.prm_list[0].prm_feeder}
                                            onChange={(e)=>{
                                                let temp = [...formikProps.values.prm_list]
                                                temp[0].prm_feeder = Boolean(e.target.checked)
                                                formikProps.setFieldValue('prm_list', temp)
                                            }}
                                            />
                                        }
                                        label={<Typography fontSize={12}>{prmCodeBook.prm_feeder[cookies.load('site-lang')]}</Typography> }/>
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
                                            checked = {formikProps.values.prm_list[0].prm_pforce}
                                            onChange={(e)=>{
                                                let temp = [...formikProps.values.prm_list]
                                                temp[0].prm_pforce = Boolean(e.target.checked)
                                                formikProps.setFieldValue('prm_list', temp)
                                            }}
                                            />
                                        }
                                        label={<Typography fontSize={12}>{prmCodeBook.prm_pforce[cookies.load('site-lang')]}</Typography> }/>
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
                                            checked = {formikProps.values.prm_list[0].prm_mforce}
                                            onChange={(e)=>{
                                                let temp = [...formikProps.values.prm_list]
                                                temp[0].prm_mforce = Boolean(e.target.checked)
                                                formikProps.setFieldValue('prm_list', temp)
                                            }}
                                            />
                                        }
                                        label={<Typography fontSize={12}>{prmCodeBook.prm_mforce[cookies.load('site-lang')]}</Typography> }/>
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
                                            checked = {formikProps.values.prm_list[0].prm_pforce_kgf}
                                            onChange={(e)=>{
                                                let temp = [...formikProps.values.prm_list]
                                                temp[0].prm_pforce_kgf = Boolean(e.target.checked)
                                                formikProps.setFieldValue('prm_list', temp)
                                            }}
                                            />
                                        }
                                        label={<Typography fontSize={12}>{prmCodeBook.prm_pforce_kgf[cookies.load('site-lang')]}</Typography> }/>
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
                                            checked = {formikProps.values.prm_list[0].prm_mforce_kgf}
                                            onChange={(e)=>{
                                                let temp = [...formikProps.values.prm_list]
                                                temp[0].prm_mforce_kgf = Boolean(e.target.checked)
                                                formikProps.setFieldValue('prm_list', temp)
                                            }}
                                            />
                                        }
                                        label={<Typography fontSize={12}>{prmCodeBook.prm_mforce_kgf[cookies.load('site-lang')]}</Typography> }/>
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
                                            checked = {formikProps.values.prm_list[0].prm_drum}
                                            onChange={(e)=>{
                                                let temp = [...formikProps.values.prm_list]
                                                temp[0].prm_drum = Boolean(e.target.checked)
                                                formikProps.setFieldValue('prm_list', temp)
                                            }}
                                            />
                                        }
                                        label={<Typography fontSize={12}>{prmCodeBook.prm_drum[cookies.load('site-lang')]}</Typography> }/>
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
                                            checked = {formikProps.values.prm_list[0].prm_paair}
                                            onChange={(e)=>{
                                                let temp = [...formikProps.values.prm_list]
                                                temp[0].prm_paair = Boolean(e.target.checked)
                                                formikProps.setFieldValue('prm_list', temp)
                                            }}
                                            />
                                        }
                                        label={<Typography fontSize={12}>{prmCodeBook.prm_paair[cookies.load('site-lang')]}</Typography> }/>
                                    </div>
                                    <div id = 'prmListPaper_col_C'style={{display : 'flex', flexDirection : 'column'}}>
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
                                            checked = {formikProps.values.prm_list[0].prm_atair}
                                            onChange={(e)=>{
                                                let temp = [...formikProps.values.prm_list]
                                                temp[0].prm_atair = Boolean(e.target.checked)
                                                formikProps.setFieldValue('prm_list', temp)
                                            }}
                                            />
                                        }
                                        label={<Typography fontSize={12}>{prmCodeBook.prm_atair[cookies.load('site-lang')]}</Typography> }/>
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
                                            checked = {formikProps.values.prm_list[0].prm_fill}
                                            onChange={(e)=>{
                                                let temp = [...formikProps.values.prm_list]
                                                temp[0].prm_fill = Boolean(e.target.checked)
                                                formikProps.setFieldValue('prm_list', temp)
                                            }}
                                            />
                                        }
                                        label={<Typography fontSize={12}>{prmCodeBook.prm_fill[cookies.load('site-lang')]}</Typography> }/>
                                    </div>
                                </div>
                            </Paper>
                        </div>
                    </div>
                    <Button
                    sx={{ ml:2, mb:1, width:260 }}
                    color='sys1'
                    variant='contained' 
                    size ='small'
                    onClick={()=>handleAllFold()}
                    startIcon={ bRowFold && cRowFold && dRowFold && eRowFold && fRowFold ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon/>}>
                        {<Typography sx={{mr:'auto', fontSize:13}}
                        >
                            {
                                bRowFold && cRowFold && dRowFold && eRowFold && fRowFold ? 
                                machineRecorderLang.allUnfoldButton[cookies.load('site-lang')] :
                                machineRecorderLang.allFoldButton[cookies.load('site-lang')]
                            }
                        </Typography>}
                    </Button>
                    <div id='machine-recorder-row-b'>
                        <Button sx={{ml:2, mb:1, width:260 }} color='sys1' variant='contained' size ='small' onClick={()=> setBRowFold(!bRowFold)} startIcon={ bRowFold ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon/>}>{<Typography sx={{mr:'auto', fontSize:13}}>Periodic Qualification</Typography>}</Button>
                    
                    {
                        bRowFold ? <div/> : 
                        <div style={{display : 'flex', flexDirection:'row', boxSizing:'border-box' }} >
                            <div>
                                <Paper id='mc_periodic_qual_Paper' sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Periodic Qualification (Items : ${formikProps.values.mc_periodic_qual.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.mc_periodic_qual.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <DocItemDiv oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'mc_periodic_qual', arrDelElement(formikProps.values.mc_periodic_qual, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'Periodic'
                                    inheritedArr = { formikProps.values.mc_periodic_qual }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'mc_periodic_qual', newValue )}}
                                    />
                                </Paper>
                            </div>
                            <div>
                                <Paper id='mc_periodic_ster_Paper' sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Periodic Sterilization Qualification (Items : ${formikProps.values.mc_periodic_ster.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.mc_periodic_ster.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <DocItemDiv oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'mc_periodic_ster', arrDelElement(formikProps.values.mc_periodic_ster, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'STER'
                                    inheritedArr = { formikProps.values.mc_periodic_ster }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'mc_periodic_ster', newValue )}}
                                    />
                                </Paper>
                            </div>
                            <div>
                                <Paper id='mc_periodic_vhp_Paper' sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Periodic VHP Qualification (Items : ${formikProps.values.mc_periodic_vhp.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.mc_periodic_vhp.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <DocItemDiv oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'mc_periodic_vhp', arrDelElement(formikProps.values.mc_periodic_vhp, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'VHP'
                                    inheritedArr = { formikProps.values.mc_periodic_vhp }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'mc_periodic_vhp', newValue )}}
                                    />
                                </Paper>
                            </div>
                            <div>
                                <Paper id='mc_periodic_review_Paper' sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Periodic Review (Items : ${formikProps.values.mc_periodic_review.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.mc_periodic_review.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <DocItemDiv oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'mc_periodic_review', arrDelElement(formikProps.values.mc_periodic_review, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'Periodic'
                                    inheritedArr = { formikProps.values.mc_periodic_review }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'mc_periodic_review', newValue )}}
                                    />
                                </Paper>
                            </div>
                        </div>
                    }
                    </div>
                    <div id='machine-recorder-row-c' >
                        <Button sx={{ml:2, mb:1, width:260 }} color='sys1' variant='contained' size ='small' onClick={()=> setCRowFold(!cRowFold)} startIcon={ cRowFold ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon/>}>{<Typography sx={{mr:'auto', fontSize:13}}>Qualification</Typography>}</Button>
                    {
                        cRowFold ? <div/> : 
                        <div style={{display : 'flex', flexDirection:'row', boxSizing:'border-box' }} >
                            <div>
                                <Paper id='mc_iqPaper' sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Installation Qualification (Items : ${formikProps.values.mc_iq.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.mc_iq.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <DocItemDiv oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'mc_iq', arrDelElement(formikProps.values.mc_iq, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'IQ'
                                    inheritedArr = { formikProps.values.mc_iq }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'mc_iq', newValue )}}
                                    />
                                </Paper>
                            </div>
                            <div>                            
                                <Paper id='mc_oqPaper' sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Operational Qualification (Items : ${formikProps.values.mc_oq.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.mc_oq.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <DocItemDiv oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'mc_oq', arrDelElement(formikProps.values.mc_oq, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'OQ'
                                    inheritedArr = { formikProps.values.mc_oq }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'mc_oq', newValue )}}
                                    />
                                </Paper>
                            </div>
                            <div>                            
                                <Paper id='mc_pqPaper' sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Performance Qualification (Items : ${formikProps.values.mc_pq.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.mc_pq.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <DocItemDiv oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'mc_pq', arrDelElement(formikProps.values.mc_pq, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'PQ'
                                    inheritedArr = { formikProps.values.mc_pq }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'mc_pq', newValue )}}
                                    />
                                </Paper>
                            </div>
                        </div>
                    }
                    </div>
                    <div id='machine-recorder-row-d' >
                        <Button sx={{ml:2, mb:1, width:260 }} color='sys1' variant='contained' size ='small' onClick={()=> setDRowFold(!dRowFold)} startIcon={ dRowFold ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon/>}>{<Typography sx={{mr:'auto', fontSize:13}}>Qualifying Process Parameter</Typography>}</Button>
                        <div style={{height: dRowFold ? '0px' : 'auto' , visibility : dRowFold ? 'hidden' : 'visible', display : 'flex', flexWrap:'wrap', boxSizing:'border-box'}} >
                            <div id = 'paramItem1'>
                            {
                                !formikProps.values.prm_list[0].prm_batchsize ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`${prmCodeBook.prm_batchsize[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_batchsize.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_batchsize.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                valueUnit = { oneItem.valueUnit }
                                                oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'prm_batchsize', arrDelElement(formikProps.values.prm_batchsize, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'Q'
                                    inheritedArr = { formikProps.values.prm_batchsize }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'prm_batchsize', newValue )}}
                                    />
                                </Paper>
                            }
                            </div>
                            <div id = 'paramItem2'>
                            {
                                !formikProps.values.prm_list[0].prm_batchsize_kg ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`${prmCodeBook.prm_batchsize_kg[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_batchsize_kg.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_batchsize_kg.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                valueUnit = { oneItem.valueUnit }
                                                oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'prm_batchsize_kg', arrDelElement(formikProps.values.prm_batchsize_kg, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'Q'
                                    inheritedArr = { formikProps.values.prm_batchsize_kg }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'prm_batchsize_kg', newValue )}}
                                    />
                                </Paper>
                            }
                            </div>
                            <div id = 'paramItem3'>
                            {
                                !formikProps.values.prm_list[0].prm_gentlewing ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`${prmCodeBook.prm_gentlewing[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_gentlewing.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_gentlewing.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'prm_gentlewing', arrDelElement(formikProps.values.prm_gentlewing, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'Q'
                                    inheritedArr = { formikProps.values.prm_gentlewing }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'prm_gentlewing', newValue )}}
                                    />
                                </Paper>
                            }
                            </div>
                            <div id = 'paramItem4'>
                            {
                                !formikProps.values.prm_list[0].prm_chopper ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`${prmCodeBook.prm_chopper[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_chopper.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_chopper.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'prm_chopper', arrDelElement(formikProps.values.prm_chopper, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'Q'
                                    inheritedArr = { formikProps.values.prm_chopper }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'prm_chopper', newValue )}}
                                    />
                                </Paper>
                            }
                            </div>
                            <div id = 'paramItem5'>
                            {
                                !formikProps.values.prm_list[0].prm_spray ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`${prmCodeBook.prm_spray[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_spray.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_spray.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'prm_spray', arrDelElement(formikProps.values.prm_spray, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'Q'
                                    inheritedArr = { formikProps.values.prm_spray }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'prm_spray', newValue )}}
                                    />
                                </Paper>
                            }
                            </div>
                            <div id = 'paramItem6'>
                            {
                                !formikProps.values.prm_list[0].prm_spray_kgmin ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`${prmCodeBook.prm_spray_kgmin[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_spray_kgmin.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_spray_kgmin.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'prm_spray_kgmin', arrDelElement(formikProps.values.prm_spray_kgmin, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'Q'
                                    inheritedArr = { formikProps.values.prm_spray_kgmin }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'prm_spray_kgmin', newValue )}}
                                    />
                                </Paper>
                            }
                            </div>
                            <div id = 'paramItem7'>
                            {
                                !formikProps.values.prm_list[0].prm_spray_rpm ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`${prmCodeBook.prm_spray_rpm[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_spray_rpm.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_spray_rpm.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'prm_spray_rpm', arrDelElement(formikProps.values.prm_spray_rpm, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'Q'
                                    inheritedArr = { formikProps.values.prm_spray_rpm }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'prm_spray_rpm', newValue )}}
                                    />
                                </Paper>
                            }
                            </div>
                            <div id = 'paramItem8'>
                            {
                                !formikProps.values.prm_list[0].prm_grate ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`${prmCodeBook.prm_grate[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_grate.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_grate.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'prm_grate', arrDelElement(formikProps.values.prm_grate, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'Q'
                                    inheritedArr = { formikProps.values.prm_grate }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'prm_grate', newValue )}}
                                    />
                                </Paper>
                            }
                            </div>
                            <div id = 'paramItem9'>
                            {
                                !formikProps.values.prm_list[0].prm_blendrpm ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`${prmCodeBook.prm_blendrpm[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_blendrpm.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_blendrpm.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'prm_blendrpm', arrDelElement(formikProps.values.prm_blendrpm, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'Q'
                                    inheritedArr = { formikProps.values.prm_blendrpm }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'prm_blendrpm', newValue )}}
                                    />
                                </Paper>
                            }
                            </div>
                            <div id = 'paramItem10'>
                            {
                                !formikProps.values.prm_list[0].prm_cforece ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`${prmCodeBook.prm_cforece[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_cforece.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_cforece.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'prm_cforece', arrDelElement(formikProps.values.prm_cforece, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'Q'
                                    inheritedArr = { formikProps.values.prm_cforece }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'prm_cforece', newValue )}}
                                    />
                                </Paper>
                            }
                            </div>
                            <div id = 'paramItem11'>
                            {
                                !formikProps.values.prm_list[0].prm_turret ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`${prmCodeBook.prm_turret[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_turret.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_turret.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'prm_turret', arrDelElement(formikProps.values.prm_turret, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'Q'
                                    inheritedArr = { formikProps.values.prm_turret }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'prm_turret', newValue )}}
                                    />
                                </Paper>
                            }
                            </div>
                            <div id = 'paramItem12'>
                            {
                                !formikProps.values.prm_list[0].prm_feeder ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`${prmCodeBook.prm_feeder[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_feeder.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_feeder.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'prm_feeder', arrDelElement(formikProps.values.prm_feeder, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'Q'
                                    inheritedArr = { formikProps.values.prm_feeder }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'prm_feeder', newValue )}}
                                    />
                                </Paper>
                            }
                            </div>
                            <div id = 'paramItem13'>
                            {
                                !formikProps.values.prm_list[0].prm_pforce ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`${prmCodeBook.prm_pforce[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_pforce.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_pforce.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'prm_pforce', arrDelElement(formikProps.values.prm_pforce, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'Q'
                                    inheritedArr = { formikProps.values.prm_pforce }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'prm_pforce', newValue )}}
                                    />
                                </Paper>
                                
                            }
                            </div>
                            <div id = 'paramItem14'>
                            {
                               !formikProps.values.prm_list[0].prm_mforce ? <div/> : 
                               <Paper sx={style.paper} elevation={3}>
                                   <div style={style.subtitle.box}>
                                       <VerifiedIcon color='sys1'/>
                                       <div style={style.subtitle.text}>{`${prmCodeBook.prm_mforce[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_mforce.length})`}</div>
                                   </div>
                                   { // 현재 배열 객체 정보 출력 iterator
                                       formikProps.values.prm_mforce.map((oneItem, index)=>(
                                           <div style={style.arrItem.oneItem}>
                                               <ParamItemDiv
                                               oneItem = { oneItem }/>
                                               <div style={style.arrItem.delItem}>
                                                   <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'prm_mforce', arrDelElement(formikProps.values.prm_mforce, index))}><DeleteForeverIcon/></Button>
                                               </div>
                                           </div>
                                       ))
                                   }
                                   <QualModalButton
                                   colName = 'qualAtt'
                                   qualAtt = 'Q'
                                   inheritedArr = { formikProps.values.prm_mforce }
                                   updateValue = { function ( newValue ) { formikProps.setFieldValue( 'prm_mforce', newValue )}}
                                   />
                               </Paper> 
                            }
                            </div>
                            <div id = 'paramItem15'>
                            {
                                !formikProps.values.prm_list[0].prm_pforce_kgf ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`${prmCodeBook.prm_pforce_kgf[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_pforce_kgf.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_pforce_kgf.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'prm_pforce_kgf', arrDelElement(formikProps.values.prm_pforce_kgf, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'Q'
                                    inheritedArr = { formikProps.values.prm_pforce_kgf }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'prm_pforce_kgf', newValue )}}
                                    />
                                </Paper>
                                
                            }
                            </div>
                            <div id = 'paramItem16'>
                            {
                               !formikProps.values.prm_list[0].prm_mforce_kgf ? <div/> : 
                               <Paper sx={style.paper} elevation={3}>
                                   <div style={style.subtitle.box}>
                                       <VerifiedIcon color='sys1'/>
                                       <div style={style.subtitle.text}>{`${prmCodeBook.prm_mforce_kgf[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_mforce_kgf.length})`}</div>
                                   </div>
                                   { // 현재 배열 객체 정보 출력 iterator
                                       formikProps.values.prm_mforce_kgf.map((oneItem, index)=>(
                                           <div style={style.arrItem.oneItem}>
                                               <ParamItemDiv
                                               oneItem = { oneItem }/>
                                               <div style={style.arrItem.delItem}>
                                                   <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'prm_mforce_kgf', arrDelElement(formikProps.values.prm_mforce_kgf, index))}><DeleteForeverIcon/></Button>
                                               </div>
                                           </div>
                                       ))
                                   }
                                   <QualModalButton
                                   colName = 'qualAtt'
                                   qualAtt = 'Q'
                                   inheritedArr = { formikProps.values.prm_mforce_kgf }
                                   updateValue = { function ( newValue ) { formikProps.setFieldValue( 'prm_mforce_kgf', newValue )}}
                                   />
                               </Paper> 
                            }
                            </div>
                            <div id = 'paramItem17'>
                            {
                                !formikProps.values.prm_list[0].prm_drum ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`${prmCodeBook.prm_drum[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_drum.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_drum.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'prm_drum', arrDelElement(formikProps.values.prm_drum, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'Q'
                                    inheritedArr = { formikProps.values.prm_drum }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'prm_drum', newValue )}}
                                    />
                                </Paper>
                            }
                            </div>
                            <div id = 'paramItem18'>
                            {
                                !formikProps.values.prm_list[0].prm_paair ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`${prmCodeBook.prm_paair[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_paair.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_paair.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'prm_paair', arrDelElement(formikProps.values.prm_paair, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'Q'
                                    inheritedArr = { formikProps.values.prm_paair }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'prm_paair', newValue )}}
                                    />
                                </Paper>
                            }
                            </div>
                            <div id = 'paramItem19'>
                            {
                                !formikProps.values.prm_list[0].prm_atair ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`${prmCodeBook.prm_atair[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_atair.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_atair.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'prm_atair', arrDelElement(formikProps.values.prm_atair, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'Q'
                                    inheritedArr = { formikProps.values.prm_atair }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'prm_atair', newValue )}}
                                    />
                                </Paper>
                            }
                            </div>
                            <div id = 'paramItem20'>
                            {
                                !formikProps.values.prm_list[0].prm_fill ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`${prmCodeBook.prm_fill[cookies.load('site-lang')]} (Items : ${formikProps.values.prm_fill.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_fill.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'prm_fill', arrDelElement(formikProps.values.prm_fill, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'Q'
                                    inheritedArr = { formikProps.values.prm_fill }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'prm_fill', newValue )}}
                                    />
                                </Paper>
                            }
                            </div>
                        </div>
                    </div>
                    <div id='machine-recorder-row-e'>
                        <Button sx={{ ml:2, mb:1, width:260 }} color='sys1' variant='contained' size ='small' onClick={()=> setERowFold(!eRowFold)} startIcon={ eRowFold ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon/>}>{<Typography sx={{mr:'auto', fontSize:13}}>Cleaning Validation</Typography>}</Button>
                    {
                        eRowFold ? <div/> :
                        <div style={{display : 'flex', flexDirection:'row', boxSizing:'border-box'}} >
                            <div>
                                <Paper id='mc_periodic_cvPaper' sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Cleaning Validation & Periodic CV (Items : ${formikProps.values.mc_periodic_cv.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.mc_periodic_cv.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <DocItemDiv oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'mc_periodic_cv', arrDelElement(formikProps.values.mc_periodic_cv, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'valAtt'
                                    qualAtt = 'CV'
                                    inheritedArr = { formikProps.values.mc_periodic_cv }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'mc_periodic_cv', newValue )}}
                                    />
                                </Paper>
                            </div>
                        </div>
                    }
                    </div>
                    <div id='machine-recorder-row-f'>
                        <Button sx={{ ml:2, mb:1, width:260 }} color='sys1' variant='contained' size ='small' onClick={()=> setFRowFold(!fRowFold)} startIcon={ fRowFold ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon/>}>{<Typography sx={{mr:'auto', fontSize:13}}>Mapping Test</Typography>}</Button>
                    {
                        fRowFold ? <div/> :
                        <div style={{display : 'flex', flexDirection:'row', boxSizing:'border-box'}} >
                            <div>
                                <Paper id='mc_periodic_mtmtPaper' sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Mapping Test & Periodic MT (Items : ${formikProps.values.mc_periodic_mt.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.mc_periodic_mt.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <DocItemDiv oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'mc_periodic_mt', arrDelElement(formikProps.values.mc_periodic_mt, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'MT'
                                    inheritedArr = { formikProps.values.mc_periodic_mt }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'mc_periodic_mt', newValue )}}
                                    />
                                </Paper>
                            </div>
                        </div>
                    }
                    </div>
                </form>
            )}
        </Formik>
    )

}

export default MachineRecorder;