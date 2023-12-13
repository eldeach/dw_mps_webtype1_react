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
    columnHelper.accessor( "doc_no",
        {
            header: { kor : "문서번호", eng : "Doc. No." },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "doc_rev_no",
        {
            header: { kor : "개정번호", eng : "Rev. No." },
            size: 100,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "doc_title",
        {
            header: { kor : "제목", eng : "Title" },
            size: 300,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "doc_author",
        {
            header: { kor : "작성자", eng : "Written By" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "author_team",
        {
            header: { kor : "작성팀", eng : "Written By (Team)" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "doc_approval_date",
        {
            header: { kor : "승인일", eng : "Approval Date" },
            size: 150,
            enableColumnFilter: true,
            cell : renderValue =><div>{String(renderValue.getValue()).split("T")[0]}</div>
        }
    ),
    columnHelper.accessor( "invalid_date",
        {
            header: { kor : "무효화 일자", eng : "Invalidation date" },
            size: 150,
            enableColumnFilter: true,
            cell : renderValue =><div>{
                ( parseInt(( String(renderValue.getValue()).split("T")[0].substring(0,4) )) < 1971 ) ?
                ''
                : (String(renderValue.getValue()).split("T")[0])
                }</div>
        }
    ),
    columnHelper.accessor( "perform_date_start",
        {
            header: { kor : "수행 시작일", eng : "Start date of execution" },
            size: 150,
            enableColumnFilter: true,
            cell : renderValue =><div>{String(renderValue.getValue()).split("T")[0]}</div>
        }
    ),
    columnHelper.accessor( "perform_date_end",
        {
            header: { kor : "수행 종료일", eng : "End date of execution" },
            size: 150,
            enableColumnFilter: true,
            cell : renderValue =><div>{String(renderValue.getValue()).split("T")[0]}</div>
        }
    ),
    columnHelper.accessor( "uuid_binary",
        {
            header: { kor : "UUID", eng : "UUID" },
            size: 150,
            enableColumnFilter: true,
            cell : renderValue =><div>{String(renderValue.getValue()).split("T")[0]}</div>
        }
    ),
]

export default columnDef;