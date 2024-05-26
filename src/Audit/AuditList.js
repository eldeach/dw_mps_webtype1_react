// ======================================================================================== [Import Libaray]
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import cookies from 'react-cookies';
import axios from 'axios';

// ======================================================================================== [Import Material UI Libaray]
import { Button } from '@mui/material/';
// Material Icons
import BorderColorIcon from '@mui/icons-material/BorderColor';

// ======================================================================================== [Import Component] js
import Table from '../Table/Table'
import TableCheckColumn from '../Table/TableCheckColumn'

// ======================================================================================== [Import Component] CSS
// N/A

function AuditList(props) {
    const { handlePageTitle, handleSystemCode } = props

    const [tableSelected, setTableSelected] = useState([]);

    useEffect(() => {
        handlePageTitle({ kor: '감사 추적 기록', eng: 'Audit Trail History' }[cookies.load('site-lang')])
        handleSystemCode('sys1')
        dayjs.extend(utc)
        dayjs.extend(timezone)
    }, [])

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Table
                size={{
                    tableWidth: '96vw',
                    tblNumRow: 15
                }}
                muiColor='sys1'
                extGetDataFunc={async (reqParam) => {
                    let rs = await axios(reqParam)
                        .then((res) => {
                            let rs = res.data;
                            if (rs.output.P_RESULT == "SUCCESS") {
                                return rs.recordsets[0];
                            } else if (rs.output.P_RESULT == "ERROR") {
                                alert(`${rs.output.P_VALUE}`)
                                return [];
                            }
                        })
                        .catch((error) => {
                            console.log(error.response)
                            alert(error.response)
                            return [];
                        })
                    return rs;
                }}
                reqParam={{
                    method: 'get',
                    url: '/reqauditgethi',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }}
                multiSelectable={true}
                setTableSelected={setTableSelected}
                columns={columnDef}
            />
        </div>
    )
}

export default AuditList;

const columnHelper = createColumnHelper();
const columnDef = [  // TanStack Table은 컬럼 사이즈가 20이 최소
    TableCheckColumn,
    columnHelper.accessor("INSDTTM",
        {
            header: { kor: "일시", eng: "Date Time" },
            size: 150,
            enableColumnFilter: true,
            cell: renderValue => dayjs(renderValue.getValue()).tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss")
        }
    ),
    columnHelper.accessor("TIER",
        {
            header: { kor: "발생단계", eng: "Tier of occurrence" },
            size: 170,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("CPNT",
        {
            header: { kor: "발생 컴포넌트", eng: "Component of occurrence" },
            size: 170,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("AUDIT_TYPE",
        {
            header: { kor: "감사 유형", eng: "Audit Type" },
            size: 170,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("AUDIT_MSG",
        {
            header: { kor: "감사 내용", eng: "Audit Message" },
            size: 170,
            enableColumnFilter: true,
        }
    ),
]