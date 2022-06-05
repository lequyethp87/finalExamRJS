import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { store } from "../../store/store";
const SignUpSuccess = () => {
//   console.log("Rerender Home page");
//   const logout = () => {
//     localStorage.clear();
//     window.location.replace("/login");
//   };
const [number,setNumber] = useState(store.getState().page.page)
const checkUp = () =>{
  if(number<7){
    store.dispatch({
      type: "NEXT_PAGE",
    });
  }
}
useEffect(()=>{
  // subscribe;
  store.subscribe(() => {
    setNumber(store.getState().page.page);
  });
},[])
console.log(store.getState().page.page);
console.log(store);
console.log("...");
  return (
    <div className="container">
      <div className="signUpSuccess">
        We have sent an email with a confirmation link to your email address. In
        order to complete the sign-up process, please click the confirmation
        link.
        <br></br>
        If you do not receive a confirmation email, please check your spam
        folder. Also, please verify that you entered a valid email address in
        our sign-up form.
        <br></br>If you need assistance, please contact us.
        <Link to={"/login"}>Click here to login</Link>
      </div>
      <button onClick={checkUp}>Check Up</button>
      <p>Gia tri number: {number}</p>
      <button>Check down</button>
    </div>
  );
};

export default SignUpSuccess;
