// ======================================================================================== [Import Libaray]
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import cookies from 'react-cookies';
import axios from 'axios';

// ======================================================================================== [Import Material UI Libaray]
import { Button } from '@mui/material/';
// Material Icons
import BorderColorIcon from '@mui/icons-material/BorderColor';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

// ======================================================================================== [Import Component] js
import Table from '../Table/Table'
import TableCheckColumn from '../Table/TableCheckColumn'
import TableActionColumn from '../Table/TableActionColumn'

// ======================================================================================== [Import Component] CSS
// N/A

function MailingGetList(props) {
    const { handlePageTitle, handleSystemCode } = props

    const [tblData, setTblData] = useState([]);
    const [tableSelected, setTableSelected] = useState([]);

    useEffect(() => {
        handlePageTitle({ kor: '메일링 리스트', eng: 'Mailing List' }[cookies.load('site-lang')])
        handleSystemCode('sys1')
    }, [])

    let naviagte = useNavigate();


    const getData = async (reqParam) => {
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
                alert(error.response)
                return [];
            })
        return rs;
    }
    return (
        <div>
            <Button onClick={() => {
                naviagte('/mailingaddlist', {
                    state: {
                        initialValues: {
                            MNG_CODE: '',
                            EMAIL_ADDRESS: '',
                            EMAIL_ROLE: '',
                            UUID_STR: ''
                        }
                    }
                })
            }}>

                ADD
            </Button>
            <Button onClick={async () => {
                if (window.confirm(`${tableSelected.length}개 항목을 삭제하시겠습니까?`)) {
                    let delRows = []
                    tableSelected.map((value, index) => {
                        delRows.push(value.UUID_STR)
                    })
                    let reqParam = {
                        method: "delete",
                        url: "/reqmailinggdelist",
                        params: {
                            delRows: delRows
                        },
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                    await axios(reqParam)
                        .then((res) => {
                            let rs = res.data;
                            if (rs.output.P_RESULT == "SUCCESS") {
                                alert(`${tableSelected.length}개 삭제완료`);
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
            }}>
                DEL
            </Button>
            <Button onClick={async () => {
                if (window.confirm(`${tableSelected.length}개 항목을 비활성화 하시겠습니까?`)) {
                    let disableRows = []
                    tableSelected.map((value, index) => {
                        disableRows.push(value.UUID_STR)
                    })
                    // let params = {
                    //     disableRows: disableRows,
                    //     useyn: 'N'
                    // }
                    // await axios.put("/reqmailingguseynlist", params)
                    //     .then(() => {
                    //         alert(`${tableSelected.length}개 비활성화 완료`);
                    //         window.location.reload();
                    //     })
                    //     .catch(() => {
                    //         alert(`문제가 발생했습니다.`)
                    //     })
                    let reqParam = {
                        method: "put",
                        url: "/reqmailingguseynlist",
                        params: {
                            disableRows: disableRows,
                            useyn: 'N'
                        },
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                    await axios(reqParam)
                        .then((res) => {
                            let rs = res.data;
                            if (rs.output.P_RESULT == "SUCCESS") {
                                alert(`${tableSelected.length}개 비활성화 완료`);
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
            }}>
                DISABLE
            </Button>
            <Table
                size={{
                    tableWidth: '96vw',
                    tblNumRow: 5
                }}
                muiColor='sys1'
                extGetDataFunc={getData}
                reqParam={{
                    method: 'get',
                    url: '/reqmailinggetlist',
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

export default MailingGetList;

function MailingUpdList(row) {
    const navigate = useNavigate()
    return (<button onClick={() => {
        navigate('/mailingupdlist', {
            state: {
                initialValues: {
                    MNG_CODE: row.MNG_CODE,
                    EMAIL_ADDRESS: row.EMAIL_ADDRESS,
                    EMAIL_ROLE: row.EMAIL_ROLE,
                    UUID_STR: row.UUID_STR
                }
            }
        })
    }}>
        <BorderColorIcon sx={{ fontSize: 'inherit' }} />
    </button>)
}
function disableList(row) {
    return (<button onClick={async () => {
        if (window.confirm("비활성화 하시겠습니까?")) {
            let params = {
                disableRows: [row.UUID_STR],
                useyn: 'N'
            }
            await axios.put("/reqmailingguseynlist", params)
                .then(() => {
                    alert(`${row.MNG_CODE} 비활성화 완료`);
                    window.location.reload();
                })
                .catch(() => {
                    alert(`문제가 발생했습니다.`)
                })
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
    TableActionColumn([MailingUpdList, disableList]),
    TableCheckColumn,
    columnHelper.accessor("MNG_CODE",
        {
            header: { kor: "관리번호", eng: "Mng. Code" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("MNG_NAME",
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