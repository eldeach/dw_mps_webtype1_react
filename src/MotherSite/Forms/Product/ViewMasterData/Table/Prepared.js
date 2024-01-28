
// ======================================================================================== [Import Libaray]


// ======================================================================================== [Import Material UI Libaray]


// ======================================================================================== [Import Component] js
import PageTbl from '../../../../../System/TanStackTableObj/PgTbl/PageTbl'
import columnDef from '../../../../Component/Table/columnDef/ViewMasterData/Product/OtherStatus/cdVmdOtherStatus'

// ======================================================================================== [Import Component] CSS

function Prepared (){
    return(
        <PageTbl
            getUrl = '/getproductlistprepared'
            columns = { columnDef }
        />
    )
}

export default Prepared;