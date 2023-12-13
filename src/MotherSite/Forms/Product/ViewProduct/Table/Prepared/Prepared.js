
// ======================================================================================== [Import Libaray]


// ======================================================================================== [Import Material UI Libaray]


// ======================================================================================== [Import Component] js
import Tbl1NoFooter from '../../../../../../System/TableObj/TableType1/PreMade/Tbl1NoFooter'
import columnDef from './columnDef'

// ======================================================================================== [Import Component] CSS

function Prepared (){
    return (
        <Tbl1NoFooter
        getUrl = '/getproductlist'
        params = {{
            approval_status : 'PREPARED',
        }}
        columnDef = {columnDef}
        divStyle={{ marginLeft : '5px', marginTop : '10px', maxWidth : '100vw', maxHeight : '100vh', overflow : 'auto'}}
        tableStyle = {{ }}
        headerStyle = {{ fontSize : '12px' }}
        rowStyle = {{ fontSize : '12px' }} // 일괄 모든 row에 스타일 적용, columnDef의 cell 렌더가 우선순위가 높음
        />
    )
}

export default Prepared;