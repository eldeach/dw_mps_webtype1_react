
// ======================================================================================== [Import Libaray]


// ======================================================================================== [Import Material UI Libaray]


// ======================================================================================== [Import Component] js
import PageTbl from '../../../../../System/TanStackTableObj/PgTbl/PageTbl'
import columnDef from '../../../../Component/Table/columnDef/ViewMasterData/User/OtherStatus/cdVmdOtherStatus'

// ======================================================================================== [Import Component] CSS

function Rejected (){
    return(
        <PageTbl
            getUrl = '/getuserlistrejected'
            columns = { columnDef }
        />
    )
}

export default Rejected;