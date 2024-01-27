
// ======================================================================================== [Import Libaray]


// ======================================================================================== [Import Material UI Libaray]


// ======================================================================================== [Import Component] js
import PageTbl from '../../../../../System/TanStackTableObj/PgTbl/PageTbl'
import columnDef from '../../../../Component/Table/columnDef/PeriodicStatus/cdPeriodicStatus'

// ======================================================================================== [Import Component] CSS

function PeriodicVHP (){
    return(
        <PageTbl
            getUrl = '/getrequalvhp'
            columns = { columnDef }
        />
    )
}

export default PeriodicVHP;