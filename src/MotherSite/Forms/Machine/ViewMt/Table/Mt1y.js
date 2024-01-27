// ======================================================================================== [Import Libaray]


// ======================================================================================== [Import Material UI Libaray]
//icon

// ======================================================================================== [Import Component] js
import PageTbl from '../../../../../System/TanStackTableObj/PgTbl/PageTbl'
import columnDef from '../../../../Component/Table/columnDef/PeriodicStatus/cdPeriodicStatus'

// ======================================================================================== [Import Component] CSS

function Mt1y (){
    return(
        <PageTbl
            getUrl = '/getremap1year'
            columns = { columnDef }
        />
    )
}

export default Mt1y;