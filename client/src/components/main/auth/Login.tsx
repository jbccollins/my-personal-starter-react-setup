import React, { useState } from "react";
import { login, authenticate, authenticateFromCookie } from "@redux/modules/session";
import { useDispatch } from "react-redux";
import { Form, Input, Header, Button, Container } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { User } from "shared/types/User";
import { useTypedSelector } from '@redux/store';
import { Session } from "types";

const Login = () => {
  const [inputName, setInputName] = useState("");

  const session: Session | null = useTypedSelector(state => state.session);

  // If the user tries to hit a url while they aren't logged in yet we can redirect them after they log in
  const routerState: any = useTypedSelector(state => state.router.location.state);
  let redirectTo: string = routerState?.from?.pathname || "/shop";

  const dispatch = useDispatch()

  if (session === null) {
    const user: User | null = authenticateFromCookie();
    if (user !== null) {
      dispatch(login(user));
    }
  }

  const tryLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    const user: User = await authenticate();
    dispatch(login(user));
  };

  if (session !== null) {
    return <Redirect to={redirectTo} />;
  }

  return (
    <Container>
      <Header as="h2">Login</Header>
      <Form>
        <Form.Field>
          <Input
            label="Username"
            value={inputName}
            onChange={e => setInputName(e.target.value)}
          />
        </Form.Field>
        <Button onClick={tryLogin}>Login</Button>
      </Form>
    </Container>
  );
};

export default Login;