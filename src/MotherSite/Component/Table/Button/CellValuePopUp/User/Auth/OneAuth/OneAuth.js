// ======================================================================================== [Import Libaray]
import { useState } from 'react';
import cookies from 'react-cookies'
// ======================================================================================== [Import Material UI Libaray]
import { Button } from '@mui/material';
//icon
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import TitleIcon from '@mui/icons-material/Title';
import NumbersIcon from '@mui/icons-material/Numbers';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import RouteIcon from '@mui/icons-material/Route';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// ======================================================================================== [Import Component] js
import oneAuthLang from './oneAuthLang'

// ======================================================================================== [Import Component] CSS


function OneAuth (props) {

    const [foldInfo, setFoldInfo] = useState(true);

    return (
        <div style={{ fontSize: '14px', display : 'flex', flexDirection : 'column'}}>
            <div className='auth-item-div-row'>
                <div className='auth-item-div-field-name'>
                    <div className='auth-item-div-field-icon'>
                        <VpnKeyIcon fontSize='inherit'/>
                    </div>
                    <div className='auth-item-div-field-name-text'>
                        {oneAuthLang.row.field.name.auth_code[cookies.load('site-lang')]}
                    </div>
                </div>
                <div className='auth-item-div-field-value' style={{width : '111px'}}>
                    {props.oneItem.auth_code}
                </div>
                <div className='auth-item-div-field-name'>
                    <div className='auth-item-div-field-icon'>
                        <DeveloperBoardIcon fontSize='inherit'/>
                    </div>
                    <div className='auth-item-div-field-name-text'>
                        {oneAuthLang.row.field.name.auth_sys[cookies.load('site-lang')]}
                    </div>
                </div>
                <div className='auth-item-div-field-value' style={{width : '111px'}}>
                    {props.oneItem.system_code}
                </div>
            </div>
            <div className='auth-item-div-row'>
                <div className='auth-item-div-field-name'>
                    <div className='auth-item-div-field-icon'>
                        <TitleIcon fontSize='inherit'/>
                    </div>
                    <div className='auth-item-div-field-name-text'>
                        {oneAuthLang.row.field.name.auth_title[cookies.load('site-lang')]}
                    </div>
                </div>
                <div className='auth-item-div-field-value' style={{ width : '300px' }}>
                    {props.oneItem.auth_title}
                </div>
            </div>
            {
                foldInfo ? <div/> : 
                <div>
                    <div>
                        <div className='auth-item-div-row'>
                            <div className='auth-item-div-field-name'>
                                <div className='auth-item-div-field-icon'>
                                    <RouteIcon fontSize='inherit'/>
                                </div>
                                <div className='auth-item-div-field-name-text'>
                                    {oneAuthLang.row.field.name.allow_path[cookies.load('site-lang')]}
                                </div>
                            </div>
                            <div className='auth-item-div-field-value' style={{ width : '300px' }}>
                                {props.oneItem.url_path}
                            </div>
                        </div>
                    </div>
                    <div className='auth-item-div-row'>
                        <div className='auth-item-div-field-name'>
                            <div className='auth-item-div-field-icon'>
                                <InfoIcon fontSize='inherit'/>
                            </div>
                            <div className='auth-item-div-field-name-text'>
                                {oneAuthLang.row.field.name.auth_description[cookies.load('site-lang')]}
                            </div>
                        </div>
                        <div className='auth-item-div-field-value' style={{ width : '300px' }}>
                            {props.oneItem.auth_description}
                        </div>
                    </div>
                </div>
            }
            <Button sx={{height:'24px', mt:0.5, mb:0.5, p:0}} color = 'sys1' variant = 'contained' size='small' onClick={()=>setFoldInfo(!foldInfo)}>
                { foldInfo ? <KeyboardArrowDownIcon/>
                    : <KeyboardArrowUpIcon/>
                }
            </Button>
        </div>
    )
}

export default OneAuth;