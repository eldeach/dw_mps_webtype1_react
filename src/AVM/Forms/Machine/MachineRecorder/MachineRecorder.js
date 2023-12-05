// ======================================================================================== [Import Libaray]
import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import cookies from 'react-cookies'
import * as yup from 'yup';

import axios from 'axios';

import moment from 'moment';
import 'moment/locale/ko';	//대한민국

// ======================================================================================== [Import Material UI Libaray]
import { Button, IconButton, Chip, Paper, TextField } from '@mui/material';
//icon
import ClearIcon from '@mui/icons-material/Clear';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import VerifiedIcon from '@mui/icons-material/Verified';
import SummarizeIcon from '@mui/icons-material/Summarize';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

// ======================================================================================== [Import Component] js
import machineRecorderLang from './machineRecorderLang'

// Sub Recorder
import IqModalButton from './SubRecorder/IqRecorder/IqModalButton'

// Popup Form
import ApprovalLine from '../../../../System/ApprovalSystem/ApprovalLine/ApprovalLine';

//System Func
import arrDelElement from '../../../../System/Funcs/ArrHandler/arrDelElement'

// ======================================================================================== [Import Component] CSS


function MachineRecorder(props){

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
            width:500,
            p: 2,
            mb:2
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
    //     iq : [],
    //     oq : [],
    //     pq : [],
    //     periodic_qual : [],
    //     periodic_review : [],
    //     periodic_ster : [],
    //     periodic_cv : [],
    //     param : [],
    // }
    
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
                iq : values.iq,
                oq : values.oq,
                pq : values.pq,
                periodic_qual : values.periodic_qual,
                periodic_review : values.periodic_review,
                periodic_ster : values.periodic_ster,
                periodic_cv : values.periodic_cv,
                param : values.param,
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

    const { handlePageTitle, handleSystemCode } = props

    useEffect(()=>{
        handlePageTitle(machineRecorderLang.formTitle[cookies.load('site-lang')])
        handleSystemCode('sys2')
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
                style={{width:'100%', hegith:'100%', display:'flex', flexDirection:'row'}}
                id = "machine_recorder"
                autoComplete='off'
                onSubmit={formikProps.handleSubmit}
                >
                    <div id='MachineRecorderA' style={{display:'flex', flexDirection:'column', marginLeft:'auto', boxSizing:'border-box'}} >
                        <ApprovalLine
                        sysCode = 'sys2'
                        forId = 'machine_recorder'
                        inheritedArr = { formikProps.values.approval_payload }
                        updateValue = { function ( newValue ) { formikProps.setFieldValue( 'approval_payload', newValue )}}
                        immediateEffective = { immediateEffective }
                        setImmediateEffective = { setImmediateEffective }
                        />
                    </div>
                    <div id='MachineRecorderB' style={{marginLeft:'20px', marginRight:'auto', marginBottom:'20px' ,display:'flex', flexDirection:'column', boxSizing:'border-box'}} >
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
                        </Paper>
                        <Paper id='iqPaper' sx={style.paper} elevation={3}>
                            <div style={style.subtitle.box}>
                                <VerifiedIcon color='sys2'/>
                                <div style={style.subtitle.text}>Installation Qualification</div>
                            </div>
                            <div>
                            { // 현재 배열 객체 정보 출력 iterator
                                formikProps.values.iq.map((oneItem, index)=>(
                                <div style={style.arrItem.oneItem}>
                                <div style={style.arrItem.itemInfo}>
                                    <div style={style.arrItem.subInfo}>
                                        <Chip size="small" icon={<SummarizeIcon size="small"/>} color='sys2' variant="outlined" label={`Doc # : ${oneItem.doc_no}`}/>
                                        <Chip size="small" sx={{ml:0.8}} icon={<SummarizeIcon size="small"/>} color='sys2' variant="outlined" label={`Rev # ${oneItem.doc_rev_no}`}/>
                                    </div>
                                    <div style={style.arrItem.subInfo}>
                                        <Chip size="small" icon={<EditCalendarIcon size="small"/>} color='sys2' label={`Perfromed From : ${moment(oneItem.perform_date_start).format('YYYY-MM-DD')}`}/>
                                    </div>
                                    <div style={style.arrItem.subInfo}>
                                        <Chip size="small" icon={<EventAvailableIcon size="small"/>} color='sys2' label={`Perfromed From : ${moment(oneItem.perform_date_end).format('YYYY-MM-DD')}`}/>
                                    </div>
                                    <div style={style.arrItem.subInfo}>
                                        <Chip size="small" icon={<EventAvailableIcon size="small"/>} color='sys2' label={`Approved : ${moment(oneItem.doc_approval_date).format('YYYY-MM-DD')}`}/>
                                    </div>
                                </div>
                                <div style={style.arrItem.delItem}>
                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'iq', arrDelElement(formikProps.values.iq, index))}><DeleteForeverIcon/></Button>
                                </div>
                            </div>
                            ))
                            }
                            </div>
                            <IqModalButton
                            inheritedArr = { formikProps.values.iq }
                            updateValue = { function ( newValue ) { formikProps.setFieldValue( 'iq', newValue )}}
                            />
                        </Paper>
                    </div>
                </form>
            )}
        </Formik>
    )

}

export default MachineRecorder;