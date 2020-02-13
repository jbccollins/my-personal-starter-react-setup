import { typedAction } from "@redux/helpers";
import Http from "@utilities/http";
import { getSession } from "@auth/getSession";

const initialState: UserState = { username: null };

var data = {
  email: "sean.maxwell@gmail.com",
  password: "Password@1"
};

export const authenticateLogin = async () => {
  const res = await Http.Post('/api/auth/login', data);
  const resJson = await res.json();
  console.log(resJson);
  const session = getSession(resJson['sessionToken']);
  console.log(session);
}

export const login = (username: string) => {
  authenticateLogin();
  return typedAction("user/LOGIN", username);
};

export const logout = () => {
  return typedAction("user/LOGOUT");
};

type UserAction = ReturnType<typeof login | typeof logout>;

export function userReducer(
  state = initialState,
  action: UserAction
): UserState {
  switch (action.type) {
    case "user/LOGIN":
      return { username: action.payload };
    case "user/LOGOUT":
      return { username: null };
    default:
      return state;
  }
}
