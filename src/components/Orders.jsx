import React from "react";
import {Context} from '../index'
import useFetchFirestore from "../hooks/useFetchFirestore";
import useFirestore from "../hooks/useFirestore";

import ShopIcon from '@material-ui/icons/Shop';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';

import {
  makeStyles 
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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



function Orders() {
  const classes = useStyles();

  const {firestore,timestamp} = React.useContext(Context)

  const { totalMoney, totalOrders } = useFetchFirestore("newOrders");

  const { items } = useFirestore("newOrders")

  const [chekedAll,setChekedAll] = React.useState('')

  const [selectedItems, setSelectedItems] = React.useState([]);


  const onSelectItem = (order) => {
         

      if(!selectedItems.includes(order)){
        setSelectedItems([...selectedItems,order])
      }else{
         const filteredItems = selectedItems.filter(item => item.name !== order.name)

         setSelectedItems([...filteredItems])
         setChekedAll(false)
      }
   
  };

  const onSelectAll = () => {
    
     setChekedAll(true)
     setSelectedItems([...items])
     
     if(chekedAll){
      setSelectedItems([])
      setChekedAll('')
     }

  }

  const addToFirebaseCompelete = () => {

    const collection = firestore.collection('orders')

    selectedItems.forEach(item=>{

  firestore.collection('newOrders').doc(item.id).delete()

   const createdAt = timestamp()
          collection.add({
             name:item.name,
             price:item.price,
             item:item.item,
             createdAt

          })
    })

   
  }

 const cancelBtn = () =>{
   setSelectedItems([])
   if(chekedAll){
     setChekedAll('')
   }
 }


  return (
    <section className="orders">
      <div className="cards">
        <div className="card">
          <div className="card__title">New Orders</div>
          <ShopIcon/>
          <div className="card__subtitle">{totalOrders}</div>
          <div className="card__decor"></div>
        </div>

        <div className="card">
          <div className="card__title">Total Sum($)</div>
          <LocalAtmIcon/>
          <div className="card__subtitle">{totalMoney}$</div>
          <div className="card__decor"></div>
        </div>
       
      </div>

      <div className="container">
      <div className="orders__select">
        {selectedItems.length > 0 && (
          <div className="orders__info">
            <div className="orders__text">Selected {selectedItems.length} item</div>

            <div className="orders__btns">
              <Button
                classes={{ root: classes.btn }}
                variant="contained"
                color="primary"
                onClick={addToFirebaseCompelete}
              >
                Comleted
              </Button>
              <Button
                className="orders__btn"
                variant="contained"
                color="secondary"
                onClick={cancelBtn}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
           </div>
        <div className="orders__grid">
          <div className="grid__header">
            <div className="grid__element grid__element-checkbox">
              <input type="checkbox" onChange={onSelectAll} checked={chekedAll ? true : false} />
            </div>
            <div className="grid__element grid__element-header">name</div>
            <div className="grid__element grid__element-header">price</div>
            <div className="grid__element grid__element-header">item</div>
          </div>

           {items && items.map(item=>(
              <div className="grid__row" key={item.name}>
              <div className="grid__element grid__element-checkbox">
                <input
                  type="checkbox"
                  name={item.name}
                  onChange={()=>onSelectItem(item)}
                  checked={selectedItems.includes(item) ? true : false}
                />
              </div>
              <div className="grid__element grid-name">{item.name}</div>
              <div className="grid__element">{item.price}$</div>
              <div className="grid__element">{item.item}</div>
            </div>
           ))}
  
        </div>
      </div>
    </section>
  );
}

export default Orders;
