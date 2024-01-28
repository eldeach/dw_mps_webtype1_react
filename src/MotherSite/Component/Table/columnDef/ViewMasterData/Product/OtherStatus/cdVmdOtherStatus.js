// ======================================================================================== [Import Libaray]
import { createColumnHelper } from "@tanstack/react-table";

// ======================================================================================== [Import Material UI Libaray]
//icon
import CircleIcon from '@mui/icons-material/Circle';
// ======================================================================================== [Import Component] js
// Component
import Docs from '../../../../Button/CellValuePopUp/Docs/Docs'

// Component Object
import actCodeBook from '../../../../../CodeBook/actCodeBook'

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
            header: { kor : "제품 관리코드", eng : "Product management code" },
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
    columnHelper.accessor( "prod_periodic_pv",
        {
            header: actCodeBook.prod_periodic_pv,
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <Docs docList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "prod_pv",
        {
            header: actCodeBook.prod_pv,
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <Docs docList={renderValue.getValue()} />,
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