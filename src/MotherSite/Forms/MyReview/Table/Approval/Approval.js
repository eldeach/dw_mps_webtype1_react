
// ======================================================================================== [Import Libaray]


// ======================================================================================== [Import Material UI Libaray]


// ======================================================================================== [Import Component] js
import Tbl1NoFooter from '../../../../../System/TableObj/TableType1/PreMade/Tbl1NoFooter'
import columnDef from './columnDef'

// ======================================================================================== [Import Component] CSS

function Approval (){
    return (
        <Tbl1NoFooter
        getUrl = {'/getmyreviewlist'}
        params = {{
            sys_code : 'sys1',
            approval_type : 'APPROVED',
        }}
        columnDef = {columnDef}
        />
    )
}

export default Approval;