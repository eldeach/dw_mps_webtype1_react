// ======================================================================================== [Import Libaray]
import { createColumnHelper } from "@tanstack/react-table";
import cookies from 'react-cookies'

// ======================================================================================== [Import Material UI Libaray]
//icon
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CircleIcon from '@mui/icons-material/Circle';
// ======================================================================================== [Import Component] js

// Universal Actoin

// Component
import PrmList from '../../../../CellValuePopUp/PrmList/PrmList'
import PrmDocs from '../../../../CellValuePopUp/PrmDocs/PrmDocs'
import Docs from '../../../../CellValuePopUp/Docs/Docs'

// Component Object
import actCodeBook from '../../../../../CodeBook/actCodeBook'
import prmCodeBook from '../../../../../CodeBook/prmCodeBook'

// ======================================================================================== [Import Component] CSS

    
const columnHelper = createColumnHelper();
const columnDef = [  // TanStack Table은 컬럼 사이즈가 20이 최소
    columnHelper.accessor( "approval_payload_id",
        {
            header: { kor : "승인 고유 번호", eng : "Approval Unique ID" },
            size: 100,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "data_ver",
        {
            header: { kor : "Data Ver", eng : "Data Ver" },
            size: 70,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "data_sub_ver",
        {
            header: { kor : "Data Sub Ver", eng : "Data Sub Ver" },
            size: 70,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "approval_status",
        {
            header: { kor : "승인상태", eng : "Approval Status" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "revision_history",
        {
            header: { kor : "제개정 내역", eng : "Revision History" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "mng_code",
        {
            header: { kor : "설비/시스템 관리코드", eng : "Machine/System management code" },
            size: 150,
            enableColumnFilter: true,
            // cell: ({ row }) => (<button onClick={(e) => console.log(row.original)}>Click Me</button>),
        }
    ),
    columnHelper.accessor( "mng_code_alt",
        {
            header: { kor : "대체 관리코드", eng : "Alternative management code" },
            size: 150,
            enableColumnFilter: true,
            // cell: ({ row }) => (<button onClick={(e) => console.log(row.original)}>Click Me</button>),
        }
    ),
    columnHelper.accessor( "mng_code_alt2",
        {
            header: { kor : "두번째 대체 관리코드", eng : "2nd alternative management code" },
            size: 150,
            enableColumnFilter: true,
            // cell: ({ row }) => (<button onClick={(e) => console.log(row.original)}>Click Me</button>),
        }
    ),
    columnHelper.accessor( "mng_name",
        {
            header: { kor : "설비/시스템 명칭", eng : "Machine/System name" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "mng_team",
        {
            header: { kor : "관리팀", eng : "Management team" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "machine_type",
        {
            header: { kor : "설비/시스템 유형", eng : "Machine/System Type" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "gmp_impact",
        {
            header: { kor : "GMP IMPACT", eng : "GMP IMPACT" },
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => (
                <div className='gmp_label'>
                    <div className='gmp_label_icon'>
                        <TaskAltIcon color={renderValue.getValue() ? 'accepted' : 'withdrawn' } fontSize='inherit'/>
                    </div>
                    <div className='gmp_label_text'>
                        {renderValue.getValue() ? `GMP IMPACT` : `no impact`}
                    </div>
                </div>
            )
        }
    ),
    columnHelper.accessor( "not_in_use",
        {
            header: { kor : "Not in use", eng : "Not in use" },
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => (
                <div className='gmp_label'>
                    <div className='gmp_label_icon'>
                        <TaskAltIcon color={renderValue.getValue() ? 'denied' : 'accepted' } fontSize='inherit'/>
                    </div>
                    <div className='gmp_label_text'>
                        {renderValue.getValue() ? `Not in use` : `In use`}
                    </div>
                </div>
            )
        }
    ),
    columnHelper.accessor( "periodic_mng_1y_qual",
        {
            header: actCodeBook.mc_periodic_1y_qual.mng_check,
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => (
                <div className='monitoring_label'>
                    <div className='monitoring_label_icon'>
                        <CircleIcon color={renderValue.getValue() ? 'recording' : 'white' } fontSize='inherit'/>
                    </div>
                    <div className='monitoring_label_text'>
                        {renderValue.getValue() ? `NOW MONITORING` : `N/A`}
                    </div>
                </div>
            )
        }
    ),
    columnHelper.accessor( "periodic_mng_qual",
        {
            header: actCodeBook.mc_periodic_qual.mng_check,
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => (
                <div className='monitoring_label'>
                    <div className='monitoring_label_icon'>
                        <CircleIcon color={renderValue.getValue() ? 'recording' : 'white' } fontSize='inherit'/>
                    </div>
                    <div className='monitoring_label_text'>
                        {renderValue.getValue() ? `NOW MONITORING` : `N/A`}
                    </div>
                </div>
            )
        }
    ),
    columnHelper.accessor( "periodic_mng_ster",
        {
            header: actCodeBook.mc_periodic_ster.mng_check,
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => (
                <div className='monitoring_label'>
                    <div className='monitoring_label_icon'>
                        <CircleIcon color={renderValue.getValue() ? 'recording' : 'white' } fontSize='inherit'/>
                    </div>
                    <div className='monitoring_label_text'>
                        {renderValue.getValue() ? `NOW MONITORING` : `N/A`}
                    </div>
                </div>
            )
        }
    ),
    columnHelper.accessor( "periodic_mng_vhp",
        {
            header: actCodeBook.mc_periodic_vhp.mng_check,
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => (
                <div className='monitoring_label'>
                    <div className='monitoring_label_icon'>
                        <CircleIcon color={renderValue.getValue() ? 'recording' : 'white' } fontSize='inherit'/>
                    </div>
                    <div className='monitoring_label_text'>
                        {renderValue.getValue() ? `NOW MONITORING` : `N/A`}
                    </div>
                </div>
            )
        }
    ),
    columnHelper.accessor( "periodic_mng_review",
        {
            header: actCodeBook.mc_periodic_review.mng_check,
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => (
                <div className='monitoring_label'>
                    <div className='monitoring_label_icon'>
                        <CircleIcon color={renderValue.getValue() ? 'recording' : 'white' } fontSize='inherit'/>
                    </div>
                    <div className='monitoring_label_text'>
                        {renderValue.getValue() ? `NOW MONITORING` : `N/A`}
                    </div>
                </div>
            )
        }
    ),
    columnHelper.accessor( "periodic_mng_cv",
        {
            header: actCodeBook.mc_periodic_cv.mng_check,
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => (
                <div className='monitoring_label'>
                    <div className='monitoring_label_icon'>
                        <CircleIcon color={renderValue.getValue() ? 'recording' : 'white' } fontSize='inherit'/>
                    </div>
                    <div className='monitoring_label_text'>
                        {renderValue.getValue() ? `NOW MONITORING` : `N/A`}
                    </div>
                </div>
            )
        }
    ),
    columnHelper.accessor( "periodic_mng_1y_mt",
        {
            header: actCodeBook.mc_periodic_1y_mt.mng_check,
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => (
                <div className='monitoring_label'>
                    <div className='monitoring_label_icon'>
                        <CircleIcon color={renderValue.getValue() ? 'recording' : 'white' } fontSize='inherit'/>
                    </div>
                    <div className='monitoring_label_text'>
                        {renderValue.getValue() ? `NOW MONITORING` : `N/A`}
                    </div>
                </div>
            )
        }
    ),
    columnHelper.accessor( "periodic_mng_mt",
        {
            header: actCodeBook.mc_periodic_mt.mng_check,
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => (
                <div className='monitoring_label'>
                    <div className='monitoring_label_icon'>
                        <CircleIcon color={renderValue.getValue() ? 'recording' : 'white' } fontSize='inherit'/>
                    </div>
                    <div className='monitoring_label_text'>
                        {renderValue.getValue() ? `NOW MONITORING` : `N/A`}
                    </div>
                </div>
            )
        }
    ),
    columnHelper.accessor( "periodic_mng_season_mt",
        {
            header: actCodeBook.mc_periodic_season_mt.mng_check,
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => (
                <div className='monitoring_label'>
                    <div className='monitoring_label_icon'>
                        <CircleIcon color={renderValue.getValue() ? 'recording' : 'white' } fontSize='inherit'/>
                    </div>
                    <div className='monitoring_label_text'>
                        {renderValue.getValue() ? `NOW MONITORING` : `N/A`}
                    </div>
                </div>
            )
        }
    ),
    columnHelper.accessor( "mc_periodic_1y_qual",
        {
            header:actCodeBook.mc_periodic_1y_qual,
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <Docs docList={renderValue.getValue()} />,

        }
    ),
    columnHelper.accessor( "mc_periodic_qual",
        {
            header: actCodeBook.mc_periodic_qual,
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <Docs docList={renderValue.getValue()} />,

        }
    ),
    columnHelper.accessor( "mc_periodic_ster",
        {
            header: actCodeBook.mc_periodic_ster,
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <Docs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "mc_periodic_vhp",
        {
            header: actCodeBook.mc_periodic_vhp,
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <Docs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "mc_periodic_review",
        {
            header: actCodeBook.mc_periodic_review,
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <Docs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "mc_iq",
        {
            header: actCodeBook.mc_iq,
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <Docs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "mc_oq",
        {
            header: actCodeBook.mc_oq,
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <Docs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "mc_pq",
        {
            header: actCodeBook.mc_pq,
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <Docs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "mc_periodic_cv",
        {
            header: actCodeBook.mc_periodic_cv,
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <Docs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "mc_periodic_1y_mt",
        {
            header: actCodeBook.mc_periodic_1y_mt,
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <Docs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "mc_periodic_mt",
        {
            header: actCodeBook.mc_periodic_mt,
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <Docs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "mc_periodic_season_mt",
        {
            header: actCodeBook.mc_periodic_season_mt,
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <Docs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "mc_mt",
        {
            header: actCodeBook.mc_mt,
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <Docs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_list",
        {
            header: { kor : "파라미터 목록", eng : "Parameter List" },
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmList prmList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_batchsize",
        {
            // header: { kor : "배치 사이즈 검증 [T]", eng : "Qual. Batch Size [T]" },
            header: prmCodeBook.prm_batchsize[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_batchsize_kg",
        {
            header: prmCodeBook.prm_batchsize_kg[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_gentlewing",
        {
            header: prmCodeBook.prm_gentlewing[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_chopper",
        {
            header: prmCodeBook.prm_chopper[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_spray",
        {
            header: prmCodeBook.prm_spray[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_spray_kgmin",
        {
            header: prmCodeBook.prm_spray_kgmin[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_spray_rpm",
        {
            header: prmCodeBook.prm_spray_rpm[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_gra_spray_air",
        {
            header: prmCodeBook.prm_gra_spray_air[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_gra_micro_prs",
        {
            header: prmCodeBook.prm_gra_micro_prs[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_inlet_air_temp",
        {
            header: prmCodeBook.prm_inlet_air_temp[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_exh_air_temp",
        {
            header: prmCodeBook.prm_exh_air_temp[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_inlet_air_vol",
        {
            header: prmCodeBook.prm_inlet_air_vol[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_inlet_air_vol_rpm",
        {
            header: prmCodeBook.prm_inlet_air_vol_rpm[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_roller_speed",
        {
            header: prmCodeBook.prm_roller_speed[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_roller_gap",
        {
            header: prmCodeBook.prm_roller_gap[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_grate",
        {
            header: prmCodeBook.prm_grate[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_blendrpm",
        {
            header: prmCodeBook.prm_blendrpm[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_filling_depth",
        {
            header: prmCodeBook.prm_filling_depth[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_cforece",
        {
            header: prmCodeBook.prm_cforece[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_feeder",
        {
            header: prmCodeBook.prm_feeder[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_feeder_2nd",
        {
            header: prmCodeBook.prm_feeder_2nd[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_turret",
        {
            header: prmCodeBook.prm_turret[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_pforce",
        {
            header: prmCodeBook.prm_pforce[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_mforce",
        {
            header: prmCodeBook.prm_mforce[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_pforce_2nd",
        {
            header: prmCodeBook.prm_pforce_2nd[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_mforce_2nd",
        {
            header: prmCodeBook.prm_mforce_2nd[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_pforce_kgf",
        {
            header: prmCodeBook.prm_pforce_kgf[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_mforce_kgf",
        {
            header: prmCodeBook.prm_mforce_kgf[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_drum",
        {
            header: prmCodeBook.prm_drum[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_paair",
        {
            header: prmCodeBook.prm_paair[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_atair",
        {
            header: prmCodeBook.prm_atair[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_fill",
        {
            header: prmCodeBook.prm_fill[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prm_timer",
        {
            header: prmCodeBook.prm_timer[cookies.load('site-lang')],
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <PrmDocs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "uuid_binary",
        {
            header: { kor : "UUID", eng : "UUID" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
]

export default columnDef;