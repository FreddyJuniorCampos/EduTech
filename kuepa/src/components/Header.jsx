import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutRequest } from "../actions";
import logo from "../assets/static/logo2.PNG";
import userImg from "../assets/static/user.png";
import signImg from "../assets/static/signin.png";
import classNames from "classnames";
import "../assets/styles/Header.scss";

const Header = (props) => {
  const { isLogged } = props;
  const { user } = useSelector((state) => state);
  const hasUser = Object.keys(user).length > 0;
  const dispatch = useDispatch();

  const handleLogout = () => {
    document.cookie = "id=";
    document.cookie = "username=";
    document.cookie = "email=";
    document.cookie = "token=";
    dispatch(logoutRequest({}));
  };

  const headerClass = classNames("header", {
    isLogged,
  });

  return (
    <header className={headerClass}>
      <Link to="/">
        <img className="header__img" SRC={logo} alt="lOGO" />
      </Link>
      <div className="header__menu">
        <div className="header__menu--profile">
          {hasUser ? (
            <img src={userImg} alt="User Image" />
          ) : (
            <img src={signImg} alt="Sign Image" />
          )}
          <p>Perfil</p>
        </div>
        <ul>
          {hasUser ? (
            <li>
              <Link to="/login" onClick={handleLogout}>
                Cerrar Sesión
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login">Iniciar Sesión</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
