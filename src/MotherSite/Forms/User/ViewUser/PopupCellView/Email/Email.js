// ======================================================================================== [Import Libaray]
import { useEffect, useState } from 'react';

// ======================================================================================== [Import Material UI Libaray]  
import { Button, Modal, Paper } from '@mui/material/';
//icon

// ======================================================================================== [Import Component] js
import OneEmail from './OneEmail/OneEmail'

// ======================================================================================== [Import Component] CSS


function Email (props) {
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


    const [objList, setObjList] = useState([])

    useEffect(() =>{
        if (props.objList) {
            const parsedList = JSON.parse(props.objList);
            setObjList(parsedList);
        }
    },[])

    return (
        <div>
            {
                (!props.objList || props.objList === '[]') ? <div>Empty</div> :
                <div>
                    <Button variant="contained" color = 'sys1' size="small" onClick={()=>setPopup(1)}>
                        {`열기 (${objList.length} items)`}
                    </Button>
                    <Modal open={(popup === 1)} onClose={handleModalClose}>
                        <Paper sx={style.popup.paper} elevation={3}>
                            <div style={{width : '400px', maxHeight: '500px', display : 'flex', justifyContent:'center', overflowY:'auto'}}>
                                <div style={{width:'380px'}}>
                                {
                                    objList.map((oneItem, index) => (
                                        <OneEmail key={index} oneItem = {oneItem}/>
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

export default Email;