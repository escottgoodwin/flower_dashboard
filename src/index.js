import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from "components/Login";
import SignUp from "components/SignUp";
import Admin from "layouts/Admin.jsx";
import RTL from "layouts/RTL.jsx";

import "assets/css/material-dashboard-react.css?v=1.7.0";
// core components

ReactDOM.render(
  <Router >
    <Switch>
      <Route path="/admin" component={Admin}  />
      <Route path="/login" component={Login} />
      <Route path="/sign_up" component={SignUp} />
      <Route path="/" component={Login} />
      <Route path="/rtl" component={RTL} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
