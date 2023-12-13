// ======================================================================================== [Import Libaray]
import { createColumnHelper } from "@tanstack/react-table";
import cookies from 'react-cookies'

// ======================================================================================== [Import Material UI Libaray]
//icon
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CircleIcon from '@mui/icons-material/Circle';
// ======================================================================================== [Import Component] js

// Universal Actoin
import Revision from '../../../UniversalAction/Revision/Revision'

// Component
import PrmList from '../../PopupCellView/PrmList/PrmList'
import PrmDocs from '../../PopupCellView/PrmDocs/PrmDocs'
import Docs from '../../PopupCellView/Docs/Docs'

// Component Object
import prmCodeBook from '../../../PrmCodeBook/prmCodeBook'

// ======================================================================================== [Import Component] CSS

    
const columnHelper = createColumnHelper();
const columnDef = [  // TanStack Table은 컬럼 사이즈가 20이 최소
    {
        id: "rowview",
        size:100, // TanStack Table은 컬럼 사이즈가 20이 최소
        header: { kor : '개정', eng :'View content'},
        cell: ({ row }) =>  <Revision oneItem = {row.original}/>
    },
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
    columnHelper.accessor( "periodic_mng_qual",
        {
            header: { kor : "주기적 Re-Qual 관리", eng : "Periodic Re-Qual Management" },
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
            header: { kor : "주기적 멸균 Re-Qual 관리", eng : "Periodic Sterilizaion Re-Qual Management" },
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
            header: { kor : "주기적 VHP Re-Qual 관리", eng : "Periodic VHP Re-Qual Management" },
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
            header: { kor : "주기적 검토 관리", eng : "Periodic Review Management" },
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
            header: { kor : "주기적 CV 관리", eng : "Periodic CV Management" },
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
            header: { kor : "주기적 Mapping Test 관리", eng : "Periodic Mapping Test Management" },
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
    columnHelper.accessor( "mc_periodic_qual",
        {
            header: { kor : "정기적 재적격성 평가", eng : "Periodic Re-Qual" },
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <Docs docList={renderValue.getValue()} />,

        }
    ),
    columnHelper.accessor( "mc_periodic_ster",
        {
            header: { kor : "정기적 멸균 재적격성 평가", eng : "Periodic Sterilizaion Re-Qual" },
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <Docs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "mc_periodic_review",
        {
            header: { kor : "주기적 검토", eng : "Periodic Review" },
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <Docs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "mc_iq",
        {
            header: { kor : "IQ", eng : "IQ" },
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <Docs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "mc_oq",
        {
            header: { kor : "OQ", eng : "OQ" },
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <Docs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "mc_pq",
        {
            header: { kor : "PQ", eng : "PQ" },
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <Docs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "mc_periodic_cv",
        {
            header: { kor : "주기적 CV", eng : "Periodic CV" },
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <Docs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "mc_periodic_mt",
        {
            header: { kor : "주기적 Mapping", eng : "Periodic Mapping" },
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
    columnHelper.accessor( "uuid_binary",
        {
            header: { kor : "UUID", eng : "UUID" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
]

export default columnDef;