import React from "react";
import { Link } from "react-router-dom";
const MainMenu = () => {
  
  return (
    <div className="homeMain">
      <ul>
        <li>Logo</li>
        <li>
          <Link to="/home">
            <i className="fa fa-home" aria-hidden="true"></i>
          </Link>
        </li>
        <li>
          <Link to="/user">
            <i className="fa fa-user" aria-hidden="true"></i>
          </Link>
        </li>
        <li>
          <Link to="/group">
            <i className="fa fa-users" aria-hidden="true"></i>
          </Link>
        </li>
        <li>
          <Link to="/infor">
            <i className="fa fa-info-circle" aria-hidden="true"></i>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MainMenu;
