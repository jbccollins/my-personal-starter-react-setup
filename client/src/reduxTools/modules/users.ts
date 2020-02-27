import { typedAction } from "@redux/helpers";
import { Dispatch, AnyAction } from "redux";
import { RootState } from "@redux/store";
import { User } from "@shared/types/User";
import { getAllUsers } from "@api/user";
const USERS_REQUESTED = "users/USERS_REQUESTED";
const USERS_RECEIVED = "users/USERS_RECEIVED";
const USERS_ERRORED = "users/USERS_ERRORED";

const requestUsers = () => typedAction(USERS_REQUESTED);
const receiveUsers = (users: User[]) => typedAction(USERS_RECEIVED, { users });
const handleUsersError = (error: any) => typedAction(USERS_ERRORED, { error });

export const fetchUsers = async (dispatch: Dispatch<AnyAction>) => {
  dispatch(requestUsers());
  try {
    const users = await getAllUsers();
    dispatch(receiveUsers(users));
  } catch (e) {
    dispatch(handleUsersError(e));
    console.warn(e);
  }
};

export const lazyFetchUsers = () => {
  return (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const {
      users: { users, fetching }
    } = getState();
    if (users === null && !fetching) {
      fetchUsers(dispatch);
    }
  };
};

export type UsersState = {
  users: User[] | null,
  fetching: boolean,
  error: boolean,
}
type UsersAction = ReturnType<typeof requestUsers | typeof receiveUsers | typeof handleUsersError>;

const initialUsersState: UsersState = {
  users: null,
  fetching: false,
  error: false,
};

export const usersReducer = (state = initialUsersState, action: UsersAction) => {
  switch (action.type) {
    case USERS_REQUESTED:
      return {
        ...state,
        fetching: true
      };

    case USERS_RECEIVED:
      return {
        ...state,
        users: action.payload.users,
        fetching: false,
        error: false
      };
    case USERS_ERRORED:
      return {
        ...state,
        users: null,
        fetching: false,
        error: true
      };
    default:
      return state;
  }
};