
// ======================================================================================== [Import Libaray]


// ======================================================================================== [Import Material UI Libaray]


// ======================================================================================== [Import Component] js
import Tbl1NoFooter from '../../../../../System/TableObj/TableType1/PreMade/Tbl1NoFooter'
import columnDef from './columnDef'

// ======================================================================================== [Import Component] CSS

function Prepared (){
    return (
        <Tbl1NoFooter
        getUrl = {'/getmypreparedlist'}
        params = {{
            sys_code : 'sys2',
        }}
        columnDef = {columnDef}
        />
    )
}

export default Prepared;