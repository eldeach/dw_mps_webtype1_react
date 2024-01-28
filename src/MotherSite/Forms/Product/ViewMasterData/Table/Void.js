
// ======================================================================================== [Import Libaray]


// ======================================================================================== [Import Material UI Libaray]


// ======================================================================================== [Import Component] js
import PageTbl from '../../../../../System/TanStackTableObj/PgTbl/PageTbl'
import columnDef from '../../../../Component/Table/columnDef/ViewMasterData/Product/OtherStatus/cdVmdOtherStatus'

// ======================================================================================== [Import Component] CSS

function Void (){
    return(
        <PageTbl
            getUrl = '/getproductlistvoid'
            columns = { columnDef }
        />
    )
}

export default Void;