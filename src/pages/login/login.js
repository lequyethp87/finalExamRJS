import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios"
import "./login.css"
const Login = () => {
  const [user,setUser] = useState({
    userName:"",
    password:""
  })
  const [errorMessage,setErrorMessage] = useState("")
  const [isActive, setIsActive] = useState(true);
  const _handleOnchange =(e) =>{
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }
  const _handleOnKeyDown = (e) =>{
    if(e.key === "Enter"){
      sendLogin()
    }
  }
  const sendLogin = async () =>{
    try {
      const result = await Axios.post("http://localhost:8888/api/auth/signin", {
        username: user.userName,
        password:user.password
      });
      if (result.data.status === "ACTIVE"){
        localStorage.setItem("TOKEN", result.data.token);
        localStorage.setItem("ROLE", result.data.role);
        localStorage.setItem("USERNAME", result.data.username);
        // console.log(result);
        // console.log(user);
        window.location.replace("/home");
      }else{
        setIsActive(false);
        setErrorMessage("")
      }
    } catch (error) {
      setIsActive(true)
      setErrorMessage("Login failed")
      console.log(error);

    }
    
  }
  return (
    <div className="container">
      <div className="login">
        <p style={{ color: "red", fontWeight: 500 }}>
          {isActive ? (
            <br></br>
          ) : (
            "Please confirm your account with a confirmation link before login "
          )}
        </p>
        <i className="fa fa-unlock-alt" aria-hidden="true"></i>

        <h2>Login</h2>
        <input
          name="userName"
          placeholder="User Name"
          onChange={_handleOnchange}
        ></input>
        <input
          name="password"
          placeholder="Password"
          onKeyDown={_handleOnKeyDown}
          onChange={_handleOnchange}
          type="password"
        ></input>
        <p style={{ color: "red" }}>{errorMessage}</p>
        <button style={{ cursor: "pointer" }} onClick={sendLogin}>
          Login
        </button>
        <p>
          Don't have an account yet?
          <Link to={"/signup"}>SignUp now</Link>
        </p>
        <p>
          <Link to={"/reset-password"}>Forget password</Link>
        </p>
      </div>
    </div>
  );
};

export default Login