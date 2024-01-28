// ======================================================================================== [Import Libaray]
import { useState } from 'react';
import cookies from 'react-cookies';


// ======================================================================================== [Import Material UI Libaray]
import { Button, Modal,  Paper } from '@mui/material';
//icon

// ======================================================================================== [Import Component] js

import ProductRecorder from '../../../../../Forms/Product/ProductRecorder/ProductRecorder'

// ======================================================================================== [Import Component] CSS

function Revision (props) {

    const style = {
        cardPaper : {
            width:300,
            height:200,
            p:1,
            m:2,
            overflow:'hidden'
        },
        detailedBigCardPaper : {
            width:'100vw',
            height:'90vh',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: 24,
            p: 2,
            overflowY:'auto'
        },
    }

    const [popup,setPopup] = useState(0);
    const handleModalClose = () => setPopup(0);

    const handlePageTitleDummy = function (value) {

    }
    const handleSystemCodeDummy = function (value) {

    }

    return (
        <div>
            <Button variant="contained" color = 'sys1' size="small" onClick={()=>setPopup(1)}>
                {{ kor : "개정", eng : "Revise" }[cookies.load('site-lang')]}
            </Button>
            <Modal open={(popup === 1)} onClose={handleModalClose}>
                <Paper sx={style.detailedBigCardPaper} elevation={3}>
                <div className = "big-popup-close-button-box"><button className='popup-close-button' onClick={handleModalClose}>X</button></div>
                <ProductRecorder
                    preparedType = 'REVISE'
                    initialValues = {{
                        approval_payload : [[]],
                        previous_approval_payload_id : props.oneItem.approval_payload_id,
                        revision_history : '',
                        mng_code : props.oneItem.mng_code,
                        mng_code_alt : props.oneItem.mng_code_alt,
                        mng_code_alt2 : props.oneItem.mng_code_alt2,
                        mng_name : props.oneItem.mng_name,
                        periodic_mng_pv : props.oneItem.periodic_mng_pv,
                        prod_periodic_pv : !props.oneItem.prod_periodic_pv ? [] : JSON.parse(props.oneItem.prod_periodic_pv),
                        prod_pv : !props.oneItem.prod_pv ? [] : JSON.parse(props.oneItem.prod_pv)
                    }}
                    handlePageTitle = { handlePageTitleDummy }
                    handleSystemCode = { handleSystemCodeDummy }
                    handleModalClose = { handleModalClose }
                    />
                </Paper>
            </Modal>
        </div>
    )
}

export default Revision;