import { typedAction } from "@redux/helpers";
import Http from "@util/http";
import { getUserFromJwt } from "@util/getUserFromJwt";
import {
  API_AUTH_LOGIN,
  API_AUTH_LOGOUT,
} from "@shared/constants/urls";
import { JwtCookieKey, sessionJwtCookieKey } from "@shared/constants/auth";
import { User } from "@shared/types/User";
import Cookies from "js-cookie";
import { Session } from "types";
import { Dispatch } from "redux";
const ACTION_AUTH_LOGIN = "auth/LOGIN";
const ACTION_AUTH_LOGOUT = "auth/LOGOUT";

const initialState: Session | null = null;

export const authenticateFromCookie = () => {
  const jwt = Cookies.get(sessionJwtCookieKey);
  if (jwt) {
    const user: User | null = getUserFromJwt(jwt);
    return user;
  }
  return null;
}

export const authenticate = async (email: string, plaintextPassword: string) => {
  const res = await Http.Post(API_AUTH_LOGIN, {email, password: plaintextPassword});
  const jwt = res[JwtCookieKey];

  const user: User | null = getUserFromJwt(jwt);
  // TODO: Only set this cookie when the "Remember me" checkbox is checked.
  // Also, reset the timer on the cookie every time they login so that they only have to 
  // re-login if they've been logged out for a while.
  Cookies.set(sessionJwtCookieKey, jwt);
  return user;
}

export const logout = async (dispatch: Dispatch<any>) => {
  Cookies.remove(sessionJwtCookieKey)
  await Http.Get(API_AUTH_LOGOUT, false);
  window.location.href = '/';
  dispatch(doLogout());
}

export const login = (user: User) => {
  return typedAction(ACTION_AUTH_LOGIN, user);
};

const doLogout = () => {
  return typedAction(ACTION_AUTH_LOGOUT);
};

type AuthAction = ReturnType<typeof login | typeof doLogout>;

export function sessionReducer (
  state = initialState,
  action: AuthAction
): Session | null {
  switch (action.type) {
    case ACTION_AUTH_LOGIN:
      return { user: action.payload};
    case ACTION_AUTH_LOGOUT:
      return null;
    default:
      return state;
  }
}
