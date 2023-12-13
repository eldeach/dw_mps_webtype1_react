// ======================================================================================== [Import Libaray]
import { useNavigate } from 'react-router-dom';

// ======================================================================================== [Import Material UI Libaray]  
import { ListItemButton, ListItemIcon, ListItemText, ListItem  } from '@mui/material/';

// ======================================================================================== [Import Component] js


// ======================================================================================== [Import Component] CSS


function ListItemNavPath(props) {
    return (
        <div>
            <ListItem disablePadding={true}>
                <ListItemButton href = {props.navPath}>
                    <ListItemIcon> {props.icon}</ListItemIcon>
                    <ListItemText primary={<div style={{fontSize:'13px'}}>{props.text}</div>} />
                </ListItemButton>
            </ListItem>
        </div>
    )

}

export default ListItemNavPath;


