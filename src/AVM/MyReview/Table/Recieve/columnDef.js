// ======================================================================================== [Import Libaray]
import { createColumnHelper } from "@tanstack/react-table";

// ======================================================================================== [Import Material UI Libaray]
//icon

// ======================================================================================== [Import Component] js
// Row View
import RvAccount from "../../UniversalReader/User/Row/RvAccount";
// Cell View
import ElecSign from '../../../../../System/ApprovalSystem/ElecSign/ElecSign'
    
const columnHelper = createColumnHelper();
const columnDef = [  // TanStack Table은 컬럼 사이즈가 20이 최소
    columnHelper.accessor( "approval_payload_id",
        {
            header: { kor : "승인 고유 번호", eng : "Approval Unique ID" },
            size: 100,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "tbl_name",
        {
            header: { kor : "테이블명", eng : "Table name" },
            size: 120,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "sys_code",
        {
            header: { kor : "시스템 코드", eng : "System Code" },
            size: 120,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "service_type",
    {
        header: { kor : "서비스 유형", eng : "Service Type" },
        size: 200,
        enableColumnFilter: true,
    }
    ),
    columnHelper.accessor( "sys_name",
        {
            header: { kor : "시스템명", eng : "System Name" },
            size: 200,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "approval_order",
        {
            header: { kor : "승인순서", eng : "Approval Order" },
            size: 100,
            enableColumnFilter: true,
        }
    ),
    {
        id: "rowview",
        size:100, // TanStack Table은 컬럼 사이즈가 20이 최소
        header: { kor : '내용보기', eng :'View content'},
        cell: ({ row }) =>  <RvAccount oneItem = {row.original}/>
    },
    {
        id: "esign",
        size:100, // TanStack Table은 컬럼 사이즈가 20이 최소
        header: { kor : '서명하기', eng :'Sign'},
        cell: ({ row }) => <ElecSign oneItem = {row.original}/>
    },
]

export default columnDef;