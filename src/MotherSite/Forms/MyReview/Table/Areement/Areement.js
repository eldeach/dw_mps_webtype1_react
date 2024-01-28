
// ======================================================================================== [Import Libaray]


// ======================================================================================== [Import Material UI Libaray]


// ======================================================================================== [Import Component] js
import PgParamTbl from '../../../../../System/TanStackTableObj/PgParamTbl/PgParamTbl'
import columnDef from './columnDef'

// ======================================================================================== [Import Component] CSS

function Areement (){
    return(
        <PgParamTbl
            getUrl = '/getmyreviewlist'
            columns = { columnDef }
            params = {{
                sys_code : 'avm',
                approval_type : 'AGREEMENT',
            }}
        />
    )
}

export default Areement;