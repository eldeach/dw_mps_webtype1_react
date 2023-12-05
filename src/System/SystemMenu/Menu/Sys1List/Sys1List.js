// ======================================================================================== [Import Libaray]
import cookies from 'react-cookies'

// ======================================================================================== [Import Material UI Libaray]  
import { Divider, List } from '@mui/material/';
//icon
import DrawIcon from '@mui/icons-material/Draw';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import RecentActorsIcon from '@mui/icons-material/RecentActors';

// ======================================================================================== [Import Component] js
import ListItemNavPath from '../ListItemWrapper/ListItemNavPath';
import sys1ListLang from './sys1ListLang';

// ======================================================================================== [Import Component] CSS

function Sys1List() {
  

  return (
    <div>
      <List>
        <ListItemNavPath navPath={'/'} icon={<ChangeCircleIcon color = 'sys1'/>} text={ sys1ListLang.returnFirstPage[cookies.load('site-lang')] }/>
      </List>
      <Divider />
      <List>
        <ListItemNavPath navPath={'/myprepared'} icon={<DrawIcon color = 'sys1' size = "small"/>} text={ sys1ListLang.myprepared[cookies.load('site-lang')] }/>
        <ListItemNavPath navPath={'/myreview'} icon={<DrawIcon color = 'sys1' size = "small"/>} text={ sys1ListLang.myreview[cookies.load('site-lang')] }/>
      </List>
      <Divider />
      <List>
        <ListItemNavPath navPath={'/userlist'} icon={<RecentActorsIcon color = 'sys1' size = "small"/>} text={ sys1ListLang.viewUser[cookies.load('site-lang')] }/>
      </List>
    </div>
  )
}

export default Sys1List;