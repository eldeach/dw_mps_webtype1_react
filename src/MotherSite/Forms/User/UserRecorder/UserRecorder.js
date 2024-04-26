// ======================================================================================== [Import Libaray]
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import cookies from 'react-cookies'
import * as yup from 'yup';

import axios from 'axios';

import moment from 'moment';
// import 'moment/locale/ko';	//대한민국

// ======================================================================================== [Import Material UI Libaray]
import { IconButton, Button, Chip, Paper, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
//icon
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ClearIcon from '@mui/icons-material/Clear';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import EmailIcon from '@mui/icons-material/Email';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CategoryIcon from '@mui/icons-material/Category';
import BusinessIcon from '@mui/icons-material/Business';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PhoneIcon from '@mui/icons-material/Phone';
import WorkIcon from '@mui/icons-material/Work';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import InfoIcon from '@mui/icons-material/Info';
import TitleIcon from '@mui/icons-material/Title';
import RouteIcon from '@mui/icons-material/Route';
import GppGoodIcon from '@mui/icons-material/GppGood';

// ======================================================================================== [Import Component] js
import userRecorderLang from './userRecorderLang'

// Sub Recorder
import EmailModalButton from './ModalRecorder/EmailModalButton/EmailModalButton'
import PhoneModalButton from './ModalRecorder/PhoneModalButton/PhoneModalButton';
import PositionModalButton from './ModalRecorder/PositionModalButton/PositionModalButton';
import AuthModalButton from './ModalRecorder/AuthModalButton/AuthModalButton';
// Popup Form
import ApprovalLine from '../../../../System/ApprovalSystem/ApprovalLine/ApprovalLine';

//System Func
import arrDelElement from '../../../../System/Funcs/ArrHandler/arrDelElement'


// ======================================================================================== [Import Component] CSS


function UserRecorder(props){

    const { handlePageTitle, handleSystemCode } = props
    let navigate = useNavigate()

    const style = {
        subtitle:{
            box : {
                display:'flex', flexDirection:'row', alignItems:'center', fontSize:'medium'
            },
            text : {
                marginTop:'4px', marginLeft:'2px'
            }
        },
        paper : {
            width:500,
            p: 2,
            mb:2
        },
        inputTexstField : {
            fontSize: 14,
            paddingRight:0
        },
        arrItem : {
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
        user_account: yup.string()
        .required(userRecorderLang.ppiPaper.inputField.user_account.valMsg.required[cookies.load('site-lang')]),
      
        user_pw: yup.string()
        .required(userRecorderLang.ppiPaper.inputField.user_pw.valMsg.required[cookies.load('site-lang')]),
      
        user_pw_confirm: yup.string()
        .oneOf([yup.ref('user_pw'), null], userRecorderLang.ppiPaper.inputField.user_pw_confirm.valMsg.match[cookies.load('site-lang')])
        .required(userRecorderLang.ppiPaper.inputField.user_pw_confirm.valMsg.required[cookies.load('site-lang')]),

        user_name: yup.string()
        .required(userRecorderLang.ppiPaper.inputField.user_name.valMsg.required[cookies.load('site-lang')]),
    });

    // 제정/개정에서 같이 쓰기 위해 initialValues는 외부에서 props로 전달함
    // const initialValues = {
    //     approval_payload :[[]],
    //     user_account: '',
    //     user_pw:'',
    //     user_pw_confirm:'',
    //     user_name:'',
    //     user_nickname:'',
    //     user_birthday:null,
    //     user_gender:'MALE',
    //     user_email:[],
    //     user_phone:[],
    //     user_position:[],
    // }
    
    const [ immediateEffective, setImmediateEffective ] = useState(false);

    const onSubmitFunc = async function (values, actions){

        if ( immediateEffective ) {
            actions.setFieldValue('approval_payload', [[]])
        } else {
            // actions.setFieldValue('approval_payload', doubleArrDelBlankArr( values.approval_payload ))
        }


        if ( !immediateEffective && values.approval_payload.length===1 && values.approval_payload[0].length === 0) {
            alert ({kor:'결재라인을 확인해주세요.', eng : 'Please check the approval line.'}[cookies.load('site-lang')])
        } else {          
            const valuePayload = {
                prepared_type : props.preparedType,
                immediate_effective : immediateEffective,
                approval_payload : values.approval_payload,
                previous_approval_payload_id : values.previous_approval_payload_id,
                user_account : values.user_account,
                user_pw : values.user_pw,
                user_name : values.user_name,
                user_nickname : values.user_nickname,
                user_birthday : moment(values.user_birthday).format('YYYY-MM-DD'),
                user_gender : values.user_gender,
                user_email : values.user_email,
                user_phone : values.user_phone,
                user_position : values.user_position,
                user_auth : values.user_auth,
                revision_history : values.revision_history
            }
            
            let rs = await axios.post('/addaccount', valuePayload)
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



    const [userPwAsterisk,setUserPwAsterisk] = useState("password");
    const toggleserPwAsterisk = () => {
        if ( userPwAsterisk === "password" ) {
            setUserPwAsterisk( "text" )
        } else {
            setUserPwAsterisk( "password" )
        }
    }

    const [userPwConfirmAsterisk,setUserPwConfirmAsterisk] = useState("password");
    const toggleserPwConfirmAsterisk = () => {
        if ( userPwConfirmAsterisk === "password" ) {
            setUserPwConfirmAsterisk( "text" )
        } else {
            setUserPwConfirmAsterisk( "password" )
        }
    }


    useEffect(()=>{
        handlePageTitle(userRecorderLang.formTitle[cookies.load('site-lang')])
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
                style={{width:'100%', hegith:'100%', display:'flex', flexDirection:'row'}}
                id = "user_recorder"
                autoComplete='off'
                onSubmit={formikProps.handleSubmit}
                >
                    <div id='UserRecorerA' style={{display:'flex', flexDirection:'column', marginLeft:'auto', boxSizing:'border-box'}} >
                        <ApprovalLine
                        sysCode = 'sys1'
                        forId = 'user_recorder'
                        inheritedArr = { formikProps.values.approval_payload }
                        updateValue = { function ( newValue ) { formikProps.setFieldValue( 'approval_payload', newValue )}}
                        immediateEffective = { immediateEffective }
                        setImmediateEffective = { setImmediateEffective }
                        />
                    </div>
                    <div id='UserRecorerB' style={{marginLeft:'20px', marginRight:'auto', marginBottom:'20px' ,display:'flex', flexDirection:'column', boxSizing:'border-box'}} >
                    <Paper id='ppiPaper' sx={style.paper} elevation={3}>
                        <div style={style.subtitle.box}>
                            <FingerprintIcon color='sys1'/>
                            <div style={style.subtitle.text}>{"Personal Identifiable Information (PII)"}</div>
                        </div>
                        <TextField
                        required
                        disabled = {!(props.preparedType == "NEW")}
                        variant="outlined"
                        id="user_account"
                        name="user_account"
                        label={userRecorderLang.ppiPaper.inputField.user_account.placeholder[cookies.load('site-lang')]}
                        value={formikProps.values.user_account}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        helperText={formikProps.touched.user_account ? formikProps.errors.user_account : ""}
                        error={formikProps.touched.user_account && Boolean(formikProps.errors.user_account)}
                        size='small'
                        margin="dense"
                        fullWidth
                        InputProps={{
                            endAdornment:(
                                <IconButton size='small' onClick={()=>{formikProps.setFieldValue('user_account','')}}>
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
                        id="user_pw"
                        name="user_pw"
                        type={userPwAsterisk}
                        label={userRecorderLang.ppiPaper.inputField.user_pw.placeholder[cookies.load('site-lang')]}
                        value={formikProps.values.user_pw}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        helperText={formikProps.touched.user_pw ? formikProps.errors.user_pw : ""}
                        error={formikProps.touched.user_pw && Boolean(formikProps.errors.user_pw)}
                        size='small'
                        margin="dense"
                        fullWidth
                        InputProps={{
                            endAdornment:(
                                <div style ={{display : 'flex', flexDirection : 'row'}}>
                                    <IconButton size='small' edge="end" onClick={()=>{formikProps.setFieldValue('user_pw','')}}>
                                        <ClearIcon size='small'/>
                                    </IconButton>
                                    <IconButton size='small' onClick={()=>{toggleserPwAsterisk()}}>
                                        {
                                            userPwAsterisk === "password" ? <VisibilityIcon size='small'/> : <VisibilityOffIcon size='small'/>
                                        }
                                    </IconButton>
                                </div>
                            ),
                            style: style.inputTexstField // font size of input text
                        }}
                        InputLabelProps={{style: style.inputTexstField}} // font size of input label
                        />
                        <TextField
                        required
                        variant="outlined"
                        id="user_pw_confirm"
                        name="user_pw_confirm"
                        type={userPwConfirmAsterisk}
                        label={userRecorderLang.ppiPaper.inputField.user_pw_confirm.placeholder[cookies.load('site-lang')]}
                        value={formikProps.values.user_pw_confirm}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        helperText={formikProps.touched.user_pw_confirm ? formikProps.errors.user_pw_confirm : ""}
                        error={formikProps.touched.user_pw_confirm && Boolean(formikProps.errors.user_pw_confirm)}
                        size='small'
                        margin="dense"
                        fullWidth
                        InputProps={{
                            endAdornment:(
                                <div style ={{display : 'flex', flexDirection : 'row'}}>
                                    <IconButton size='small' edge="end" onClick={()=>{formikProps.setFieldValue('user_pw_confirm','')}}>
                                        <ClearIcon size='small'/>
                                    </IconButton>
                                    <IconButton size='small' onClick={()=>{toggleserPwConfirmAsterisk()}}>
                                        {
                                            userPwConfirmAsterisk === "password" ? <VisibilityIcon size='small'/> : <VisibilityOffIcon size='small'/>
                                        }
                                    </IconButton>
                                </div>
                            ),
                            style: style.inputTexstField // font size of input text
                        }}
                        InputLabelProps={{style: style.inputTexstField}} // font size of input label
                        />
                        <TextField
                        required
                        variant="outlined"
                        id="user_name"
                        name="user_name"
                        label={userRecorderLang.ppiPaper.inputField.user_name.placeholder[cookies.load('site-lang')]}
                        value={formikProps.values.user_name}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        helperText={formikProps.touched.user_name ? formikProps.errors.user_name : ""}
                        error={formikProps.touched.user_name && Boolean(formikProps.errors.user_name)}
                        size='small'
                        margin="dense"
                        fullWidth
                        InputProps={{
                            endAdornment:(
                                <IconButton size='small' onClick={()=>{formikProps.setFieldValue('user_name','')}}>
                                    <ClearIcon size='small'/>
                                </IconButton>
                            ),
                            style: style.inputTexstField // font size of input text
                        }}
                        InputLabelProps={{style: style.inputTexstField}} // font size of input label
                        />
                        <TextField
                        variant="outlined"
                        id="user_nickname"
                        name="user_nickname"
                        label={userRecorderLang.ppiPaper.inputField.user_nickname.placeholder[cookies.load('site-lang')]}
                        value={formikProps.values.user_nickname}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        helperText={formikProps.touched.user_nickname ? formikProps.errors.user_nickname : ""}
                        error={formikProps.touched.user_nickname && Boolean(formikProps.errors.user_nickname)}
                        size='small'
                        margin="dense"
                        fullWidth
                        InputProps={{
                            endAdornment:(
                                <IconButton size='small' onClick={()=>{formikProps.setFieldValue('user_nickname','')}}>
                                    <ClearIcon size='small'/>
                                </IconButton>
                            ),
                            style: style.inputTexstField // font size of input text
                        }}
                        InputLabelProps={{style: style.inputTexstField}} // font size of input label
                        />
                        <div style={{marginTop:'5px'}}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                id="user_birthday"
                                name="user_birthday"
                                slotProps={{ textField: { size: 'small', fullWidth: true, style: style.inputTexstField }}}
                                label={<Typography sx={{fontSize:14}}>{userRecorderLang.ppiPaper.inputField.user_birthday.placeholder[cookies.load('site-lang')]}</Typography>}
                                format="YYYY-MM-DD"
                                mask={"____-__-__"}
                                value={formikProps.values.user_birthday}
                                onChange={(newValue) => formikProps.setFieldValue('user_birthday',newValue)}
                                renderInput={(params) => <TextField {...params}
                                color='sys1'/>}
                                />
                            </LocalizationProvider>
                        </div>
                        <FormControl style={{ border:'#D3D3D3 solid 1px', borderRadius:'5px', marginTop:'5px', marginBottom:'2px', paddingLeft:'10px', width:'100%', boxSizing:'border-box', display: 'flex', flexDirection: 'row', alignItems:'center' }}>
                            <FormLabel
                            id="user_gender"
                            sx={{mr:1}}
                            >
                                {<Typography sx={{fontSize:14}}>{userRecorderLang.ppiPaper.inputField.user_gender.placeholder[cookies.load('site-lang')]}</Typography>}
                            </FormLabel>
                            <RadioGroup
                            row
                            name="user_gender"
                            value={formikProps.values.user_gender}
                            onChange={formikProps.handleChange}
                            >
                                <FormControlLabel
                                value="MALE"
                                control={<Radio />}
                                label={<Typography sx={{fontSize:14}}>Male</Typography>}
                                />
                                <FormControlLabel
                                value="FEMALE"
                                control={<Radio />}
                                label={<Typography sx={{fontSize:14}}>Female</Typography>}
                                />     
                            </RadioGroup>
                        </FormControl>
                        <TextField
                        multiline
                        maxRows={4}
                        variant="outlined"
                        id="revision_history"
                        name="revision_history"
                        label={userRecorderLang.ppiPaper.inputField.revision_history.placeholder[cookies.load('site-lang')]}
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
                    <Paper id='emailPaper' sx={style.paper} elevation={3}>
                        <div style={style.subtitle.box}>
                            <EmailIcon color='sys1'/>
                            <div style={style.subtitle.text}>E-Mail</div>
                        </div>
                        { // 현재 이메일 배열 객체 정보 출력 iterator
                            formikProps.values.user_email.map((oneItem, index)=>(
                            <div style={style.arrItem.oneItem}>
                                    <div style={style.arrItem.itemInfo}>
                                        <Chip size="small" icon={<MailOutlineIcon size="small"/>} color='sys1' label={oneItem.email_address}/>
                                        <div style={style.arrItem.subInfo}>
                                            <Chip size="small" icon={<CategoryIcon size="small"/>} color='sys1' variant="outlined" label={oneItem.email_usage}/>
                                            <Chip size="small" sx={{width:'100%',ml:0.8}} icon={<BusinessIcon size="small"/>} color='sys1' variant="outlined" label={oneItem.email_affiliation}/>
                                        </div>
                                    </div>
                                    <div style={style.arrItem.delItem}>
                                        <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'user_email', arrDelElement(formikProps.values.user_email, index))}><DeleteForeverIcon/></Button>
                                    </div>
                                </div>
                            ))
                        }
                        <EmailModalButton
                        inheritedArr = { formikProps.values.user_email }
                        updateValue = { function ( newValue ) { formikProps.setFieldValue( 'user_email', newValue )}}
                        />
                    </Paper>
                    <Paper id='phonePaper' sx={style.paper} elevation={3}>
                        <div style={style.subtitle.box}>
                            <PhoneIcon color='sys1'/>
                            <div style={style.subtitle.text}>Phone</div>
                        </div>
                        { // 현재 폰 배열 객체 정보 출력 iterator
                            formikProps.values.user_phone.map((oneItem, index)=>(
                            <div style={style.arrItem.oneItem}>
                                    <div style={style.arrItem.itemInfo}>
                                        <Chip size="small" icon={<PhoneIcon size="small"/>} color='sys1' label={oneItem.phone_number}/>
                                        <div style={style.arrItem.subInfo}>
                                            <Chip size="small" icon={<CategoryIcon size="small"/>} color='sys1' variant="outlined" label={oneItem.phone_usage}/>
                                            <Chip size="small" sx={{width:'100%',ml:0.8}} icon={<BusinessIcon size="small"/>} color='sys1' variant="outlined" label={oneItem.phone_affiliation}/>
                                        </div>
                                    </div>
                                    <div style={style.arrItem.delItem}>
                                        <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'user_phone', arrDelElement(formikProps.values.user_phone, index))}><DeleteForeverIcon/></Button>
                                    </div>
                                </div>
                            ))
                        }
                        <PhoneModalButton
                        inheritedArr = { formikProps.values.user_phone }
                        updateValue = { function ( newValue ) { formikProps.setFieldValue( 'user_phone', newValue )}}
                        />
                    </Paper>
                    <Paper id='positionPaper' sx={style.paper} elevation={3}>
                        <div style={style.subtitle.box}>
                            <WorkIcon color='sys1'/>
                            <div style={style.subtitle.text}>Position</div>
                        </div>
                        { // 현재 폰 배열 객체 정보 출력 iterator
                            formikProps.values.user_position.map((oneItem, index)=>(
                            <div style={style.arrItem.oneItem}>
                                    <div style={style.arrItem.itemInfo}>
                                        <Chip size="small" icon={<WorkIcon size="small"/>} color='sys1' label={oneItem.job_position}/>
                                        <div style={style.arrItem.subInfo}>
                                            <Chip size="small" icon={<Diversity3Icon size="small"/>} color='sys1' variant="outlined" label={oneItem.job_team}/>
                                            <Chip size="small" sx={{width:'100%',ml:0.8}} icon={<BusinessIcon size="small"/>} color='sys1' variant="outlined" label={oneItem.job_company}/>
                                        </div>
                                        <Chip size="small" sx={{ mt:0.8}} icon={<InfoIcon size="small"/>} color='sys1' label={oneItem.job_description}/>
                                    </div>
                                    <div style={style.arrItem.delItem}>
                                        <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'user_position', arrDelElement(formikProps.values.user_position, index))}><DeleteForeverIcon/></Button>
                                    </div>
                                </div>
                            ))
                        }
                        <PositionModalButton
                        inheritedArr = { formikProps.values.user_position }
                        updateValue = { function ( newValue ) { formikProps.setFieldValue( 'user_position', newValue )}}
                        />
                    </Paper>
                    <Paper id='authPaper' sx={style.paper} elevation={3}>
                        <div style={style.subtitle.box}>
                            <GppGoodIcon color='sys1'/>
                            <div style={style.subtitle.text}>Authority</div>
                        </div>
                        { // 현재 폰 배열 객체 정보 출력 iterator
                            formikProps.values.user_auth.map((oneItem, index)=>(
                            <div style={style.arrItem.oneItem}>
                                    <div style={style.arrItem.itemInfo}>
                                        <div style={style.arrItem.subInfo}>
                                            <Chip size="small" sx={{mb:1}} icon={<VpnKeyIcon size="small"/>} color='sys1' variant="outlined" label={`Code : ${oneItem.auth_code}`}/>
                                            <Chip size="small" sx={{ml:'auto', mb:1}} icon={<DeveloperBoardIcon size="small"/>} color='sys1' variant="outlined" label={`System Code : ${oneItem.system_code}`}/>
                                        </div>
                                        <Chip size="small" sx={{mb:1}} icon={<TitleIcon size="small"/>} color='sys1' variant="outlined" label={`Auth Title : ${oneItem.auth_title}`}/>
                                        <Chip size="small" sx={{mb:1}} icon={<RouteIcon size="small"/>} color='sys1' variant="outlined" label={`Allowed Path "${oneItem.url_path}"`}/>
                                        <div>
                                            <Chip size="small" icon={<InfoIcon size="small"/>} color='sys1' variant="outlined" label={"Description"}/>
                                        </div>
                                        <div style={style.descriptionBox}>{oneItem.auth_description}</div>
                                    </div>
                                    <div style={style.arrItem.delItem}>
                                        <Button size="small" variant='contained' style={{height:'100%'}} sx={{p: 0}} color='error' onClick={()=>formikProps.setFieldValue( 'user_auth', arrDelElement(formikProps.values.user_auth, index))}><DeleteForeverIcon/></Button>
                                    </div>
                                </div>
                            ))
                        }
                        <AuthModalButton
                        inheritedArr = { formikProps.values.user_auth }
                        updateValue = { function ( newValue ) { formikProps.setFieldValue( 'user_auth', newValue )}}
                        />
                    </Paper>
                    </div>
                </form>
            )}
        </Formik>
    )

}

export default UserRecorder;