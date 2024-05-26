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
import TableActionColumn from '../Table/TableActionColumn'

// ======================================================================================== [Import Component] CSS
// N/A

function SchedulerList(props) {
    const { handlePageTitle, handleSystemCode } = props

    const [tableSelected, setTableSelected] = useState([]);

    useEffect(() => {
        handlePageTitle({ kor: '스케줄러 리스트', eng: 'Scheduler List' }[cookies.load('site-lang')])
        handleSystemCode('sys1')
        dayjs.extend(utc)
        dayjs.extend(timezone)
    }, [])

    const selectedUseYN = async (useYN) => {
        let stmt = '비활성화'
        if (useYN == 'Y') stmt = '활성화'
        else stmt = '비활성화'
        if (window.confirm(`${tableSelected.length}개 항목을 ${stmt} 하시겠습니까?`)) {
            let disableRows = []
            tableSelected.map((value, index) => {
                disableRows.push(value.UUID_STR)
            })
            let reqParam = {
                method: "put",
                url: "/reqscheduleruseynlist",
                params: {
                    disableRows: disableRows,
                    useyn: useYN
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            await axios(reqParam)
                .then((res) => {
                    let rs = res.data;
                    if (rs.output.P_RESULT == "SUCCESS") {
                        alert(`${tableSelected.length}개 ${stmt} 완료`);
                        window.location.reload();
                    } else if (rs.output.P_RESULT == "ERROR") {
                        alert(`${rs.output.P_VALUE}`)
                    }
                })
                .catch((error) => {
                    alert(error.response)
                })
        }
        else {
            alert("취소");
        }
    }

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '96vw', display: 'flex', flexDirection: 'row', fontSize: '12px' }}>
                <Button sx={{ mr: 1 }} fontSize='inherit' variant='outlined' color='sys1' onClick={async () => { selectedUseYN('Y') }}>ACTIVATE</Button>
                <Button sx={{ mr: 1 }} fontSize='inherit' variant='outlined' color='sys1' onClick={async () => { selectedUseYN('N') }}>DISABLE</Button>
                <div style={{ flexGrow: 1 }} />
            </div>
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
                    url: '/reqschedulergetList',
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

export default SchedulerList;

function SchedulerUpdList(row) {
    const navigate = useNavigate()
    return (<Button variant='outlined' color='sys1' onClick={() => {
        navigate('/schedulerupdlist', {
            state: {
                initialValues: {
                    UUID_STR: row.UUID_STR,
                    RUN_PERIOD: row.RUN_PERIOD,
                    PERIOD_UNIT: row.PERIOD_UNIT,
                    USE_YN: row.USE_YN,
                    END_DATE: row.END_DATE
                }
            }
        })
    }}>
        <BorderColorIcon sx={{ fontSize: 'inherit' }} />
    </Button>)
}

const columnHelper = createColumnHelper();
const columnDef = [  // TanStack Table은 컬럼 사이즈가 20이 최소
    TableActionColumn(40, [SchedulerUpdList]),
    TableCheckColumn,
    columnHelper.accessor("TASK_NAME",
        {
            header: { kor: "작업명", eng: "Task Name" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("RUN_PERIOD",
        {
            header: { kor: "작동 주기", eng: "Run Period" },
            size: 170,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("PERIOD_UNIT",
        {
            header: { kor: "주기 단위", eng: "Period Unit" },
            size: 170,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("FIRST_RUN",
        {
            header: { kor: "첫작동일", eng: "First Run" },
            size: 170,
            enableColumnFilter: true,
            cell: renderValue => dayjs(renderValue.getValue()).tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss")
        }
    ),
    columnHelper.accessor("LAST_RUN",
        {
            header: { kor: "최근 작동일", eng: "Last Run" },
            size: 170,
            enableColumnFilter: true,
            cell: renderValue => dayjs(renderValue.getValue()).tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss")
        }
    ),
    columnHelper.accessor("USE_YN",
        {
            header: { kor: "사용여부", eng: "In Use" },
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("END_DATE",
        {
            header: { kor: "종료일", eng: "END DATE" },
            size: 80,
            enableColumnFilter: true,
            cell: renderValue => dayjs(renderValue.getValue()).tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss")
        }
    ),
    columnHelper.accessor("INSDTTM",
        {
            header: { kor: "추가일", eng: "Insert DateTime" },
            size: 80,
            enableColumnFilter: true,
            cell: renderValue => dayjs(renderValue.getValue()).tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss")
        }
    ),
    columnHelper.accessor("UPDDTTM",
        {
            header: { kor: "변경일", eng: "Update DateTime" },
            size: 80,
            enableColumnFilter: true,
            cell: renderValue => dayjs(renderValue.getValue()).tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss")
        }
    ),
    columnHelper.accessor("UPDUSERID",
        {
            header: { kor: "변경유저", eng: "Update User" },
            size: 80,
            enableColumnFilter: true,
        }
    )
]