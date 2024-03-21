import { createContext } from "react";
import { CakeProps } from "../pages/Home"

export type CartItem = CakeProps & { 
  quantity: number;
}

export type CartContext = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (_id: number) => void
  deleteItem: (id: number) => void
  clearCart: () => void
  totalItems: () => number
  totalAmount: () => number
}

const CartContext = createContext<CartContext>(null!)

export default CartContext