import React from 'react'

import {
    makeStyles,
    MuiThemeProvider,
    createMuiTheme,
  } from "@material-ui/core/styles";
  import IconButton from "@material-ui/core/IconButton";
  import PhotoCamera from "@material-ui/icons/PhotoCamera";
  

  const theme = createMuiTheme({
    overrides: {
      MuiIconButton: {
        root: {
          "&:hover": {
           color: "#fff",
          },
        },
      },
    },
  });
  
  const useStyles = makeStyles({
    btnIcon: {
      color: "grey",
      display: "flex"
    },
    btn:{
        backgroundColor:"#2d9079",
        "&:hover": {
          color: "yellow",
          backgroundColor:"#2d9079"
         },
    },
    selected: {
      backgroundColor:"#fff"
    }
  });

function InputFile({ onChange}) {
    const classes = useStyles();
    
    return (

        <div className="upload__file">
             <label className="input__label" htmlFor="input__file">
         
         <MuiThemeProvider theme={theme}>
           <IconButton
             classes={{ root: classes.btnIcon, hover: classes.focused }}
             aria-label="upload picture"
             component="span"
           >
             <div className="input__upload"> Upload</div>
             <PhotoCamera />
           </IconButton>
         </MuiThemeProvider>
       </label>

       <input
         className="input__file"
         id="input__file"
         name="item__file"
         type="file"
         onChange={onChange}
       />
        </div>
      


    )
}

export default InputFile
