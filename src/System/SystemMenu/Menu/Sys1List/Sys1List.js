// ======================================================================================== [Import Libaray]
import cookies from 'react-cookies'

// ======================================================================================== [Import Material UI Libaray]  
import { Divider, List } from '@mui/material/';
//icon
import DrawIcon from '@mui/icons-material/Draw';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';
import BorderOuterIcon from '@mui/icons-material/BorderOuter';
import ListIcon from '@mui/icons-material/List';
import ShowerIcon from '@mui/icons-material/Shower';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import SendIcon from '@mui/icons-material/Send';

// ======================================================================================== [Import Component] js
import ListItemNavPath from '../ListItemWrapper/ListItemNavPath';
import sys1ListLang from './sys1ListLang';

// ======================================================================================== [Import Component] CSS

function Sys1List() {


    return (
        <div>
            <List>
                <ListItemNavPath navPath={'/'} icon={<ReplayCircleFilledIcon color='sys1' />} text={sys1ListLang.returnFirstPage[cookies.load('site-lang')]} />
            </List>
            <Divider />
            <div style={{ marginLeft:'6px', fontSize: '11px', color: 'grey' }}>{{ kor: `오송제제기술팀 계정과 권한이 필요함`, eng: `Account and permissions are required for the Osong Technical Operation Team` }[cookies.load('site-lang')]}</div>
            <Divider />
            <List>
                <ListItemNavPath navPath={'/myprepared'} icon={<DrawIcon color='sys1' size="small" />} text={sys1ListLang.myprepared[cookies.load('site-lang')]} />
                <ListItemNavPath navPath={'/myreview'} icon={<DrawIcon color='sys1' size="small" />} text={sys1ListLang.myreview[cookies.load('site-lang')]} />
            </List>
            <Divider />
            <List>
                <ListItemNavPath navPath={'/userlist'} icon={<RecentActorsIcon color='sys1' size="small" />} text={sys1ListLang.viewUser[cookies.load('site-lang')]} />
                <ListItemNavPath navPath={'/productlist'} icon={<VaccinesIcon color='sys1' size="small" />} text={sys1ListLang.viewProd[cookies.load('site-lang')]} />
                <ListItemNavPath navPath={'/machinelist'} icon={<ListIcon color='sys1' size="small" />} text={sys1ListLang.viewMachine[cookies.load('site-lang')]} />
                <ListItemNavPath navPath={'/mailinglist'} icon={<SendIcon color='sys1' size="small" />} text={sys1ListLang.mailinglist[cookies.load('site-lang')]} />
            </List>
            <Divider />
            <div style={{ marginLeft:'6px', fontSize: '11px', color: 'grey' }}>{{ kor: `공장 내부 전산망에 공개됨`, eng: `Accessible on the internal network of the factory` }[cookies.load('site-lang')]}</div>
            <Divider />
            <List>
                <ListItemNavPath navPath={'/viewrequal'} icon={<ChangeCircleIcon color='sys1' size="small" />} text={sys1ListLang.viewReQual[cookies.load('site-lang')]} />
                <ListItemNavPath navPath={'/viewmt'} icon={<BorderOuterIcon color='sys1' size="small" />} text={sys1ListLang.viewMt[cookies.load('site-lang')]} />
                <ListItemNavPath navPath={'/viewprm'} icon={<PermDataSettingIcon color='sys1' size="small" />} text={sys1ListLang.viewPrm[cookies.load('site-lang')]} />
                <ListItemNavPath navPath={'/viewcv'} icon={<ShowerIcon color='sys1' size="small" />} text={sys1ListLang.viewCV[cookies.load('site-lang')]} />
            </List>
            <Divider />
            <List>
                <ListItemNavPath navPath={'/viewpv'} icon={<VaccinesIcon color='sys1' size="small" />} text={sys1ListLang.viewPrPV[cookies.load('site-lang')]} />
            </List>
            <Divider />
        </div>
    )
}

export default Sys1List;