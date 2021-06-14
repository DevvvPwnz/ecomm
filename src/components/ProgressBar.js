import React from 'react'
import useStorage from '../hooks/useStorage'

const ProgressBar = ({file,setForm,name,price,brand,setAdded,setPrev})=> {

    const {url, progress} = useStorage(file,name,price,brand)

    React.useEffect(()=>{
       if(url){
           setForm(false)
           setPrev(false)
           setAdded(true)

       }

    },[url,setForm])

    return (
        <div className="progress__bar" style={{width:progress + 'px'}}>
           
        </div>
    )
}

export default ProgressBar
