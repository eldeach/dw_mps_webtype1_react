// ======================================================================================== [Import Libaray]
import cookies from 'react-cookies'

// ======================================================================================== [Import Material UI Libaray]
import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';
//icon


// ======================================================================================== [Import Component] js
// Const Object
import actCodeBook from '../../../../Component/CodeBook/actCodeBook'

function PeriodicMngChkBox(props) {
    const { formikProps, mngChkCode, mngCode } = props;

    return (
        <FormControlLabel
            color='sys1'
            fontSize='inherit'
            control={
                <Checkbox
                    size="small"
                    sx={{
                        color: pink[800],
                        '&.Mui-checked': {
                            color: pink[600],
                        },
                    }}
                    checked={formikProps.values[mngChkCode]}
                    onChange={(e) => { formikProps.setFieldValue(mngChkCode, Boolean(e.target.checked)) }}
                />
            }
            label={<Typography fontSize={12}>{actCodeBook[mngCode][cookies.load('site-lang')]}</Typography>}
        />
    )
}

export default PeriodicMngChkBox;