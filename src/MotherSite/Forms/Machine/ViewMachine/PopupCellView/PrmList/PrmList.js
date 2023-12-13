// ======================================================================================== [Import Libaray]
import { useEffect, useState } from 'react';
import cookies from 'react-cookies'
// ======================================================================================== [Import Material UI Libaray]
import { Button, Modal, Paper } from '@mui/material';
//icon
import TaskAltIcon from '@mui/icons-material/TaskAlt';
// ======================================================================================== [Import Component] js
// Component Object
import prmCodeBook from '../../../PrmCodeBook/prmCodeBook'

// ======================================================================================== [Import Component] CSS
import './PrmList.css'


function PrmList (props) {
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
        popup : {
            paper : {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: 24,
                p: 2,
            },
        },
        inputTexstField : {
            fontSize: 14,
            paddingRight:0
        }
    }

    const [popup,setPopup] = useState(0);
    const handleModalClose = () => setPopup(0);


    const [prmListObj, setPrmListObj] = useState({})

    useEffect(() =>{
        const parsedList = JSON.parse(props.prmList);
        setPrmListObj(parsedList[0]);
    },[])


    // [{"":0,"":1,"":0,"":0,"":0,"prm_chopper":1,"":0,"":0,"":0,"":1,"":0,"":0,"":0,"":0,"prm_spray":1,"":0,"":0}]
    return (
        <div>
            <Button variant="contained" color = 'sys1' size="small" onClick={()=>setPopup(1)}>
                {`열기 (${Object.values(prmListObj).filter(element => 1 === element).length} items)`}
            </Button>
            <Modal open={(popup === 1)} onClose={handleModalClose}>
                <Paper sx={style.popup.paper} elevation={3}>
                    <div style={{width : '700px', maxHeight: '500px', display : 'flex', justifyContent:'center', overflowY:'auto'}}>
                        {/* <div style={{width:'580px'}}> */}
                            <div style={{display:'flex', flexDirection:'row'}}>
                                <div id='prm_list_col_A' style={{display:'flex', flexDirection:'column'}}>
                                    <div className='prm_item'>
                                        <div className='prm_item_icon'>
                                            <TaskAltIcon color={prmListObj.prm_batchsize ? 'accepted' : 'withdrawn' } fontSize='inherit'/>
                                        </div>
                                        <div className='prm_item_text'>
                                            {prmCodeBook.prm_batchsize[cookies.load('site-lang')]}
                                        </div>
                                    </div>
                                    <div className='prm_item'>
                                        <div className='prm_item_icon'>
                                            <TaskAltIcon color={prmListObj.prm_batchsize_kg ? 'accepted' : 'withdrawn' } fontSize='inherit'/>
                                        </div>
                                        <div className='prm_item_text'>
                                            {prmCodeBook.prm_batchsize_kg[cookies.load('site-lang')]}
                                        </div>
                                    </div>
                                    <div className='prm_item'>
                                        <div className='prm_item_icon'>
                                            <TaskAltIcon color={prmListObj.prm_gentlewing ? 'accepted' : 'withdrawn' } fontSize='inherit'/>
                                        </div>
                                        <div className='prm_item_text'>
                                            {prmCodeBook.prm_gentlewing[cookies.load('site-lang')]}
                                        </div>
                                    </div>
                                    <div className='prm_item'>
                                        <div className='prm_item_icon'>
                                            <TaskAltIcon color={prmListObj.prm_chopper ? 'accepted' : 'withdrawn' } fontSize='inherit'/>
                                        </div>
                                        <div className='prm_item_text'>
                                            {prmCodeBook.prm_chopper[cookies.load('site-lang')]}
                                        </div>
                                    </div>
                                    <div className='prm_item'>
                                        <div className='prm_item_icon'>
                                            <TaskAltIcon color={prmListObj.prm_spray ? 'accepted' : 'withdrawn' } fontSize='inherit'/>
                                        </div>
                                        <div className='prm_item_text'>
                                            {prmCodeBook.prm_spray[cookies.load('site-lang')]}
                                        </div>
                                    </div>
                                    <div className='prm_item'>
                                        <div className='prm_item_icon'>
                                            <TaskAltIcon color={prmListObj.prm_spray_kgmin ? 'accepted' : 'withdrawn' } fontSize='inherit'/>
                                        </div>
                                        <div className='prm_item_text'>
                                            {prmCodeBook.prm_spray_kgmin[cookies.load('site-lang')]}
                                        </div>
                                    </div>
                                    <div className='prm_item'>
                                        <div className='prm_item_icon'>
                                            <TaskAltIcon color={prmListObj.prm_spray_rpm ? 'accepted' : 'withdrawn' } fontSize='inherit'/>
                                        </div>
                                        <div className='prm_item_text'>
                                            {prmCodeBook.prm_spray_rpm[cookies.load('site-lang')]}
                                        </div>
                                    </div>
                                    <div className='prm_item'>
                                        <div className='prm_item_icon'>
                                            <TaskAltIcon color={prmListObj.prm_grate ? 'accepted' : 'withdrawn' } fontSize='inherit'/>
                                        </div>
                                        <div className='prm_item_text'>
                                            {prmCodeBook.prm_grate[cookies.load('site-lang')]}
                                        </div>
                                    </div>
                                    <div className='prm_item'>
                                        <div className='prm_item_icon'>
                                            <TaskAltIcon color={prmListObj.prm_blendrpm ? 'accepted' : 'withdrawn' } fontSize='inherit'/>
                                        </div>
                                        <div className='prm_item_text'>
                                            {prmCodeBook.prm_blendrpm[cookies.load('site-lang')]}
                                        </div>
                                    </div>
                                </div>
                                <div id='prm_list_col_B' style={{display:'flex', flexDirection:'column', marginLeft:'10px'}}>
                                    <div className='prm_item'>
                                        <div className='prm_item_icon'>
                                            <TaskAltIcon color={prmListObj.prm_cforece ? 'accepted' : 'withdrawn' } fontSize='inherit'/>
                                        </div>
                                        <div className='prm_item_text'>
                                            {prmCodeBook.prm_cforece[cookies.load('site-lang')]}
                                        </div>
                                    </div>
                                    <div className='prm_item'>
                                        <div className='prm_item_icon'>
                                            <TaskAltIcon color={prmListObj.prm_turret ? 'accepted' : 'withdrawn' } fontSize='inherit'/>
                                        </div>
                                        <div className='prm_item_text'>
                                            {prmCodeBook.prm_turret[cookies.load('site-lang')]}
                                        </div>
                                    </div>
                                    <div className='prm_item'>
                                        <div className='prm_item_icon'>
                                            <TaskAltIcon color={prmListObj.prm_feeder ? 'accepted' : 'withdrawn' } fontSize='inherit'/>
                                        </div>
                                        <div className='prm_item_text'>
                                            {prmCodeBook.prm_feeder[cookies.load('site-lang')]}
                                        </div>
                                    </div>
                                    <div className='prm_item'>
                                        <div className='prm_item_icon'>
                                            <TaskAltIcon color={prmListObj.prm_pforce ? 'accepted' : 'withdrawn' } fontSize='inherit'/>
                                        </div>
                                        <div className='prm_item_text'>
                                            {prmCodeBook.prm_pforce[cookies.load('site-lang')]}
                                        </div>
                                    </div>
                                    <div className='prm_item'>
                                        <div className='prm_item_icon'>
                                            <TaskAltIcon color={prmListObj.prm_mforce ? 'accepted' : 'withdrawn' } fontSize='inherit'/>
                                        </div>
                                        <div className='prm_item_text'>
                                            {prmCodeBook.prm_mforce[cookies.load('site-lang')]}
                                        </div>
                                    </div>
                                    <div className='prm_item'>
                                        <div className='prm_item_icon'>
                                            <TaskAltIcon color={prmListObj.prm_pforce_kgf ? 'accepted' : 'withdrawn' } fontSize='inherit'/>
                                        </div>
                                        <div className='prm_item_text'>
                                            {prmCodeBook.prm_pforce_kgf[cookies.load('site-lang')]}
                                        </div>
                                    </div>
                                    <div className='prm_item'>
                                        <div className='prm_item_icon'>
                                            <TaskAltIcon color={prmListObj.prm_mforce_kgf ? 'accepted' : 'withdrawn' } fontSize='inherit'/>
                                        </div>
                                        <div className='prm_item_text'>
                                            {prmCodeBook.prm_mforce_kgf[cookies.load('site-lang')]}
                                        </div>
                                    </div>
                                    <div className='prm_item'>
                                        <div className='prm_item_icon'>
                                            <TaskAltIcon color={prmListObj.prm_drum ? 'accepted' : 'withdrawn' } fontSize='inherit'/>
                                        </div>
                                        <div className='prm_item_text'>
                                            {prmCodeBook.prm_drum[cookies.load('site-lang')]}
                                        </div>
                                    </div>
                                    <div className='prm_item'>
                                        <div className='prm_item_icon'>
                                            <TaskAltIcon color={prmListObj.prm_paair ? 'accepted' : 'withdrawn' } fontSize='inherit'/>
                                        </div>
                                        <div className='prm_item_text'>
                                            {prmCodeBook.prm_paair[cookies.load('site-lang')]}
                                        </div>
                                    </div>
                                </div>
                                <div id='prm_list_col_C' style={{display:'flex', flexDirection:'column', marginLeft:'10px'}}>
                                    <div className='prm_item'>
                                        <div className='prm_item_icon'>
                                            <TaskAltIcon color={prmListObj.prm_atair ? 'accepted' : 'withdrawn' } fontSize='inherit'/>
                                        </div>
                                        <div className='prm_item_text'>
                                            {prmCodeBook.prm_atair[cookies.load('site-lang')]}
                                        </div>
                                    </div>
                                    <div className='prm_item'>
                                        <div className='prm_item_icon'>
                                            <TaskAltIcon color={prmListObj.prm_fill ? 'accepted' : 'withdrawn' } fontSize='inherit'/>
                                        </div>
                                        <div className='prm_item_text'>
                                            {prmCodeBook.prm_fill[cookies.load('site-lang')]}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/* </div> */}
                    </div>
                </Paper>
            </Modal>
        </div>
    )
}

export default PrmList;