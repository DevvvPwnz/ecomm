import React from 'react'

import ProductsNav from '../components/ProductsNav'
import ProductsItem from '../components/ProductsItem'
import useFirestore from '../hooks/useFirestore'


function Products({setItem}){

  const { items} = useFirestore('products')
  const [activeSort,setActiveSort] = React.useState(null)

  let sortItems = null;
  
  if(activeSort){
    sortItems = items.filter(item => item.brand === activeSort)
    
  }
    return( 
         <div className='container'>
            <section className="products">
            <ProductsNav sortBy={items} sortCategory={setActiveSort} activeSort={activeSort}/>
            <ProductsItem products={activeSort ? sortItems : items} setItem={setItem}/>
          </section>
         </div>
    
    )
}


export default Products