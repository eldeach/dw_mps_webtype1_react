// ======================================================================================== [Import Libaray]
import { useEffect, useState } from 'react';
import cookies from 'react-cookies';

// ======================================================================================== [Import Material UI Libaray]
import { Button, Modal, Paper } from '@mui/material';
//icon
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { MdOutlinePhotoSizeSelectSmall } from "react-icons/md";
import { MdGesture } from "react-icons/md";
import { GiPowder } from "react-icons/gi";
import { GiEclipseSaw } from "react-icons/gi";
import { GiChaingun } from "react-icons/gi";
import { FaSprayCan } from "react-icons/fa";
import { FaTemperatureThreeQuarters } from "react-icons/fa6";
import { FaTemperatureQuarter } from "react-icons/fa6";
import { GiWhirlwind } from "react-icons/gi";
import { MdCompress } from "react-icons/md";
import { GiCartwheel } from "react-icons/gi";
import { SiBlender } from "react-icons/si";
import { FaVials } from "react-icons/fa";
import { SiMailgun } from "react-icons/si";
import { FaDrumSteelpan } from "react-icons/fa";
import { RxLapTimer } from "react-icons/rx";


// ======================================================================================== [Import Component] js
import OnePrmCard from './Component/OnePrmCard'
import prmCodeBook from '../../../../CodeBook/prmCodeBook';

// ======================================================================================== [Import Component] CSS


function VerifiedPrm(props) {
    const { oneItem } = props

    const style = {
        detailedBigCardPaper: {
            width: '60vw',
            height: '80vh',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: 24,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto'
        },
    }

    const [popup, setPopup] = useState(0);
    const handleModalClose = () => setPopup(0);

    useEffect(() => {
        console.log(oneItem)
    }, []);

    return (
        <div>
            <Button variant="contained" color='sys1' size="small" onClick={() => setPopup(1)}>
                <MenuBookIcon sx={{ fontSize: '18px', m: 0, p: 0 }} />
            </Button>
            <Modal open={(popup === 1)} onClose={handleModalClose}>
                <Paper sx={style.detailedBigCardPaper} elevation={3}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ color: 'grey', fontWeight: 'border', fontSize: '39px', marginRight: '6px', boxSizing: 'border-box', fontWeight: 'bolder' }}>
                            {oneItem.mng_code}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '8px' }}>
                            <div style={{ fontSize: '14px', fontWeight: 'bolder', color: '#3f50b5' }}>
                                {oneItem.mng_team}
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: 'bolder', color: '#3f50b5' }}>
                                {oneItem.mng_name}
                            </div>
                        </div>
                        <div style={{ flexGrow: 1 }} />
                        <div style={{ display: 'block', textAlign: 'end', boxSizing: 'border-box' }}>
                            <button className='popup-close-button' onClick={handleModalClose}>X</button>
                        </div>
                    </div>

                    <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', paddingLeft: 'auto', paddingRight: 'auto' }}>
                        {
                            (oneItem.prm_batchsize_min_value || oneItem.prm_batchsize_max_value) ?
                                <div>
                                    <OnePrmCard
                                        prmIcon={<MdOutlinePhotoSizeSelectSmall color='#76ff03' fontSize='inherit' />}
                                        prmName={prmCodeBook.prm_batchsize[cookies.load('site-lang')]}
                                        minValue={oneItem.prm_batchsize_min_value}
                                        maxValue={oneItem.prm_batchsize_max_value}
                                        prm_tbl_name={`tb_prm_batchsize`}
                                        prm_id_col_name={`prm_batchsize_id`}
                                        mng_code={oneItem.mng_code}
                                        data_ver={oneItem.data_ver}
                                    />
                                </div>
                                : <div />
                        }
                        {
                            (oneItem.prm_batchsize_kg_min_value || oneItem.prm_batchsize_kg_max_value) ?
                                <OnePrmCard
                                    prmIcon={<MdOutlinePhotoSizeSelectSmall color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_batchsize_kg[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_batchsize_kg_min_value}
                                    maxValue={oneItem.prm_batchsize_kg_max_value}
                                    prm_tbl_name={`tb_prm_batchsize_kg`}
                                    prm_id_col_name={`prm_batchsize_kg_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_batchsize_vial_min_value || oneItem.prm_batchsize_vial_max_value) ?
                                <OnePrmCard
                                    prmIcon={<MdOutlinePhotoSizeSelectSmall color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_batchsize_vial[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_batchsize_vial_min_value}
                                    maxValue={oneItem.prm_batchsize_vial_max_value}
                                    prm_tbl_name={`tb_prm_batchsize_vial`}
                                    prm_id_col_name={`prm_batchsize_vial_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_batchsize_syringe_min_value || oneItem.prm_batchsize_syringe_max_value) ?
                                <OnePrmCard
                                    prmIcon={<MdOutlinePhotoSizeSelectSmall color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_batchsize_syringe[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_batchsize_syringe_min_value}
                                    maxValue={oneItem.prm_batchsize_syringe_max_value}
                                    prm_tbl_name={`tb_prm_batchsize_syringe`}
                                    prm_id_col_name={`prm_batchsize_syringe_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        { // ============================================================================
                            (oneItem.prm_gentlewing_min_value || oneItem.prm_gentlewing_max_value) ?
                                <OnePrmCard
                                    prmIcon={<MdGesture color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_gentlewing[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_gentlewing_min_value}
                                    maxValue={oneItem.prm_gentlewing_max_value}
                                    prm_tbl_name={`tb_prm_gentlewing`}
                                    prm_id_col_name={`prm_gentlewing_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_chopper_min_value || oneItem.prm_chopper_max_value) ?
                                <OnePrmCard
                                    prmIcon={<GiEclipseSaw color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_chopper[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_chopper_min_value}
                                    maxValue={oneItem.prm_chopper_max_value}
                                    prm_tbl_name={`tb_prm_chopper`}
                                    prm_id_col_name={`prm_chopper_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_spray_min_value || oneItem.prm_spray_max_value) ?
                                <OnePrmCard
                                    prmIcon={<FaSprayCan color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_spray[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_spray_min_value}
                                    maxValue={oneItem.prm_spray_max_value}
                                    prm_tbl_name={`tb_prm_spray`}
                                    prm_id_col_name={`prm_spray_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_spray_kgmin_min_value || oneItem.prm_spray_kgmin_max_value) ?
                                <OnePrmCard
                                    prmIcon={<FaSprayCan color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_spray_kgmin[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_spray_kgmin_min_value}
                                    maxValue={oneItem.prm_spray_kgmin_max_value}
                                    prm_tbl_name={`tb_prm_spray_kgmin`}
                                    prm_id_col_name={`prm_spray_kgmin_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_spray_rpm_min_value || oneItem.prm_spray_rpm_max_value) ?
                                <OnePrmCard
                                    prmIcon={<FaSprayCan color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_spray_rpm[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_spray_rpm_min_value}
                                    maxValue={oneItem.prm_spray_rpm_max_value}
                                    prm_tbl_name={`tb_prm_spray_rpm`}
                                    prm_id_col_name={`prm_spray_rpm_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_gra_spray_air_min_value || oneItem.prm_gra_spray_air_max_value) ?
                                <OnePrmCard
                                    prmIcon={<GiChaingun color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_gra_spray_air[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_gra_spray_air_min_value}
                                    maxValue={oneItem.prm_gra_spray_air_max_value}
                                    prm_tbl_name={`tb_prm_gra_spray_air`}
                                    prm_id_col_name={`prm_gra_spray_air_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_gra_micro_prs_min_value || oneItem.prm_gra_micro_prs_max_value) ?
                                <OnePrmCard
                                    prmIcon={<GiChaingun color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_gra_micro_prs[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_gra_micro_prs_min_value}
                                    maxValue={oneItem.prm_gra_micro_prs_max_value}
                                    prm_tbl_name={`tb_prm_gra_micro_prs`}
                                    prm_id_col_name={`prm_gra_micro_prs_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_inlet_air_temp_min_value || oneItem.prm_inlet_air_temp_max_value) ?
                                <OnePrmCard
                                    prmIcon={<FaTemperatureThreeQuarters color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_inlet_air_temp[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_inlet_air_temp_min_value}
                                    maxValue={oneItem.prm_inlet_air_temp_max_value}
                                    prm_tbl_name={`tb_prm_inlet_air_temp`}
                                    prm_id_col_name={`prm_inlet_air_temp_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_exh_air_temp_min_value || oneItem.prm_exh_air_temp_max_value) ?
                                <OnePrmCard
                                    prmIcon={<FaTemperatureQuarter color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_exh_air_temp[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_exh_air_temp_min_value}
                                    maxValue={oneItem.prm_exh_air_temp_max_value}
                                    prm_tbl_name={`tb_prm_exh_air_temp`}
                                    prm_id_col_name={`prm_exh_air_temp_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_inlet_air_vol_min_value || oneItem.prm_inlet_air_vol_max_value) ?
                                <OnePrmCard
                                    prmIcon={<GiWhirlwind color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_inlet_air_vol[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_inlet_air_vol_min_value}
                                    maxValue={oneItem.prm_inlet_air_vol_max_value}
                                    prm_tbl_name={`tb_prm_inlet_air_vol`}
                                    prm_id_col_name={`prm_inlet_air_vol_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_inlet_air_vol_rpm_min_value || oneItem.prm_inlet_air_vol_rpm_max_value) ?
                                <OnePrmCard
                                    prmIcon={<GiWhirlwind color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_inlet_air_vol_rpm[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_inlet_air_vol_rpm_min_value}
                                    maxValue={oneItem.prm_inlet_air_vol_rpm_max_value}
                                    prm_tbl_name={`tb_prm_inlet_air_vol_rpm`}
                                    prm_id_col_name={`prm_inlet_air_vol_rpm_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_exh_air_vol_rpm_min_value || oneItem.prm_exh_air_vol_rpm_max_value) ?
                                <OnePrmCard
                                    prmIcon={<GiWhirlwind color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_exh_air_vol_rpm[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_exh_air_vol_rpm_min_value}
                                    maxValue={oneItem.prm_exh_air_vol_rpm_max_value}
                                    prm_tbl_name={`tb_prm_exh_air_vol_rpm`}
                                    prm_id_col_name={`prm_exh_air_vol_rpm_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_roller_speed_min_value || oneItem.prm_roller_speed_max_value) ?
                                <OnePrmCard
                                    prmIcon={<GiCartwheel color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_roller_speed[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_roller_speed_min_value}
                                    maxValue={oneItem.prm_roller_speed_max_value}
                                    prm_tbl_name={`tb_prm_roller_speed`}
                                    prm_id_col_name={`prm_roller_speed_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_roller_gap_min_value || oneItem.prm_roller_gap_max_value) ?
                                <OnePrmCard
                                    prmIcon={<MdCompress color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_roller_gap[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_roller_gap_min_value}
                                    maxValue={oneItem.prm_roller_gap_max_value}
                                    prm_tbl_name={`tb_prm_roller_gap`}
                                    prm_id_col_name={`prm_roller_gap_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_grate_min_value || oneItem.prm_grate_max_value) ?
                                <OnePrmCard
                                    prmIcon={<GiPowder color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_grate[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_grate_min_value}
                                    maxValue={oneItem.prm_grate_max_value}
                                    prm_tbl_name={`tb_prm_grate`}
                                    prm_id_col_name={`prm_grate_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_blendrpm_min_value || oneItem.prm_blendrpm_max_value) ?
                                <OnePrmCard
                                    prmIcon={<SiBlender color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_blendrpm[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_blendrpm_min_value}
                                    maxValue={oneItem.prm_blendrpm_max_value}
                                    prm_tbl_name={`tb_prm_blendrpm`}
                                    prm_id_col_name={`prm_blendrpm_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_filling_depth_min_value || oneItem.prm_filling_depth_max_value) ?
                                <OnePrmCard
                                    prmIcon={<GiPowder color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_filling_depth[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_filling_depth_min_value}
                                    maxValue={oneItem.prm_filling_depth_max_value}
                                    prm_tbl_name={`tb_prm_filling_depth`}
                                    prm_id_col_name={`prm_filling_depth_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_cforece_min_value || oneItem.prm_cforece_max_value) ?
                                <OnePrmCard
                                    prmIcon={<MdCompress color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_cforece[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_cforece_min_value}
                                    maxValue={oneItem.prm_cforece_max_value}
                                    prm_tbl_name={`tb_prm_cforece`}
                                    prm_id_col_name={`prm_cforece_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_feeder_min_value || oneItem.prm_feeder_max_value) ?
                                <OnePrmCard
                                    prmIcon={<GiPowder color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_feeder[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_feeder_min_value}
                                    maxValue={oneItem.prm_feeder_max_value}
                                    prm_tbl_name={`tb_prm_feeder`}
                                    prm_id_col_name={`prm_feeder_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_feeder_2nd_min_value || oneItem.prm_feeder_2nd_max_value) ?
                                <OnePrmCard
                                    prmIcon={<GiPowder color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_feeder_2nd[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_feeder_2nd_min_value}
                                    maxValue={oneItem.prm_feeder_2nd_max_value}
                                    prm_tbl_name={`tb_prm_feeder_2nd`}
                                    prm_id_col_name={`prm_feeder_2nd_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_turret_min_value || oneItem.prm_turret_max_value) ?
                                <OnePrmCard
                                    prmIcon={<SiMailgun color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_turret[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_turret_min_value}
                                    maxValue={oneItem.prm_turret_max_value}
                                    prm_tbl_name={`tb_prm_turret`}
                                    prm_id_col_name={`prm_turret_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_pforce_min_value || oneItem.prm_pforce_max_value) ?
                                <OnePrmCard
                                    prmIcon={<MdCompress color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_pforce[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_pforce_min_value}
                                    maxValue={oneItem.prm_pforce_max_value}
                                    prm_tbl_name={`tb_prm_pforce`}
                                    prm_id_col_name={`prm_pforce_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_mforce_min_value || oneItem.prm_mforce_max_value) ?
                                <OnePrmCard
                                    prmIcon={<MdCompress color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_mforce[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_mforce_min_value}
                                    maxValue={oneItem.prm_mforce_max_value}
                                    prm_tbl_name={`tb_prm_mforce`}
                                    prm_id_col_name={`prm_mforce_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_pforce_2nd_min_value || oneItem.prm_pforce_2nd_max_value) ?
                                <OnePrmCard
                                    prmIcon={<MdCompress color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_pforce_2nd[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_pforce_2nd_min_value}
                                    maxValue={oneItem.prm_pforce_2nd_max_value}
                                    prm_tbl_name={`tb_prm_pforce_2nd`}
                                    prm_id_col_name={`prm_pforce_2nd_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_mforce_2nd_min_value || oneItem.prm_mforce_2nd_max_value) ?
                                <OnePrmCard
                                    prmIcon={<MdCompress color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_mforce_2nd[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_mforce_2nd_min_value}
                                    maxValue={oneItem.prm_mforce_2nd_max_value}
                                    prm_tbl_name={`tb_prm_mforce_2nd`}
                                    prm_id_col_name={`prm_mforce_2nd_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_pforce_kgf_min_value || oneItem.prm_pforce_kgf_max_value) ?
                                <OnePrmCard
                                    prmIcon={<MdCompress color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_pforce_kgf[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_pforce_kgf_min_value}
                                    maxValue={oneItem.prm_pforce_kgf_max_value}
                                    prm_tbl_name={`tb_prm_pforce_kgf`}
                                    prm_id_col_name={`prm_pforce_kgf_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_mforce_kgf_min_value || oneItem.prm_mforce_kgf_max_value) ?
                                <OnePrmCard
                                    prmIcon={<MdCompress color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_mforce_kgf[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_mforce_kgf_min_value}
                                    maxValue={oneItem.prm_mforce_kgf_max_value}
                                    prm_tbl_name={`tb_prm_mforce_kgf`}
                                    prm_id_col_name={`prm_mforce_kgf_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_drum_min_value || oneItem.prm_drum_max_value) ?
                                <OnePrmCard
                                    prmIcon={<FaDrumSteelpan color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_drum[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_drum_min_value}
                                    maxValue={oneItem.prm_drum_max_value}
                                    prm_tbl_name={`tb_prm_drum`}
                                    prm_id_col_name={`prm_drum_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_paair_min_value || oneItem.prm_paair_max_value) ?
                                <OnePrmCard
                                    prmIcon={<GiChaingun color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_paair[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_paair_min_value}
                                    maxValue={oneItem.prm_paair_max_value}
                                    prm_tbl_name={`tb_prm_paair`}
                                    prm_id_col_name={`prm_paair_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_atair_min_value || oneItem.prm_atair_max_value) ?
                                <OnePrmCard
                                    prmIcon={<GiChaingun color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_atair[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_atair_min_value}
                                    maxValue={oneItem.prm_atair_max_value}
                                    prm_tbl_name={`tb_prm_atair`}
                                    prm_id_col_name={`prm_atair_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_fill_min_value || oneItem.prm_fill_max_value) ?
                                <OnePrmCard
                                    prmIcon={<FaVials color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_fill[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_fill_min_value}
                                    maxValue={oneItem.prm_fill_max_value}
                                    prm_tbl_name={`tb_prm_fill`}
                                    prm_id_col_name={`prm_fill_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                        {
                            (oneItem.prm_timer_min_value || oneItem.prm_timer_max_value) ?
                                <OnePrmCard
                                    prmIcon={<RxLapTimer color='#76ff03' fontSize='inherit' />}
                                    prmName={prmCodeBook.prm_timer[cookies.load('site-lang')]}
                                    minValue={oneItem.prm_timer_min_value}
                                    maxValue={oneItem.prm_timer_max_value}
                                    prm_tbl_name={`tb_prm_timer`}
                                    prm_id_col_name={`prm_timer_id`}
                                    mng_code={oneItem.mng_code}
                                    data_ver={oneItem.data_ver}
                                />
                                : <div />
                        }
                    </div>
                </Paper>
            </Modal>
        </div>
    )
}

export default VerifiedPrm;