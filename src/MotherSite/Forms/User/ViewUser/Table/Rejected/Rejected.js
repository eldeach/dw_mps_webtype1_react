
// ======================================================================================== [Import Libaray]


// ======================================================================================== [Import Material UI Libaray]


// ======================================================================================== [Import Component] js
import Tbl1NoFooter from '../../../../../../System/TableObj/TableType1/PreMade/Tbl1NoFooter'
import columnDef from './columnDef'

// ======================================================================================== [Import Component] CSS

function Rejected (){
    return (
        <Tbl1NoFooter
        getUrl = '/getuserlist'
        params = {{
            approval_status : 'REJECTED',
        }}
        columnDef = {columnDef}
        />
    )
}

export default Rejected;