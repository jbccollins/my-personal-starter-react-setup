import React from "react";
import { Container } from "semantic-ui-react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "@components/Views/Login/Login";
import ProtectedRoute from "@components/ProtectedRoute/ProtectedRoute";
import Dashboard from "@components/Views/Dashboard/Dashboard";
import SignUp from "@components/Views/SignUp/SignUp";
import View404 from "@components/Views/404/404";
import UserList from "@components/Views/UserList/UserList";
import {
  LOGIN,
  SIGNUP,
  DASHBOARD,
  BASE_URL,
  USERS
} from "@shared/constants/urls";

const App = () => {
  return (
    <Container>
      <Switch>
        <ProtectedRoute path={BASE_URL} exact render={() => <Redirect to={LOGIN} />}/>
        <ProtectedRoute path={DASHBOARD} component={Dashboard} />
        <ProtectedRoute path={USERS} component={UserList} />
        <Route path={LOGIN} component={Login} />
        <Route path={SIGNUP} component={SignUp} />
        <Route component={View404} />
      </Switch>
    </Container>
  );
};

export default App;
