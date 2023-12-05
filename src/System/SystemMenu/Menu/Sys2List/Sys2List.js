// ======================================================================================== [Import Libaray]
import cookies from 'react-cookies'

// ======================================================================================== [Import Material UI Libaray]  
import { Divider, List } from '@mui/material/';
//icon
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

// ======================================================================================== [Import Component] js
import ListItemNavPath from '../ListItemWrapper/ListItemNavPath';
import sys2ListLang from './sys2ListLang';

// ======================================================================================== [Import Component] CSS

function Sys1List() {
  

  return (
    <div>
      <List>
        <ListItemNavPath navPath={'/'} icon={<ChangeCircleIcon color = 'sys2'/>} text={ sys2ListLang.returnFirstPage[cookies.load('site-lang')] }/>
      </List>
      <Divider />
      <List>
        <ListItemNavPath navPath={'/avm_myprepared'} icon={<PersonAddIcon color = 'sys2'/>} text={ sys2ListLang.sys2item1[cookies.load('site-lang')] }/>
        <ListItemNavPath navPath={'/avm_myreview'} icon={<PersonAddIcon color = 'sys2'/>} text={ sys2ListLang.sys2item1[cookies.load('site-lang')] }/>
      </List>
    </div>
  )
}

export default Sys1List;