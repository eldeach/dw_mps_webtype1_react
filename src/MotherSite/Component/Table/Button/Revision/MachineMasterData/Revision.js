// ======================================================================================== [Import Libaray]
import { useState } from 'react';
import cookies from 'react-cookies';


// ======================================================================================== [Import Material UI Libaray]
import { Button, Modal,  Paper } from '@mui/material';
//icon

// ======================================================================================== [Import Component] js

import MachineRecorder from '../../../../../Forms/Machine/Recorder/MachineRecorder'

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
                <MachineRecorder
                    preparedType = 'REVISE'
                    initialValues = {{
                        approval_payload : [[]],
                        previous_approval_payload_id : props.oneItem.approval_payload_id,
                        revision_history : '',
                        mng_code : props.oneItem.mng_code,
                        mng_code_alt : props.oneItem.mng_code_alt,
                        mng_code_alt2 : props.oneItem.mng_code_alt2,
                        mng_name : props.oneItem.mng_name,
                        mng_team : props.oneItem.mng_team,
                        machine_type : props.oneItem.machine_type,
                        gmp_impact : props.oneItem.gmp_impact == "GMP IMPACT" ? true : false,
                        not_in_use : props.oneItem.not_in_use,
                        periodic_mng_1y_qual : props.oneItem.periodic_mng_1y_qual,
                        periodic_mng_qual : props.oneItem.periodic_mng_qual,
                        periodic_mng_ster : props.oneItem.periodic_mng_ster,
                        periodic_mng_vhp : props.oneItem.periodic_mng_vhp,
                        periodic_mng_review : props.oneItem.periodic_mng_review,
                        periodic_mng_cv : props.oneItem.periodic_mng_cv,
                        periodic_mng_1y_mt : props.oneItem.periodic_mng_1y_mt,
                        periodic_mng_mt : props.oneItem.periodic_mng_mt,
                        periodic_mng_season_mt : props.oneItem.periodic_mng_season_mt,
                        mc_periodic_1y_qual : !props.oneItem.mc_periodic_1y_qual ? [] : JSON.parse(props.oneItem.mc_periodic_1y_qual),
                        mc_periodic_qual : !props.oneItem.mc_periodic_qual ? [] : JSON.parse(props.oneItem.mc_periodic_qual),
                        mc_periodic_ster : !props.oneItem.mc_periodic_ster ? [] : JSON.parse(props.oneItem.mc_periodic_ster),
                        mc_periodic_vhp : !props.oneItem.mc_periodic_vhp ? [] : JSON.parse(props.oneItem.mc_periodic_vhp),
                        mc_periodic_review : !props.oneItem.mc_periodic_review ? [] : JSON.parse(props.oneItem.mc_periodic_review),
                        mc_iq : !props.oneItem.mc_iq ? [] : JSON.parse(props.oneItem.mc_iq),
                        mc_oq : !props.oneItem.mc_oq ? [] : JSON.parse(props.oneItem.mc_oq),
                        mc_pq : !props.oneItem.mc_pq ? [] : JSON.parse(props.oneItem.mc_pq),
                        mc_periodic_cv : !props.oneItem.mc_periodic_cv ? [] : JSON.parse(props.oneItem.mc_periodic_cv),
                        mc_cv : !props.oneItem.mc_cv ? [] : JSON.parse(props.oneItem.mc_cv),
                        mc_periodic_1y_mt : !props.oneItem.mc_periodic_1y_mt ? [] : JSON.parse(props.oneItem.mc_periodic_1y_mt),
                        mc_periodic_mt : !props.oneItem.mc_periodic_mt ? [] : JSON.parse(props.oneItem.mc_periodic_mt),
                        mc_periodic_season_mt : !props.oneItem.mc_periodic_season_mt ? [] : JSON.parse(props.oneItem.mc_periodic_season_mt),
                        mc_mt : !props.oneItem.mc_mt ? [] : JSON.parse(props.oneItem.mc_mt),
                        prm_list : !props.oneItem.prm_list ? [] : JSON.parse(props.oneItem.prm_list),
                        prm_batchsize : !props.oneItem.prm_batchsize ? [] : JSON.parse(props.oneItem.prm_batchsize),
                        prm_batchsize_kg : !props.oneItem.prm_batchsize_kg ? [] : JSON.parse(props.oneItem.prm_batchsize_kg),
                        prm_gentlewing : !props.oneItem.prm_gentlewing ? [] : JSON.parse(props.oneItem.prm_gentlewing),
                        prm_chopper : !props.oneItem.prm_chopper ? [] : JSON.parse(props.oneItem.prm_chopper),
                        prm_spray : !props.oneItem.prm_spray ? [] : JSON.parse(props.oneItem.prm_spray),
                        prm_spray_kgmin : !props.oneItem.prm_spray_kgmin ? [] : JSON.parse(props.oneItem.prm_spray_kgmin),
                        prm_spray_rpm : !props.oneItem.prm_spray_rpm ? [] : JSON.parse(props.oneItem.prm_spray_rpm),
                        prm_gra_spray_air : !props.oneItem.prm_gra_spray_air ? [] : JSON.parse(props.oneItem.prm_gra_spray_air),
                        prm_gra_micro_prs : !props.oneItem.prm_gra_micro_prs ? [] : JSON.parse(props.oneItem.prm_gra_micro_prs),
                        prm_inlet_air_temp : !props.oneItem.prm_inlet_air_temp ? [] : JSON.parse(props.oneItem.prm_inlet_air_temp),
                        prm_exh_air_temp : !props.oneItem.prm_exh_air_temp ? [] : JSON.parse(props.oneItem.prm_exh_air_temp),
                        prm_inlet_air_vol : !props.oneItem.prm_inlet_air_vol ? [] : JSON.parse(props.oneItem.prm_inlet_air_vol),
                        prm_inlet_air_vol_rpm : !props.oneItem.prm_inlet_air_vol_rpm ? [] : JSON.parse(props.oneItem.prm_inlet_air_vol_rpm),
                        prm_roller_speed : !props.oneItem.prm_roller_speed ? [] : JSON.parse(props.oneItem.prm_roller_speed),
                        prm_roller_gap : !props.oneItem.prm_roller_gap ? [] : JSON.parse(props.oneItem.prm_roller_gap),
                        prm_grate : !props.oneItem.prm_grate ? [] : JSON.parse(props.oneItem.prm_grate),
                        prm_blendrpm : !props.oneItem.prm_blendrpm ? [] : JSON.parse(props.oneItem.prm_blendrpm),
                        prm_filling_depth : !props.oneItem.prm_filling_depth ? [] : JSON.parse(props.oneItem.prm_filling_depth),
                        prm_cforece : !props.oneItem.prm_cforece ? [] : JSON.parse(props.oneItem.prm_cforece),
                        prm_feeder : !props.oneItem.prm_feeder ? [] : JSON.parse(props.oneItem.prm_feeder),
                        prm_feeder_2nd : !props.oneItem.prm_feeder_2nd ? [] : JSON.parse(props.oneItem.prm_feeder_2nd),
                        prm_turret : !props.oneItem.prm_turret ? [] : JSON.parse(props.oneItem.prm_turret),
                        prm_pforce : !props.oneItem.prm_pforce ? [] : JSON.parse(props.oneItem.prm_pforce),
                        prm_mforce : !props.oneItem.prm_mforce ? [] : JSON.parse(props.oneItem.prm_mforce),
                        prm_pforce_2nd : !props.oneItem.prm_pforce_2nd ? [] : JSON.parse(props.oneItem.prm_pforce_2nd),
                        prm_mforce_2nd : !props.oneItem.prm_mforce_2nd ? [] : JSON.parse(props.oneItem.prm_mforce_2nd),
                        prm_pforce_kgf : !props.oneItem.prm_pforce_kgf ? [] : JSON.parse(props.oneItem.prm_pforce_kgf),
                        prm_mforce_kgf : !props.oneItem.prm_mforce_kgf ? [] : JSON.parse(props.oneItem.prm_mforce_kgf),
                        prm_drum : !props.oneItem.prm_drum ? [] : JSON.parse(props.oneItem.prm_drum),
                        prm_paair : !props.oneItem.prm_paair ? [] : JSON.parse(props.oneItem.prm_paair),
                        prm_atair : !props.oneItem.prm_atair ? [] : JSON.parse(props.oneItem.prm_atair),
                        prm_fill : !props.oneItem.prm_fill ? [] : JSON.parse(props.oneItem.prm_fill),
                        prm_timer : !props.oneItem.prm_timer ? [] : JSON.parse(props.oneItem.prm_timer)
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