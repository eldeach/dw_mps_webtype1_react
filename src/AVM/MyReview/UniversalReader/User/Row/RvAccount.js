// ======================================================================================== [Import Libaray]
import { useState } from 'react';

// ======================================================================================== [Import Material UI Libaray]
import { IconButton, Chip, Modal, Paper } from '@mui/material';
//icon
import WorkIcon from '@mui/icons-material/Work';
import BadgeIcon from '@mui/icons-material/Badge';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DrawIcon from '@mui/icons-material/Draw';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import EditOffIcon from '@mui/icons-material/EditOff';
// ======================================================================================== [Import Component] js


// ======================================================================================== [Import Component] CSS

function RvAccount (props) {
    const style = {
        titleBox : {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            boxSizing: 'border-box'
        },
        subtitle:{
            box : {
                display:'flex', flexDirection:'column', alignItems:'center', fontSize:'medium'
            },
            text : {
                fontSize : '20px', marginTop:'4px', marginLeft:'2px'
            }
        },
        descriptionBox : {
            outline : {
                display : 'flex',
                flexDirection : 'column',
                height : '88vh',
                overflowY:'auto',
                border : '1px solid black'
            },
            oneItem : {
                width : '100%',
                display : 'flex',
                flexDirection : 'column'
            }  
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
        },
    }

    // 팝업 핸들러
    const [popup,setPopup] = useState(0);
    const handleModalOpen = () => setPopup(1);
    const handleModalClose = () => setPopup(0);

    return (
        <div>
            <IconButton
            size = "small"
            edge = "end"
            color = 'sys1'
            sx = {{  m : 0, p : 0 }}
            onClick={()=> handleModalOpen()}
            ><ZoomInIcon/></IconButton>
            <Modal open={( popup === 1 )} onClose={ handleModalClose }>
                <Paper sx={style.detailedBigCardPaper} elevation={3}>
                    <div style = { style.titleBox }>
                        <Chip
                        size="small"
                        icon = {
                            props.oneItem.approval_status == 'APPROVED' ? <CheckCircleIcon size="small"/>
                            : props.oneItem.approval_status == 'UNDER_APPROVAL' ? <DrawIcon size="small"/>
                            : props.oneItem.approval_status == 'PREPARED' ? <DrawIcon size="small"/>
                            : props.oneItem.approval_status == 'WITHDRAWN' ? <EditOffIcon size="small"/>
                            : props.oneItem.approval_status == 'REJECTED' ? <EditOffIcon size="small"/>
                            : props.oneItem.approval_status == 'UNDER_VOID' ? <UnpublishedIcon size="small"/>
                            : props.oneItem.approval_status == 'VOID' ? <UnpublishedIcon size="small"/>
                            : <DrawIcon size="small"/>
                        }
                        color = {
                            props.oneItem.approval_status == 'APPROVED' ? 'accepted'
                            : props.oneItem.approval_status == 'UNDER_APPROVAL' ? 'inProgress'
                            : props.oneItem.approval_status == 'PREPARED' ? 'prepared'
                            : props.oneItem.approval_status == 'WITHDRAWN' ? 'withdrawn'
                            : props.oneItem.approval_status == 'REJECTED' ? 'denied'
                            : props.oneItem.approval_status == 'UNDER_VOID' ? 'denied'
                            : props.oneItem.approval_status == 'VOID' ? 'denied'
                            : 'denied'
                        }
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
                        label={props.oneItem.approval_status}
                        />
                        <div style ={{flexGrow : 1}}></div>
                        <div>
                            <button className='popup-close-button' onClick={handleModalClose}>X</button>
                        </div>
                    </div>
                    <div style={ style.descriptionBox.outline }>
                        <div style = { style.oneItem }>
                            <Chip
                            size="small"
                            icon={<DrawIcon size="small"/>}
                            color='sys1'
                            sx={{
                                pr:1,
                                mt:1,
                                justifyContent:'flex-start'
                            }}
                            label={'Approval Payload'}
                            />
                            <div>
                                {props.oneItem.approval_payload}
                            </div>
                        </div>
                        <div style = { style.oneItem }>
                            <Chip size="small" icon={<CheckCircleIcon size="small"/>} color='accepted' label={'APPROVED'} />
                            <Chip size="small" icon={<DrawIcon size="small"/>} color='inProgress' label={'UNDER_APPROVAL'} />
                            <Chip size="small" icon={<DrawIcon size="small"/>} color='prepared' label={'PREPARED'} />
                            <Chip size="small" icon={<EditOffIcon size="small"/>} color='withdrawn' label={'WITHDRAWN'} />
                            <Chip size="small" icon={<EditOffIcon size="small"/>} color='denied' label={'REJECTED'} />
                            <Chip size="small" icon={<UnpublishedIcon size="small"/>} color='denied' label={'VOID'} />
                            <Chip size="small" icon={<UnpublishedIcon size="small"/>} color='denied' label={'UNDER_VOID'} />
                            <div>
                            </div>
                        </div>
                    </div>
                </Paper>
            </Modal>
        </div>
    )
}

export default RvAccount;