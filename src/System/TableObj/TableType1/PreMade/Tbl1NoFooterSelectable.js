// ======================================================================================== [Import Libaray]
import { useState, useEffect } from 'react';
import cookies from 'react-cookies'
import axios from 'axios';

// ======================================================================================== [Import Material UI Libaray]
import { IconButton, TextField } from '@mui/material';
//icon
import ClearIcon from '@mui/icons-material/Clear';
import LoopIcon from '@mui/icons-material/Loop';
// ======================================================================================== [Import Component] js
// Table
import TableType1 from '../Template/TableType1'

// ======================================================================================== [Import Component] CSS

function Tbl1NoFooterSelectable (props) {

    const style = {
        inputTexstField : {
            fontSize: 14,
            paddingRight:0
        }
    }

    const [listData, setListData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
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

    const getDbData= async () => {    
        let rs =  await axios({
            method : 'get',
            url : props.getUrl,
            params : {...props.params},
            headers : {
              'Content-Type':'application/json'
            }
        })
        .then(( res ) => {
            return res.data;
        })
        .catch(( error ) => {
            console.log(error)
            return error.response;
        })
        setListData(rs)
        setFilteredData(rs)   
    }
    useEffect(() => {
        getDbData()
    },[])

    return (
        <div>
            <div style = {{ width: '100wv', display : 'flex', flexDirection : 'row', justifyContent : 'center' }}>
                <TextField
                sx= {{ width : '600px' }}
                color = 'sys1'
                variant="outlined"
                id="search_field"
                name="search_field"
                label={ { kor : "검색", eng : "Search" }[cookies.load('site-lang')] }
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
                <IconButton size="large" edge="end" color="sys1" sx={{ ml: 1, mr: 1 }} onClick = {() => getDbData()} >
                    <LoopIcon/>
                </IconButton>
            </div>
            <div style = {{ width: '100wv', display : 'flex', flexDirection : 'row', justifyContent : 'center' }}>
                <TableType1
                tableData = { filteredData }
                columnsDef = { props.columnDef }
                divStyle={ props.divStyle }
                tableStyle = { props.tableStyle }
                headerStyle = { props.headerStyle }
                rowStyle = {props.rowStyle} // 일괄 모든 row에 스타일 적용, columnDef의 cell 렌더가 우선순위가 높음
                footerOn = { false }
                setTableSelected = { props.setTableSelected }
                />
            </div>
        </div>
    )
}

export default Tbl1NoFooterSelectable;