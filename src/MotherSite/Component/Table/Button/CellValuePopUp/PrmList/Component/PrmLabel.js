// ======================================================================================== [Import Libaray]
import cookies from 'react-cookies'
// ======================================================================================== [Import Material UI Libaray]
//icon
import TaskAltIcon from '@mui/icons-material/TaskAlt';
// ======================================================================================== [Import Component] js
// Component Object
import prmCodeBook from '../../../../../CodeBook/prmCodeBook'

function PrmLabel(props) {
    const { prmListObj, prmCode } = props;
    return (
        <div className='prm_item'>
            <div className='prm_item_icon'>
                <TaskAltIcon color={prmListObj[prmCode] ? 'accepted' : 'withdrawn'} fontSize='inherit' />
            </div>
            <div className='prm_item_text'>
                {prmCodeBook[prmCode][cookies.load('site-lang')]}
            </div>
        </div>
    )
}

export default PrmLabel;