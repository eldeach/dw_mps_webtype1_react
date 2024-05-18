// ======================================================================================== [Import Libaray]
import { useEffect, useState } from 'react';
import cookies from 'react-cookies';


// ======================================================================================== [Import Material UI Libaray]
import { Button, Modal, Paper } from '@mui/material';
//icon
import MenuBookIcon from '@mui/icons-material/MenuBook';

// ======================================================================================== [Import Component] js


// ======================================================================================== [Import Component] CSS


function PrmValueLabel(props) {
    const { prmValue } = props
    return (
        <div>
            {
                prmValue ?
                    <div style={{ width: '100%', color: 'white', fontSize: '14px', fontWeight: 'bolder', paddingTop: '5px', paddingBottom: '5px', boxSizing: 'border-box', borderRadius: '3px', backgroundColor: '#3f50b5' }} >
                        {prmValue}
                    </div >
                    : <div style={{ width: '100%', color: 'white', fontSize: '14px', fontWeight: 'bolder', paddingTop: '5px', paddingBottom: '5px', boxSizing: 'border-box', borderRadius: '3px', backgroundColor: '#c2c2c2' }} >
                        -
                    </div >
            }
        </div>
    )
}

export default PrmValueLabel;