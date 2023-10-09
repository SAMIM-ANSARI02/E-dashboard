import React from 'react'
import {Link,json} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Nav=()=>{
  
    const auth=localStorage.getItem("user");
    const navigate=useNavigate()
    const Logout=()=>{
        localStorage.clear()
        navigate('/signup')
    }
    return(
        <div className='nav'>
            <img className='logo' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB0BwpcUPAu9WH5bOICKbpExWFUk4nExbc1g&usqp=CAU" alt="" />
            {
                auth ? <ul className='nav-ul'>
                <li><Link to='/'>Products</Link></li>
                <li><Link to='/add'>Add Product</Link></li>
                <li><Link to='/update'>Update Products</Link></li>
               
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link onClick={Logout} to='/signup'>Logout ({JSON.parse(auth).name}) </Link></li>
                </ul>
                :
                <ul className='nav-right'>
                      <li><Link to='/'>SignUp</Link></li>
                      <li> <Link to='/login'>Login</Link></li>
                </ul>

            }
            
               



        </div>
    )
}

export default Nav;