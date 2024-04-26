// ======================================================================================== [Import Libaray]
import { useState, useEffect } from 'react';
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
import ExcelDownButton from './TableExcelDownButton'
import TableHeader from './TableHeader';


// ======================================================================================== [Import Component] CSS
import './Table.css'

function PageTable({ reqParam, columns } ) {

    const style = {
        inputTexstField: {
            fontSize: 12,
            paddingRight: 0,
            marginRight: 0
        }
    }

    const [data, setData] = useState([]); // table의 data 변수

    const [filtering, setFiltering] = useState(""); // 선택된 row 정보 ("인덱스 : boolean" pair의 객체 구조)


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
                pageSize: 18,
                pageIndex: 0
            },
        },
        state: {
            globalFilter: filtering,
        },
        onGlobalFilterChanged: setFiltering,
        enableRowSelection: true, // selection을 허용할지 여부, row => row.original.age > 18 이런식으로 선택할 수 있는 범위를 한정할 수 있는듯 (from 유투브 - TanStack React Table v8 - Part 5 - Row Selection, Checkbox selection, Display Selected Rows)
    })

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

    const getDbData = async () => {
        backdropOpen()
        let rs = await axios({...reqParam})
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

    return (
        <div className="page-tbl">
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
                </div>
                <div style={{ flexGrow: '1', textAlign: 'center' }}>
                    <TextField
                        sx={{ width: '400px', mb: 0.5 }}
                        color='primary'
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
                <div style={{ display: 'flex', flexDirection: 'row', width: '490px' }}>
                    <div style={{ flexGrow: 1 }} />
                    <Pagination
                        sx={{ mt: 1 }}
                        count={table.getPageCount()}
                        showFirstButton
                        showLastButton
                        page={table.options.state.pagination.pageIndex + 1}
                        onChange={handlePaegChange}
                        variant="outlined"
                        color="primary" />
                    <IconButton size="small" edge="end" color="primary" sx={{ ml: 0.5, mt: 0.5 }} onClick={() => getDbData()} >
                        <AutoModeIcon />
                    </IconButton>
                    <ExcelDownButton data={data} sheetName={reqParam.url.replace(`/`, "")} />
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
                                            <TableHeader key={header.id} header={header} />
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
                {/* <div>
                <button onClick={() => table.setPageIndex(0)}> go to first </button>
                <button onClick={() => table.previousPage()} > previous </button>
                <button onClick={() => table.nextPage()} > next </button>
                <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}  > last </button>
            </div> */}
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

export default PageTable;