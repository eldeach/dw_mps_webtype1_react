
// ======================================================================================== [Import Libaray]


// ======================================================================================== [Import Material UI Libaray]


// ======================================================================================== [Import Component] js
import PageTbl from '../../../../../System/TanStackTableObj/PgTbl/PageTbl'
import columnDef from '../../../../Component/Table/columnDef/PeriodicStatus/cdPeriodicStatus'

// ======================================================================================== [Import Component] CSS

function Mt3y (){
    return(
        <PageTbl
            getUrl = '/getremap3yearseason'
            columns = { columnDef }
        />
    )
}

export default Mt3y;