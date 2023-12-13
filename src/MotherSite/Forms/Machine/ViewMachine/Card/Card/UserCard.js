// ======================================================================================== [Import Libaray]
import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import moment from 'moment';
import 'moment/locale/ko';	//대한민국

// ======================================================================================== [Import Material UI Libaray]
import { Button, Modal, IconButton, Chip, Paper } from '@mui/material';
//icon
import WorkIcon from '@mui/icons-material/Work';
import BadgeIcon from '@mui/icons-material/Badge';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
// ======================================================================================== [Import Component] js
import DetailedBigCard from './DetailBigCard/DetailedBigCard';
import AddUser from '../../../UserRecorder/UserRecorder'

// ======================================================================================== [Import Component] CSS

function UserCard(props) {
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

    useEffect(() => {
        console.log(props.oneItem.user_auth)
    },[])

    return (
        <Paper id={`cardPaper${props.cardIndex}`} sx={style.cardPaper} elevation={3}>
            <div style={{ display : 'flex', flexDirection : 'column', height : '196px' }}>
                <Chip
                size="small"
                icon={<AccountCircleIcon size="small"/>}
                color='sys1'
                variant="outlined"
                sx={{
                    width: 150,
                    mb:0.4,
                    height: 'auto',
                    '& .MuiChip-label': {
                    display: 'block',
                    whiteSpace: 'normal',
                    wordWrap:'break-word'
                    },
                }}
                label={props.oneItem.user_account}
                />
                <div className = 'user-card-body' style = {{ flexGrow : 1, overflowY : 'auto' }}>
                    <Chip
                    size="small"
                    icon={<BadgeIcon size="small"/>}
                    color='sys1'
                    variant="outlined"
                    sx={{
                        width: 260,
                        mb:0.4,
                        height: 'auto',
                        '& .MuiChip-label': {
                        display: 'block',
                        whiteSpace: 'normal',
                        wordWrap:'break-word'
                        },
                    }}
                    label={props.oneItem.user_name}
                    />
                    <div>
                        {
                            JSON.parse( props.oneItem.user_position ).map(( onePosition, index ) => {
                                return (
                                    <div>
                                        <Chip
                                        size="small"
                                        icon={<WorkIcon size="small"/>}
                                        color='sys1'
                                        variant="outlined"
                                        sx={{
                                            width: 260,
                                            mb:0.4,
                                            height: 'auto',
                                            '& .MuiChip-label': {
                                            display: 'block',
                                            whiteSpace: 'normal',
                                            wordWrap:'break-word'
                                            },
                                        }}
                                        label={`${onePosition.job_position} / ${onePosition.job_team} / ${onePosition.job_company}`}
                                        />
                                    </div>
                                )
                        })
                        }
                    </div>
                </div>
                <div style = {{ width : '296px', display : 'flex', flexDirection : 'row' }}>
                    <div>
                        {
                            props.oneItem.approval_status == 'APPROVED' ? <div>
                                <Button
                                variant="contained"
                                color = 'sys1'
                                size="small"
                                onClick={()=>setPopup(1)}
                                >
                                    개정
                                </Button>
                                <Modal open={(popup === 1)} onClose={handleModalClose}>
                                    <Paper id={`cardPaper${props.cardIndex}`} sx={style.detailedBigCardPaper} elevation={3}>
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
                                        handlePageTitle = { props.handlePageTitle }
                                        handleSystemCode = { props.handleSystemCode }
                                        handleModalClose = { handleModalClose }
                                        />
                                    </Paper>
                                </Modal>
                                <Button>폐기</Button>
                            </div>
                            : props.oneItem.approval_status == 'PREPARED' ? <Button>회수</Button>
                            : <div/>
                        }
                    </div>
                    <div style= {{ flexGrow : 1 }} />
                    <DetailedBigCard oneItem = { props.oneItem } cardIndex = { props.cardIndex }/>
                </div>
            </div>
        </Paper>
    )
}

export default UserCard;