import React from 'react'
import { useNavigate } from 'react-router-dom'

 const AddProduct=()=>{
    const[name,setname]=React.useState('')
    const[price,setprice]=React.useState('')
    const[category,setcategory]=React.useState('')
    const[brand,setbrand]=React.useState('')
    const[err,seterr]=React.useState(false)

    const navigate=useNavigate()
    const Addhandle=async()=>{
        if(!name ||!price||!category||!brand){
            // console.log(!name)
            seterr(true)
            return false;
          
        }
        navigate('/')
        

        // console.log(name,price,category,brand)
        const userId=JSON.parse(localStorage.getItem('user'))._id;
          let result=await fetch('http://localhost:5000/add-product',{
            method:'post',
            body:JSON.stringify({name,price,category,brand,userId}),
            headers:{"Content-Type":"application/json",authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`}

          })
       result=await result.json();
       console.log(result)
    }
      

    return(
        <div className='product'>
            <h1>Add product</h1>
            <input type="text" placeholder='Enter Product name' onChange={(e)=>setname(e.target.value)} value={name} />
            {err && !name &&<span className='valid-input'>Enter valid Name</span>}

            <input type="text" placeholder='Enter Product price' onChange={(e)=>setprice(e.target.value)} value={price} />
            {err && !price&& <span className='valid-input'>Enter valid price</span>}

            <input type="text" placeholder='Enter Product category' onChange={(e)=>setcategory(e.target.value)} value={category} />
            {err && !category &&<span className='valid-input'>Enter valid category</span>}

            <input type="text" placeholder='Enter Product brand'  onChange={(e)=>setbrand(e.target.value)} value={brand}/>
            {err&& !brand && <span className='valid-input'>Enter valid brand</span>}

            <button onClick={Addhandle}>Add Product</button>
        </div>
    )
 }

 export default AddProduct;