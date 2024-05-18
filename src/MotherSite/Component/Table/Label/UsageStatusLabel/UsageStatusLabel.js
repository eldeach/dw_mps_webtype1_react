// ======================================================================================== [Import Libaray]


// ======================================================================================== [Import Material UI Libaray]
//icon
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


// ======================================================================================== [Import Component] js


// ======================================================================================== [Import Component] CSS


function txtValueatusLabel(props) {
    const { txtValue } = props;
    return (
        <div className='gmp_label'>
            <div className='gmp_label_icon'>
                {
                    txtValue == "IN USE" ? <TaskAltIcon color='accepted' fontSize='inherit' />
                    : txtValue == "NOT IN USE" ? <DoNotDisturbIcon color='denied' fontSize='inherit' />
                    : <DeleteForeverIcon color='denied' fontSize='inherit' />
                }
            </div>
            <div className='gmp_label_text'>
                {txtValue}
            </div>
        </div>
    )
}

export default txtValueatusLabel;



