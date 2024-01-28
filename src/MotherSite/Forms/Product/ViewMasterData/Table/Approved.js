
// ======================================================================================== [Import Libaray]


// ======================================================================================== [Import Material UI Libaray]


// ======================================================================================== [Import Component] js
import PageTbl from '../../../../../System/TanStackTableObj/PgTbl/PageTbl'
import columnDef from '../../../../Component/Table/columnDef/ViewMasterData/Product/Approved/cdVmdApproved'

// ======================================================================================== [Import Component] CSS

function Approved (){
    return(
        <PageTbl
            getUrl = '/getproductlistapproved'
            columns = { columnDef }
        />
    )
}

export default Approved;