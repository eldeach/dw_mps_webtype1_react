// ======================================================================================== [Import Libaray]


// ======================================================================================== [Import Material UI Libaray]  
import { AppBar, Box, Toolbar, Typography } from '@mui/material/';
//icon
import LanguageIcon from '@mui/icons-material/Language';

// ======================================================================================== [Import Component] js
import LoginButton from '../Login/LoginButton';
import SelectLangButton from '../Language/SelectLangButton';
import configAppBars from './configAppBars';
import MenuDie from '../AppBar/Menu/Die/MenuDie'

// ======================================================================================== [Import Component] CSS


function SiteAppBar(props){
    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar color = {props.appBar} position="static">
            <Toolbar variant="dense">
                <MenuDie appBar={props.appBar} listPackage={configAppBars[props.appBar].listPackage}/>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {configAppBars[props.appBar].title}
                </Typography>
                <SelectLangButton labelText={<LanguageIcon/>}/>
                <LoginButton/> 
            </Toolbar>
            </AppBar>
        </Box>
    )
}

export default SiteAppBar;