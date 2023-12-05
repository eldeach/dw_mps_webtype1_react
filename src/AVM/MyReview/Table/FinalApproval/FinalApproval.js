
// ======================================================================================== [Import Libaray]


// ======================================================================================== [Import Material UI Libaray]


// ======================================================================================== [Import Component] js
import Tbl1NoFooter from '../../../../../System/TableObj/TableType1/PreMade/Tbl1NoFooter'
import columnDef from './columnDef'

// ======================================================================================== [Import Component] CSS

function FinalApproval (){
    return (
        <Tbl1NoFooter
        getUrl = {'/getmyreviewlist'}
        params = {{
            sys_code : 'sys2',
            approval_type : 'FINAL_APPROVAL',
        }}
        columnDef = {columnDef}
        />
    )
}

export default FinalApproval;