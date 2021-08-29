import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../actions";
import "../assets/styles/Login.scss";

const Login = () => {
  const [form, setValues] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(form, "/"));
  };

  return (
    <>
      <section className="login">
        <section className="login__container">
          <h2 className="text-center">Login</h2>
          <form className="login__container--form" onSubmit={handleSubmit}>
            <input
              name="username"
              className="form-control mb-2 rounded-3"
              type="text"
              placeholder="Username"
              onChange={handleInput}
            />
            <input
              name="password"
              className="form-control mb-2 rounded-3"
              type="password"
              placeholder="Password"
              onChange={handleInput}
            />
            <button className="button mb-2 rounded-3" type="submit">
              Login
            </button>
            <div className="login__container--remember-me">
              <label>
                <input type="checkbox" id="cbox1" value="first_checkbox" />
                Remember me
              </label>
            </div>
          </form>
          <p className="login__container--register">
            You don't have any account <Link to="/register">Sign up</Link>
          </p>
        </section>
      </section>
    </>
  );
};

export default Login;
