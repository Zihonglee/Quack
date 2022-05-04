import "../css/App.css";
import { useState } from "react";
import { authentication } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [errors, setError] = useState("");
  const navigate = useNavigate();

  function signUp(e) {
    e.preventDefault();
    const getUserEmail =
      document.querySelector(".emailClass").children[1].value;
    const getUserPassword =
      document.querySelector(".passwordClass").children[1].value;
    const getUserConfirmPassword =
      document.querySelector(".confirmClass").children[1].value;
    if (getUserPassword !== getUserConfirmPassword) {
      return setError("Password do not match!");
    }
    createUserWithEmailAndPassword(
      authentication,
      getUserEmail,
      getUserPassword
    )
      .then(() => {
        console.log("Successfully created an account");
        navigate("/");
      })
      .catch(() => {
        return setError("Failed to create an account");
      });
  }

  return (
    <div className="signUp">
      {errors}
      <form>
        <fieldset>
          <legend>
            <b>Sign Up</b>
          </legend>
          <div className="emailClass">
            <label htmlFor="email" style={{ margin: "0rem 3.7rem" }}>
              <b>Email</b>
            </label>
            <input type="Email" name="email" />
          </div>
          <div className="passwordClass">
            <label htmlFor="password" style={{ margin: "0rem 3em" }}>
              <b>Password</b>
            </label>
            <input type="password" name="password" />
          </div>
          <div className="confirmClass">
            <label htmlFor="passwordConfirmation">
              <b>Password Confirmation</b>
            </label>
            <input type="password" name="passwordConfirmation" />
          </div>
          <button onClick={signUp} style={{ width: "24.5rem" }}>
            <b>Sign Up</b>
          </button>
          <p>
            <b>
              Already have an account? <a href="/">Log in</a>
            </b>
          </p>
        </fieldset>
      </form>
    </div>
  );
}
