import { createTheme } from '@mui/material/styles';

const globalTheme = createTheme({
  typography: {
    fontFamily : 'sans-serif',
    button : {
      textTransform : 'none'
    },
  },  
  status : {
    danger : '#e53e3e',
  },
  palette : {
    sys1 : {
        main : '#3f50b5',
        darker : '#002884',
        contrastText : '#fff',
    },
    sys2 : {
        main : '#0971f1',
        darker : '#053e85',
        contrastText : '#fff',
    },
    sys3 : {
      main : '#0971f1',
      darker : '#053e85',
      contrastText : '#fff',
    },
    sys4 : {
      main : '#0971f1',
      darker : '#053e85',
      contrastText : '#fff',
    },
    sys5 : {
      main : '#0971f1',
      darker : '#053e85',
      contrastText : '#fff',
    },
    sys6 : {
      main : '#0971f1',
      darker : '#053e85',
      contrastText : '#fff',
    },
    sys7 : {
      main : '#0971f1',
      darker : '#053e85',
      contrastText : '#fff',
    },
    avmFold : {
      main : '#3d5afe',
      contrastText : '#fff',
    },
    white :{
      main : '#fff',
    },
    start : {
      main : '#00e5ff',
      contrastText : '#fff',
    },
    accepted : {
      main : '#76ff03',
      contrastText : '#fff',
    },
    inProgress : {
      main : '#00bcd4',
      contrastText : '#fff',
    },
    prepared : {
      main : '#1e88e5',
      contrastText : '#fff',
    },
    withdrawn : {
      main : '#3e2723',
      contrastText : '#fff',
    },
    denied : {
      main : '#e53e3e',
      contrastText : '#fff',
    },
    recording : {
      main : '#ff0048',
      contrastText : '#fff',
    },
    submitted : {
      main : '#00e242',
      contrastText : '#fff',
    }
  },
});

export default globalTheme;