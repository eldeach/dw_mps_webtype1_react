// ======================================================================================== [Import Libaray]

// ======================================================================================== [Import Material UI Libaray]
//icon
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

// ======================================================================================== [Import Component] js
// Object


// ======================================================================================== [Import Component] CSS


function ExceedLabel(props) {
    const { txtValue } = props
    return (
        <div>
            {
                txtValue == "NOT EXPIRED" ?
                    <div className='not_exceed_label'>
                        <div className='not_exceed_label_icon'>
                            <TaskAltIcon color='white' fontSize='inherit' />
                        </div>
                        <div className='not_exceed_label_text'>
                            {txtValue}
                        </div>
                    </div>
                    :
                    <div className='exceed_label'>
                        <div className='exceed_label_icon'>
                            <WarningAmberIcon color='white' fontSize='inherit' />
                        </div>
                        <div className='exceed_label_text'>
                            {txtValue}
                        </div>
                    </div>
            }
        </div>
    )
}

export default ExceedLabel;