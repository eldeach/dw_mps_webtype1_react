// ======================================================================================== [Import Libaray]
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import cookies from 'react-cookies'
import * as yup from 'yup';
import { FaBoxOpen } from "react-icons/fa";
// ======================================================================================== [Import Material UI Libaray]  
import { ThemeProvider } from '@mui/material/styles';
import { Button, Modal, Paper, Toolbar, IconButton, Drawer } from '@mui/material/';
//icon
import MenuIcon from '@mui/icons-material/Menu';

// ======================================================================================== [Import Component] js
import DocItemDivSlim from '../../../../../Component/DocItemDivSlim/DocItemDivSlim'

// ======================================================================================== [Import Component] CSS


function Docs (props) {
    const style = {
        subtitle:{
            box : {
                display:'flex', flexDirection:'row', alignItems:'center', fontSize:'medium'
            },
            text : {
                marginTop:'4px', marginLeft:'2px'
            }
        },
        paper : {
            width:500,
            p: 2,
            mb:2
        },
        popup : {
            paper : {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: 24,
                p: 2,
            },
        },
        inputTexstField : {
            fontSize: 14,
            paddingRight:0
        }
    }

    const [popup,setPopup] = useState(0);
    const handleModalClose = () => setPopup(0);


    const [docObj, setDocObj] = useState([])

    useEffect(() =>{
        if (props.docList) {
            const parsedList = JSON.parse(props.docList);
            setDocObj(parsedList);
        }
    },[])

    return (
        <div>
            {
                !props.docList ? <div>Empty</div> :
                <div>
                    <Button variant="contained" color = 'sys1' size="small" onClick={()=>setPopup(1)}>
                        {`열기 (${docObj.length} items)`}
                    </Button>
                    <Modal open={(popup === 1)} onClose={handleModalClose}>
                        <Paper sx={style.popup.paper} elevation={3}>
                            <div style={{width : '400px', maxHeight: '500px', display : 'flex', justifyContent:'center', overflowY:'auto'}}>
                                <div style={{width:'380px'}}>
                                {
                                    docObj.map((oneDoc, index) => (
                                        <DocItemDivSlim key={index} oneItem = {oneDoc}/>
                                    ))
                                }
                                </div>
                            </div>
                        </Paper>
                    </Modal>
                </div>
            }
        </div>
    )
}

export default Docs;