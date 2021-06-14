import React from 'react'

import {
    withStyles,
  } from "@material-ui/core/styles";
  import TextField from "@material-ui/core/TextField";

  
  const InputField = withStyles({
    root: {
      "& .MuiInput-root": {
        color: "#fff",
        margin: "10px",
      },
      "& .MuiInputBase-input":{
        color:"#e4d420;",
        borderBottom:"1px solid",
        textAlign:"center"
      },
      "& label.Mui-focused": {
        color: "#e4d420",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#2d9079",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "red",
        },
        "&:hover fieldset": {
          borderColor: "yellow",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#e4d420",
        },
      },
    },
  })(TextField);

function Input({ name,onChange,defVal = null , refVal = null}) {

     let placeHolder = name.split('')
     placeHolder[0] = placeHolder[0].toUpperCase()
     placeHolder = placeHolder.join('')
    
    
    return ( 
        <InputField
          name={`item__${name}`}
          placeholder={placeHolder}
          inputProps={{ "aria-label": "description" }}
          required
          onChange={onChange}
          defaultValue={defVal ? defVal : ''}
          ref={refVal ? refVal : null}
        />
    )
}



export default Input
