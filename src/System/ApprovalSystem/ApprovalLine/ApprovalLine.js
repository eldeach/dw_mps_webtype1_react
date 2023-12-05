// ======================================================================================== [Import Libaray]
import { useEffect } from 'react';
import cookies from 'react-cookies'

// ======================================================================================== [Import Material UI Libaray]
import { Button, IconButton, Chip, Switch, FormControlLabel, Paper, Typography } from '@mui/material';
//icon
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import WorkIcon from '@mui/icons-material/Work';
import DrawIcon from '@mui/icons-material/Draw';
import BadgeIcon from '@mui/icons-material/Badge';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NumbersIcon from '@mui/icons-material/Numbers';
import Diversity3Icon from '@mui/icons-material/Diversity3';
// ======================================================================================== [Import Component] js
import approvalLineLang from './approvalLineLang'
// Popup Form
import AprvModalButton from './ModalButton/AprvModalButton';


// ======================================================================================== [Import Component] CSS

function ApprovalLine (props) {

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
        submitButton : {
            width:500,
        }
    }

    const arrDelElement = function (arr, index) {
        let tempArr = [...arr];
        tempArr.splice(index, 1);
   
        return tempArr;
    };

    const arrAddEmptyArr = function ( arr ){
        let tempArr = [...arr]
        tempArr.splice(( tempArr.length - 1 ), 0, [])
        return tempArr
    }

    useEffect(() => {
        
    })

    return (
        <Paper id='approvalPaper' sx={style.paper} elevation={3}>
            <div style={style.subtitle.box}>
                <DrawIcon color={props.sysCode}/>
                <div style={style.subtitle.text}>Approval Line</div>
                <Button disabled = { props.immediateEffective } size="small" variant='contained' sx={{ ml:'auto' }} color={props.sysCode} onClick={()=> props.updateValue(arrAddEmptyArr( props.inheritedArr ))}>
                    {
                        approvalLineLang.approvalPaper.button.addPersonnel[cookies.load('site-lang')]
                    }
                </Button>
            </div>
            { // 현재 결재라인 배열 객체 정보 출력 iterator
                props.inheritedArr.map((oneElement, elementIndex) => (
                    <div>
                        <div style={{display : 'flex', flexDirection : 'row'}}>
                            <Chip
                            size="small"
                            icon={<NumbersIcon size="small"/>}
                            color={props.sysCode}
                            sx={{
                                pr:1,
                                mt:1,
                                justifyContent:'flex-start'
                            }}
                            label={
                                elementIndex === (props.inheritedArr.length - 1) ?
                                "Final Approval Step" : "Approval Step ".concat(String(elementIndex+1))                           
                            }
                            />
                            {
                                elementIndex === ( props.inheritedArr.length - 1 ) ? <div/> :
                                <IconButton
                                disabled = { props.immediateEffective }
                                edge = 'end'
                                color = 'error'
                                onClick={()=> props.updateValue(arrDelElement(props.inheritedArr, elementIndex)) }>
                                    <DeleteForeverIcon/>
                                </IconButton>
                            }
                        </div>
                        {
                            oneElement.map((oneItem,index) => {
                                if ( elementIndex === ( props.inheritedArr.length - 1 ) ) {
                                    oneItem.approvalType = 'FINAL_APPROVAL'
                                } // 마지막 스텝은 approval type을 강제로 Final Approval (최종승인)으로 값 지정
                                return (
                                    <div style={style.arrItem.oneItem}>
                                        <div style={{ width:'150px' }}>
                                            <Chip
                                            size="small"
                                            icon={<DrawIcon size="small"/>}
                                            color={props.sysCode}
                                            sx={{
                                                width:150,
                                                mb:0.4,
                                            }}
                                            label={{
                                                APPROVAL : 'Approval',
                                                AGREEMENT : 'Agreement',
                                                RECIEVE : 'Recieve',
                                                FINAL_APPROVAL : 'Final Approval'
                                            }[oneItem.approvalType]}
                                            />
                                            <Chip
                                            size="small"
                                            icon={<AccountCircleIcon size="small"/>}
                                            color={props.sysCode}
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
                                            label={oneItem.user_account}
                                            />
                                            <Chip
                                            size="small"
                                            icon={<WorkIcon size="small"/>}
                                            color={props.sysCode}
                                            variant="outlined"
                                            sx={{
                                                width: 150,
                                                p:0.3,
                                                height: 'auto',
                                                '& .MuiChip-label': {
                                                display: 'block',
                                                whiteSpace: 'normal',
                                                wordWrap:'break-word'
                                                },
                                            }}
                                            label={oneItem.job_position}
                                            />
                                        </div>
                                        <Chip
                                        size="small"
                                        icon={<BadgeIcon size="small"/>}
                                        color={props.sysCode}
                                        variant="outlined"
                                        sx={{
                                            width: 130,
                                            ml:0.4,
                                            mr:0.4,
                                            p:0.3,
                                            height: 'auto',
                                            '& .MuiChip-label': {
                                            display: 'block',
                                            whiteSpace: 'normal',
                                            wordWrap:'break-word'
                                            },
                                        }}
                                        label={oneItem.user_name}
                                        />
                                        <Chip
                                        size="small"
                                        icon={<Diversity3Icon size="small"/>}
                                        color={props.sysCode}
                                        variant="outlined"
                                        sx={{
                                            width: 120,
                                            p:0.3,
                                            height: 'auto',
                                            '& .MuiChip-label': {
                                            display: 'block',
                                            whiteSpace: 'normal',
                                            wordWrap:'break-word'
                                            },
                                        }}
                                        label={oneItem.job_team}
                                        />
                                        <div style={style.arrItem.delItem}>
                                            <Button
                                            disabled = { props.immediateEffective }
                                            size="small"
                                            variant='contained'
                                            sx={{p: 0, height:'100%'}}
                                            color='error'
                                            onClick={()=>{
                                                let tempArr = [...props.inheritedArr];
                                                let elementArr = arrDelElement(oneElement, index)
                                                if (elementArr.length === 0){
                                                    tempArr.splice(elementIndex, 1);
                                                }
                                                else {
                                                    tempArr.splice(elementIndex, 1, elementArr);
                                                }
                                                if (tempArr.length === 0) {
                                                    tempArr.push([])
                                                }
                                                props.updateValue ( tempArr )
                                            }}><DeleteForeverIcon/></Button>
                                        </div>
                                    </div>
                                )})
                        }
                    </div>
                ))
            }
            <AprvModalButton
            sysCode = { props.sysCode }
            disabled = { props.immediateEffective }
            inheritedArr = { props.inheritedArr }
            updateValue = { props.updateValue }/>
            <FormControlLabel
            control={ <Switch color = {props.sysCode} checked={ props.immediateEffective } onChange={ ( e ) => props.setImmediateEffective( e.target.checked ) } name="setImmediate_effective" /> }
            label={
                <Typography size="small" sx = {{ fontSize : '10px', color : (props.immediateEffective ? 'red' : 'black') }}> { approvalLineLang.approvalPaper.switch.immediateEffective[cookies.load('site-lang')] } </Typography>     
            }
            />
            <Button fullwidth sx={style.submitButton} variant="contained" color = {props.sysCode} size="small" type='submit' form={props.forId}>Submit</Button>
        </Paper>
    )

}

export default ApprovalLine;