// ======================================================================================== [Import Libaray]
import cookies from 'react-cookies'
// ======================================================================================== [Import Material UI Libaray]
import { Button, Box, IconButton, Chip, Paper, TextField } from '@mui/material';
//icon
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import TitleIcon from '@mui/icons-material/Title';
import NumbersIcon from '@mui/icons-material/Numbers';
import Face6Icon from '@mui/icons-material/Face6';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import RunCircleIcon from '@mui/icons-material/RunCircle';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
// ======================================================================================== [Import Component] js
import docItemDivLang from './docItemDivLang'

// ======================================================================================== [Import Component] CSS
import './DocItemDiv.css'

function DocItemDiv (props) {
    return (
        <div style={{ fontSize: '14px', display : 'flex', flexDirection : 'column'}}>
            <div className='doc-item-div-row'>
                <div className='doc-item-div-field-name'>
                    <div className='doc-item-div-field-icon'>
                        <InsertDriveFileIcon fontSize='inherit'/>
                    </div>
                    <div className='doc-item-div-field-name-text'>
                        {docItemDivLang.row.field.name.doc_no[cookies.load('site-lang')]}
                    </div>
                </div>
                <div className='doc-item-div-field-value' style={{width : '186px'}}>
                    {props.oneItem.doc_no}
                </div>
                <div className='doc-item-div-field-name'>
                    <div className='doc-item-div-field-icon'>
                        <NumbersIcon fontSize='inherit'/>
                    </div>
                    <div className='doc-item-div-field-name-text'>
                        {docItemDivLang.row.field.name.rev_no[cookies.load('site-lang')]}
                    </div>
                </div>
                <div className='doc-item-div-field-value' style={{width : '36px'}}>
                    {props.oneItem.rev_no}
                </div>
            </div>
            <div className='doc-item-div-row'>
                <div className='doc-item-div-field-name'>
                    <div className='doc-item-div-field-icon'>
                        <TitleIcon fontSize='inherit'/>
                    </div>
                    <div className='doc-item-div-field-name-text'>
                        {docItemDivLang.row.field.name.doc_title[cookies.load('site-lang')]}
                    </div>
                </div>
                <div className='doc-item-div-field-value' style={{ width : '300px' }}>
                    {props.oneItem.doc_title}
                </div>
            </div>
            <div className='doc-item-div-row'>
                <div className='doc-item-div-field-name'>
                    <div className='doc-item-div-field-icon'>
                        <Face6Icon fontSize='inherit'/>
                    </div>
                    <div className='doc-item-div-field-name-text'>
                        {docItemDivLang.row.field.name.user_name[cookies.load('site-lang')]}
                    </div>
                </div>
                <div className='doc-item-div-field-value' style={{ width : '300px' }}>
                    {props.oneItem.user_name}
                </div>
            </div>
            <div className='doc-item-div-row'>
                <div className='doc-item-div-field-name'>
                    <div className='doc-item-div-field-icon'>
                        <Diversity3Icon fontSize='inherit'/>
                    </div>
                    <div className='doc-item-div-field-name-text'>
                        {docItemDivLang.row.field.name.written_by_team[cookies.load('site-lang')]}
                    </div>
                </div>
                <div className='doc-item-div-field-value' style={{ width : '300px' }}>
                    {props.oneItem.written_by_team}
                </div>
            </div>
            <div className='doc-item-div-row-perform-date-L'>
                <div className='doc-item-div-field-name-type2'>
                    <div className='doc-item-div-field-icon'>
                        <RunCircleIcon color='start' fontSize='inherit'/>
                    </div>
                    <div className='doc-item-div-field-name-text'>
                        {docItemDivLang.row.field.name.imp_start_date[cookies.load('site-lang')]}
                    </div>
                </div>
                <div className='doc-item-div-field-value' style={{ width : '120px'}}>
                    {props.oneItem.imp_start_date}
                </div>
            </div>
            <div className='doc-item-div-row-perform-date-R'>
                <div className='doc-item-div-field-value' style={{ width : '162px'}}>
                    {props.oneItem.imp_completion_date}
                </div>
                <div className='doc-item-div-field-name-type2'>
                    <div className='doc-item-div-field-icon'>
                        <WhereToVoteIcon color='accepted' fontSize='inherit'/>
                    </div>
                    <div className='doc-item-div-field-name-text'>
                        {docItemDivLang.row.field.name.imp_completion_date[cookies.load('site-lang')]}
                    </div>
                </div>
            </div>
            <div className='doc-item-div-row'>
                <div className='doc-item-div-field-name-type2'>
                    <div className='doc-item-div-field-icon'>
                        <TaskAltIcon color='accepted' fontSize='inherit'/>
                    </div>
                    <div className='doc-item-div-field-name-text'>
                        {docItemDivLang.row.field.name.approval_date[cookies.load('site-lang')]}
                    </div>
                </div>
                <div className='doc-item-div-field-value' style={{ width : '260px' }}>
                    {props.oneItem.approval_date}
                </div>
            </div>
        </div>
    )
}

export default DocItemDiv;