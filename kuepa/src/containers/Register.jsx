import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { registerRequest } from "../actions";
import "../assets/styles/Register.scss";

const Register = (props) => {
  const [form, setValues] = useState({
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    confirmPassword: "",
    usertype: "",
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
    dispatch(registerRequest(form));
    props.history.push("/");
  };

  return (
    <>
      <section className="register">
        <section className="register__container">
          <h2 className="text-center">Sign Up</h2>
          <form className="register__container--form" onSubmit={handleSubmit}>
            <input
              name="first_name"
              className="form-control mb-2 rounded-3"
              type="text"
              placeholder="Fist name"
              onChange={handleInput}
            />
            <input
              name="last_name"
              className="form-control mb-2 rounded-3"
              type="text"
              placeholder="Last name"
              onChange={handleInput}
            />
            <input
              name="username"
              className="form-control mb-2 rounded-3"
              type="text"
              placeholder="Username"
              onChange={handleInput}
            />
            <input
              name="email"
              className="form-control mb-2 rounded-3"
              type="text"
              placeholder="Email"
              onChange={handleInput}
            />
            <input
              name="password"
              className="form-control mb-2 rounded-3"
              type="password"
              placeholder="Password"
              onChange={handleInput}
            />
            <input
              name="password"
              className="form-control mb-2 rounded-3"
              type="password"
              placeholder="Confirm password"
              onChange={handleInput}
            />
            <select
              className="form-select mb-2"
              aria-label="Default select example"
            >
              <option selected>User type</option>
              <option value="student">Student</option>
              <option value="moderator">Moderator</option>
            </select>
            <button className="button mb-2 rounded-3">Register</button>
          </form>
          <Link to="/login" className="text-primary">
            <h4>Login</h4>
          </Link>
        </section>
      </section>
    </>
  );
};

export default Register;
