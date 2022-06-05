import React from "react";
import { Route, Switch } from "react-router-dom";
import MainContentGroup from "./MainContentGroup";
import MainContentHome from "./mainContentHome";
import MainContentInfor from "./MainContentInfor";
import MainContentUser from "./MainContentUser";
const MainContent = () => {
  return (
    <div className="mainContent">
      
      <Switch>
        <Route path="/home" component={MainContentHome} />
        <Route path="/user" component={MainContentUser} />
        <Route path="/group" component={MainContentGroup} />
        <Route path="/infor" component={MainContentInfor} />
      </Switch>
    </div>
  );
};

export default MainContent;
