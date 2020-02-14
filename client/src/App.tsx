import React from "react";
import { Nav } from "./components/header/Nav";
import { Container } from "semantic-ui-react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Shop } from "./components/main/shop/Shop";
import { Cart } from "./components/main/cart/Cart";
import { Login } from "./components/main/auth/Login";
import PrivateRoute from "@components/ProtectedRoute/ProtectedRoute";
import { IExampleData } from '@shared/types/ExampleData';
import { User } from '../../shared/types/User';

const App = () => {
  const derp: IExampleData = {id: "adsf"};
  const myUser: User = new User("James Collins", "jbccollins@gmail.com");
  console.log(derp);
  console.log(myUser);
  return (
    <Container>
      <Nav />
      <Switch>
        <PrivateRoute path="/" exact render={() => <Redirect to={"/login"} />}/>
        <PrivateRoute path="/shop" component={Shop} />
        <PrivateRoute path="/cart" component={Cart} />
        <Route path="/login" component={Login} />
      </Switch>
    </Container>
  );
};

export default App;
