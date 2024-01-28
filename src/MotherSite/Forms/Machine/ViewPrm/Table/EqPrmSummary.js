
// ======================================================================================== [Import Libaray]


// ======================================================================================== [Import Material UI Libaray]


// ======================================================================================== [Import Component] js
import PageTbl from '../../../../../System/TanStackTableObj/PgTbl/PageTbl'
import columnDef from '../../../../Component/Table/columnDef/EqPrm/cdEqPrm'


// ======================================================================================== [Import Component] CSS

function EqPrmSummary (){
    return(
        <PageTbl
            getUrl = '/geteqprm'
            columns = { columnDef }
        />
    )
}

export default EqPrmSummary;