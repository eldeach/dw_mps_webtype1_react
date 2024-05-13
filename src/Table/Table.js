// ======================================================================================== [Import Libaray]
import { useState, useEffect, useRef } from 'react';
import cookies from 'react-cookies'
import axios from 'axios';
import {
    getCoreRowModel,
    useReactTable,
    flexRender,
    getFilteredRowModel,
    getFacetedUniqueValues,
    getSortedRowModel,
    getPaginationRowModel
} from "@tanstack/react-table";

// ======================================================================================== [Import Material UI Libaray]
import { IconButton, Pagination, TextField, CircularProgress, Backdrop } from '@mui/material';
//icon
import ClearIcon from '@mui/icons-material/Clear';
import AutoModeIcon from '@mui/icons-material/AutoMode';

// ======================================================================================== [Import Component] js
import TableExcelDownButton from './TableExcelDownButton'
import TableHeader from './TableHeader';


// ======================================================================================== [Import Component] CSS
import './Table.css'

function Table({ size, muiColor, reqParam, multiSelectable, columns, setTableSelected }) {
    const style = {
        inputTexstField: {
            fontSize: 12,
            paddingRight: 0,
            marginRight: 0
        }
    }


    const [tblWidthValue, setTblWidthValue] = useState(null);
    const tableRef = useRef(null);
    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (entry.target.className.includes("page-tbl")) {
                    const { width } = entry.contentRect;
                    setTblWidthValue(width);
                }
            }
        });

        resizeObserver.observe(tableRef.current);

        return () => {
            if (tableRef.current) {
                resizeObserver.unobserve(tableRef.current);
            }
        };
    }, []);


    const [colTotalWidth, setColTotalWidth] = useState(null);
    useEffect(() => {
        let totalSize = 0;
        for (const column of columns) {
            if (column.size) {
                totalSize += column.size;
            }
        }
        setColTotalWidth(totalSize)
    }, [])


    const [data, setData] = useState([]); // table의 data 변수
    const getDbData = async () => {
        backdropOpen()
        let rs = await axios({ ...reqParam })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                console.log(error)
                return error.response;
            })
        setData(rs)
        backdropClose()
    }
    useEffect(() => {
        getDbData()
    }, [])


    const [filtering, setFiltering] = useState(""); // 선택된 row 정보 ("인덱스 : boolean" pair의 객체 구조)
    const [rowSelection, setRowSelection] = useState({}); // 선택된 row 정보 ("인덱스 : boolean" pair의 객체 구조)
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(), // 정렬함수, useReactable 생성자에 import하고 끝
        getFilteredRowModel: getFilteredRowModel(), // 필터함수, useReactable 생성자에 import하고 끝
        getFacetedUniqueValues: getFacetedUniqueValues(), // 컬럼의 고유값을 배열로 출력하는 함수, 생성자에 import하고 끝
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: size.tblNumRow,
                pageIndex: 0
            },
        },
        state: {
            globalFilter: filtering,
            rowSelection: rowSelection,
        },
        enableMultiRowSelection : multiSelectable,
        onGlobalFilterChanged: setFiltering,
        onRowSelectionChange: setRowSelection, // 선택사항이 바뀔 때 수행할 함수, onChange 같은 거
        enableRowSelection: true, // selection을 허용할지 여부, row => row.original.age > 18 이런식으로 선택할 수 있는 범위를 한정할 수 있는듯 (from 유투브 - TanStack React Table v8 - Part 5 - Row Selection, Checkbox selection, Display Selected Rows)
    })


    const rowOriginalExtractor = function () { //props.setTableSelected에 선택된 행의 original 객체만 하나씩 push
        let tempArr = []
        table.getSelectedRowModel().flatRows.map((oneRow, index) => { // 선택된 행 model 객체
            tempArr.push(oneRow.original) // original키에 행 정보가 담겨있음
        })
        if (setTableSelected) setTableSelected(tempArr) // props.setTableSelected
    }
    useEffect(() => {
        rowOriginalExtractor()
    }, [rowSelection])


    const handlePaegChange = (event, value) => {
        table.setPageIndex(value - 1)
    }

    const [backdrop, setBackdrop] = useState(false);
    const backdropClose = () => {
        setBackdrop(false);
    };
    const backdropOpen = () => {
        setBackdrop(true);
    };

    return (
        <div style={{ width: size.tableWidth }} className="page-tbl" ref={tableRef}>
            <div className='page-tbl-ctrl'>
                <div style={{ display: 'flex', flexDirection: 'column', width: '490px' }}>
                    <div style={{ flexGrow: '1' }} />
                    <div style={{ fontSize: '12px', marginBottom: '3px' }}>
                        {
                            {
                                kor: `결과 : ${table.getFilteredRowModel().rows.length} 행`,
                                eng: `Results : ${table.getFilteredRowModel().rows.length} Rows`
                            }[cookies.load('site-lang')]
                        }
                    </div>
                    {
                        setTableSelected ?
                            <div style={{ fontSize: '12px', marginBottom: '3px' }}>
                                {
                                    {
                                        kor: `선택됨 : ${table.getSelectedRowModel().flatRows.length} 행`,
                                        eng: `Selected : ${table.getSelectedRowModel().flatRows.length} Rows`
                                    }[cookies.load('site-lang')]
                                }
                            </div>
                            : <div />
                    }
                </div>
                <div style={{ flexGrow: '1', textAlign: 'center' }}>
                    <TextField
                        sx={{ width: '400px', mb: 0.5 }}
                        color={muiColor}
                        variant="outlined"
                        id="search_field"
                        name="search_field"
                        label={{ kor: "검색", eng: "Search" }[cookies.load('site-lang')]}
                        value={filtering}
                        onChange={(e) => setFiltering(e.target.value)}
                        size='small'
                        margin="dense"
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <IconButton size='small' onClick={() => { setFiltering("") }}>
                                    <ClearIcon size='small' />
                                </IconButton>
                            ),
                            style: style.inputTexstField // font size of input text
                        }}
                        InputLabelProps={{ style: style.inputTexstField }} // font size of input label
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', width: '510px' }}>
                    <div style={{ flexGrow: 1 }} />
                    <Pagination
                        sx={{ mt: 1 }}
                        count={table.getPageCount()}
                        showFirstButton
                        showLastButton
                        page={table.options.state.pagination.pageIndex + 1}
                        onChange={handlePaegChange}
                        variant="outlined"
                        color={muiColor} />
                    <IconButton size="small" edge="end" color={muiColor} sx={{ ml: 0.5, mt: 0.5 }} onClick={() => getDbData()} >
                        <AutoModeIcon />
                    </IconButton>
                    <TableExcelDownButton data={data} muiColor={muiColor} sheetName={reqParam.url.replace(`/`, "")} />
                </div>
            </div>
            <div className="page-tbl-box">
                <table>
                    <thead>
                        {
                            table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id} style={{ fontSize: '12px' }}>
                                    {
                                        headerGroup.headers.map(header => (
                                            <TableHeader key={header.id} header={header} tblWidthValue={tblWidthValue} colTotalWidth={colTotalWidth} />
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </thead>
                    <tbody>
                        {
                            table.getRowModel().rows.map(row => (
                                <tr key={row.id} style={{ fontSize: '12px' }}>
                                    {
                                        row.getVisibleCells().map(cell => (
                                            <td key={cell.id} >
                                                {
                                                    flexRender(cell.column.columnDef.cell, cell.getContext())
                                                }
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default Table;