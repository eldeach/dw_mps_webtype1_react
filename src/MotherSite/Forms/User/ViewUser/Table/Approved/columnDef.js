// ======================================================================================== [Import Libaray]
import { createColumnHelper } from "@tanstack/react-table";

// ======================================================================================== [Import Material UI Libaray]
//icon

// ======================================================================================== [Import Component] js

// Universal Actoin
import Revision from '../../../UniversalAction/Revision/Revision'
// Cell Component
import Position from '../../PopupCellView/Position/Position'
import Phone from '../../PopupCellView/Phone/Phone'
import Email from '../../PopupCellView/Email/Email'
import Auth from '../../PopupCellView/Auth/Auth'
    
const columnHelper = createColumnHelper();
const columnDef = [  // TanStack Table은 컬럼 사이즈가 20이 최소
    {
        id: "rowview",
        size:100, // TanStack Table은 컬럼 사이즈가 20이 최소
        header: { kor : '개정', eng :'Revision'},
        cell: ({ row }) =>  <Revision readOnly = {false} oneItem = {row.original}/>
    },
    // {
    //     id: "rowview",
    //     size:100, // TanStack Table은 컬럼 사이즈가 20이 최소
    //     header: { kor : '읽기', eng :'Read'},
    //     cell: ({ row }) =>  <Revision readOnly = {true} oneItem = {row.original}/>
    // },
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
    columnHelper.accessor( "user_position",
        {
            header: { kor : "소속", eng : "Position" },
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <Position objList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "user_auth",
        {
            header: { kor : "사용자 권한", eng : "User Auth" },
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <Auth authList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "user_email",
        {
            header: { kor : "이메일", eng : "E-Mail" },
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <Email objList={renderValue.getValue()} />,
        }
    ),
    columnHelper.accessor( "user_phone",
        {
            header: { kor : "전화", eng : "Phone" },
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => <Phone objList={renderValue.getValue()} />,
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