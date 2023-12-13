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
import EqPrmSummary from './EqPrmSummary/EqPrmSummary'

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
                    <ToggleButton value={1} >{{kor : `설비 파라미터 검증 범위`, eng:`Equipment Parameter Qualification Range` }[cookies.load('site-lang')]}</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div>
                {
                    viewSelect === 1 ? <EqPrmSummary/> :<div/>
                }
            </div>
        </div>      
    )
}

export default Tables;