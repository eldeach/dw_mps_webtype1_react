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

// ======================================================================================== [Import Component] js
import Table from '../Table/Table'
import TableCheckColumn from '../Table/TableCheckColumn'
import TableActionColumn from '../Table/TableActionColumn'

// ======================================================================================== [Import Component] CSS
// N/A

function MailingList(props) {
    const { handlePageTitle, handleSystemCode } = props

    const [tableSelected, setTableSelected] = useState([]);

    useEffect(() => {
        handlePageTitle({ kor: '메일링 리스트', eng: 'Mailing List' }[cookies.load('site-lang')])
        handleSystemCode('sys1')
    }, [])

    let naviagte = useNavigate();

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
                url: "/reqmailinguseynlist",
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
                <Button sx={{ ml: 1, mr: 1 }} fontSize='inherit' variant='outlined' color='sys1' onClick={async () => {
                    let reqParam = {
                        method: 'get',
                        url: '/reqmachinegetnamelist',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
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
                    naviagte('/mailingaddlist', {
                        state: {
                            initialValues: {
                                MNG_CODE: null,
                                EMAIL_ADDRESS: null,
                                EMAIL_ROLE: null,
                                RECEIVE_TYPE: null,
                                UUID_STR: null
                            },
                            otherState: {
                                machineNameList: rs
                            }
                        }
                    })
                }}>
                    ADD
                </Button>
                <Button sx={{ mr: 1 }} fontSize='inherit' variant='outlined' color='sys1' onClick={async () => {
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
                            alert(error.response)
                            return [];
                        })
                    return rs;
                }}
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

export default MailingList;

function MailingUpdList(row) {
    const navigate = useNavigate()
    return (<Button variant='outlined' color='sys1' onClick={async () => {
        let reqParam = {
            method: 'get',
            url: '/reqmachinegetname',
            params: {
                MNG_CODE: row.MNG_CODE,
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let machine = await axios(reqParam)
            .then((res) => {
                let rs = res.data;
                if (rs.output.P_RESULT == "SUCCESS") {
                    return rs.recordsets[0][0];
                } else if (rs.output.P_RESULT == "ERROR") {
                    alert(`${rs.output.P_VALUE}`)
                    return [];
                }
            })
            .catch((error) => {
                alert(error.response)
                return [];
            })

        let typeList = [
            { typeCode: 'TO', typeName: { kor: `수신`, eng: `Recipient` }[cookies.load(`site-lang`)] },
            { typeCode: 'CC', typeName: { kor: `참조`, eng: `Carbon Copy` }[cookies.load(`site-lang`)] },
        ]
        let receiveType = typeList.find(type => type.typeCode == row.RECEIVE_TYPE);


        let roleList = [
            { roleCode: 'P', roleName: { kor: `수행자`, eng: `Performer` }[cookies.load(`site-lang`)] },
            { roleCode: 'CP', roleName: { kor: `연락 담당자`, eng: `Contact Person` }[cookies.load(`site-lang`)] },
            { roleCode: 'PL', roleName: { kor: `파트장`, eng: `Part Leader` }[cookies.load(`site-lang`)] },
            { roleCode: 'TL', roleName: { kor: `팀장`, eng: `Team Leader` }[cookies.load(`site-lang`)] },
            { roleCode: 'SME', roleName: { kor: `SME`, eng: `SME` }[cookies.load(`site-lang`)] },
        ]
        let emailRole = roleList.find(role => role.roleCode == row.EMAIL_ROLE);

        navigate('/mailingupdlist', {
            state: {
                initialValues: {
                    MNG_CODE: machine,
                    EMAIL_ADDRESS: row.EMAIL_ADDRESS,
                    EMAIL_ROLE: emailRole,
                    RECEIVE_TYPE: receiveType,
                    UUID_STR: row.UUID_STR
                },
                otherState: {
                    machineNameList: []
                }
            }
        })
    }}>
        <BorderColorIcon sx={{ fontSize: 'inherit' }} />
    </Button>)
}

const columnHelper = createColumnHelper();
const columnDef = [  // TanStack Table은 컬럼 사이즈가 20이 최소
    TableActionColumn(40, [MailingUpdList]),
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
    columnHelper.accessor("MNG_TEAM",
        {
            header: { kor: "관리팀", eng: "Management team" },
            size: 150,
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
    columnHelper.accessor("RECEIVE_TYPE",
        {
            header: { kor: `수신 유형`, eng: `Receiving Type` },
            size: 170,
            enableColumnFilter: true,
            cell: renderValue => {
                let typeList = [
                    { typeCode: 'TO', typeName: { kor: `수신`, eng: `Recipient` } },
                    { typeCode: 'CC', typeName: { kor: `참조`, eng: `Carbon Copy` } },
                ]
                let receiveType = typeList.find(type => type.typeCode == renderValue.getValue());
                if (!receiveType) {
                    return <div>{renderValue.getValue()}</div>;  // 기본값으로 'Unknown' 텍스트 반환
                }
                return <div>{receiveType.typeName[cookies.load(`site-lang`)]}</div>;
            }
        }
    ),
    columnHelper.accessor("EMAIL_ROLE",
        {
            header: { kor: "이메일 역할", eng: "EMAIL ROLE" },
            size: 170,
            enableColumnFilter: true,
            cell: renderValue => {
                let roleList = [
                    { roleCode: 'P', roleName: { kor: `수행자`, eng: `Performer` } },
                    { roleCode: 'CP', roleName: { kor: `연락 담당자`, eng: `Contact Person` } },
                    { roleCode: 'PL', roleName: { kor: `파트장`, eng: `Part Leader` } },
                    { roleCode: 'TL', roleName: { kor: `팀장`, eng: `Team Leader` } },
                    { roleCode: 'SME', roleName: { kor: `SME`, eng: `SME` } },
                ]
                let emailRole = roleList.find(role => role.roleCode == renderValue.getValue());
                if (!emailRole) {
                    return <div>{renderValue.getValue()}</div>;  // 기본값으로 'Unknown' 텍스트 반환
                }
                return <div>{emailRole.roleName[cookies.load(`site-lang`)]}</div>;
            }
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