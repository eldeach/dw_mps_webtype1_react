// ======================================================================================== [Import Libaray]
import { useEffect, useState } from 'react';
import cookies from 'react-cookies';

// ======================================================================================== [Import Material UI Libaray]
import { Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
//icon
import BackupTableIcon from '@mui/icons-material/BackupTable';
import Crop32Icon from '@mui/icons-material/Crop32';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
// ======================================================================================== [Import Component] js
// its lang Object
import machineVMDLang from './machineVMDLang'

// Table
import Tables from './Table/Tables'
// Cards
import Cards from './Card/Cards'

// ======================================================================================== [Import Component] CSS

function ViewMachine (props) {
    const { handlePageTitle, handleSystemCode } = props

    const [viewSelect, setViewSelect] = useState(1);
    const handleChange = (event, newAlignment) => {
        setViewSelect(newAlignment);
    };

    useEffect(() =>{
        handlePageTitle(machineVMDLang.formTitle[cookies.load('site-lang')])
        handleSystemCode('sys1')
    },[])
    return (
        <div id = 'userView' style ={{ display : 'flex', flexDirection : 'column'}} >
            <div style ={{ width : '100wv', marginBottom : '6px', display : 'flex', flexDirection : 'row', justifyContent : 'center' }}>
                <div style={{ flexGrow : 1 }}/>
                <ToggleButtonGroup
                    color="sys1"
                    value={viewSelect}
                    exclusive
                    onChange={handleChange}
                    size = 'small'
                    >
                    <ToggleButton value={1} >{<BackupTableIcon/>}</ToggleButton>
                    <ToggleButton value={2} >{<Crop32Icon/>}</ToggleButton>
                </ToggleButtonGroup>
                <div style={{ flexGrow : 1 }}/>
                <Button sx={{ ml:0, mt:0, mb:0, mr:1, p:0, height:'30px', fontSize:'16px'}} variant="contained" color = 'sys1' size="small" href='/addmachine'><LibraryAddIcon fontSize='inherit'/></Button>
            </div>
            <div>
                {
                    viewSelect === 1 ? <Tables/> :<div/>
                }
                {
                    viewSelect === 2 ? <Cards/>:<div/>
                }
            </div>
        </div>      
    )
}

export default ViewMachine;