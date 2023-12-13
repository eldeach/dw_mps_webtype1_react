// ======================================================================================== [Import Libaray]
import { useEffect, useState } from 'react';
import cookies from 'react-cookies';

// ======================================================================================== [Import Material UI Libaray]
import { Button, ButtonGroup, ToggleButtonGroup, ToggleButton } from '@mui/material';
//icon
import ClearIcon from '@mui/icons-material/Clear';
// ======================================================================================== [Import Component] js
// its lang Object
import actCodeBook from '../../ActCodeBook/actCodeBook';
import tablesLang from './tablesLang'

// Table
import Mt1y from './Mt1y/Mt1y'
import Mt3y from './Mt3y/Mt3y'

//onClick={() => setViewSelect(2)}

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
                    <ToggleButton value={1} >{actCodeBook.mc_periodic_1y_mt[cookies.load('site-lang')]}</ToggleButton>
                    <ToggleButton value={2} >{actCodeBook.mc_periodic_mt[cookies.load('site-lang')]}</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div>
                {
                    viewSelect === 1 ? <Mt1y/> :<div/>
                }
                {
                    viewSelect === 2 ? <Mt3y/> :<div/>
                }
            </div>
        </div>      
    )
}

export default Tables;