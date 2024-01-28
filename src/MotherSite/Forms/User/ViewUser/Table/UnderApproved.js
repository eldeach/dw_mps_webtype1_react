
// ======================================================================================== [Import Libaray]


// ======================================================================================== [Import Material UI Libaray]


// ======================================================================================== [Import Component] js
import PageTbl from '../../../../../System/TanStackTableObj/PgTbl/PageTbl'
import columnDef from '../../../../Component/Table/columnDef/ViewMasterData/User/OtherStatus/cdVmdOtherStatus'

// ======================================================================================== [Import Component] CSS

function UnderApproved (){
    return(
        <PageTbl
            getUrl = '/getuserlistunderapproved'
            columns = { columnDef }
        />
    )
}

export default UnderApproved;