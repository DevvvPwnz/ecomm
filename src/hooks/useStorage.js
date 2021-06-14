import React from 'react'
import {Context} from '../index'

const useStorage = (file,name,price,brand)=> {
    const {projectStorage,firestore,timestamp} = React.useContext(Context)

    const [progress,setProgress]  = React.useState(0)
    const [error,setError]  = React.useState(null)
    const [url,setUrl]  = React.useState(null)

   React.useEffect(()=>{
      const storageRef = projectStorage.ref(file.name)
      const collection = firestore.collection('products')

      storageRef.put(file).on('state_changed', (snap)=>{
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100

          setProgress(percentage)
      }, (err)=>{
          setError(err)
      },async ()=>{
          const url = await storageRef.getDownloadURL()
          const createdAt = timestamp()
          collection.add({
              name,
              price,
              brand,
              url,
              createdAt,
              imageName:file.name,


          })
          setUrl(url)
      })

   },[file])

   return { progress,url,error }
}

export default useStorage
