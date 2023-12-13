// ======================================================================================== [Import Libaray]
import { useEffect, useState } from 'react';
import cookies from 'react-cookies';
import axios from 'axios';

// ======================================================================================== [Import Material UI Libaray]
import { Button, IconButton, TextField } from '@mui/material';
//icon
import ClearIcon from '@mui/icons-material/Clear';
// ======================================================================================== [Import Component] js
import UserCard from './Card/UserCard';
import userCardListLang from './userCardListLang';

// ======================================================================================== [Import Component] CSS

function UserCardList (props) {
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
        inputTexstField : {
            fontSize: 14,
            paddingRight:0
        },
        arrItem : {
            oneItem : {
                padding:'10px',
                marginTop:'5px',
                marginBottom:'5px',
                borderRadius:'5px',
                boxSizing:'border-box',
                display:'flex',
                flexDirection:'row',
                border:'#D3D3D3 solid 1px'
            },
            delItem : {
                height: 'auto',
                paddingLeft:'10px',
                boxSizing:'border-box'
            },
            itemInfo : {
                flexGrow : 1,
                display : 'flex',
                flexDirection : 'column',
            },
            subInfo : {
                marginTop : '7px',
                display : 'flex',
                flexDirection : 'row'
            }

        },
        submitButton : {
            width:534,
        }
    }

    let [filteredData, setFilteredData] = useState([]);

    const [listData, setListData] = useState([]);

    const getUserList = async function () {
        let approval_status = ''
        if (Array.isArray(props.approvalStatus)) {
            approval_status = props.approvalStatus
        } else {
            approval_status = `${props.approvalStatus}`
        }
        
        let rs =  await axios({
            method : 'get',
            url : '/getuserlist',
            params : {
                approval_status : approval_status,
            },
            headers : {
              'Content-Type':'application/json'
            }
        })
        .then(( res ) => {
            return res.data;
        })
        .catch( (error) => {
            return error.response;
        })
        setListData(rs)
        setFilteredData(rs)
    }

    const [searchWord,setSearchWord] = useState('');
    const handleWordChange = function(value) { 
        setSearchWord(value)
        setFilteredData(listData.filter(student =>
            Object.keys(student).some(key => {
                if (typeof student[key] === 'object' && Array.isArray(student[key])) {
                    return student[key].some(innerObj =>
                        Object.values(innerObj).some(innerVal =>
                            String(innerVal).includes(value)
                        )
                    );
                } else {
                    return String(student[key]).includes(value);
                }
            })
        ));
    }



    useEffect(() =>{
        getUserList()
    },[])

    return (
        <div style = {{width: '100%', display : 'flex', flexDirection : 'column'}}>
            <div id='carListNavigator' style = {{ width: '100wv', display : 'flex', flexDirection : 'row', justifyContent : 'center', }}>
                <TextField
                sx= {{ width : '600px' }}
                color = 'sys1'
                variant="outlined"
                id="search_field"
                name="search_field"
                label={ userCardListLang.carListNavigator.inputField.search_field.placeholder[cookies.load('site-lang')] }
                value={searchWord}
                onChange={(e) => handleWordChange(e.target.value)}
                size='small'
                margin="dense"
                fullWidth
                InputProps={{
                    endAdornment:(
                        <IconButton size='small' onClick={()=>{handleWordChange('')}}>
                            <ClearIcon size='small'/>
                        </IconButton>
                    ),
                    style: style.inputTexstField // font size of input text
                }}
                InputLabelProps={{style: style.inputTexstField}} // font size of input label
                />
            </div>
            <div style={{display : 'flex', justifyContent:'center', flexWrap:'wrap'}}>
                {
                    filteredData.map((oneItem, cardIndex) => (
                        <UserCard oneItem={oneItem} cardIndex={cardIndex} handlePageTitle = { props.handlePageTitle } handleSystemCode = { props.handleSystemCode }/>
                    ))
                }
            </div>
        </div>
    )
}

export default UserCardList;