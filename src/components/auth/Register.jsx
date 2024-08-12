import { useRef, useState } from "react";
import { usePocketBase } from "../../context/usePocketBase";
import { Link, useNavigate } from "react-router-dom";
import { TailSpin } from "react-loading-icons";
import { validateUserRegisterInput } from "../../utils/formValidation";
import { checkIfUserExists, createAndLoginUser } from "../../api";
import "../../styles/forms.css";

function Register() {
  const { pb, syncUserState } = usePocketBase();
  const username = useRef(null);
  const password = useRef(null);
  const passwordConfirm = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  async function handleCreateUserClick(e) {
    e.preventDefault();
    setIsSubmitting(true);

    setErrors([]); // Reset any error messages

    const data = {
      username: username.current.value,
      password: password.current.value,
      passwordConfirm: passwordConfirm.current.value,
    };

    let errorMsgs = validateUserRegisterInput(data);

    const hasUserInputErrors = errorMsgs.length > 0;

    if (hasUserInputErrors) {
      setErrors(errorMsgs);
      setIsSubmitting(false);
      return;
    }

    try {
      const createdUser = await createAndLoginUser(pb, data);
      if (createdUser?.token) {
        syncUserState(pb.authStore);
        navigate("/");
      }
    } catch (error) {
      setIsSubmitting(false);
      if (error?.response?.code === 400) {
        errorMsgs = [...errorMsgs, error.response.message];
        const usernameTaken = await checkIfUserExists(pb, data.username);
        if (usernameTaken) {
          errorMsgs = [...errorMsgs, "Username already exists"];
        }
        setErrors(errorMsgs);
      } else if (String(error?.response?.code).startsWith("5")) {
        window.alert(
          "An error occurred while attempting to connect to the server. Please try again."
        );
        throw error;
      } else {
        throw error;
      }
    }
  }

  return (
    <>
      <div className="auth-form__header">
        <h1>Create An Account</h1>
      </div>
      <form id="registerForm" className="auth-form">
        <div className="auth-form__row">
          <label className="auth-form__label" htmlFor="register-username">
            Username :{" "}
          </label>
          <input
            ref={username}
            id="register-username"
            className="auth-form__input"
            type="text"
            placeholder="Enter Username"
            name="username"
            autoComplete="none"
            required
          />
        </div>
        <div className="auth-form__row">
          <label className="auth-form__label" htmlFor="register-password">
            Password :{" "}
          </label>
          <input
            id="register-password"
            ref={password}
            className="auth-form__input"
            type="password"
            placeholder="Enter Password"
            name="password"
            autoComplete="new-password"
            required
          />
        </div>

        <div className="auth-form__row">
          <label className="auth-form__label" htmlFor="passwordConfirm">
            Confirm Password :{" "}
          </label>
          <input
            id="passwordConfirm"
            ref={passwordConfirm}
            className="auth-form__input"
            type="password"
            placeholder="Enter Password"
            name="password"
            autoComplete="none"
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
            id="registerButton"
            className="auth-form__btn"
            type="button"
            onClick={handleCreateUserClick}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <TailSpin
                className={"auth-form__icon"}
                speed={1.5}
                strokeWidth={3}
              />
            ) : (
              "Create Account"
            )}
          </button>
        </div>
        <div>
          Already signed up? <Link to={"/login"}>Click here to login</Link>
        </div>
      </form>
    </>
  );
}

export default Register;
