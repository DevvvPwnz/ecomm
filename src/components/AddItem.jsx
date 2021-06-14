import React from "react";
import {
  makeStyles 
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import CloseIcon from '@material-ui/icons/Close';

import ProgressBar from "../components/ProgressBar";
import Input from '../components/Input'
import InputFile from '../components/InputFile'
import { Link } from "react-router-dom";


const useStyles = makeStyles({
  btnIcon: {
    color: "grey",
  },
  btn:{
      backgroundColor:"#2d9079",
      color:"#fff",
      "&:hover": {
        color: "yellow",
        backgroundColor:"#2d9079"
       },
  },
  selected: {
    backgroundColor:"#fff"
  }
});

function AddItem() {
  const classes = useStyles();

  const [file, setFile] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [price, setPrice] = React.useState(null);
  const [brand, setBrand] = React.useState(null);
  const [prevImg, setPrevImg] = React.useState(null);
  const [form, setForm] = React.useState(false);
  const [added, setAdded] = React.useState(false);
 
  const [error, setError] = React.useState(null);

  const types = ["image/png", "image/jpeg"];

  const changeHandler = (e) => {
    let selected = e.target.files[0];
  
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");

      const reader = new FileReader();
      reader.onload = (ev) => {
        setPrevImg(ev.target.result);
      }
      reader.readAsDataURL(selected);
    } else {
      setFile(null);
      setError("Please select an image file ( png /jpeg)");
    }
  };

  const formHandler = (e) => {
    setForm(true);
    e.preventDefault();
    e.target.reset();
  };

  const changeHandlerInput = (e) => {
    let input = e.target;

    switch (input.name) {
      case "item__name": {
        setName(input.value);
        break;
      }
      case "item__price": {
        setPrice(input.value);
        break;
      }

      case "item__brand": {
        setBrand(input.value);
        break;
      }

      default:
    }
  };

  const closeAddedMsg = ()=>{
    setAdded(false)
  }

  return (
    <div className="container">
    <section className="add__item">

     <div className="add__item-close">
     <Link to="/products" ><CloseIcon fontSize="large" /></Link>
     </div>
      
      <form
        onSubmit={formHandler}
        className="add__item-form"
        autoComplete="off"
      >
        
       <Input name={"name"}  onChange={changeHandlerInput}/>
       <Input name={"brand"} onChange={changeHandlerInput}/>
       <Input name={"price"}  onChange={changeHandlerInput}/>
       <InputFile  onChange={changeHandler}/>

       <div className="item__img">
              {prevImg && <img src={prevImg} alt=""/>}
            </div>

        <Button
        variant="outlined"
        classes={{root:classes.btn}}
        endIcon={ < AddToPhotosIcon/>}
        type="submit"

      >
        ADD ITEM
      </Button>

        <div className="item__info">
          {error && error}
          {form && file.name}
          {form && (
            <ProgressBar
              file={file}
              setForm={setForm}
              setAdded={setAdded}
              setPrev={setPrevImg}
              name={name}
              brand={brand}
              price={price}
            />
          )}
        </div>
       {added && 
        <div className="item__added">
        <div className="item__added-text">
        Item Added
        </div>
        <div className="item__added-icon" onClick={closeAddedMsg}>
          <CloseIcon/>
        </div>
      </div>
      }
      </form>
    </section>
    </div>
  );
}

export default AddItem;
