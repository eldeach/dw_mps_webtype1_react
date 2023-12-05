// ======================================================================================== [Import Libaray]
import { useState } from 'react';
import { Formik } from 'formik';
import cookies from 'react-cookies'
import * as yup from 'yup';
import axios from 'axios';

// ======================================================================================== [Import Material UI Libaray]
import { Button, Modal, Paper, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
//icon
import PeopleIcon from '@mui/icons-material/People';

// ======================================================================================== [Import Component] js
import aprvModalButtonLang from './aprvModalButtonLang'
// objArrHandler
import objArrAddElement from '../../../Funcs/ArrHandler/objArrAddElement/objArrAddElement'
import doubleArrDelBlankArr from '../../../Funcs/ArrHandler/doubleArrDelBlankArr'
// Table
import TableType1 from '../../../TableObj/TableType1/Template/TableType1' // System Component
import columnDef from './columnDef' // this form's columnDef


// ======================================================================================== [Import Component] CSS


function AddPersonnelButton (props){
    
    const style = {
        pageTitle : {
            box : {
                display:'flex', flexDirection:'column', alignItems:'center', fontSize:'medium'
            },
            text : {
                fontSize : '20px', marginTop:'4px', marginLeft:'2px'
            }
        },
        descriptionBox : {
            marginTop:'20px',
            marginBottom : '46px',
            boxSizing : 'border-box',
            fontSzie : 'small',
            color : 'orange',
            whiteSpace : 'pre-wrap',
            worWrap : 'break-word',
            textAlign : 'center',
            flexGrow : 1
        },
        description : {
            marginTop : '0px',
            marginBottom : '6px',
        },
        popupPaper : {
            width : 650,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: 24,
            p: 2,
        },
        inputTexstField : {
            fontSize: 14,
            paddingRight:0
        },
        approvalStepBox : {
            display:'flex', 
        }
    }

    const yupSchema = yup.object().shape({

    });

    const initialValues = {
        approval_type : 'APPROVAL'
    }

    
    // 테이블 데이터 얻기
    const [tableData,setTableData] = useState([])
    const getApprovaluserlist = async function () {
        let rs = await axios.get('/getapprovaluserlist')
        .then(( res ) => {
            return res.data
        })
        setTableData( rs )
    }

    // 팝업 핸들러
    const [popup,setPopup] = useState(0);
    const handleModalOpen = () => {
        getApprovaluserlist() // popup 열렸을 때만 axios.get & setTableData 실행
        setPopup(1);
    }
    const handleModalClose = () => setPopup(0);


    // 테이블이 데이터를 넣어줄 state, <TableType1>에 setTableSelected props로 바인딩함
    const [tableSelected,setTableSelected] = useState([]);


    // 부모 FORM으로 받은 state랑 value 값 업데이트, 밑에 <Button>에 onClick에 바인딩함
    const arrAddPersonnel = function ( approval_type, oneElement, elementIndex ) {
        let tempArr = [...props.inheritedArr];
        let tempElementArr = [...oneElement]

        tableSelected.map(( oneRow, index ) => {
            oneRow.approvalType = approval_type
            let alreadyAdded = 0
            tempArr.map((oneStep,stepIndex) => {
                oneStep.map((onePerson, personIndex) => {
                    if(onePerson.user_account == oneRow.user_account) {
                        alreadyAdded += 1
                        alert (aprvModalButtonLang.alertMsg.duplicated[cookies.load('site-lang')])
                    }
                })
            })
            if (alreadyAdded === 0) tempElementArr = objArrAddElement( tempElementArr, oneRow, "user_account" )
        })

        tempArr.splice( elementIndex, 1, tempElementArr )
        return tempArr
    };

    return (
        <Formik
        validationSchema={yupSchema}
        initialValues={initialValues}
        onSubmit={(values, actions)=>{

        }}
        >
            { formikProps => (
                <div>
                    <Button fullWidth disabled = { props.disabled } variant="outlined" color = {props.sysCode} size="small" sx={{ mt : 1 }} onClick={()=> handleModalOpen() }>ADD</Button>
                    <Modal open={( popup === 1 )} onClose={ handleModalClose }>
                        <form
                        noValidate
                        id = "addpersonnel"
                        autoComplete='off'
                        onSubmit={formikProps.handleSubmit}
                        >
                            <Paper id='addPersonnelPaper' sx={ style.popupPaper } elevation={3}>
                                <div className = "popup-close-button-box"><button className='popup-close-button' onClick={handleModalClose}>X</button></div>
                                <div style={ style.pageTitle.box }>
                                    <PeopleIcon color={props.sysCode} sx = {{ fontSize : 'xx-large' }}/>
                                    <div style={style.pageTitle.text}>{aprvModalButtonLang.pageTitle[cookies.load('site-lang')]}</div>
                                </div>
                                <FormControl style={{ border:'#D3D3D3 solid 1px', borderRadius:'5px', marginLeft : '5px', marginRight : '5px', marginTop:'5px', marginBottom:'2px', paddingLeft:'10px', width:'100%', boxSizing:'border-box', display: 'flex', flexDirection: 'row', alignItems:'center' }}>
                                    <FormLabel
                                    color = {props.sysCode}
                                    id="approval_type"
                                    sx={{ mr:1 }}
                                    >
                                        {<Typography sx={{fontSize:14, width : '35px'}}>Type</Typography>}
                                    </FormLabel>
                                    <RadioGroup
                                    row
                                    name="approval_type"
                                    value={ formikProps.values.approval_type }
                                    onChange={ formikProps.handleChange }
                                    sx={{ width : '580px', justifyContent:'center' }}
                                    >
                                        <FormControlLabel
                                        value="APPROVAL"
                                        control={<Radio color = {props.sysCode}/>}
                                        label={<Typography sx={{fontSize:14}}>Approval</Typography>}
                                        />
                                        <FormControlLabel
                                        value="AGREEMENT"
                                        control={<Radio color = {props.sysCode}/>}
                                        label={<Typography sx={{fontSize:14}}>Agreement</Typography>}
                                        />
                                        <FormControlLabel
                                        value="RECIEVE"
                                        control={<Radio color = {props.sysCode}/>}
                                        label={<Typography sx={{fontSize:14}}>Recieve</Typography>}
                                        />     
                                        <FormControlLabel
                                        value="FINAL_APPROVAL"
                                        control={<Radio color = {props.sysCode}/>}
                                        label={<Typography sx={{fontSize:14}}>Final Approval</Typography>}
                                        />  
                                    </RadioGroup>
                                </FormControl>
                                <TableType1
                                tableData = { tableData }
                                columnsDef = { columnDef }
                                divStyle={{ marginLeft : '5px', marginTop : '10px', divMaxWidth : '600px', divMaxHeight : '600px', overflow : 'auto'}}
                                tableStyle = {{ }}
                                headerStyle = {{ fontSize : '12px' }}
                                rowStyle = {{ fontSize : '12px' }} // 일괄 모든 row에 스타일 적용, columnDef의 cell 렌더가 우선순위가 높음
                                footerOn = { false }
                                setTableSelected = { setTableSelected }
                                />
                                <div style ={ style.approvalStepBox }>
                                {
                                    (
                                        props.inheritedArr.map(( oneElement, elementIndex ) => (
                                            <Button
                                            variant="outlined"
                                            color = {props.sysCode}
                                            size="small"
                                            sx = {{ m : 0.5 }}
                                            onClick={() => {
                                                let tempArr = arrAddPersonnel( formikProps.values.approval_type, oneElement, elementIndex )
                                                doubleArrDelBlankArr ( tempArr )
                                                props.updateValue( tempArr )
                                                handleModalClose()
                                            }}
                                            >
                                                {
                                                    elementIndex === (props.inheritedArr.length - 1) ?
                                                    "Final Approval Step" :
                                                    "Approval Step ".concat(String(elementIndex+1))
                                                }
                                            </Button>
                                        ))
                                    )
                                }
                                </div>
                            </Paper>
                        </form>
                    </Modal>
                </div>
            )}  
        </Formik>
    )
}

export default AddPersonnelButton;