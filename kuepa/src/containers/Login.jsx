import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions";
import "../assets/styles/Login.scss";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  username: Yup.string()
    .max(50, "Username is Too Long!")
    .required("Username is Required"),
});

const MySwal = withReactContent(Swal);

const Login = () => {
  const state = useSelector((state) => state);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await LoginSchema.validate(form);
      dispatch(loginUser(form, "/"));
    } catch (error) {
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
        username: "",
        password: "",
      });

      document.getElementById("Login").reset();

      if (error === "Request failed with status code 401") {
        MySwal.fire({
          didOpen: () => {
            MySwal.clickConfirm();
          },
        }).then(() => {
          return MySwal.fire(<p>User or password don't match</p>);
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
      <section className="login">
        <section className="login__container">
          <h2 className="text-center">Login</h2>
          <form
            className="login__container--form"
            id="Login"
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
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
