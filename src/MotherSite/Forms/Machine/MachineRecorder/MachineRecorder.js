// ======================================================================================== [Import Libaray]
import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import cookies from 'react-cookies'
import * as yup from 'yup';

import axios from 'axios';

import moment from 'moment';
import 'moment/locale/ko';	//대한민국

// ======================================================================================== [Import Material UI Libaray]
import { Button, Checkbox, FormControlLabel, IconButton, Paper, TextField, Typography } from '@mui/material';
//icon
import ClearIcon from '@mui/icons-material/Clear';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import VerifiedIcon from '@mui/icons-material/Verified';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveIcon from '@mui/icons-material/Save';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

// ======================================================================================== [Import Component] js
import machineRecorderLang from './machineRecorderLang'

// Sub Recorder
import QualModalButton from './ModalRecorder/QualModalButton/QualModalButton'

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
        eq_code: yup.string()
        .required(machineRecorderLang.mcInfoPaper.inputField.eq_code.valMsg.required[cookies.load('site-lang')]),
    });

    // 제정/개정에서 같이 쓰기 위해 initialValues는 외부에서 props로 전달함
    // const initialValues = {
    //     prepared_type : 'NEW',
    //     approval_payload :[[]],
    //     revision_history : '',
    //     previous_approval_payload_id : null,
    //     eq_code : '',
    //     eq_code_alt : '',
    //     eq_code_alt2 : '',
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
        setBRowFold(true)
        setCRowFold(true)
        setDRowFold(true)
        setERowFold(true)
        setFRowFold(true)
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
                eq_code : values.eq_code,
                eq_code_alt : values.eq_code_alt,
                eq_code_alt2 : values.eq_code_alt2,
                periodic_qual : values.periodic_qual,
                periodic_ster : values.periodic_ster,
                periodic_review : values.periodic_review,
                iq : values.iq,
                oq : values.oq,
                pq : values.pq,
                periodic_cv : values.periodic_cv,
                cv : values.cv,
                periodic_mt : values.periodic_mt,
                mt : values.mt,
                prm_list : values.prm_list,
                prm_bathsize : values.prm_bathsize,
                prm_gentlewing : values.prm_gentlewing,
                prm_chopper : values.prm_chopper,
                prm_spray : values.prm_spray,
                prm_spray_rpm : values.prm_spray_rpm,
                prm_grate : values.prm_grate,
                prm_blendrpm : values.prm_blendrpm,
                prm_cforece : values.prm_cforece,
                prm_turret : values.prm_turret,
                prm_feeder : values.prm_feeder,
                prm_mforce : values.prm_mforce,
                prm_pforce : values.prm_pforce,
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
            if (props.handleModalClose) props.handleModalClose() // 부모가 modal이면 닫아주기
        }
    }

    const actionsa = [
        { icon: <FileCopyIcon />, name: 'Copy' },
        { icon: <SaveIcon />, name: 'Save' },
      ];
      


    useEffect(()=>{
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
                    <Button
                    color='avmFold'
                    variant='contained' size = 'small'
                    sx={{ position: 'absolute', top: 70, right: 16 }}
                    onClick={()=>handleAllFold()}
                    >
                        {machineRecorderLang.allFoldButton[cookies.load('site-lang')]}
                    </Button>
                    <div id='MachineRecorderA' style={{display:'flex', flexDirection:'row', marginLeft:'16px', boxSizing:'border-box'}} >
                        <ApprovalLine
                        sysCode = 'sys1'
                        forId = 'machine_recorder'
                        inheritedArr = { formikProps.values.approval_payload }
                        updateValue = { function ( newValue ) { formikProps.setFieldValue( 'approval_payload', newValue )}}
                        immediateEffective = { immediateEffective }
                        setImmediateEffective = { setImmediateEffective }
                        />
                        <Paper id='mcInfoPaper' sx={style.paper} elevation={3}>
                            <div style={style.subtitle.box}>
                                <FingerprintIcon color='sys1'/>
                                <div style={style.subtitle.text}>{"Personal Identifiable Information (PII)"}</div>
                            </div>
                            <TextField
                            required
                            disabled = {!(props.preparedType == "NEW")}
                            variant="outlined"
                            id="eq_code"
                            name="eq_code"
                            label={machineRecorderLang.mcInfoPaper.inputField.eq_code.placeholder[cookies.load('site-lang')]}
                            value={formikProps.values.eq_code}
                            onChange={formikProps.handleChange}
                            onBlur={formikProps.handleBlur}
                            helperText={formikProps.touched.eq_code ? formikProps.errors.eq_code : ""}
                            error={formikProps.touched.eq_code && Boolean(formikProps.errors.eq_code)}
                            size='small'
                            margin="dense"
                            fullWidth
                            InputProps={{
                                endAdornment:(
                                    <IconButton size='small' onClick={()=>{formikProps.setFieldValue('eq_code','')}}>
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
                            id="eq_code_alt"
                            name="eq_code_alt"
                            label={machineRecorderLang.mcInfoPaper.inputField.eq_code_alt.placeholder[cookies.load('site-lang')]}
                            value={formikProps.values.eq_code_alt}
                            onChange={formikProps.handleChange}
                            onBlur={formikProps.handleBlur}
                            helperText={formikProps.touched.eq_code_alt ? formikProps.errors.eq_code_alt : ""}
                            error={formikProps.touched.eq_code_alt && Boolean(formikProps.errors.eq_code_alt)}
                            size='small'
                            margin="dense"
                            fullWidth
                            InputProps={{
                                endAdornment:(
                                    <IconButton size='small' onClick={()=>{formikProps.setFieldValue('eq_code_alt','')}}>
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
                            id="eq_code_alt2"
                            name="eq_code_alt2"
                            label={machineRecorderLang.mcInfoPaper.inputField.eq_code_alt2.placeholder[cookies.load('site-lang')]}
                            value={formikProps.values.eq_code_alt2}
                            onChange={formikProps.handleChange}
                            onBlur={formikProps.handleBlur}
                            helperText={formikProps.touched.eq_code_alt2 ? formikProps.errors.eq_code_alt2 : ""}
                            error={formikProps.touched.eq_code_alt2 && Boolean(formikProps.errors.eq_code_alt2)}
                            size='small'
                            margin="dense"
                            fullWidth
                            InputProps={{
                                endAdornment:(
                                    <IconButton size='small' onClick={()=>{formikProps.setFieldValue('eq_code_alt2','')}}>
                                        <ClearIcon size='small'/>
                                    </IconButton>
                                ),
                                style: style.inputTexstField // font size of input text
                            }}
                            InputLabelProps={{style: style.inputTexstField}} // font size of input label
                            />

                            <FormControlLabel
                            color='sys1'
                            fontSize='inherit'
                            control={
                                <Checkbox
                                size="small"
                                checked = {formikProps.values.prm_list[0].prm_bathsize}
                                onChange={(e)=>{
                                    let temp = [...formikProps.values.prm_list]
                                    temp[0].prm_bathsize = Boolean(e.target.checked)
                                    console.log(temp)
                                    formikProps.setFieldValue('prm_list', temp)
                                }}
                                />
                            }
                            label={<Typography fontSize={12}>prm_bathsize</Typography> }/>
                        </Paper>
                    </div>

                    <div id='MachineRecorderB'>
                        <Button sx={{ml:2, mb:1}} color='sys1' variant='contained' size ='small' onClick={()=> setBRowFold(!bRowFold)}>{`Periodic Qualification (${bRowFold ? machineRecorderLang.unfold[cookies.load('site-lang')] : machineRecorderLang.fold[cookies.load('site-lang')]})`}</Button>
                    
                    {
                        bRowFold ? <div/> : 
                        <div style={{display : 'flex', flexDirection:'row', boxSizing:'border-box' }} >
                            <div>
                                <Paper id='periodic_qual_Paper' sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Periodic Qualification (Items : ${formikProps.values.periodic_qual.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.periodic_qual.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <DocItemDiv oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'periodic_qual', arrDelElement(formikProps.values.periodic_qual, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'PERIODIC'
                                    inheritedArr = { formikProps.values.periodic_qual }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'periodic_qual', newValue )}}
                                    />
                                </Paper>
                            </div>
                            <div>
                                <Paper id='periodic_ster_Paper' sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Periodic Sterilization Qualification (Items : ${formikProps.values.periodic_ster.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.periodic_ster.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <DocItemDiv oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'periodic_ster', arrDelElement(formikProps.values.periodic_ster, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'STER'
                                    inheritedArr = { formikProps.values.periodic_ster }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'periodic_ster', newValue )}}
                                    />
                                </Paper>
                            </div>
                            <div>
                                <Paper id='periodic_review_Paper' sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Periodic Review (Items : ${formikProps.values.periodic_review.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.periodic_review.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <DocItemDiv oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'periodic_review', arrDelElement(formikProps.values.periodic_review, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'Periodic'
                                    inheritedArr = { formikProps.values.periodic_review }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'periodic_review', newValue )}}
                                    />
                                </Paper>
                            </div>
                        </div>
                    }
                    </div>
                    <div id='MachineRecorderC' >
                        <Button sx={{ml:2, mb:1}} color='sys1' variant='contained' size ='small' onClick={()=> setCRowFold(!cRowFold)}>{`Qualification (${cRowFold ? machineRecorderLang.unfold[cookies.load('site-lang')] : machineRecorderLang.fold[cookies.load('site-lang')]})`}</Button>
                    {
                        cRowFold ? <div/> : 
                        <div style={{display : 'flex', flexDirection:'row', boxSizing:'border-box' }} >
                            <div>
                                <Paper id='iqPaper' sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Installation Qualification (Items : ${formikProps.values.iq.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.iq.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <DocItemDiv oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'iq', arrDelElement(formikProps.values.iq, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'IQ'
                                    inheritedArr = { formikProps.values.iq }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'iq', newValue )}}
                                    />
                                </Paper>
                            </div>
                            <div>                            
                                <Paper id='oqPaper' sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Operational Qualification (Items : ${formikProps.values.oq.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.oq.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <DocItemDiv oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'oq', arrDelElement(formikProps.values.oq, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'OQ'
                                    inheritedArr = { formikProps.values.oq }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'oq', newValue )}}
                                    />
                                </Paper>
                            </div>
                            <div>                            
                                <Paper id='pqPaper' sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Performance Qualification (Items : ${formikProps.values.pq.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.pq.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <DocItemDiv oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'pq', arrDelElement(formikProps.values.pq, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'PQ'
                                    inheritedArr = { formikProps.values.pq }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'pq', newValue )}}
                                    />
                                </Paper>
                            </div>
                        </div>
                    }
                    </div>
                    <div>
                        <Button sx={{ml:2, mb:1}} color='sys1' variant='contained' size ='small' onClick={()=> setDRowFold(!dRowFold)}>{`Qualifying Process Parameter (${dRowFold ? machineRecorderLang.unfold[cookies.load('site-lang')] : machineRecorderLang.fold[cookies.load('site-lang')]})`}</Button>
                    </div>
                    {
                        dRowFold ? <div/> :
                        <div id='MachineRecorderD' style={{display : 'flex', flexDirection:'row', boxSizing:'border-box'}} >
                            <div id = 'paramItem1'>
                            {
                                !formikProps.values.prm_list[0].prm_bathsize ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Qualifying Batch Size (Items : ${formikProps.values.prm_bathsize.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_bathsize.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                valueUnit = { oneItem.valueUnit }
                                                minValue = { oneItem.minValue }
                                                maxValue = { oneItem.maxValue }
                                                oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'prm_bathsize', arrDelElement(formikProps.values.prm_bathsize, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'Q'
                                    inheritedArr = { formikProps.values.prm_bathsize }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'prm_bathsize', newValue )}}
                                    />
                                </Paper>
                            }
                            </div>
                            <div id = 'paramItem2'>
                            {
                                !formikProps.values.prm_list[0].prm_gentlewing ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Qualifying GentleWing RPM (Items : ${formikProps.values.prm_gentlewing.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_gentlewing.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                minValue = { oneItem.minValue }
                                                maxValue = { oneItem.maxValue }
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
                            <div id = 'paramItem3'>
                            {
                                !formikProps.values.prm_list[0].prm_chopper ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Qualifying Chopper RPM (Items : ${formikProps.values.prm_chopper.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_chopper.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                minValue = { oneItem.minValue }
                                                maxValue = { oneItem.maxValue }
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
                            <div id = 'paramItem4'>
                            {
                                !formikProps.values.prm_list[0].prm_spray ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Qualifying Spray Rate (Items : ${formikProps.values.prm_spray.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_spray.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                minValue = { oneItem.minValue }
                                                maxValue = { oneItem.maxValue }
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
                            <div id = 'paramItem5'>
                            {
                                !formikProps.values.prm_list[0].prm_spray_rpm ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Qualifying Spray RPM (Items : ${formikProps.values.prm_spray_rpm.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_spray_rpm.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                minValue = { oneItem.minValue }
                                                maxValue = { oneItem.maxValue }
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
                            <div id = 'paramItem6'>
                            {
                                !formikProps.values.prm_list[0].prm_grate ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Qualifying Grate RPM (Items : ${formikProps.values.prm_grate.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_grate.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                minValue = { oneItem.minValue }
                                                maxValue = { oneItem.maxValue }
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
                            <div id = 'paramItem7'>
                            {
                                !formikProps.values.prm_list[0].prm_blendrpm ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Qualifying Blending RPM (Items : ${formikProps.values.prm_blendrpm.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_blendrpm.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                minValue = { oneItem.minValue }
                                                maxValue = { oneItem.maxValue }
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
                            <div id = 'paramItem8'>
                            {
                                !formikProps.values.prm_list[0].prm_cforece ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Qualifying Compact Force (Items : ${formikProps.values.prm_cforece.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_cforece.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                minValue = { oneItem.minValue }
                                                maxValue = { oneItem.maxValue }
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
                            <div id = 'paramItem9'>
                            {
                                !formikProps.values.prm_list[0].prm_turret ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Qualifying Turret RPM (Items : ${formikProps.values.prm_turret.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_turret.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                minValue = { oneItem.minValue }
                                                maxValue = { oneItem.maxValue }
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
                            <div id = 'paramItem10'>
                            {
                                !formikProps.values.prm_list[0].prm_feeder ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Qualifying Feeder RPM (Items : ${formikProps.values.prm_feeder.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_feeder.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                minValue = { oneItem.minValue }
                                                maxValue = { oneItem.maxValue }
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
                            <div id = 'paramItem11'>
                            {
                                !formikProps.values.prm_list[0].prm_mforce ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Qualifying Main Compact Force (Items : ${formikProps.values.prm_mforce.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_mforce.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                minValue = { oneItem.minValue }
                                                maxValue = { oneItem.maxValue }
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
                            <div id = 'paramItem12'>
                            {
                                !formikProps.values.prm_list[0].prm_pforce ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Qualifying Pre. Compact Force (Items : ${formikProps.values.prm_pforce.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_pforce.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                minValue = { oneItem.minValue }
                                                maxValue = { oneItem.maxValue }
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
                            <div id = 'paramItem13'>
                            {
                                !formikProps.values.prm_list[0].prm_drum ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Qualifying Drum RPM (Items : ${formikProps.values.prm_drum.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_drum.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                minValue = { oneItem.minValue }
                                                maxValue = { oneItem.maxValue }
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
                            <div id = 'paramItem14'>
                            {
                                !formikProps.values.prm_list[0].prm_paair ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Qualifying Pattern Air (Items : ${formikProps.values.prm_paair.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_paair.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                minValue = { oneItem.minValue }
                                                maxValue = { oneItem.maxValue }
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
                            <div id = 'paramItem15'>
                            {
                                !formikProps.values.prm_list[0].prm_atair ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Qualifying Atomizing Air (Items : ${formikProps.values.prm_atair.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_atair.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                minValue = { oneItem.minValue }
                                                maxValue = { oneItem.maxValue }
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
                            <div id = 'paramItem16'>
                            {
                                !formikProps.values.prm_list[0].prm_fill ? <div/> : 
                                <Paper sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Qualifying Filling capacity (Items : ${formikProps.values.prm_fill.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prm_fill.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <ParamItemDiv
                                                minValue = { oneItem.minValue }
                                                maxValue = { oneItem.maxValue }
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
                    }
                    <div>
                        <Button sx={{ml:2, mb:1}} color='sys1' variant='contained' size ='small' onClick={()=> setERowFold(!eRowFold)}>{`Cleaning Validation & Periodic CV (${eRowFold ? machineRecorderLang.unfold[cookies.load('site-lang')] : machineRecorderLang.fold[cookies.load('site-lang')]})`}</Button>
                    </div>
                    {
                        eRowFold ? <div/> :
                        <div id='MachineRecorderD' style={{display : 'flex', flexDirection:'row', boxSizing:'border-box'}} >
                            <div>
                                <Paper id='cvPaper' sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Cleaning Validation & Periodic CV (Items : ${formikProps.values.periodic_cv.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.periodic_cv.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <DocItemDiv oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'periodic_cv', arrDelElement(formikProps.values.periodic_cv, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'valAtt'
                                    qualAtt = 'CV'
                                    inheritedArr = { formikProps.values.periodic_cv }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'periodic_cv', newValue )}}
                                    />
                                </Paper>
                            </div>
                        </div>
                    }
                    <div>
                        <Button sx={{ml:2, mb:1}} color='sys1' variant='contained' size ='small' onClick={()=> setFRowFold(!fRowFold)}>{`Mapping Test & Periodic MT (${fRowFold ? machineRecorderLang.unfold[cookies.load('site-lang')] : machineRecorderLang.fold[cookies.load('site-lang')]})`}</Button>
                    </div>
                    {
                        fRowFold ? <div/> :
                        <div id='MachineRecorderC' style={{display : 'flex', flexDirection:'row', boxSizing:'border-box'}} >
                            <div>
                                <Paper id='mtPaper' sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`Mapping Test & Periodic MT (Items : ${formikProps.values.periodic_mt.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.periodic_mt.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <DocItemDiv oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'periodic_mt', arrDelElement(formikProps.values.periodic_mt, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'qualAtt'
                                    qualAtt = 'MT'
                                    inheritedArr = { formikProps.values.periodic_mt }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'periodic_mt', newValue )}}
                                    />
                                </Paper>
                            </div>
                        </div>
                    }
                </form>
            )}
        </Formik>
    )

}

export default MachineRecorder;