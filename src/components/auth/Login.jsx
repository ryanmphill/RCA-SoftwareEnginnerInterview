import { useRef, useState } from "react";
import "../../styles/forms.css";
import { usePocketBase } from "../../context/usePocketBase";
import { Link, useNavigate } from "react-router-dom";
import { TailSpin } from "react-loading-icons";
import { loginUser } from "../../api";

function Login() {
  const { pb, syncUserState } = usePocketBase();
  const username = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleLoginClick(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]); // Reset any error messages

    try {
      const authData = await loginUser(
        pb,
        username.current.value,
        password.current.value
      );
      if (authData?.token) {
        syncUserState(pb.authStore);
        navigate("/");
      }
    } catch (error) {
      setIsSubmitting(false);
      if (error.response.code === 400) {
        setErrors([...errors, "Invalid username or password"]);
      } else {
        throw error;
      }
    }
  }

  return (
    <>
      <div className="auth-form__header">
        <h1>Login Form</h1>
      </div>
      <form id="loginForm" className="auth-form">
        <div className="auth-form__row">
          <label className="auth-form__label" htmlFor="login-username">Username : </label>
          <input
            ref={username}
            id="login-username"
            className="auth-form__input"
            type="text"
            placeholder="Enter Username"
            name="username"
            autoComplete="username"
            required
          />
        </div>
        <div className="auth-form__row">
          <label className="auth-form__label" htmlFor="login-password">Password : </label>
          <input
            id="login-password"
            ref={password}
            className="auth-form__input"
            type="password"
            placeholder="Enter Password"
            name="password"
            autoComplete="current-password"
            required
          />
        </div>

        {errors &&
          errors.map((error) => (
            <div key={error} className="auth-form__error">
              * {error}
            </div>
          ))}

        <div className="auth-form__row">
          <button
            id="loginButton"
            className="auth-form__btn"
            type="button"
            onClick={handleLoginClick}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <TailSpin
                className={"auth-form__icon"}
                speed={1.5}
                strokeWidth={3}
              />
            ) : (
              "Login"
            )}
          </button>
        </div>
        <div>
          New User? <Link to={"/register"}>Create An Account</Link>
        </div>
      </form>
    </>
  );
}

export default Login;
