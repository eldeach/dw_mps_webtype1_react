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
    columnHelper.accessor("mng_team",
        {
            header: { kor: "관리팀", eng: "Management team" },
            size: 170,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("gmp_impact",
        {
            header: { kor: "GMP IMPACT", eng: "GMP IMPACT" },
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => (<GmpImpactLabel txtValue={renderValue.getValue()} />)
        }
    ),
    columnHelper.accessor("not_in_use",
        {
            header: { kor: "사용현황", eng: "Usage status" },
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => (<UsageStatusLabel txtValue={renderValue.getValue()} />)
        }
    ),
    columnHelper.accessor("period_month",
        {
            header: { kor: "주기 [월]", eng: "Period [Month]" },
            size: 100,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("latest_perform_year",
        {
            header: { kor: "최신 수행 년도", eng: "Latest Perform Year" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("next_deadline",
        {
            header: { kor: "차기 만료해", eng: "Next deadline" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("remaining_years",
        {
            header: { kor: "남은 햇수", eng: "Remaining years" },
            size: 150,
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
    columnHelper.accessor("hs_doc_no",
        {
            header: { kor: "혹서기 문서번호", eng: "H/S Doc. no." },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("hs_doc_rev_no",
        {
            header: { kor: "혹서기 문서 개정번호", eng: "H/S Doc. Rev. no." },
            size: 120,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("hs_start",
        {
            header: { kor: "혹서기 수행시작일", eng: "H/S Start Date" },
            size: 120,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("hs_end",
        {
            header: { kor: "혹서기 수행종료일", eng: "H/S End Date" },
            size: 120,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("hs_approval_date",
        {
            header: { kor: "혹서기 문서 승인일", eng: "H/S Approval Date" },
            size: 120,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("cs_doc_no",
        {
            header: { kor: "혹한기 문서번호", eng: "C/S Doc. no." },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("cs_doc_rev_no",
        {
            header: { kor: "혹한기 문서 개정번호", eng: "C/S Doc. Rev. no." },
            size: 120,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("cs_start",
        {
            header: { kor: "혹한기 수행시작일", eng: "C/S Start Date" },
            size: 120,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("cs_end",
        {
            header: { kor: "혹한기 수행종료일", eng: "C/S End Date" },
            size: 120,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("cs_approval_date",
        {
            header: { kor: "혹한기 문서 승인일", eng: "C/S Approval Date" },
            size: 120,
            enableColumnFilter: true,
        }
    ),
]

export default columnDef;