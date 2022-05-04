import "../css/App.css";
import { authentication } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgetPassword() {
  function ForgotPassword(e) {
    e.preventDefault();
    const getUserEmail =
      document.querySelector(".emailClass").children[1].value;
    sendPasswordResetEmail(authentication, getUserEmail)
      .then(() => {
        console.log("Success");
      })
      .catch(() => {
        console.log("Error");
      });
  }
  return (
    <div className="forgot">
      <form>
        <fieldset>
          <legend>
            <b>Password Reset</b>
          </legend>
          <div className="emailClass">
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input type="Email" name="email" />
          </div>
          <button onClick={ForgotPassword}>
            <b>Reset Password</b>
          </button>
          <br />
          <b>
            <a href="./">Login</a>
          </b>
        </fieldset>
      </form>
    </div>
  );
}
