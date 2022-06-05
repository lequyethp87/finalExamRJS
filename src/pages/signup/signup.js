import  Axios  from "axios";
import React, { useState } from "react";
// import { Link } from "react-router-dom";
import "./signup.css";
const SignUp = () => {
  const [account, setAccount] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "EMPLOYEE",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const _handleOnchange =(e)=>{
    setAccount({
      ...account,
      [e.target.name]: e.target.value
    })
  }

  const sendSignUp = async() =>{
    try {
      const result = await Axios.post("http://localhost:8888/api/auth/signup", {
        username: account.username,
        password: account.password,
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        role: account.role
      });
      
    console.log(result);
    window.location.replace("/signup/success");
    } catch (error) {
      setErrorMessage("Sign up failed");
      console.log(error);
    }
    
    console.log(account);
  }
  return (
    <div>
      <div className="container">
        <div className="signUp">
          <i className="fa fa-user-plus" aria-hidden="true"></i>
          SignUp
          <div className="fistAndLastName">
            <input
              name="firstName"
              placeholder="First Name"
              onChange={_handleOnchange}
            ></input>
            <input
              name="lastName"
              placeholder="Last Name"
              onChange={_handleOnchange}
            ></input>
          </div>
          <input
            name="username"
            placeholder="User Name"
            onChange={_handleOnchange}
          ></input>
          <input
          type={"password"}
            name="password"
            placeholder="Password"
            onChange={_handleOnchange}
          ></input>
          <input
            name="email"
            placeholder="Email"
            onChange={_handleOnchange}
          ></input>
          <select
            name="role"
            defaultValue={"EMPLOYEE"}
            onChange={_handleOnchange}
          >
            <option name="ADMIN" value={"ADMIN"}>
              ADMIN
            </option>
            <option name="MANAGER" value={"MANAGER"}>
              MANAGER
            </option>
            <option name="EMPLOYEE" value={"EMPLOYEE"}>
              EMPLOYEE
            </option>
          </select>
          <div>
            <button style={{ cursor: "pointer" }} onClick={sendSignUp}>
              Sign Up
            </button>
          </div>
          <p style={{ color: "red" }}>{errorMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
