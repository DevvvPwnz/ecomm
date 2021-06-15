import React from 'react'
import { Link } from 'react-router-dom'
import { Context } from "../index";

import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


function ProductsItem({products,setItem}) {
  const { projectStorage, firestore} = React.useContext(Context);

  const clickHandler = (id) => {
   setItem(id)
  }
  const deleteItem = (id,imageName) => {
    alert("In test mode you can add/edit items")
  
  // if (window.confirm('Are you sure you want to delete this item?')) {
  //   firestore.collection('products').doc(id).delete()
  
  //   const newStorage = projectStorage.ref()
  //    newStorage.child(imageName).delete()
  // }g

   }
  
  
    return (
   
    <div className='product__cards'>
        
    {products && products.map((product) => (
            <div className='product__card' key={product.id}>
             <Link to="/edit_item" className="product__edit" onClick={()=>clickHandler(product.id)}> <EditIcon fontSize="large" /></Link>
            <div className='product__card-img'><img src={product.url} alt=""/></div>
            <div className='product__card-title'>{product.name}</div>
            <div className='product__card-price'>{product.price} $</div>
            <div className='product__card-delete' onClick={()=>deleteItem(product.id,product.imageName)}><DeleteForeverIcon  fontSize="large" /> </div>

            <div className="product__card-menu">

            </div>
            
            </div>
          ))}
            
        </div>
    )
}

export default ProductsItem
