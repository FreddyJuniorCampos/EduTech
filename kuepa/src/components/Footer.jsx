import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/static/logo.PNG";
import "../assets/styles/Footer.scss";

const Footer = () => (
  <footer className="footer">
    <img src={logo} alt="logo" />
    <Link to="/">Terminos de uso</Link>
    <Link to="/">Declaración de privacidad</Link>
    <Link to="/">Centro de ayuda</Link>
    <a href="https://github.com/FreddyJuniorCampos">Hecho por: Freddy Campos</a>
  </footer>
);

export default Footer;
