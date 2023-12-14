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
import Periodic1yQual from './Periodic1yQual/Periodic1yQual'
import PeriodicQual from './PeriodicQual/PeriodicQual'
import PeriodicSter from './PeriodicSter/PeriodicSter'
import PeriodicVHP from './PeriodicVHP/PeriodicVHP'
import PeriodicReview from './PeriodicReview/PeriodicReview'

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
                    <ToggleButton value={1} >{actCodeBook.mc_periodic_1y_qual[cookies.load('site-lang')]}</ToggleButton>
                    <ToggleButton value={2} >{actCodeBook.mc_periodic_qual[cookies.load('site-lang')]}</ToggleButton>
                    <ToggleButton value={3} >{actCodeBook.mc_periodic_ster[cookies.load('site-lang')]}</ToggleButton>
                    <ToggleButton value={4} >{actCodeBook.mc_periodic_vhp[cookies.load('site-lang')]}</ToggleButton>
                    <ToggleButton value={5} >{actCodeBook.mc_periodic_review[cookies.load('site-lang')]}</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div>
                {
                    viewSelect === 1 ? <Periodic1yQual/> :<div/>
                }
                {
                    viewSelect === 2 ? <PeriodicQual/> :<div/>
                }
                {
                    viewSelect === 3 ? <PeriodicSter/> :<div/>
                }
                {
                    viewSelect === 4 ? <PeriodicVHP/> :<div/>
                }
                {
                    viewSelect === 5 ? <PeriodicReview/> :<div/>
                }
            </div>
        </div>      
    )
}

export default Tables;