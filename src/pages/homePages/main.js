import React from "react";
// import { Route, Switch } from "react-router-dom";
// import { Link } from "react-router-dom";
import "./css/main.css";
import MainContent from "./MainContent";
// import MainContentHome from "./mainContent";
// import MainContentUser from "./MainContentUser";
// import MainContent from "./mainContent";
import MainMenu from "./mainMenu";
const Main = () => {

  return (
    <>
      <MainMenu/>      
      <MainContent/>
    </>
  );
};

export default Main;
