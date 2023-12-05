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
import Approval from './Approval/Approval'
import Areement from './Areement/Areement'
import Recieve from './Recieve/Recieve'
import FinalApproval from './FinalApproval/FinalApproval'

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
                    <ToggleButton value={2} >{tablesLang.buttonGroup.agreement[cookies.load('site-lang')]}</ToggleButton>
                    <ToggleButton value={3} >{tablesLang.buttonGroup.recieve[cookies.load('site-lang')]}</ToggleButton>
                    <ToggleButton value={4} >{tablesLang.buttonGroup.final_approval[cookies.load('site-lang')]}</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div>
                {
                    viewSelect === 1 ? <Approval/> :<div/>
                }
                {
                    viewSelect === 2 ? <Areement/> :<div/>
                }
                {
                    viewSelect === 3 ? <Recieve/> :<div/>
                }
                {
                    viewSelect === 4 ? <FinalApproval/> :<div/>
                }
            </div>
        </div>      
    )
}

export default Tables;