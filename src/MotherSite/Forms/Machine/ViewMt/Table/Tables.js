// ======================================================================================== [Import Libaray]
import { useState } from 'react';
import cookies from 'react-cookies';

// ======================================================================================== [Import Material UI Libaray]
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
//icon

// ======================================================================================== [Import Component] js
// its lang Object
import actCodeBook from '../../../../Component/CodeBook/actCodeBook';

// Table
import Mt1y from './Mt1y'
import Mt3y from './Mt3y'
import Mt3yS from './Mt3yS'

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
                    <ToggleButton value={3} >{actCodeBook.mc_periodic_season_mt[cookies.load('site-lang')]}</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div>
                {
                    viewSelect === 1 ? <Mt1y/> :<div/>
                }
                {
                    viewSelect === 2 ? <Mt3y/> :<div/>
                }
                {
                    viewSelect === 3 ? <Mt3yS/> :<div/>
                }
            </div>
        </div>      
    )
}

export default Tables;