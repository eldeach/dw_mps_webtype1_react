
// ======================================================================================== [Import Libaray]


// ======================================================================================== [Import Material UI Libaray]


// ======================================================================================== [Import Component] js
import PgParamTbl from '../../../../../System/TanStackTableObj/PgParamTbl/PgParamTbl'
import columnDef from './columnDef'

// ======================================================================================== [Import Component] CSS

function Prepared (){
    return(
        <PgParamTbl
            getUrl = '/getmypreparedlist'
            columns = { columnDef }
            params = {{
                data_tbl_name : 'tb_machine',
                sys_code : 'avm',
            }}
        />
    )
}

export default Prepared;