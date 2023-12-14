// ======================================================================================== [Import Libaray]
import { createColumnHelper } from "@tanstack/react-table";
import cookies from 'react-cookies'

// ======================================================================================== [Import Material UI Libaray]
//icon
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CircleIcon from '@mui/icons-material/Circle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
// ======================================================================================== [Import Component] js
// Component Object
import actCodeBook from '../../../../Machine/ActCodeBook/actCodeBook'

// ======================================================================================== [Import Component] CSS

    
const columnHelper = createColumnHelper();
const columnDef = [  // TanStack Table은 컬럼 사이즈가 20이 최소
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
    columnHelper.accessor( "mng_code",
        {
            header: { kor : "제품 관리코드", eng : "Product management code" },
            size: 150,
            enableColumnFilter: true,
            // cell: ({ row }) => (<button onClick={(e) => console.log(row.original)}>Click Me</button>),
        }
    ),
    columnHelper.accessor( "mng_name",
        {
            header: { kor : "제품 명칭", eng : "Product name" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "periodic_mng_pv",
        {
            header: actCodeBook.prod_periodic_pv.mng_check,
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
    columnHelper.accessor( "period_month",
        {
            header: { kor : "주기 [월]", eng : "Period [Month]" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "latest_approval_date",
        {
            header: { kor : "최신 승인일", eng : "Latest Approval Date" },
            size: 150,
            enableColumnFilter: true,
            cell: ({row}) => (
                !row.original.latest_approval_date ? <div>{row.original.periodic_mng_qual}</div>
                : row.original.latest_approval_date
            )
        }
    ),
    columnHelper.accessor( "next_deadline",
        {
            header: { kor : "차기 만료일", eng : "Next deadline" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "remaining_days",
        {
            header: { kor : "남은 일수", eng : "Remaining days" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "exceed",
        {
            header: { kor : "초과", eng : "Exceed" },
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => (
                renderValue.getValue() ? 
                <div className='exceed_label'>
                    <div className='exceed_label_icon'>
                        <WarningAmberIcon color='white' fontSize='inherit'/>
                    </div>
                    <div className='exceed_label_text'>
                        {renderValue.getValue()}
                    </div>
                </div>
                :<div/>
            )
        }
    ),
]

export default columnDef;