// ======================================================================================== [Import Libaray]
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import cookies from 'react-cookies'
import * as yup from 'yup';
import axios from 'axios';

// ======================================================================================== [Import Material UI Libaray]
import { Button, Checkbox, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup, Switch, IconButton, Paper, TextField, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';
//icon
import ClearIcon from '@mui/icons-material/Clear';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import VerifiedIcon from '@mui/icons-material/Verified';
import SaveIcon from '@mui/icons-material/Save';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// ======================================================================================== [Import Component] js
import productRecorderLang from './productRecorderLang'

// Sub Recorder
import QualModalButton from '../../Machine/MachineRecorder/ModalRecorder/QualModalButton/QualModalButton'

// Const Object
import actCodeBook from '../../Machine/ActCodeBook/actCodeBook'

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

    let navigate = useNavigate()
    
    const style = {
        subtitle:{ // SubRecorder subtitle div 스타일
            box : {
                display:'flex', flexDirection:'row', alignItems:'center', fontSize:'medium'
            },
            text : {
                marginTop:'4px', marginLeft:'2px', fontSize: '13px'
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
        .required(productRecorderLang.mcInfoPaper.inputField.mng_code.valMsg.required[cookies.load('site-lang')]),
        mng_name: yup.string()
        .required(productRecorderLang.mcInfoPaper.inputField.mng_name.valMsg.required[cookies.load('site-lang')]),
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
            alert ({kor:'결재라인을 확인해주세요.', eng : 'Please check the approval line.'}[cookies.load('site-lang')])
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
                periodic_mng_pv : values.periodic_mng_pv,
                prod_periodic_pv : values.prod_periodic_pv,
                prod_pv : values.prod_pv
            }
            
            let rs = await axios.post('/addproduct', valuePayload)
            .then(( res ) => {
                navigate('/submitsuccess')
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
        }
    }

    const actionsa = [
        { icon: <FileCopyIcon />, name: 'Copy' },
        { icon: <SaveIcon />, name: 'Save' },
      ];
      


    useEffect(()=>{
        console.log(props.initialValues.prm_batchsize)
        handlePageTitle(productRecorderLang.formTitle[cookies.load('site-lang')])
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
                id = "product_recorder"
                autoComplete='off'
                onSubmit={formikProps.handleSubmit}
                >
                    <div id='machine-recorder-row-a' style={{display:'flex', flexDirection:'row', marginLeft:'16px', boxSizing:'border-box'}} >
                        <div>
                            <ApprovalLine
                            sysCode = 'sys1'
                            forId = 'product_recorder'
                            inheritedArr = { formikProps.values.approval_payload }
                            updateValue = { function ( newValue ) { formikProps.setFieldValue( 'approval_payload', newValue )}}
                            immediateEffective = { immediateEffective }
                            setImmediateEffective = { setImmediateEffective }
                            />
                        </div>
                        <div>
                            <Paper id='prodInfoPaper' sx={style.paper} elevation={3}>
                                <div style={style.subtitle.box}>
                                    <FingerprintIcon color='sys1'/>
                                    <div style={style.subtitle.text}>{"Product Identifiable Information (PII)"}</div>
                                </div>
                                <TextField
                                required
                                disabled = {!(props.preparedType == "NEW")}
                                variant="outlined"
                                id="mng_code"
                                name="mng_code"
                                label={productRecorderLang.mcInfoPaper.inputField.mng_code.placeholder[cookies.load('site-lang')]}
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
                                label={productRecorderLang.mcInfoPaper.inputField.mng_code_alt.placeholder[cookies.load('site-lang')]}
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
                                label={productRecorderLang.mcInfoPaper.inputField.mng_code_alt2.placeholder[cookies.load('site-lang')]}
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
                                label={productRecorderLang.mcInfoPaper.inputField.mng_name.placeholder[cookies.load('site-lang')]}
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
                                        checked = {formikProps.values.periodic_mng_pv}
                                        onChange={(e)=>{ formikProps.setFieldValue('periodic_mng_pv', Boolean(e.target.checked))}}
                                        />
                                    }
                                    label={<Typography fontSize={12}>{actCodeBook.prod_periodic_pv[cookies.load('site-lang')]}</Typography> }
                                    />
                                </div>
                                <TextField
                                multiline
                                maxRows={4}
                                variant="outlined"
                                id="revision_history"
                                name="revision_history"
                                label={productRecorderLang.mcInfoPaper.inputField.revision_history.placeholder[cookies.load('site-lang')]}
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
                    </div>
                    <div id='machine-recorder-row-b'>
                        <div style={{display : 'flex', flexWrap:'wrap', boxSizing:'border-box' }} >
                            <div>
                                <Paper id='prod_periodic_pv_Paper' sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`${actCodeBook.prod_periodic_pv[cookies.load('site-lang')]} (Items : ${formikProps.values.prod_periodic_pv.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prod_periodic_pv.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <DocItemDiv oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'prod_periodic_pv', arrDelElement(formikProps.values.prod_periodic_pv, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'valAtt'
                                    qualAtt = 'PV'
                                    inheritedArr = { formikProps.values.prod_periodic_pv }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'prod_periodic_pv', newValue )}}
                                    />
                                </Paper>
                            </div>
                            <div>
                                <Paper id='prod__pv_Paper' sx={style.paper} elevation={3}>
                                    <div style={style.subtitle.box}>
                                        <VerifiedIcon color='sys1'/>
                                        <div style={style.subtitle.text}>{`${actCodeBook.prod_pv[cookies.load('site-lang')]} (Items : ${formikProps.values.prod_pv.length})`}</div>
                                    </div>
                                    { // 현재 배열 객체 정보 출력 iterator
                                        formikProps.values.prod_pv.map((oneItem, index)=>(
                                            <div style={style.arrItem.oneItem}>
                                                <DocItemDiv oneItem = { oneItem }/>
                                                <div style={style.arrItem.delItem}>
                                                    <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'prod_pv', arrDelElement(formikProps.values.prod_pv, index))}><DeleteForeverIcon/></Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <QualModalButton
                                    colName = 'valAtt'
                                    qualAtt = 'PV'
                                    inheritedArr = { formikProps.values.prod_pv }
                                    updateValue = { function ( newValue ) { formikProps.setFieldValue( 'prod_pv', newValue )}}
                                    />
                                </Paper>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    )

}

export default MachineRecorder;