// ======================================================================================== [Import Libaray]
import { createColumnHelper } from "@tanstack/react-table";

// ======================================================================================== [Import Material UI Libaray]
//icon

// ======================================================================================== [Import Component] js

// Universal Actoin
import Revision from '../../../UniversalAction/Revision/Revision'

import IndeterminateCheckbox from '../../../../../../System/TableObj/TableType1/Components/IndeterminateCheckbox'
    
const columnHelper = createColumnHelper();
const columnDef = [  // TanStack Table은 컬럼 사이즈가 20이 최소
    {
        id: "rowview",
        size:100, // TanStack Table은 컬럼 사이즈가 20이 최소
        header: { kor : '내용보기', eng :'View content'},
        cell: ({ row }) =>  <Revision oneItem = {row.original}/>
    },
    columnHelper.accessor( "uuid_binary",
        {
            header: { kor : "UUID", eng : "UUID" },
            size: 150,
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
    columnHelper.accessor( "remark",
        {
            header: { kor : "비고", eng : "Remark" },
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
    columnHelper.accessor( "user_account",
        {
            header: { kor : "사용자 계정", eng : "User Account" },
            size: 150,
            enableColumnFilter: true,
            // cell: ({ row }) => (<button onClick={(e) => console.log(row.original)}>Click Me</button>),
        }
    ),
    columnHelper.accessor( "user_name",
        {
            header: { kor : "사용자명", eng : "User Name" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "user_nickname",
        {
            header: { kor : "별칭", eng : "User Nickname" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "user_birthday",
        {
            header: { kor : "생일", eng : "User Birthday" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "user_gender",
        {
            header: { kor : "성별", eng : "User Gender" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "approval_payload",
        {
            header: { kor : "결재라인", eng : "Approval Line" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "user_auth",
        {
            header: { kor : "사용자 권한", eng : "User Auth" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "user_email",
        {
            header: { kor : "이메일", eng : "E-Mail" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "user_phone",
        {
            header: { kor : "전화", eng : "Phone" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "user_position",
        {
            header: { kor : "소속", eng : "Position" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
]

export default columnDef;