import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../containers/Home";
import Login from "../containers/Login";
import NotFound from "../containers/NotFound";
import Register from "../containers/Register";
import "bootstrap/dist/css/bootstrap.min.css";

const App = ({ isLogged }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={isLogged ? Home : Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
