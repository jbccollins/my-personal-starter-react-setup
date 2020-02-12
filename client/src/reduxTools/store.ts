import { createBrowserHistory } from "history";
import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { createRootReducer } from "@redux/index";
import thunk from "redux-thunk";

export const history = createBrowserHistory();

const initialState = {};

export const rootReducer = createRootReducer(history);

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))
);

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;