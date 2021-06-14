import React from 'react'
import {Context} from '../index'

const useFirestore = (collection) => {

    const {firestore} = React.useContext(Context)

    const [items,setItems] =React.useState([])
     
    React.useEffect(()=>{
     const unsub = firestore.collection(collection)
      .orderBy('createdAt','desc')
      .onSnapshot((snap)=>{
        let products = []

        snap.forEach((doc)=>{
            products.push({...doc.data(),id:doc.id})
           
        })
        setItems(products)

      })
       
       return ()=> unsub()

    },[collection])
  
    return {items}
}

export default useFirestore
