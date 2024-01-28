// ======================================================================================== [Import Libaray]
import { useState } from 'react';
import cookies from 'react-cookies'
// ======================================================================================== [Import Material UI Libaray]
import { Button } from '@mui/material';
//icon
import WorkIcon from '@mui/icons-material/Work';
import CategoryIcon from '@mui/icons-material/Category';
import BusinessIcon from '@mui/icons-material/Business';
import InfoIcon from '@mui/icons-material/Info';
// ======================================================================================== [Import Component] js
import onePositionLang from './onePositionLang'

// ======================================================================================== [Import Component] CSS

function OneEmail (props) {

    return (
        <div style={{ fontSize: '14px', display : 'flex', flexDirection : 'column', padding:'6px', margin:'6px', border:'#D3D3D3 solid 1px', borderRadius : '5px', boxSizing:'border-box'}}>
            <div className='auth-item-div-row'>
                <div className='auth-item-div-field-name'>
                    <div className='auth-item-div-field-icon'>
                        <WorkIcon fontSize='inherit'/>
                    </div>
                    <div className='auth-item-div-field-name-text'>
                        {onePositionLang.row.field.name.item_position[cookies.load('site-lang')]}
                    </div>
                </div>
                <div className='auth-item-div-field-value' style={{ width : '111px' }}>
                    {props.oneItem.job_position}
                </div>
                <div className='auth-item-div-field-name'>
                    <div className='auth-item-div-field-icon'>
                        <CategoryIcon fontSize='inherit'/>
                    </div>
                    <div className='auth-item-div-field-name-text'>
                        {onePositionLang.row.field.name.item_team[cookies.load('site-lang')]}
                    </div>
                </div>
                <div className='auth-item-div-field-value' style={{ width : '111px' }}>
                    {props.oneItem.job_team}
                </div>
            </div>
            <div className='auth-item-div-row'>
                <div className='auth-item-div-field-name'>
                    <div className='auth-item-div-field-icon'>
                        <BusinessIcon fontSize='inherit'/>
                    </div>
                    <div className='auth-item-div-field-name-text'>
                        {onePositionLang.row.field.name.item_company[cookies.load('site-lang')]}
                    </div>
                </div>
                <div className='auth-item-div-field-value' style={{ width : '300px' }}>
                    {props.oneItem.job_company}
                </div>
            </div>
            <div className='auth-item-div-row'>
                <div className='auth-item-div-field-name'>
                    <div className='auth-item-div-field-icon'>
                        <InfoIcon fontSize='inherit'/>
                    </div>
                    <div className='auth-item-div-field-name-text'>
                        {onePositionLang.row.field.name.item_description[cookies.load('site-lang')]}
                    </div>
                </div>
                <div className='auth-item-div-field-value' style={{ width : '300px' }}>
                    {props.oneItem.job_description}
                </div>
            </div>
        </div>
    )
}

export default OneEmail;