// ======================================================================================== [Import Libaray]
import { useEffect, useState } from 'react';
// ======================================================================================== [Import Material UI Libaray]
import { Button, Modal, Paper } from '@mui/material';
//icon
// ======================================================================================== [Import Component] js
// Component Object
import PrmLabel from './Component/PrmLabel'

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
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_batchsize'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_batchsize_kg'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_gentlewing'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_chopper'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_spray'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_spray_kgmin'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_spray_rpm'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_gra_spray_air'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_gra_micro_prs'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_inlet_air_temp'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_exh_air_temp'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_inlet_air_vol'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_inlet_air_vol_rpm'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_roller_speed'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_roller_gap'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_grate'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_blendrpm'}/>
                                </div>
                                <div id='prm_list_col_B' style={{display:'flex', flexDirection:'column', marginLeft:'10px'}}>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_filling_depth'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_cforece'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_turret'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_feeder'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_feeder_2nd'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_pforce'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_mforce'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_pforce_2nd'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_mforce_2nd'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_pforce_kgf'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_mforce_kgf'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_drum'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_paair'}/>
                                </div>
                                <div id='prm_list_col_C' style={{display:'flex', flexDirection:'column', marginLeft:'10px'}}>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_atair'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_fill'}/>
                                    <PrmLabel prmListObj = {prmListObj} prmCode = {'prm_timer'}/>
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