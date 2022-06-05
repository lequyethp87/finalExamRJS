import React from "react";
// import  { useEffect } from "react";
// import {  Route } from "react-router-dom";
// import Footer from "./footer";
import Header from "./header";
import Main from "./main";
// import MainContentHome from "./mainContent";
// import { Switch } from "react-router-dom";
// import { Link } from "react-router-dom";
const Home = () => {
  // useEffect(()=>{
  //   console.log("useEffect");
  //   if(localStorage.getItem("TOKEN")===null || localStorage.getItem("TOKEN")===undefined){
  //     window.location.replace("/login")
  //   }
  // },[])
  // const isNotLogin = () => {
  //   if (
  //     localStorage.getItem("TOKEN") === null ||
  //     localStorage.getItem("TOKEN") === undefined
  //   ) {
  //     window.location.replace("/login");
  //   }
  // };
  // isNotLogin();
  return (
    <>
      {/* Home
    <button onClick={logout}>Logout</button> */}
      <Header />
      <Main />

      {/* <Footer /> */}
    </>
  );
};

export default Home;
