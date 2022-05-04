import "../css/App.css";
import { authentication } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login({ setEmail }) {
  const navigate = useNavigate();
  function login(e) {
    e.preventDefault();
    const getUserEmail =
      document.querySelector(".emailClass").children[1].value;
    const getUserPassword =
      document.querySelector(".passwordClass").children[1].value;
    signInWithEmailAndPassword(authentication, getUserEmail, getUserPassword)
      .then(() => {
        setEmail(getUserEmail);
        navigate("/mainScreen");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="LogIn">
      <form>
        <fieldset>
          <legend>
            <b>LogIn</b>
          </legend>
          <div className="emailClass">
            <label style={{ margin: "0.7rem" }} htmlFor="email">
              <b>Email</b>
            </label>
            <input type="Email" name="email" />
          </div>
          <div className="passwordClass">
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input type="password" name="password" />
          </div>
          <button onClick={login}>
            <b>Log In</b>
          </button>
          <br />
          <b>
            <a href="./forgetPassword">Forget Password?</a>
          </b>
        </fieldset>
        <p>
          <b>
            Need an account? <a href="./signUp">Sign Up</a>
          </b>
        </p>
      </form>
    </div>
  );
}

export default Login;
