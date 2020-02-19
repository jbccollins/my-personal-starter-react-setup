import { User } from "shared/types/User";

type Product = {
  id: number;
  name: string;
  price: number;
  img: string;
};

type CartItem = {
  id: number;
  quantity: number;
};

type ProductState = {
  products: Product[];
  loading: boolean;
  cart: CartItem[];
};

type Session = {
  user: User;
}