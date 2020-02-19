import { typedAction } from "@redux/helpers";
import Http from "@utilities/http";
import { getUserFromJwt } from "@auth/getUserFromJwt";
import { API_AUTH_LOGIN } from "@shared/constants/urls";
import { JwtCookieKey, sessionJwtCookieKey } from "@shared/constants/auth";
import { User } from "@shared/types/User";
import Cookies from "js-cookie";
import { Session } from "types";
const ACTION_AUTH_LOGIN = "auth/LOGIN";
const ACTION_AUTH_LOGOUT = "auth/LOGOUT";

const initialState: Session | null = null;

var data = {
  email: "sean.maxwell@gmail.com",
  password: "Password@1"
};

export const authenticateFromCookie = () => {
  const jwt = Cookies.get(sessionJwtCookieKey);
  if (jwt) {
    const user: User = getUserFromJwt(jwt);
    return user;
  }
  return null;
}

export const authenticate = async () => {
  const res = await Http.Post(API_AUTH_LOGIN, data);
  const jwt = res[JwtCookieKey];

  const user: User = getUserFromJwt(jwt);
  Cookies.set(sessionJwtCookieKey, jwt);
  return user;
}

export const login = (user: User) => {
  return typedAction(ACTION_AUTH_LOGIN, user);
};

export const logout = () => {
  Cookies.remove(sessionJwtCookieKey)
  return typedAction(ACTION_AUTH_LOGOUT);
};

type AuthAction = ReturnType<typeof login | typeof logout>;

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
