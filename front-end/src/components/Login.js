import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const[email,setemail]=React.useState('')
    const[password,setpassword]=React.useState('')
    const navigate=useNavigate();

    useEffect(()=>{
        const auth=localStorage.getItem('user')
        if(auth){
            navigate('/')
        }
    })

    const loginhandle=async()=>{
        let result=await fetch('http://localhost:5000/login',
        {
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        result=await result.json();
        console.log(result)
        if(result.auth){
           localStorage.setItem("user",JSON.stringify(result.user));
           localStorage.setItem("token",JSON.stringify(result.auth));
           navigate('/')
        }else{
            alert("please enter correct info")
        }
    }
  return (
    <div className="register">
      <div>
        <h1>Login</h1>
        <input
          className="input"
          type="text"
          placeholder="Enter your Email"
          onChange={(e)=>setemail(e.target.value)}
          value={email}
         
        />
      
        <input
          className="input"
          type="text"
          placeholder="Enter your Password"
          onChange={(e)=>setpassword(e.target.value)}
          value={password}
      
        />
        <button className="btn" onClick={loginhandle} >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
