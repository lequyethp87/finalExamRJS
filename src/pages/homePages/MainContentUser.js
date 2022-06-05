import React from "react";
// import { Link } from "react-router-dom";
function MainContentUser ()  {
  const _handleOnClick = (e) =>{
    // if (e.key === "Enter"){
      // console.log("abc");
    // }
  }  
  const _handleOnChange = (e) =>{
    if (e.key === "Enter"){
      console.log("abc");
    }
    // console.log(e);
  }
  return (
    <div className="homeMainContent">
      <p>MainContentUser</p>
      <input onKeyDown={_handleOnChange}></input>
      <button onClick={_handleOnClick}>Submit</button>
    </div>
  );
};

export default MainContentUser;
