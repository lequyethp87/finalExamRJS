import React from "react";
// import ReactDOM from "react-dom/client";
// import { Link } from "react-router-dom";
import "./css/header.css"
const Header = () => {
  const logout =()=>{
      localStorage.clear()
      window.location.replace("/login");
  }
  const handleOnChange = (e) => {
    e.target.value === "Logout" && logout();
  };
  return (
    <div className="homeHeader">
      <ul>
        <li>Notification</li>
        <li>User Icon</li>
        <li>User name</li>
        <li>
          <select onChange={handleOnChange}>
            <option value={"Profile"}>Profile</option>
            <option value={"Logout"}>Logout</option>
          </select>
        </li>
      </ul>
    </div>
  );
};

export default Header;
