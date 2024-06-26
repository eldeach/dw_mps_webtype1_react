// ======================================================================================== [Import Libaray]
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cookies from 'react-cookies'

// ======================================================================================== [Import Material UI Libaray]  
import { ThemeProvider } from '@mui/material/styles';
import { AppBar, Box, Toolbar, IconButton, Drawer } from '@mui/material/';
//icon
import MenuIcon from '@mui/icons-material/Menu';

// ======================================================================================== [Import Component] js
import LoginButton from './System/Forms/ButtonLogin/LoginButton';
import LangButton from './System/Forms/ButtonLang/LangButton';

// System Component
import GoSystemButton from './System/Forms/ButtonGoSystem/GoSystemButton';
import menuConfig from './System/SystemMenu/menuConfig';
import systemThemes from './System/systemThemes';
// System Redirect page
import NoAuthPage from './System/RedirectPage/NoAuthPage/NoAuthPage';
import SessionExpired from './System/RedirectPage/SessionExpired/SessionExpired';
import SubmitSuccess from './System/RedirectPage/SubmitSuccess/SubmitSuccess';

// Sys 1 Forms
import FI from './MotherSite/Forms/FirstImpression/FI'
import MyPrepared from './MotherSite/Forms/MyPrepared/MyPrepared'
import MyReview from './MotherSite/Forms/MyReview/MyReview'
import UserRecorder from './MotherSite/Forms/User/UserRecorder/UserRecorder';
import ViewUser from './MotherSite/Forms/User/ViewUser/ViewUser';

// AVM Forms
import ViewPrm from './MotherSite/Forms/Machine/ViewPrm/ViewPrm'
import ViewCV from './MotherSite/Forms/Machine/ViewCV/ViewCV'
import ViewMt from './MotherSite/Forms/Machine/ViewMt/ViewMt'
import MachineVMD from './MotherSite/Forms/Machine/ViewMasterData/MachineVMD'
import ViewReQual from './MotherSite/Forms/Machine/ViewReQual/ViewReQual'
import MachineRecorder from './MotherSite/Forms/Machine/Recorder/MachineRecorder'
import ProductVMD from './MotherSite/Forms/Product/ViewMasterData/ProductVMD'
import ViewPV from './MotherSite/Forms/Product/ViewPV/ViewPV'
import ProductRecorder from './MotherSite/Forms/Product/ProductRecorder/ProductRecorder'

// Mailer
import MailingList from './Mailing/MailingList';
import MailingAddList from './Mailing/MailingAddList';


//Scheduler
import SchedulerList from './Scheduler/SchedulerList';
import SchedulerUpdList from './Scheduler/SchedulerUpdList';

//Audit
import AuditList from './Audit/auditList';

// ======================================================================================== [Import Component] CSS
import './App.css';

function App() {
    const [openMenu, setOpenMenu] = useState(false);
    const handleMenuClose = () => setOpenMenu(false);

    const [pageTitle, setPageTitle] = useState('')
    const handlePageTitle = (titleText) => setPageTitle(titleText)

    const [systemCode, setSystemCode] = useState('sys1')
    const handleSystemCode = (codeValue) => setSystemCode(codeValue)

    useEffect(() => {
        // console.log(cookies.load('site-lang'))
        if (!cookies.load('site-lang')) {
            cookies.save('site-lang', 'eng', { path: '/' })
        }
    }, []);

    return (
        <ThemeProvider theme={systemThemes}>
            <div className="App">
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar color={systemCode} position="fixed">
                        <Toolbar variant="dense">
                            <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }} onClick={() => setOpenMenu(true)}>
                                <MenuIcon />
                            </IconButton>
                            <div style={{ fontSize: '18px' }}>{pageTitle}</div>
                            <Box sx={{ flexGrow: 1 }}>

                            </Box>
                            <div style={{ fontSize: '19px', marginTop: '1px', fontWeight: 'bolder' }}>AVM</div>
                            {/* <div style={{fontSize:'18px', marginRight:'20px', fontWeight:'bolder'}}>{menuConfig[systemCode].name}</div> */}
                            {/* <GoSystemButton handlePageTitle={handlePageTitle} handleSystemCode={handleSystemCode}/> */}
                            <LangButton />
                            <LoginButton />
                        </Toolbar>
                    </AppBar>
                </Box>
                <Drawer anchor={'left'} open={(openMenu)} onClose={handleMenuClose}>
                    <Box sx={{ width: 250 }} role="presentation" onClick={handleMenuClose} onKeyDown={handleMenuClose}>
                        {menuConfig[systemCode].menu()}
                    </Box>
                </Drawer>
                <div style={{ height: '60px' }} />

                <Routes>
                    <Route path='/' element={<FI handlePageTitle={handlePageTitle} handleSystemCode={handleSystemCode} />} />
                    <Route path='/noauth' element={<NoAuthPage />} />
                    <Route path='/sessionexpired' element={<SessionExpired />} />
                    <Route path='/submitsuccess' element={<SubmitSuccess />} />

                    <Route path='/myprepared' element={<MyPrepared handlePageTitle={handlePageTitle} handleSystemCode={handleSystemCode} />} />
                    <Route path='/myreview' element={<MyReview handlePageTitle={handlePageTitle} handleSystemCode={handleSystemCode} />} />

                    <Route path='/mailingaddlist' element={
                        <MailingAddList
                            handlePageTitle={handlePageTitle}
                            handleSystemCode={handleSystemCode}
                        />
                    } />
                    <Route path='/mailingupdlist' element={
                        <MailingAddList
                            handlePageTitle={handlePageTitle}
                            handleSystemCode={handleSystemCode}
                        />
                    } />
                    <Route path='/mailinglist' element={<MailingList handlePageTitle={handlePageTitle} handleSystemCode={handleSystemCode} />} />


                    <Route path='/schedulerupdlist' element={<SchedulerUpdList handlePageTitle={handlePageTitle} handleSystemCode={handleSystemCode} />} />
                    <Route path='/schedulerlist' element={<SchedulerList handlePageTitle={handlePageTitle} handleSystemCode={handleSystemCode} />} />
                    
                    <Route path='/auditlist' element={<AuditList handlePageTitle={handlePageTitle} handleSystemCode={handleSystemCode} />} />

                    <Route path='/machinelist' element={<MachineVMD handlePageTitle={handlePageTitle} handleSystemCode={handleSystemCode} />} />
                    <Route path='/addmachine' element={
                        <MachineRecorder
                            preparedType='NEW'
                            initialValues={{
                                approval_payload: [[]],
                                revision_history: '',
                                previous_approval_payload_id: null,
                                mng_code: '',
                                mng_code_alt: '',
                                mng_code_alt2: '',
                                mng_name: '',
                                mng_team: '',
                                machine_type: 'EQ',
                                gmp_impact: true,
                                not_in_use: '',
                                periodic_mng_1y_qual: true,
                                periodic_mng_qual: true,
                                periodic_mng_ster: true,
                                periodic_mng_vhp: true,
                                periodic_mng_review: true,
                                periodic_mng_cv: true,
                                periodic_mng_1y_mt: true,
                                periodic_mng_mt: true,
                                periodic_mng_season_mt: true,
                                mc_periodic_1y_qual: [],
                                mc_periodic_qual: [],
                                mc_periodic_ster: [],
                                mc_periodic_vhp: [],
                                mc_periodic_review: [],
                                mc_iq: [],
                                mc_oq: [],
                                mc_pq: [],
                                mc_periodic_cv: [],
                                mc_cv: [],
                                mc_periodic_1y_mt: [],
                                mc_periodic_mt: [],
                                mc_periodic_season_mt: [],
                                mc_mt: [],
                                prm_list: [{
                                    prm_batchsize: false,
                                    prm_batchsize_kg: false,
                                    prm_batchsize_vial: false,
                                    prm_batchsize_syringe: false,
                                    prm_gentlewing: false,
                                    prm_chopper: false,
                                    prm_spray: false,
                                    prm_spray_kgmin: false,
                                    prm_spray_rpm: false,
                                    prm_gra_spray_air: false,
                                    prm_gra_micro_prs: false,
                                    prm_inlet_air_temp: false,
                                    prm_exh_air_temp: false,
                                    prm_inlet_air_vol: false,
                                    prm_inlet_air_vol_rpm: false,
                                    prm_exh_air_vol_rpm: false,
                                    prm_roller_speed: false,
                                    prm_roller_gap: false,
                                    prm_grate: false,
                                    prm_blendrpm: false,
                                    prm_filling_depth: false,
                                    prm_cforece: false,
                                    prm_turret: false,
                                    prm_feeder: false,
                                    prm_feeder_2nd: false,
                                    prm_pforce: false,
                                    prm_mforce: false,
                                    prm_pforce_2nd: false,
                                    prm_mforce_2nd: false,
                                    prm_pforce_kgf: false,
                                    prm_mforce_kgf: false,
                                    prm_drum: false,
                                    prm_paair: false,
                                    prm_atair: false,
                                    prm_fill: false,
                                    prm_timer: false,
                                }],
                                prm_batchsize: [],
                                prm_batchsize_kg: [],
                                prm_batchsize_vial: [],
                                prm_batchsize_syringe: [],
                                prm_gentlewing: [],
                                prm_chopper: [],
                                prm_spray: [],
                                prm_spray_kgmin: [],
                                prm_spray_rpm: [],
                                prm_gra_spray_air: [],
                                prm_gra_micro_prs: [],
                                prm_inlet_air_temp: [],
                                prm_exh_air_temp: [],
                                prm_inlet_air_vol: [],
                                prm_inlet_air_vol_rpm: [],
                                prm_exh_air_vol_rpm: [],
                                prm_roller_speed: [],
                                prm_roller_gap: [],
                                prm_grate: [],
                                prm_blendrpm: [],
                                prm_filling_depth: [],
                                prm_cforece: [],
                                prm_feeder: [],
                                prm_feeder_2nd: [],
                                prm_turret: [],
                                prm_pforce: [],
                                prm_mforce: [],
                                prm_pforce_2nd: [],
                                prm_mforce_2nd: [],
                                prm_pforce_kgf: [],
                                prm_mforce_kgf: [],
                                prm_drum: [],
                                prm_paair: [],
                                prm_atair: [],
                                prm_fill: [],
                                prm_timer: []
                            }}
                            handlePageTitle={handlePageTitle}
                            handleSystemCode={handleSystemCode} />
                    } />

                    <Route path='/viewrequal' element={<ViewReQual handlePageTitle={handlePageTitle} handleSystemCode={handleSystemCode} />} />
                    <Route path='/viewmt' element={<ViewMt handlePageTitle={handlePageTitle} handleSystemCode={handleSystemCode} />} />
                    <Route path='/viewprm' element={<ViewPrm handlePageTitle={handlePageTitle} handleSystemCode={handleSystemCode} />} />
                    <Route path='/viewcv' element={<ViewCV handlePageTitle={handlePageTitle} handleSystemCode={handleSystemCode} />} />

                    <Route path='/userlist' element={<ViewUser handlePageTitle={handlePageTitle} handleSystemCode={handleSystemCode} />} />
                    <Route path='/adduser' element={
                        <UserRecorder
                            preparedType='NEW'
                            initialValues={{
                                approval_payload: [[]],
                                previous_approval_payload_id: null,
                                user_account: '',
                                user_pw: '',
                                user_pw_confirm: '',
                                user_name: '',
                                user_nickname: '',
                                user_birthday: null,
                                user_gender: 'MALE',
                                user_email: [],
                                user_phone: [],
                                user_position: [],
                                user_auth: [],
                                revision_history: ''
                            }}
                            handlePageTitle={handlePageTitle}
                            handleSystemCode={handleSystemCode} />
                    } />

                    <Route path='/productlist' element={<ProductVMD handlePageTitle={handlePageTitle} handleSystemCode={handleSystemCode} />} />
                    <Route path='/viewpv' element={<ViewPV handlePageTitle={handlePageTitle} handleSystemCode={handleSystemCode} />} />
                    <Route path='/addproduct' element={
                        <ProductRecorder
                            preparedType='NEW'
                            initialValues={{
                                approval_payload: [[]],
                                revision_history: '',
                                previous_approval_payload_id: null,
                                mng_code: '',
                                mng_code_alt: '',
                                mng_code_alt2: '',
                                mng_name: '',
                                periodic_mng_pv: true,
                                prod_periodic_pv: [],
                                prod_pv: []
                            }}
                            handlePageTitle={handlePageTitle}
                            handleSystemCode={handleSystemCode} />
                    } />
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
