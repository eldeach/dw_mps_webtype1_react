// ======================================================================================== [Import Libaray]
import { useState } from 'react';
import cookies from 'react-cookies';
import dayjs from 'dayjs';


// ======================================================================================== [Import Material UI Libaray]
import { Button, Modal,  Paper } from '@mui/material';
//icon

// ======================================================================================== [Import Component] js

import AddUser from '../../UserRecorder/UserRecorder'

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
            width:'90vw',
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
        console.log(value)
    }
    const handleSystemCodeDummy = function (value) {
        console.log(value)
    }

    return (
        <div>
            <Button variant="contained" color = 'sys1' size="small" onClick={()=>setPopup(1)}>
                {{ kor : "개정", eng : "Revies" }[cookies.load('site-lang')]}
            </Button>
            <Modal open={(popup === 1)} onClose={handleModalClose}>
                <Paper sx={style.detailedBigCardPaper} elevation={3}>
                <AddUser
                    preparedType = 'REVISE'
                    initialValues = {{
                        approval_payload : [[]],
                        previous_approval_payload_id : props.oneItem.approval_payload_id,
                        user_account : props.oneItem.user_account,
                        user_pw : '',
                        user_pw_confirm : '',
                        user_name : props.oneItem.user_name,
                        user_nickname : props.oneItem.user_nickname,
                        user_birthday : dayjs(props.oneItem.user_birthday),
                        user_gender : props.oneItem.user_gender,
                        user_email : JSON.parse(props.oneItem.user_email),
                        user_phone : JSON.parse(props.oneItem.user_phone),
                        user_position : JSON.parse(props.oneItem.user_position),
                        user_auth : JSON.parse(props.oneItem.user_auth),
                        revision_history : ''
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