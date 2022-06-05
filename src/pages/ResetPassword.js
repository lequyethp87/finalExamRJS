import Axios  from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
function ResetPassword() {
  const [sendingEmail, setSendingEmail] = useState({
    isSending: false,
    email: "",
    errorMessage:""
  });

  const _handleOnChange = (e) => {
    setSendingEmail({
      ...sendingEmail,
      email: e.target.value,
    });
  };
  const _handleOnClick = async () => {
    try {
      const result = await Axios.get(
        "http://localhost:8888/api/auth/send-email-reset-password"
      );
      console.log(result);
      setSendingEmail({
        ...sendingEmail,
        isSending: true,
      });
    } catch (error) {
      console.log(error);
      setSendingEmail({
        ...sendingEmail,
        errorMessage: "Email is wrong. Please check again",
      });
    }
    
  };
  return (
    <div className="container">
      <div className="sendEmailForResetPassword">
        {sendingEmail.isSending ? (
          <>
            <p>
              We sent you an email. Please check that link for reset your
              password
            </p>
          </>
        ) : (
          <>
            <p>Please input your email for reset password</p>
            <input
              value={sendingEmail.email}
              onChange={_handleOnChange}
            ></input>
            <button onClick={_handleOnClick}>Submit</button>
            <p style={{ color: "red", frontWeight: 500 }}>
              {sendingEmail.errorMessage}
            </p>
          </>
        )}
        <Link to={"/login"}>Go to Login display</Link>
      </div>
    </div>
  );
}

export default ResetPassword;
