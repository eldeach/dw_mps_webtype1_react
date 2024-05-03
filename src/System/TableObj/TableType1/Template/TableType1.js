// ======================================================================================== [Import Libaray]
import { useState, useEffect } from 'react';
import { getCoreRowModel, useReactTable, flexRender, getFilteredRowModel, getFacetedUniqueValues, getSortedRowModel } from "@tanstack/react-table";
 

// ======================================================================================== [Import Material UI Libaray]

//icon


// ======================================================================================== [Import Component] js
import TableHeader from '../Components/TableHeader/TableHeader';
import tableType1Lang from './tableType1Lang';

// ======================================================================================== [Import Component] CSS
import '../../../../Table/Table.css'


// TableType1 props 작성 패턴
// <TableType1
// tableData = { tableData }
// columnsDef = { columnsDef }
// divStyle={{ divMaxWidth : '600px', divMaxHeight : '200px', borderRadius :'10px', overflow : 'auto'}}
// tableStyle = {{ }}
// headerStyle = {{ fontSize : '12px' }}
// rowStyle = {{ fontSize : '20px' }} // 일괄 모든 row에 스타일 적용, columnDef의 cell 렌더가 우선순위가 높음
// footerOn = { false }
// setTableSelected = { setTableSelected }
// />

    // props 중 tableData 정의 패턴
    // const tableData = [
    //     {
    //         code: "id111",
    //         name: "user_name1",
    //     },
    //     {
    //         code: "id222",
    //         name: "user_name1",
    //     },
    //     {
    //         code: "id333",
    //         name: "user_name1",
    //     }
    // ]

    // props 중 columnsDef 정의 패턴
    // const columnHelper = createColumnHelper();
    // const columnsDef = [  // TanStack Table은 컬럼 사이즈가 20이 최소
    //     { // row selection 할꺼면
    //         id: "select",
    //         size:20, // TanStack Table은 컬럼 사이즈가 20이 최소
    //         header: ({ table }) => (
    //         <IndeterminateCheckbox
    //             {...{
    //             checked: table.getIsAllRowsSelected(),
    //             indeterminate: table.getIsSomeRowsSelected(),
    //             onChange: table.getToggleAllRowsSelectedHandler(),
    //             }}
    //         />
    //         ),
    //         cell: ({ row }) => (
    //         <IndeterminateCheckbox
    //             {...{
    //             checked: row.getIsSelected(),
    //             disabled: !row.getCanSelect(),
    //             indeterminate: row.getIsSomeSelected(),
    //             onChange: row.getToggleSelectedHandler(),
    //             }}
    //         />
    //         ),
    //     },
    //     columnHelper.accessor( "code",
    //         {
    //             header: { kor : "권한코드", eng : "authcode" },
    //             size: 300,
    //             enableColumnFilter: true,
    //             footer: info => info.column.id,
    //         }
    //     ),
    //     columnHelper.accessor( "name",
    //         {
    //             header: { kor : "시스템", eng : "system" },
    //             size: 200,
    //             footer: info => info.column.id,
    //             cell: renderValue => (
    //                 <div style={{ fontSize: '10px', color: 'red', fontWeight: 'bold', borderRadius: '4px', border: '1px solid red', background: 'blue' }}>
    //                     { renderValue.getValue() }
    //                 </div>
    //             )
    //         }
    //     ),
    // ]

function TableType1 (props) {

    const { tableData, columnsDef, divStyle, tableStyle, headerStyle, rowStyle, footerOn, setTableSelected } = props;

    const [ data, setData ] = useState([]); // table의 data 변수

    const [ columns, setColumns ] = useState([]); // table의 column def. 변수

    const [rowSelection, setRowSelection] = useState({}); // 선택된 row 정보 ("인덱스 : boolean" pair의 객체 구조)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel : getCoreRowModel(),
        getSortedRowModel : getSortedRowModel(), // 정렬함수, useReactable 생성자에 import하고 끝
        getFilteredRowModel : getFilteredRowModel(), // 필터함수, useReactable 생성자에 import하고 끝
        getFacetedUniqueValues : getFacetedUniqueValues(), // 컬럼의 고유값을 배열로 출력하는 함수, 생성자에 import하고 끝
        state : {
            rowSelection : rowSelection, 
        },
        onRowSelectionChange : setRowSelection, // 선택사항이 바뀔 때 수행할 함수, onChange 같은 거
        enableRowSelection : true, // selection을 허용할지 여부, row => row.original.age > 18 이런식으로 선택할 수 있는 범위를 한정할 수 있는듯 (from 유투브 - TanStack React Table v8 - Part 5 - Row Selection, Checkbox selection, Display Selected Rows)
    })

    const rowOriginalExtractor = function () { //props.setTableSelected에 선택된 행의 original 객체만 하나씩 push
        let tempArr = []
        table.getSelectedRowModel().flatRows.map (( oneRow, index ) => { // 선택된 행 model 객체
            tempArr.push( oneRow.original ) // original키에 행 정보가 담겨있음
        })
        setTableSelected( tempArr ) // props.setTableSelected
    }

    useEffect(() => {
        setData( tableData ) // props.tableData
        setColumns( columnsDef ) // props.columnsDef
        rowOriginalExtractor()
    },[][rowSelection])
    
    return (
        <div className = "table-type-1" style ={{ ...divStyle }}>
            <table style={{ ...tableStyle }}>
                <thead>
                    {
                        table.getHeaderGroups().map( headerGroup => (
                            <tr key = { headerGroup.id } style={{ ...headerStyle }}>
                                {
                                    headerGroup.headers.map( header => (
                                        <TableHeader key = { header.id } header = { header } table = { table }/>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody>
                    {
                        table.getRowModel().rows.map( row => (
                            <tr key = { row.id } style={{ ...rowStyle }}>
                                {
                                    row.getVisibleCells().map( cell => (
                                        <td key = { cell.id } >
                                            {
                                                flexRender( cell.column.columnDef.cell, cell.getContext() )
                                            }
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
                {
                    footerOn ? 
                    <tfoot>
                        {
                            table.getFooterGroups().map( footerGroup => (
                                <tr key = { footerGroup.id }>
                                    {
                                        footerGroup.headers.map( header => (
                                            <th key = { header.id }>
                                                {
                                                    header.isPlaceholder ? null
                                                    : flexRender( header.column.columnDef.footer, header.getContext() )
                                                }
                                            </th>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tfoot>
                    : null
                }
            </table>
            <div style ={{fontSize : headerStyle.fontSize}}>
                {
                    table.getSelectedRowModel().flatRows.length > 0 ? <div>{"Selected : ".concat(table.getSelectedRowModel().flatRows.length)}</div> :
                    <div/>
                }
                {/* <ul>
                { table.getSelectedRowModel().flatRows.map((el) => {
                    return <li key={el.id}>{JSON.stringify(el.original)}</li>;
                })}
                </ul> */}
            </div>
        </div>
    )
}

export default TableType1;