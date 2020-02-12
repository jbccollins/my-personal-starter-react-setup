import { RootState } from "@redux/store";

export const numberOfItems = (state: RootState) => {
  return state.products.cart.reduce((acc, el) => acc + el.quantity, 0);
};
