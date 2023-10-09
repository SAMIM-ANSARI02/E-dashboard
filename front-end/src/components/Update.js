import React, { useEffect } from 'react'
import { useNavigate,useParams } from 'react-router-dom'

const Update = () => {
    const[name,setname]=React.useState('')
    const[price,setprice]=React.useState('')
    const[category,setcategory]=React.useState('')
    const[brand,setbrand]=React.useState('')
    const[err,seterr]=React.useState(false)
    const params=useParams();
    const navigate=useNavigate()
    useEffect(()=>{
       getUpdadte()
    },[])
    
    const  getUpdadte=async()=>{
        let result= await fetch(`http://localhost:5000/product/${params.id}`,{
         headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
        })
           result= await result.json();
           setname(result.name)
           setprice(result.price)
           setcategory(result.category)
           setbrand(result.brand)
        }
     const updateproduct=async()=>{
         let result=await fetch(`http://localhost:5000/product/${params.id}`,{
            
            method:'put',
            body:JSON.stringify({name,price,category,brand}),
            headers:{
                'Content-Type':'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
         })
         console.log(result)
         navigate('/')
     }

   
  return (
    <div className='product'>
    <h1>Update product</h1>
    <input type="text" placeholder='Enter Product name' onChange={(e)=>setname(e.target.value)} value={name} />

    <input type="text" placeholder='Enter Product price' onChange={(e)=>setprice(e.target.value)} value={price} />

    <input type="text" placeholder='Enter Product category' onChange={(e)=>setcategory(e.target.value)} value={category} />

    <input type="text" placeholder='Enter Product brand'  onChange={(e)=>setbrand(e.target.value)} value={brand}/>

    <button onClick={updateproduct}>update</button>
</div>
)
  
}

export default Update