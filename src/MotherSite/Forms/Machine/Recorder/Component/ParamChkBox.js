// ======================================================================================== [Import Libaray]
import cookies from 'react-cookies'


// ======================================================================================== [Import Material UI Libaray]
import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';

// ======================================================================================== [Import Component] js
// Component Object
import prmCodeBook from '../../../../Component/CodeBook/prmCodeBook'


function ParamChkBox(props) {
    const { formikProps, prmCode } = props;

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
                    checked={formikProps.values.prm_list[0][prmCode]}
                    onChange={(e) => {
                        let temp = [...formikProps.values.prm_list]
                        temp[0][prmCode] = Boolean(e.target.checked)
                        formikProps.setFieldValue('prm_list', temp)
                    }}
                />
            }
            label={<Typography fontSize={12}>{prmCodeBook[prmCode][cookies.load('site-lang')]}</Typography>} />
    )
}

export default ParamChkBox;

