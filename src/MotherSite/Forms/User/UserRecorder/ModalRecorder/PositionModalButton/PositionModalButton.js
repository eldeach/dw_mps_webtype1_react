// ======================================================================================== [Import Libaray]
import { useState } from 'react';
import { Formik } from 'formik';
import cookies from 'react-cookies'
import * as yup from 'yup';

// ======================================================================================== [Import Material UI Libaray]
import { Button, IconButton, Modal, Paper, TextField } from '@mui/material';
//icon
import ClearIcon from '@mui/icons-material/Clear';
import WorkIcon from '@mui/icons-material/Work';

// ======================================================================================== [Import Component] js
import positionModalButtonLang from './positionModalButtonLang.js'


// ======================================================================================== [Import Component] CSS


function AddPosition(props){

    const style = {
        subtitle:{
            box : {
                display:'flex', flexDirection:'row', alignItems:'center', fontSize:'medium'
            },
            text : {
                marginTop:'4px', marginLeft:'2px'
            }
        },
        paper : {
            width:500,
            p: 2,
            mb:2
        },
        popup : {
            paper : {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: 24,
                p: 2,
            },
        },
        inputTexstField : {
            fontSize: 14,
            paddingRight:0
        }
    }

    const yupSchema = yup.object().shape({

        job_position: yup.string()
        .required(positionModalButtonLang.inputField.job_position.valMsg.required[cookies.load('site-lang')]), // 필수 입력 필드
      });

    const initialValues = {
        job_position: '',
        job_team: '',
        job_company: '',
        job_description : ''
    }

    const [popup,setPopup] = useState(0);
    const handleModalClose = () => setPopup(0);

    const arrAddElement = function (arr, newElement) {
        let duplication = 0
        let tempArr = [...arr];
        tempArr.map((oneItem, index) => {
            if(oneItem[Object.keys(oneItem)[0]] === newElement[Object.keys(newElement)[0]]){
                duplication += 1;
            }
        })
        if (duplication === 0){
            tempArr.push(newElement);
        }
        else {
            alert(positionModalButtonLang.alertMsg.duplicated[cookies.load('site-lang')])
        }
        return tempArr;
    };

    return(
        <Formik
        validationSchema={yupSchema}
        initialValues={initialValues}
        onSubmit={(values, actions)=>{
            props.updateValue ( arrAddElement( props.inheritedArr, values ) )
            actions.resetForm()
            handleModalClose()
        }}
        >
            {formikProps => (
                <div>
                <Button fullWidth variant="outlined" color = 'sys1' size="small" onClick={()=>setPopup(1)}>ADD</Button>
                <Modal open={(popup === 1)} onClose={handleModalClose}>
                    <Paper sx={style.popup.paper} elevation={3}>
                        <div className = "popup-close-button-box"><button className='popup-close-button' onClick={handleModalClose}>X</button></div>
                            <form
                            noValidate
                            style={{width: '400px', display:'flex', flexDirection:'column', alignItems:'center'}}
                            id = "addPosition"
                            autoComplete='off'
                            onSubmit={formikProps.handleSubmit}
                            >
                                <div style={style.subtitle.box}>
                                    <WorkIcon color='sys1'/>
                                    <div style={style.subtitle.text}>Add Position Information</div>
                                </div>
                                <TextField
                                required
                                variant="outlined"
                                id="job_position"
                                name="job_position"
                                label={positionModalButtonLang.inputField.job_position.placeholder[cookies.load('site-lang')]}
                                value={formikProps.values.job_position}
                                onChange={formikProps.handleChange}
                                onBlur={formikProps.handleBlur}
                                helperText={formikProps.touched.job_position ? formikProps.errors.job_position : ""}
                                error={formikProps.touched.job_position && Boolean(formikProps.errors.job_position)}
                                size='small'
                                margin="dense"
                                fullWidth
                                InputProps={{
                                    endAdornment:(
                                        <IconButton size='small' onClick={()=>{formikProps.setFieldValue('job_position','')}}>
                                            <ClearIcon size='small'/>
                                        </IconButton>
                                    ),
                                    style: style.inputTexstField // font size of input text
                                }}
                                InputLabelProps={{style: style.inputTexstField}} // font size of input label
                                />
                                <TextField
                                required
                                variant="outlined"
                                id="job_team"
                                name="job_team"
                                label={positionModalButtonLang.inputField.job_team.placeholder[cookies.load('site-lang')]}
                                value={formikProps.values.job_team}
                                onChange={formikProps.handleChange}
                                onBlur={formikProps.handleBlur}
                                helperText={formikProps.touched.job_team ? formikProps.errors.job_team : ""}
                                error={formikProps.touched.job_team && Boolean(formikProps.errors.job_team)}
                                size='small'
                                margin="dense"
                                fullWidth
                                InputProps={{
                                    endAdornment:(
                                        <IconButton size='small' onClick={()=>{formikProps.setFieldValue('job_team','')}}>
                                            <ClearIcon size='small'/>
                                        </IconButton>
                                    ),
                                    style: style.inputTexstField // font size of input text
                                }}
                                InputLabelProps={{style: style.inputTexstField}} // font size of input label
                                />
                                <TextField
                                variant="outlined"
                                id="job_company"
                                name="job_company"
                                label={positionModalButtonLang.inputField.job_company.placeholder[cookies.load('site-lang')]}
                                value={formikProps.values.job_company}
                                onChange={formikProps.handleChange}
                                onBlur={formikProps.handleBlur}
                                helperText={formikProps.touched.job_company ? formikProps.errors.job_company : ""}
                                error={formikProps.touched.job_company && Boolean(formikProps.errors.job_company)}
                                size='small'
                                margin="dense"
                                fullWidth
                                InputProps={{
                                    endAdornment:(
                                        <IconButton size='small' onClick={()=>{formikProps.setFieldValue('job_company','')}}>
                                            <ClearIcon size='small'/>
                                        </IconButton>
                                    ),
                                    style: style.inputTexstField // font size of input text
                                }}
                                InputLabelProps={{style: style.inputTexstField}} // font size of input label
                                />
                                <TextField
                                variant="outlined"
                                id="job_description"
                                name="job_description"
                                label={positionModalButtonLang.inputField.job_description.placeholder[cookies.load('site-lang')]}
                                value={formikProps.values.job_description}
                                onChange={formikProps.handleChange}
                                onBlur={formikProps.handleBlur}
                                helperText={formikProps.touched.job_description ? formikProps.errors.job_description : ""}
                                error={formikProps.touched.job_description && Boolean(formikProps.errors.job_description)}
                                size='small'
                                margin="dense"
                                fullWidth
                                InputProps={{
                                    endAdornment:(
                                        <IconButton size='small' onClick={()=>{formikProps.setFieldValue('job_description','')}}>
                                            <ClearIcon size='small'/>
                                        </IconButton>
                                    ),
                                    style: style.inputTexstField // font size of input text
                                }}
                                InputLabelProps={{style: style.inputTexstField}} // font size of input label
                                />
                                <Button sx={{mt:1}} fullWidth variant="contained" color = 'sys1' size="small" type="submit" form="addPosition">ADD</Button>
                            </form>
                        </Paper>
                    </Modal>
                </div>
            )}
        </Formik>
    )

}

export default AddPosition;