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
                reqParam={{
                    method: 'get',
                    url: '/mailingmnglist',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }}
                setTableSelected={setTableSelected}
                columns={columnDef}
            />
        </div>
    )
}

export default MailerMngList;

function test1(row) {
    return (<button style={{ fontSzie: '12px' }} onClick={() => { alert(row.mng_name) }}>
        <BorderColorIcon sx={{ fontSize: 'inherit' }} />
    </button>)
}
function test2(row) {
    return (<button style={{ fontSzie: '12px' }} onClick={() => { console.log(row.MNG_CODE) }}>
        <DeleteForeverIcon sx={{ fontSize: 'inherit' }} />
    </button>)
}


const columnHelper = createColumnHelper();
const columnDef = [  // TanStack Table은 컬럼 사이즈가 20이 최소
    TableActionColumn([test1, test2]),
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
    )
]