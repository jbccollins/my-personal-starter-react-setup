import { combineReducers } from "redux";
import { productsReducer } from "./modules/products";
import { sessionReducer } from "./modules/session";
import { connectRouter } from "connected-react-router";

export const createRootReducer = (history: any) =>
  combineReducers({
    products: productsReducer,
    session: sessionReducer,
    router: connectRouter(history)
  });