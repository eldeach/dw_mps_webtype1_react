// ======================================================================================== [Import Libaray]
import { createColumnHelper } from "@tanstack/react-table";

// ======================================================================================== [Import Material UI Libaray]
//icon

// ======================================================================================== [Import Component] js
import WithdrawElecSign from '../../../../../System/ApprovalSystem/WithdrawElecSign/WithdrawElecSign'
    
const columnHelper = createColumnHelper();
const columnDef = [  // TanStack Table은 컬럼 사이즈가 20이 최소
    columnHelper.accessor( "approval_payload_id",
        {
            header: { kor : "승인 고유 번호", eng : "Approval Unique ID" },
            size: 150,
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
    columnHelper.accessor( "prepared_type",
        {
            header: { kor : "상신 종류", eng : "Prepared Type" },
            size: 200,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prepared_datetime",
        {
            header: { kor : "상신일", eng : "Prepared Date" },
            size: 100,
            enableColumnFilter: true,
            cell: renderValue =>  <div>{renderValue.getValue()?.split("T")[0]}</div>
        }
    ),
    columnHelper.accessor( "approval_status",
        {
            header: { kor : "승인 상태", eng : "Approval Status" },
            size: 130,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "done_datetime",
        {
            header: { kor : "승인완료일", eng : "Finish Date of Approval" },
            size: 100,
            enableColumnFilter: true,
            cell: renderValue =>  <div>{renderValue.getValue()?.split("T")[0]}</div>
        }
    ),
    // {
    //     id: "rowview",
    //     size:100, // TanStack Table은 컬럼 사이즈가 20이 최소
    //     header: { kor : '내용보기', eng :'View content'},
    //     cell: ({ row }) =>  <button>내용보기</button>
    // },
    {
        id: "rowview",
        size:100, // TanStack Table은 컬럼 사이즈가 20이 최소
        header: { kor : '회수하기', eng :'Withdraw'},
        cell: ({ row }) =>  <WithdrawElecSign oneItem = {row.original}/>
    },
]

export default columnDef;