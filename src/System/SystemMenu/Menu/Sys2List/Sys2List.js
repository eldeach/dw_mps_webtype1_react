// ======================================================================================== [Import Libaray]
import cookies from 'react-cookies'

// ======================================================================================== [Import Material UI Libaray]  
import { Divider, List } from '@mui/material/';
//icon
import DrawIcon from '@mui/icons-material/Draw';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

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
        <ListItemNavPath navPath={'/avm_myprepared'} icon={<DrawIcon color = 'sys2'/>} text={ sys2ListLang.myprepared[cookies.load('site-lang')] }/>
        <ListItemNavPath navPath={'/avm_myreview'} icon={<DrawIcon color = 'sys2'/>} text={ sys2ListLang.myreview[cookies.load('site-lang')] }/>
      </List>
      <Divider />
      <List>
        <ListItemNavPath navPath={'/machine'} icon={<PrecisionManufacturingIcon color = 'sys2' size = "small"/>} text={ sys2ListLang.eq[cookies.load('site-lang')] }/>
      </List>
    </div>
  )
}

export default Sys1List;