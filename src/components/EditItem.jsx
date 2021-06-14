import React from "react";
import useFirestore from "../hooks/useFirestore";
import { Context } from "../index";
import { Link } from "react-router-dom";

import InputFile from "../components/InputFile";
import Input from "../components/Input";

import Button from "@material-ui/core/Button";
import {
  makeStyles 
} from "@material-ui/core/styles";
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  btnIcon: {
    color: "grey",
  },
  btn:{
      backgroundColor:"#2d9079",
      "&:hover": {
        color: "yellow",
        backgroundColor:"#2d9079"
       },
       "&.Mui-disabled" : {
        backgroundColor:"gray"
       }
  },
  selected: {
    backgroundColor:"#fff"
  },
 
});



function EditItem({ id }) {
  const classes = useStyles();

  const { items } = useFirestore("products");

  const { projectStorage, firestore } = React.useContext(Context);

  const filteredItems = items.filter((item) => item.id === id);

  // get current image file name ref for delete from firebase
  const [currentFile, setCurrentFile] = React.useState(null);
  let defaultImageName;
  filteredItems.forEach((item) => (defaultImageName = item.imageName));

  // current value form
  const nameRef = React.useRef();
  const brandRef = React.useRef();
  const priceRef = React.useRef();
  const urlRef = React.useRef();
  // changed value
  const [file, setFile] = React.useState(null);
  const [form, setForm] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [prevImg, setPrevImg] = React.useState(null);
  const [activeBtn, setActiveBtn] = React.useState(null);
  const [deletePrevItem, setDeletePrevItem] = React.useState(null);

  // onChange event input
  const changeHandler = (e) => {
    let input = e.target;
    setActiveBtn(true);
    if (input) {
      switch (input.name) {
        case "item__name": {
          nameRef.current.value = input.value;
          break;
        }
        case "item__price": {
          priceRef.current.value = input.value;
          break;
        }

        case "item__brand": {
          brandRef.current.value = input.value;
          break;
        }

        default:
      }
    }
  };

  // onChange event input file
  const types = ["image/png", "image/jpeg"];

  const changeHandlerFile = (e) => {
    let selected = e.target.files[0];
    setActiveBtn(true);

    if (selected && types.includes(selected.type)) {
      getUrl(selected);
      setError("");

      const reader = new FileReader();

      reader.onload = (ev) => {
        setPrevImg(ev.target.result);
      };
      reader.readAsDataURL(selected);
    } else {
      setFile(null);
      setError("Please select an image file ( png /jpeg)");
    }
  };

  // onSubmit Form
  const FormHandler = (e) => {
    const name = nameRef.current.childNodes[0].childNodes[0].value;
    const brand = brandRef.current.childNodes[0].childNodes[0].value;
    const price = priceRef.current.childNodes[0].childNodes[0].value;
    let currentUrl = null;
    let currentName = null;

    if (file) {
      currentUrl = file;
      currentName = currentFile;
    } else {
      currentUrl = urlRef.current.src;
      currentName = defaultImageName;
    }

    updateDate(name, brand, price, currentUrl, currentName);
    setForm(true);
    e.preventDefault();
    e.target.reset();
  };
  // get image url before update firebase
  const getUrl = (file) => {
    const storageRef = projectStorage.ref(file.name);
    storageRef.put(file).then(async (result) => {
      const url = await storageRef.getDownloadURL();
      setFile(url);
      setCurrentFile(file.name);
      setDeletePrevItem(true);
    });
  };
  // update firebase
  const updateDate = (name, brand, price, url, currentName) => {
    const collection = firestore.collection("products");
    //delete prev img
    if (deletePrevItem) {
      const newStorage = projectStorage.ref();
      newStorage.child(`${defaultImageName}`).delete();
      setDeletePrevItem(false);
    }
    // update database
    collection.doc(id).update({
      name,
      brand,
      price,
      url,
      imageName: currentName,
    });
  };

  return (
    <div className="edit__item">
      <div className="add__item-close">
     <Link to="/products" ><CloseIcon fontSize="large" /></Link>
     </div>

      {filteredItems &&
        filteredItems.map((item) => (
          <form className="add__item-form" autoComplete="off" onSubmit={FormHandler} key={item.id}>
           
            <label htmlFor="item__name">Name</label>

            {/* <input
              name="item__name"
              type="text"
              ref={nameRef}
              defaultValue={item.name}
              onChange={changeHandler}
            /> */}

            <Input
              name={"name"}
              refVal={nameRef}
              defVal={item.name}
              onChange={changeHandler}
            />

            <label htmlFor="item__brand">Brand</label>
            <Input
              name={"brand"}
              refVal={brandRef}
              defVal={item.brand}
              onChange={changeHandler}
            />

            {/* <input
              name="item__brand"
              type="text"
              ref={brandRef}
              defaultValue={item.brand}
              onChange={changeHandler}
            /> */}

            <label htmlFor="item__price">Price</label>
            <Input
              name={"price"}
              refVal={priceRef}
              defVal={item.price}
              onChange={changeHandler}
            />

            {/* <input
              name="item__price"
              type="number"
              ref={priceRef}
              defaultValue={item.price}
              onChange={changeHandler}
            /> */}

            {/* <input name="item__file" type="file" onChange={changeHandlerFile} /> */}

            <InputFile onChange={changeHandlerFile} />
            <div className="item__img">
              {prevImg ? (
                <img src={prevImg} alt="" />
              ) : (
                <img ref={urlRef} src={item.url} alt="" />
              )}
            </div>

            <Button
              disabled={!activeBtn ? true : false}
              variant="outlined"
              classes={{ root: classes.btn }}
              endIcon={<SaveAltIcon />}
              type="submit"
              size="large"
            >
              SAVE
            </Button>

            <div className="item__info">
              {form && <div> Data updated <DoneAllIcon/></div>}
              {error && error}
              
            </div> 
          </form>
        ))}
    </div>
  );
}

export default EditItem;
