import React from 'react'
import {Context} from '../index'

const useFetchFirestore = (collection) => {

    const {firestore} = React.useContext(Context)

    const [totalMoney,setTotalMoney]=React.useState('')
    const [totalOrders,setTotalOrders]=React.useState('')
    const [items,setItems] =React.useState([])
    const [pushMsg,setPushMsg] =React.useState(false)



    React.useEffect(()=>{
        const unsub = firestore.collection(collection)
         .onSnapshot((snap)=>{
           let orders = []
   
           snap.forEach((doc)=>{
               orders.push({...doc.data(),id:doc.id})
              
           })
           setItems(orders)
           setTotalOrders(orders.length)
           totalSum(orders)
           setPushMsg(true)
   
         })
          
          return ()=> unsub()
   
       },[collection])
     

    const totalSum = (arr)=>{
      setTotalMoney(arr.reduce((sum,item)=>item.price + sum,0)) 
    }
  
    return {totalMoney,totalOrders,items,pushMsg,setPushMsg}
}

export default useFetchFirestore
