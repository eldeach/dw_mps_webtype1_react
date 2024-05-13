// ======================================================================================== [Import Libaray]
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import cookies from 'react-cookies';

// ======================================================================================== [Import Material UI Libaray]
import { Button } from '@mui/material/';
// Material Icons
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

// ======================================================================================== [Import Component] js
import Table from '../Table/Table'
import TableCheckColumn from '../Table/TableCheckColumn'
import TableActionColumn from '../Table/TableActionColumn'

// ======================================================================================== [Import Component] CSS
// N/A

function MailerMngList(props) {
    const { handlePageTitle, handleSystemCode } = props

    const [tableSelected, setTableSelected] = useState([]);

    useEffect(() => {
        handlePageTitle({ kor: '메일링 리스트', eng: 'Mailing List' }[cookies.load('site-lang')])
        handleSystemCode('sys1')
    }, [])


    const navigate = useNavigate()

    return (
        <div>
            <Button href="/mailingadd">
                ADD
            </Button>
            <Table
                size={{
                    tableWidth: '96vw',
                    tblNumRow: 5
                }}
                muiColor='sys1'
                reqParam={{
                    method: 'get',
                    url: '/mailingmnglist',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }}
                multiSelectable = {true}
                setTableSelected={setTableSelected}
                columns={columnDef}
            />
        </div>
    )
}

export default MailerMngList;

function test1(row) {
    return (<button onClick={() => { alert(row.mng_name) }}>
        <BorderColorIcon sx={{ fontSize: 'inherit' }} />
    </button>)
}
function test2(row) {
    return (<button onClick={() => {
        if (window.confirm("삭제하시겠습니까?")) {
            alert(`${row.MNG_CODE} 삭제완료`);
            window.location.reload();
        }
        else {
            alert("취소");
        }
    }}>
        <DeleteForeverIcon sx={{ fontSize: 'inherit' }} />
    </button>)
}
function test3(row) {
    return (<button onClick={() => {
        if (window.confirm("비활성화 하시겠습니까?")) {
            alert(`${row.MNG_CODE} 비활성화 완료`);
            window.location.reload();
        }
        else {
            alert("취소");
        }
    }}>
        <RemoveCircleOutlineIcon sx={{ fontSize: 'inherit' }} />
    </button>)
}


const columnHelper = createColumnHelper();
const columnDef = [  // TanStack Table은 컬럼 사이즈가 20이 최소
    TableActionColumn([test1, test2, test3]),
    TableCheckColumn,
    columnHelper.accessor("MNG_CODE",
        {
            header: { kor: "관리번호", eng: "Mng. Code" },
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
    columnHelper.accessor("EMAIL_ADDRESS",
        {
            header: { kor: "이메일", eng: "주소" },
            size: 170,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("EMAIL_ROLE",
        {
            header: { kor: "이메일 역할", eng: "EMAIL ROLE" },
            size: 170,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("USE_YN",
        {
            header: { kor: "사용여부", eng: "In Use" },
            size: 80,
            enableColumnFilter: true,
        }
    )
]