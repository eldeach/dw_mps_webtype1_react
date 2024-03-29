// ======================================================================================== [Import Libaray]
import { useEffect, useState } from 'react';
import cookies from 'react-cookies';

// ======================================================================================== [Import Material UI Libaray]
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
//icon
import BackupTableIcon from '@mui/icons-material/BackupTable';
import Crop32Icon from '@mui/icons-material/Crop32';

// ======================================================================================== [Import Component] js
// its lang Object
import viewPrmLang from './viewPrmLang'

// Table
import Tables from './Table/Tables'
// Cards
import Cards from './Card/Cards'

// ======================================================================================== [Import Component] CSS

function ViewPrm (props) {
    const { handlePageTitle, handleSystemCode } = props

    const [viewSelect, setViewSelect] = useState(1);
    const handleChange = (event, newAlignment) => {
        setViewSelect(newAlignment);
    };

    useEffect(() =>{
        handlePageTitle(viewPrmLang.formTitle[cookies.load('site-lang')])
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

export default ViewPrm;