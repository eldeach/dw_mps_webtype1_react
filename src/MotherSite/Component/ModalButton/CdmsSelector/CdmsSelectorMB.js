// ======================================================================================== [Import Libaray]
import { useState } from 'react';
import { Formik } from 'formik';
import cookies from 'react-cookies'
import * as yup from 'yup';

// ======================================================================================== [Import Material UI Libaray]
import { Button, Modal, Paper } from '@mui/material';
//icon

import GppGoodIcon from '@mui/icons-material/GppGood';
// ======================================================================================== [Import Component] js
import cdmsSelectorMBLang from './cdmsSelectorMBLang'
// objArrHandler
import objArrAddElementByArr from '../../../../System/Funcs/ArrHandler/objArrAddElementByArr/objArrAddElementByArr'

// Table
import PgChkParamFlexwFlexrowTbl from '../../../../System/TanStackTableObj/PgChkParamFlexwFlexrowTbl/PgChkParamFlexwFlexrowTbl'
import columnDef from '../../../Component/Table/columnDef/CdmsLoad/cdCdmsLoad'

// ======================================================================================== [Import Component] CSS


function QualModalButton(props) {

    const style = {
        pageTitle: {
            box: {
                display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 'medium'
            },
            text: {
                fontSize: '20px', marginTop: '4px', marginLeft: '2px'
            }
        },
        descriptionBox: {
            marginTop: '20px',
            marginBottom: '46px',
            boxSizing: 'border-box',
            fontSzie: 'small',
            color: 'orange',
            whiteSpace: 'pre-wrap',
            worWrap: 'break-word',
            textAlign: 'center',
            flexGrow: 1
        },
        description: {
            marginTop: '0px',
            marginBottom: '6px',
        },
        descriptionBox: {
            marginTop: '20px',
            marginBottom: '46px',
            boxSizing: 'border-box',
            fontSzie: 'small',
            color: 'orange',
            whiteSpace: 'pre-wrap',
            worWrap: 'break-word',
            textAlign: 'center',
            flexGrow: 1
        },
        popupPaper: {
            width: '80vw',
            height: '820px',
            display:'flex',
            flexDirection:'column',
            overflow:'auto',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: 24,
            p: 2,
        },
        inputTexstField: {
            fontSize: 14,
            paddingRight: 0
        },
        approvalStepBox: {
            display: 'flex',
        }
    }

    const yupSchema = yup.object().shape({

    });

    const initialValues = {

    }

    // 팝업 핸들러
    const [popup, setPopup] = useState(0);
    const handleModalOpen = () => {
        setPopup(1);
    }
    const handleModalClose = () => setPopup(0);


    // 테이블이 데이터를 넣어줄 state, <TableType1>에 setTableSelected props로 바인딩함
    const [tableSelected, setTableSelected] = useState([]);


    return (
        <Formik
            validationSchema={yupSchema}
            initialValues={initialValues}
            onSubmit={(values, actions) => {

            }}
        >
            {formikProps => (
                <div>
                    <Button fullWidth disabled={props.disabled} variant="outlined" color='sys1' size="small" sx={{ mt: 1 }} onClick={() => handleModalOpen()}>ADD</Button>
                    <Modal open={(popup === 1)} onClose={handleModalClose}>
                        <form
                            noValidate
                            id="oqModal"
                            autoComplete='off'
                            onSubmit={formikProps.handleSubmit}
                        >
                            <Paper id='opModalPaper' sx={style.popupPaper} elevation={3}>
                                <div className="popup-close-button-box"><button className='popup-close-button' onClick={handleModalClose}>X</button></div>
                                <div style={style.pageTitle.box}>
                                    <GppGoodIcon color='sys1' sx={{ fontSize: 'xx-large' }} />
                                    <div style={style.pageTitle.text}>{cdmsSelectorMBLang.pageTitle[cookies.load('site-lang')]}</div>
                                </div>
                                <PgChkParamFlexwFlexrowTbl
                                    getUrl='/getcdmsqualdoclist'
                                    params={{
                                        colName: props.colName,
                                        qualAtt: props.qualAtt,
                                    }}
                                    tblWidth={'80vw'}
                                    numRow={18}
                                    columns={columnDef}
                                    setTableSelected={setTableSelected}
                                />
                                <div style={{flexGrow : 1}}/>
                                <div style={style.approvalStepBox}>
                                    <Button
                                        variant="outlined"
                                        color='sys1'
                                        size="small"
                                        sx={{ m: 0.5 }}
                                        onClick={() => {
                                            let tempArr = objArrAddElementByArr(props.inheritedArr, tableSelected, 'uuid_binary')
                                            props.updateValue(tempArr)
                                            handleModalClose()
                                        }}
                                    >
                                        ADD
                                    </Button>
                                </div>
                            </Paper>
                        </form>
                    </Modal>
                </div>
            )}
        </Formik>
    )
}

export default QualModalButton;