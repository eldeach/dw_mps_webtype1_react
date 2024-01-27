// ======================================================================================== [Import Libaray]
import { createColumnHelper } from "@tanstack/react-table";

// ======================================================================================== [Import Material UI Libaray]
//icon

// ======================================================================================== [Import Component] js
// Component
import UsageStatusLabel from '../../Label/UsageStatusLabel/UsageStatusLabel'
import GmpImpactLabel from '../../Label/GmpImpactLabel/GmpImpactLabel'
import ExceedLabel from '../../Label/ExceedLabel/ExceedLabel'

// ======================================================================================== [Import Component] CSS


const columnHelper = createColumnHelper();
const columnDef = [  // TanStack Table은 컬럼 사이즈가 20이 최소
    columnHelper.accessor("data_ver",
        {
            header: { kor: "Data Ver", eng: "Data Ver" },
            size: 70,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("mng_code",
        {
            header: { kor: "설비/시스템 관리코드", eng: "Machine/System management code" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("mng_name",
        {
            header: { kor: "설비/시스템 명칭", eng: "Machine/System name" },
            size: 170,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "period_month",
        {
            header: { kor : "주기 [월]", eng : "Period [Month]" },
            size: 100,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "doc_no",
        {
            header: { kor : "문서번호 (최신)", eng : "Doc. No. (Latest)" },
            size: 150,
            enableColumnFilter: true,
            cell: ({row}) => (
                !row.original.doc_no ? <div/>
                : row.original.doc_no
            )
        }
    ),
    columnHelper.accessor( "doc_rev_no",
        {
            header: { kor : "개정번호 (최신)", eng : "Rev. No. (Latest)" },
            size: 120,
            enableColumnFilter: true,
            cell: ({row}) => (
                !row.original.doc_no ? <div/>
                : row.original.doc_rev_no
            )
        }
    ),
    columnHelper.accessor( "latest_approval_date",
        {
            header: { kor : "최신 승인일", eng : "Latest Approval Date" },
            size: 120,
            enableColumnFilter: true,
            cell: ({row}) => (
                !row.original.latest_approval_date ? <div/>
                : row.original.latest_approval_date
            )
        }
    ),
    columnHelper.accessor( "next_deadline",
        {
            header: { kor : "차기 만료일", eng : "Next deadline" },
            size: 120,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "remaining_days",
        {
            header: { kor : "남은 일수", eng : "Remaining days" },
            size: 100,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "exceed",
        {
            header: { kor : "초과", eng : "Exceed" },
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => (<ExceedLabel txtValue = { renderValue.getValue() } />)
        }
    ),
]

export default columnDef;