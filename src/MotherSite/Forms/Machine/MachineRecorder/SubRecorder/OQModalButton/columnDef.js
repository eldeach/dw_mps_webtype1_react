// ======================================================================================== [Import Libaray]
import { createColumnHelper } from "@tanstack/react-table";

// ======================================================================================== [Import Material UI Libaray]
//icon

// ======================================================================================== [Import Component] js
import IndeterminateCheckbox from '../../../../../../System/TableObj/TableType1/Components/IndeterminateCheckbox'
    
const columnHelper = createColumnHelper();
const columnDef = [  // TanStack Table은 컬럼 사이즈가 20이 최소
    { // row selection 할꺼면
        id: "select",
        size:20, // TanStack Table은 컬럼 사이즈가 20이 최소
        header: ({ table }) => (
        <IndeterminateCheckbox
            {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
            }}
        />
        ),
        cell: ({ row }) => (
        <IndeterminateCheckbox
            {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
            }}
        />
        ),
    },
    columnHelper.accessor( "auth_code",
        {
            header: { kor : "권한 코드", eng : "Auth Code" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "system_code",
        {
            header: { kor : "시스템 코드", eng : "System Code" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "auth_title",
        {
            header: { kor : "권한 제목", eng : "Auth Title" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "auth_description",
        {
            header: { kor : "설명", eng : "Description" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "url_path",
        {
            header: { kor : "허용 경로", eng : "허용 경로" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
]

export default columnDef;