import { combineReducers } from "redux";
import { userReducer } from "./modules/user";
import { productsReducer } from "./modules/products";
import { connectRouter } from "connected-react-router";

export const createRootReducer = (history: any) =>
  combineReducers({
    user: userReducer,
    products: productsReducer,
    router: connectRouter(history)
  });