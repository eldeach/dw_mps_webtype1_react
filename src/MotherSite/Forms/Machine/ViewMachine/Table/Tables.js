// ======================================================================================== [Import Libaray]
import { useEffect, useState } from 'react';
import cookies from 'react-cookies';

// ======================================================================================== [Import Material UI Libaray]
import { Button, ButtonGroup, ToggleButtonGroup, ToggleButton } from '@mui/material';
//icon
import ClearIcon from '@mui/icons-material/Clear';
// ======================================================================================== [Import Component] js
// its lang Object
import tablesLang from './tablesLang'

// Table
import Approved from './Approved/Approved'
import UnderApproved from './UnderApproved/UnderApproved'
import Prepared from './Prepared/Prepared'
import Rejected from './Rejected/Rejected'
import Void from './Void/Void'
import PeriodicQual from './PeriodicQual/PeriodicQual'

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
                    <ToggleButton value={1} >{tablesLang.buttonGroup.approved[cookies.load('site-lang')]}</ToggleButton>
                    <ToggleButton value={2} >{tablesLang.buttonGroup.underApproved[cookies.load('site-lang')]}</ToggleButton>
                    <ToggleButton value={3} >{tablesLang.buttonGroup.prepared[cookies.load('site-lang')]}</ToggleButton>
                    <ToggleButton value={4} >{tablesLang.buttonGroup.rejected[cookies.load('site-lang')]}</ToggleButton>
                    <ToggleButton value={5} >{tablesLang.buttonGroup.void[cookies.load('site-lang')]}</ToggleButton>
                    <ToggleButton value={6} >{tablesLang.buttonGroup.periodicqual[cookies.load('site-lang')]}</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div>
                {
                    viewSelect === 1 ? <Approved/> :<div/>
                }
                {
                    viewSelect === 2 ? <UnderApproved/> :<div/>
                }
                {
                    viewSelect === 3 ? <Prepared/> :<div/>
                }
                {
                    viewSelect === 4 ? <Rejected/> :<div/>
                }
                {
                    viewSelect === 5 ? <Void/> :<div/>
                }
                {
                    viewSelect === 6 ? <PeriodicQual/> :<div/>
                }

            </div>
        </div>      
    )
}

export default Tables;