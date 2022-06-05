import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
function RequireResetPassword() {
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errorMssg, setErrorMssg] = useState("");
  const _handleOnChange = (e) => {
    // console.log("onChange");
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
    
  };
  useEffect(() => {
    if (
      password.password !== password.confirmPassword &&
      password.password !== "" &&
      password.confirmPassword !== "" &&
      password.password !== null &&
      password.confirmPassword !== null &&
      password.password !== undefined &&
      password.confirmPassword !== undefined
    ) {
      setErrorMssg("Confirmation password is wrong");
    } else {
      setErrorMssg("");
    }
  }, [password]);
  const { email } = useParams();

  const _handleOnClick = async () => {
    try {
      if (errorMssg === null || errorMssg === "") {
        const result = await Axios.get(
          "http://localhost:8888/api/auth/reset-password?email=" +
            email +
            "&newPassword=" +
            password.password
        );
        console.log(result);
        window.location.replace("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="sendEmailForResetPassword">
        <p>Input your password</p>
        <input
          onChange={_handleOnChange}
          name="password"
          value={password.password}
          type={"password"}
          placeholder="Password"
        ></input>
        <p>Confirmation your password</p>
        <input
          onChange={_handleOnChange}
          name="confirmPassword"
          value={password.confirmPassword}
          type={"password"}
          placeholder="Password"
        ></input>{" "}
        <span style={{ color: "red" }}>{errorMssg}</span>
        <button onClick={_handleOnClick}>Submit</button>
        <Link to={"/login"}>Go to Login display</Link>
      </div>
    </div>
  );
}

export default RequireResetPassword;
