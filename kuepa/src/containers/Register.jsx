import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../actions";
import "../assets/styles/Register.scss";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters")
    .required("Password is required"),
  username: Yup.string().required("Username is required"),
  usertype: Yup.string().required("Usertype is required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Both password need to be the same"
  ),
  lastName: Yup.string().required("Last name is required"),
  firstName: Yup.string().required("Usertype is required"),
});

const MySwal = withReactContent(Swal);

const Register = () => {
  const state = useSelector((state) => state);
  const [form, setValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    usertype: "student",
  });
  const dispatch = useDispatch();

  const handleInput = async (event) => {
    await setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await RegisterSchema.validate(form);
      dispatch(registerUser(form, "/login"));
    } catch (error) {
      console.log(error);
      MySwal.fire({
        didOpen: () => {
          MySwal.clickConfirm();
        },
      }).then(() => {
        return MySwal.fire(<p>{error.message}</p>);
      });
    }
  };

  useEffect(() => {
    const { error } = state;
    if (error) {
      setValues({
        email: "",
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: "",
        usertype: "student",
      });

      console.log("Error msg", error.message);
      document.getElementById("Register").reset();

      if (error === "Request failed with status code 400") {
        MySwal.fire({
          didOpen: () => {
            MySwal.clickConfirm();
          },
        }).then(() => {
          return MySwal.fire(<p>Username is already in use</p>);
        });
      } else {
        MySwal.fire({
          didOpen: () => {
            MySwal.clickConfirm();
          },
        }).then(() => {
          return MySwal.fire(<p>Internal Error</p>);
        });
      }
    }
  }, [state]);

  return (
    <>
      <section className="register">
        <section className="register__container">
          <h2 className="text-center">Sign Up</h2>
          <form
            className="register__container--form"
            id="Register"
            onSubmit={handleSubmit}
          >
            <input
              name="firstName"
              className="form-control mb-2 rounded-3"
              type="text"
              placeholder="First name"
              onChange={handleInput}
            />
            <input
              name="lastName"
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
              name="confirmPassword"
              className="form-control mb-2 rounded-3"
              type="password"
              placeholder="Confirm password"
              onChange={handleInput}
            />
            <select
              className="form-select mb-2"
              aria-label="Default select example"
              name="usertype"
              onChange={handleInput}
            >
              <option value="student">Student</option>
              <option value="moderator">Moderator</option>
            </select>
            <button className="button mb-2 rounded-3" type="submit">
              Register
            </button>
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
