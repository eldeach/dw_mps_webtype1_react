
// ======================================================================================== [Import Libaray]


// ======================================================================================== [Import Material UI Libaray]


// ======================================================================================== [Import Component] js
import PageTbl from '../../../../../System/TanStackTableObj/PgTbl/PageTbl'
import columnDef from '../../../../Component/Table/columnDef/PeriodicStatus/cdPeriodicStatus'

// ======================================================================================== [Import Component] CSS

function Periodic1yQual (){
    return(
        <PageTbl
            getUrl = '/getrequal1year'
            columns = { columnDef }
        />
    )
}

export default Periodic1yQual;