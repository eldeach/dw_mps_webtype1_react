// ======================================================================================== [Import Libaray]
import { useState } from 'react';
import cookies from 'react-cookies';

// ======================================================================================== [Import Material UI Libaray]
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
//icon
// ======================================================================================== [Import Component] js
// its lang Object
import tablesLang from './tablesLang'

// Table
import Prepared from './Prepared/Prepared'


// ======================================================================================== [Import Component] CSS

function Tables () {
    const [viewSelect, setViewSelect] = useState(1);
    const handleChange = (event, newAlignment) => {
        setViewSelect(newAlignment);
    };
    return (
        <div id = 'userTableView' style ={{ display : 'flex', flexDirection : 'column'}} >
            <div style ={{ width : '100wv', display : 'flex', flexDirection : 'row', justifyContent : 'center' }}>
                <ToggleButtonGroup
                    color="sys1"
                    value={viewSelect}
                    exclusive
                    onChange={handleChange}
                    size = 'small'
                    >
                    <ToggleButton value={1} >{tablesLang.buttonGroup.prepared[cookies.load('site-lang')]}</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div>
                {
                    viewSelect === 1 ? <Prepared/> :<div/>
                }
            </div>
        </div>      
    )
}

export default Tables;