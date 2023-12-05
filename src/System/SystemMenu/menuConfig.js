
import Sys1List from './Menu/Sys1List/Sys1List'
import Sys2List from './Menu/Sys2List/Sys2List'

const menuConfig = {
    sys1 : {
        name : 'Mother Site',
        menu : Sys1List,
    },
    sys2 : {
        name : 'AVM',
        menu : Sys2List,
    },
    sys3 : {
        name : 'System 3',
        menu : Sys1List,
    },
    sys4 : {
        name : 'System 4',
        menu : Sys1List,
    },
    sys5 : {
        name : 'System 5',
        menu : Sys1List,
    },
    sys6 : {
        name : 'System 6',
        menu : Sys1List,
    },
    sys7 : {
        name : 'System 7',
        menu : Sys1List,
    },
}

export default menuConfig;