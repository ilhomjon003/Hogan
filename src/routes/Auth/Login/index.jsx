import React, { useState, useEffect } from "react";
import "./style.css";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signIn } from "../../../reducer/authSlice";

const Login = ({ isLoginOpened, changeLoginState }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (isLoginOpened) {
      changeLoginState(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const loginUser = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userLogin) => {
        dispatch(signIn(userLogin.user.accessToken));
        changeLoginState(false);
        navigate("/products");
      })
      .catch((err) => setErr(err.message));
  };
  return (
    <div
      className={
        isLoginOpened ? "login__wrapper login--opened" : "login__wrapper"
      }
    >
      <div className="login__header flex">
        <h2 className="login__header__title">Login</h2>
        <AiOutlineClose
          className="login__header__close__icon"
          onClick={changeLoginState}
        />
      </div>

      <form autoComplete="off" className="login__form" onSubmit={loginUser}>
        <p className="login__required__label">Required field*</p>
        <label className="login__input__label" htmlFor="email">
          E-mail Address*
        </label>
        <input
          className="login__input"
          type="text"
          id="email"
          required
          maxLength={1024}
          minLength={10}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="login__input__label" htmlFor="password">
          Password*
        </label>
        <input
          className="login__input"
          type="password"
          placeholder="At least 8 characters"
          required
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
        />

        {err && (
          <div className="err">
            <h4>{err}</h4>
            <a href="https://www.hogan.com/ww-en/password-forget/">
              Have you forgotten your login details?
            </a>
          </div>
        )}

        <button type="submit" className="login__btn">
          Login
        </button>
      </form>

      <div className="register__link__wrapper">
        <h2 className="register__link__title">Are you a new customer ?</h2>
        <p className="register__link__term">
          By creating an account, you can access checkout faster, save multiple
          shipping addresses, view and track your orders and much more.
        </p>
        <Link className="register__link" to="/register">
          <button
            className="register__link__btn"
            onClick={() => changeLoginState(false)}
          >
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
