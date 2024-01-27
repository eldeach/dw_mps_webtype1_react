// ======================================================================================== [Import Libaray]

// ======================================================================================== [Import Material UI Libaray]
//icon
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

// ======================================================================================== [Import Component] js
// Component

// ======================================================================================== [Import Component] CSS

function GmpImpactLabel(props) {

    const { txtValue } = props
    return (
        <div>
            {
                txtValue == "GMP IMPACT" ?
                    <div className='gmp_label'>
                        <div className='gmp_label_icon'>
                            <TaskAltIcon color='accepted' fontSize='inherit' />
                        </div>
                        <div className='gmp_label_text'>
                            {txtValue}
                        </div>
                    </div>
                    :
                    <div className='gmp_label'>
                        <div className='gmp_label_icon'>
                            <RadioButtonUncheckedIcon color='white' fontSize='inherit' />
                        </div>
                        <div className='gmp_label_text'>
                            {txtValue}
                        </div>
                    </div>
            }
        </div>
    )

    const { impactSt } = props
    return (
        <div className='gmp_label'>
            <div className='gmp_label_icon'>
                <TaskAltIcon color={impactSt ? 'accepted' : 'withdrawn'} fontSize='inherit' />
            </div>
            <div className='gmp_label_text'>
                {impactSt ? `GMP IMPACT` : `no impact`}
            </div>
        </div>
    )
}

export default GmpImpactLabel;