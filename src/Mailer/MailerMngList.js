// ======================================================================================== [Import Libaray]
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from 'react';
import cookies from 'react-cookies';

// ======================================================================================== [Import Material UI Libaray]


// ======================================================================================== [Import Component] js
import Table from '../Table/Table'

// ======================================================================================== [Import Component] CSS


function MailerMngList(props) {
    const { handlePageTitle, handleSystemCode } = props

    useEffect(() =>{
        handlePageTitle({kor : '메일링 리스트', eng : 'Mailing List'}[cookies.load('site-lang')])
        handleSystemCode('sys1')
    },[])

    return (
        <div>
            <Table
                reqParam={{
                    method: 'get',
                    url: '/mailingmnglist',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }}
                columns={columnDef}
            />
        </div>
    )
}

export default MailerMngList;


const columnHelper = createColumnHelper();
const columnDef = [  // TanStack Table은 컬럼 사이즈가 20이 최소
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
    columnHelper.accessor( "EMAIL_ROLE",
        {
            header: { kor : "이메일 역할", eng : "EMAIL ROLE" },
            size: 170,
            enableColumnFilter: true,
        }
    )
]