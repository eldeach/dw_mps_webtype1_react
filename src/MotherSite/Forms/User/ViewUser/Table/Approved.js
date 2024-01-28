
// ======================================================================================== [Import Libaray]


// ======================================================================================== [Import Material UI Libaray]


// ======================================================================================== [Import Component] js
import PageTbl from '../../../../../System/TanStackTableObj/PgTbl/PageTbl'
import columnDef from '../../../../Component/Table/columnDef/ViewMasterData/User/Approved/cdVmdApproved'

// ======================================================================================== [Import Component] CSS

function Approved (){
    return(
        <PageTbl
            getUrl = '/getuserlistapproved'
            columns = { columnDef }
        />
    )
}

export default Approved;