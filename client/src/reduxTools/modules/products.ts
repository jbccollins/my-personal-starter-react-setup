import { typedAction } from "@redux/helpers";
import { Dispatch, AnyAction } from "redux";
import { RootState } from "@redux/store";
import { ProductState, Product } from "types";

export const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Cool Headphones",
    price: 4999,
    img: "https://placeimg.com/640/480/tech/5"
  },
  {
    id: 2,
    name: "Various Parts",
    price: 1800,
    img: "https://placeimg.com/640/480/tech/10"
  },
  {
    id: 3,
    name: "Skateboard",
    price: 2999,
    img: "https://placeimg.com/640/480/animals/3"
  }
];

const initialState: ProductState = { products: [], loading: false, cart: [] };

const setProducts = (products: Product[]) => {
  return typedAction("products/SET_PRODUCTS", products);
};

export const addToCart = (product: Product, quantity: number) => {
  return typedAction("products/ADD_TO_CART", { product, quantity });
};

export const loadProducts = () => {
  return (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    setTimeout(() => {
      dispatch(
        setProducts([...getState().products.products, ...sampleProducts])
      );
    }, 500);
  };
};

type ProductAction = ReturnType<typeof setProducts | typeof addToCart>;

export function productsReducer(
  state = initialState,
  action: ProductAction
): ProductState {
  switch (action.type) {
    case "products/SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "products/ADD_TO_CART":
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            id: action.payload.product.id,
            quantity: action.payload.quantity
          }
        ]
      };
    default:
      return state;
  }
}
