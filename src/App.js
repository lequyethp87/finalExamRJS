// import logo from './logo.svg';
import "./App.css";
import {  Route, Switch } from "react-router-dom";
import Home from "./pages/homePages/home";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import SignUpSuccess from "./pages/signup/signupSucces";
import ReactModal from "react-modal";
import ResetPassword from "./pages/ResetPassword";
import RequireResetPassword from "./pages/RequireResetPassword";
// import MainContent from "./pages/homePages/mainContent";
ReactModal.setAppElement("#root");
function App() {

  return (
    // <div className="App">
    // <Router >
    <Switch>
      <Route path={"/login"} component={Login} exact />
      <Route path={"/signup"} component={SignUp} exact />
      <Route path={"/signup/success"} component={SignUpSuccess} />
      <Route path={"/reset-password/:email"} component={RequireResetPassword} />
      <Route path={"/reset-password"} component={ResetPassword} />

      <Route path={"/"} component={Home}>
        {/* <Route path={"/home"} element={<MainContent/>} /> */}
      </Route>
    </Switch>
    // </Router>
    // <Router>
    //   <Switch>
    //     <Route path="/sign-in" component={Login} />
    //     {/* <Route path="/sign-up" component={Register}/> */}
    //     {/* <Route
    //         path="/sign-up"
    //         render={(props) => <SignupWithLoading {...props} />}
    //       /> */}
    //     <Route path="/" component={Home} />
    //   </Switch>
    // </Router>
    // </div>
  );
}

export default App;
