import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { MenuItem, TextField } from "@mui/material";
import './mulbt.css'


function MailingUpdListByTeam() {
    let [mngTeamList, setMngTeamList] = useState([]);
    let [mngTeam, setMngTeam] = useState('');
    let [mailList, setMailList] = useState([]);

    let [submitting, setSubmitting] = useState(false);
    let navigate = useNavigate()

    useEffect(() => {
        getMachineMngList();
    }, [])

    useEffect(() => {
        getnowlistbyteam(mngTeam)
    }, [mngTeam])

    const getMachineMngList = async function () {
        let rs = await axios({
            method: 'get',
            url: '/reqmngteamlist',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                console.log(error)
                return error.response;
            })
        let tempArr = rs.recordsets[0].map(item => item.MNG_TEAM)
        setMngTeamList(tempArr)
    }

    const getnowlistbyteam = async function (mngTeam) {
        let rs = await axios({
            method: 'get',
            url: '/reqnowlistbyteam',
            params: { MNG_TEAM: mngTeam },
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                console.log(error)
                return error.response;
            })

        setMailList(rs.recordsets[0].map(({ mng_team, ...rest }) => rest))
        console.log(rs.recordsets[0].map(({ mng_team, ...rest }) => rest))
    }

    const isValidEmail = (email) => {
        // 일반적인 이메일 유효성 검사 정규식
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const onSubmitFunc = async function () {
        if (mngTeam != '') {

            const invalidEmails = mailList.filter(item => !isValidEmail(item.EMAIL_ADDRESS));

            if (invalidEmails.length > 0) {
                alert(`유효하지 않은 이메일 주소가 ${invalidEmails.length}개 있습니다:\n` +
                    invalidEmails.map(item => item.EMAIL_ADDRESS).join('\n'));
            } else {
                setSubmitting(true)
                let valuePayload = {
                    MNG_TEAM: mngTeam,
                    MAIL_LIST: mailList
                }

                let reqParam = {
                    method: 'put',
                    url: '/reqmailingupdlistbyteam',
                    params: {
                        valuePayload: valuePayload
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                await axios(reqParam)
                    .then((res) => {
                        let rs = res.data;
                        if (rs.output.P_RESULT == "SUCCESS") {
                            // actions.resetForm();
                            navigate('/submitsuccess');
                        } else if (rs.output.P_RESULT == "ERROR") {
                            alert(`${rs.output.P_VALUE}`)
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        alert(error.response)
                    })
                    .finally(() => {
                        setSubmitting(false)
                    })
            }

        } else {
            alert('팀 선택이 되지 않았습니다.')
        }

    }
    return (
        <div className="mulbt">
            <p>주의! 본 설정은 해당 팀에 귀속된 모든 설비들에 대한 메일링 정보를 업데이트합니다.</p>
            <div className="mulbt-1st-row">
                <select name="팀선택" id="select-team"
                    value={mngTeam}
                    onChange={(e) => {
                        setMngTeam(e.target.value)
                    }}
                >
                    <option value={''}>팀 선택</option>
                    {
                        mngTeamList.map((v, i) => {
                            return (
                                <option key={i} value={v}>{v}</option>

                            )
                        })
                    }
                </select>
                <button
                    className="mulbt-button"
                    disabled={submitting || !mngTeam}
                    onClick={() => {
                        let tempArr = [...mailList]
                        tempArr.push({ RECEIVE_TYPE: 'TO', EMAIL_ROLE: 'CP', EMAIL_ADDRESS: '' })
                        setMailList(tempArr)
                    }}>Add</button>

            </div>
            <div className="mulbt-2nd-row">
                {
                    mailList.map((v, i) => {
                        return (
                            <div className="mulbt-2nd-mail-list-row" key={i}>
                                <select name="수신유형" id="select-recieve-type"
                                    value={v.RECEIVE_TYPE}
                                    onChange={(e) => {
                                        let tempArr = [...mailList];
                                        tempArr[i] = { ...tempArr[i], RECEIVE_TYPE: e.target.value };
                                        setMailList(tempArr);
                                    }}
                                >
                                    <option value="TO">{`수신 (TO)`}</option>
                                    <option value="CC">{`참조 (CC)`}</option>
                                </select>
                                <select name="역할" id="select-role"
                                    value={v.EMAIL_ROLE}
                                    onChange={(e) => {
                                        let tempArr = [...mailList];
                                        tempArr[i] = { ...tempArr[i], EMAIL_ROLE: e.target.value };
                                        setMailList(tempArr);
                                    }}
                                >
                                    <option value="P">{`수행자`}</option>
                                    <option value="CP">{`연락 담당자`}</option>
                                    <option value="PL">{`파트장`}</option>
                                    <option value="TL">{`팀장`}</option>
                                    <option value="SME">{`SME`}</option>
                                </select>
                                <input
                                    value={v.EMAIL_ADDRESS}
                                    onChange={(e) => {
                                        const cleanedValue = e.target.value.replace(/\s/g, "");
                                        let tempArr = [...mailList];
                                        tempArr[i] = { ...tempArr[i], EMAIL_ADDRESS: cleanedValue };
                                        setMailList(tempArr);
                                    }}
                                    type="email" id="user-mail"
                                    placeholder="E-Mail"
                                    required />
                                <button
                                    className="mulbt-button"
                                    disabled={submitting}
                                    onClick={() => {
                                        let tempArr = [...mailList]
                                        tempArr.splice(i, 1);
                                        setMailList(tempArr)
                                    }}>-</button>
                            </div>
                        )
                    })
                }
            </div>
            <button
                className="mulbt-button"
                disabled={submitting || !mngTeam}
                onClick={() => {
                    onSubmitFunc()
                }}>Submit</button>
        </div>
    )
}


export default MailingUpdListByTeam;