// ======================================================================================== [Import Libaray]
import { useEffect, useState } from 'react';
import cookies from 'react-cookies'
import axios from 'axios';

// ======================================================================================== [Import Material UI Libaray]  
import { Button, Modal, Paper, CircularProgress, Backdrop } from '@mui/material/';
//icon

// ======================================================================================== [Import Component] js
import PrmDocItemDivReadOnlySlim from '../../../../PrmDocItemDivReadOnlySlim/PrmDocItemDivReadOnlySlim'

// ======================================================================================== [Import Component] CSS


function GetPrmDocs(props) {

    const { prm_tbl_name, prm_id_col_name, mng_code, data_ver } = props

    const style = {
        subtitle: {
            box: {
                display: 'flex', flexDirection: 'row', alignItems: 'center', fontSize: 'medium'
            },
            text: {
                marginTop: '4px', marginLeft: '2px'
            }
        },
        paper: {
            width: 500,
            p: 2,
            mb: 2
        },
        popup: {
            paper: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: 24,
                p: 2,
            },
        },
        inputTexstField: {
            fontSize: 14,
            paddingRight: 0
        }
    }

    const [popup, setPopup] = useState(0);
    const handleModalClose = () => setPopup(0);

    const [docObj, setDocObj] = useState([])

    const [backdrop, setBackdrop] = useState(false);
    const backdropClose = () => {
        setBackdrop(false);
    };
    const backdropOpen = () => {
        setBackdrop(true);
    };

    const getDbData = async () => {
        backdropOpen()
        let rs = await axios({
            method: 'get',
            url: '/getprmdocs',
            params: {
                prm_tbl_name: prm_tbl_name,
                prm_id_col_name: prm_id_col_name,
                mng_code: mng_code,
                data_ver: data_ver
            },
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
        console.log(rs)
        setDocObj(rs)
        backdropClose()
    }

    return (
        <div>
            <Button variant="contained" color='sys1' size="small" sx={{width : '120px'}} onClick={() => {
                getDbData()
                setPopup(1)
            }}>
                {{ kor: '참조 문서', eng: `Reference Docs` }[cookies.load('site-lang')]}
            </Button>
            <Modal open={(popup === 1)} onClose={handleModalClose}>
                <Paper sx={style.popup.paper} elevation={3}>
                    <div style={{ width: '400px', maxHeight: '500px', display: 'flex', justifyContent: 'center', overflowY: 'auto' }}>
                        <div style={{ width: '380px' }}>
                            {
                                docObj.map((oneDoc, index) => (
                                    <PrmDocItemDivReadOnlySlim key={index} oneItem={oneDoc} />
                                ))
                            }
                        </div>
                    </div>
                </Paper>
            </Modal>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default GetPrmDocs;