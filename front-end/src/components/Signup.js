import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if(auth) {
      navigate("/");
    }
  });

  const collection = async () => {
    // console.log(name,email,password)
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));
    navigate('/')
  };
  return (
    <div className="register">
      <div>
        <h1>Register</h1>
        <input
          className="input"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <input
          className="input"
          type="text"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          className="input"
          type="text"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <button className="btn" onClick={collection}>
          Signup
        </button>
      </div>
    </div>
  );
};

export default Signup;
