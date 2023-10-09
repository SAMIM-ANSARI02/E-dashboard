import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Productlist = () => {
    const[product,setproduct]=useState([]);

    useEffect(()=>{
     Getproduct();
    },[])

    const Getproduct=async()=>{
         let result=await fetch('http://localhost:5000/product',{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
         });
         result=await result.json()
         setproduct(result)
    }
   const handledelete=async(id)=>{
      let result=await fetch(`http://localhost:5000/product/${id}`,{
        
            
         
        method:'delete',
        headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
       result=await result.json()
       if(result){
        Getproduct();
       }
   }

   const handlechange=async(e)=>{
   
    let key=e.target.value;
    if(key){
        let result=await fetch(`http://localhost:5000/search/${key}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
         })
        result=await result.json()
        if(result){
            setproduct(result)
        }
    }else{
        Getproduct();
    }
  
   }

   


  return (
    
    <div className="productlist">
        <h3>Product-List</h3>
        <input type="text" placeholder='search box...' className='search' onChange={handlechange}/>
        <ul>
            <li>S.no</li>
            <li>name</li>
            <li>price</li>
            <li>category</li>
            <li>operation</li>
            <li>update op.</li>
            
            
        </ul>
       {
        product.length>0?product.map((item,index)=>
        <ul key={item._id}>
            <li>{index+1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li><button onClick={()=>handledelete(item._id)}>delete</button></li>
            <li><Link to={`/update/${item._id}`}><button>update</button></Link></li>

            
        </ul>
      
      
        )
        :
        <h1>Result not Found!</h1>
       }
        
    </div>

    
    
  )
}

export default Productlist