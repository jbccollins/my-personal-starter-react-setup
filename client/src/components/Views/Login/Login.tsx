//https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouterLink, Redirect } from "react-router-dom";
import { useTypedSelector } from 'reduxTools/store';
import { useDispatch } from 'react-redux';
import { User } from 'shared/types/User';
import { authenticateFromCookie, authenticate, login } from 'reduxTools/modules/session';
import { Session } from 'types';
import {
  SIGNUP,
} from "@shared/constants/urls";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  // form: {
  //   width: '100%', // Fix IE 11 issue.
  //   marginTop: theme.spacing(1),
  // },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {

  const [email, setEmail] = useState("bruce.wayne@gmail.com");
  const [plaintextPassword, setPlaintextPassword] = useState("Password@1");

  //TODO: Extract this session checking so it can be used by all routes that make sense (Like /signup)
  const session: Session | null = useTypedSelector(state => state.session);

  // If the user tries to hit a url while they aren't logged in yet we can redirect them after they log in
  const routerState: any = useTypedSelector(state => state.router.location.state);
  const pathname = routerState?.from?.pathname;
  let redirectTo: string = "/dashboard";
  if (pathname && pathname !== "/") {
     redirectTo = pathname;
  }

  const dispatch = useDispatch()

  if (session === null) {
    const user: User | null = authenticateFromCookie();
    if (user !== null) {
      dispatch(login(user));
    }
  }

  const tryLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    const user: User | null = await authenticate(email, plaintextPassword);
    if (user !== null) {
      dispatch(login(user));
    }
  };

  const classes = useStyles();
  
  if (session !== null) {
    return <Redirect to={redirectTo} />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={plaintextPassword}
          onChange={e => setPlaintextPassword(e.target.value)}
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          onClick={tryLogin}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Log in
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              {/* TODO: Implement Forgot password functionality */}
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <RouterLink to={SIGNUP}>
              Don't have an account? Sign Up
            </RouterLink>
          </Grid>
        </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}