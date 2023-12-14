// ======================================================================================== [Import Libaray]
import { useState } from 'react';
import cookies from 'react-cookies'
// ======================================================================================== [Import Material UI Libaray]
import { Button } from '@mui/material';
//icon
import PhoneIcon from '@mui/icons-material/Phone';
import CategoryIcon from '@mui/icons-material/Category';
import BusinessIcon from '@mui/icons-material/Business';
// ======================================================================================== [Import Component] js
import onePhoneLang from './onePhoneLang'

// ======================================================================================== [Import Component] CSS

function OneEmail (props) {

    return (
        <div style={{ fontSize: '14px', display : 'flex', flexDirection : 'column', padding:'6px', margin:'6px', border:'#D3D3D3 solid 1px', borderRadius : '5px', boxSizing:'border-box'}}>
            <div>
                <div className='auth-item-div-row'>
                    <div className='auth-item-div-field-name'>
                        <div className='auth-item-div-field-icon'>
                            <PhoneIcon fontSize='inherit'/>
                        </div>
                        <div className='auth-item-div-field-name-text'>
                            {onePhoneLang.row.field.name.item_main_field[cookies.load('site-lang')]}
                        </div>
                    </div>
                    <div className='auth-item-div-field-value' style={{ width : '300px' }}>
                        {props.oneItem.phone_number}
                    </div>
                </div>
            </div>
            <div className='auth-item-div-row'>
                <div className='auth-item-div-field-name'>
                    <div className='auth-item-div-field-icon'>
                        <CategoryIcon fontSize='inherit'/>
                    </div>
                    <div className='auth-item-div-field-name-text'>
                        {onePhoneLang.row.field.name.item_usage[cookies.load('site-lang')]}
                    </div>
                </div>
                <div className='auth-item-div-field-value' style={{ width : '300px' }}>
                    {props.oneItem.phone_usage}
                </div>
            </div>
            <div className='auth-item-div-row'>
                <div className='auth-item-div-field-name'>
                    <div className='auth-item-div-field-icon'>
                        <BusinessIcon fontSize='inherit'/>
                    </div>
                    <div className='auth-item-div-field-name-text'>
                        {onePhoneLang.row.field.name.item_affiliation[cookies.load('site-lang')]}
                    </div>
                </div>
                <div className='auth-item-div-field-value' style={{ width : '300px' }}>
                    {props.oneItem.phone_affiliation}
                </div>
            </div>
        </div>
    )
}

export default OneEmail;