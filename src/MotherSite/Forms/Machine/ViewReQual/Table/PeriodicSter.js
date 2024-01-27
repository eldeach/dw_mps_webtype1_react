
// ======================================================================================== [Import Libaray]


// ======================================================================================== [Import Material UI Libaray]


// ======================================================================================== [Import Component] js
import PageTbl from '../../../../../System/TanStackTableObj/PgTbl/PageTbl'
import columnDef from '../../../../Component/Table/columnDef/PeriodicStatus/cdPeriodicStatus'

// ======================================================================================== [Import Component] CSS

function PeriodicSter (){
    return(
        <PageTbl
            getUrl = '/getrequalster'
            columns = { columnDef }
        />
    )
}

export default PeriodicSter;