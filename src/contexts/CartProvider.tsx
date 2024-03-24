import { ReactNode, useState } from "react";
import CartContext, { CartItem } from "./CartContext";

interface CartProviderProps {
  children: ReactNode;
}

function CartProvider({ children }: CartProviderProps) {

  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (_item: CartItem) => {
    const existingItem = items.find(({ id }) => id === _item.id)
    const itemsLoc = [...items];

    if(existingItem){
      itemsLoc.map(item => {
        if(item.id === existingItem.id){
            item.quantity++; 
        }
          //v.id === existingItem.id ? 
          //itemsLoc.push(v)
      })
    }else{
      itemsLoc.push(_item);
    }

    setItems(itemsLoc);

  }

  const deleteItem = (id: number) => {
    const itemsAfterRemove = items.filter((item) => item.id !== id )
    setItems(itemsAfterRemove)
  }

  const removeItem = (id: number) => {
    const itemToRemove = items.find((item) => item.id === id);

    // Verifica se o item existe
    if (!itemToRemove) 
      return
  
    if (itemToRemove.quantity === 1) {
      const confirmRemove = window.confirm("Tem certeza de que deseja remover este item do carrinho?");
      if (confirmRemove){
        deleteItem(id)
        return; // Se o usuário cancelar, sai da função
      }
    }
    else{
      const itemsAfterRemove = items.map((item) => 
        item.id === id 
        ?
        {
          ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 0
        }
        :
        item
      )
      setItems(itemsAfterRemove)
    }
    
  }

  

  const clearCart = () => {
    setItems([]);
  };

  const totalAmount = () => {
    let total = 0
    for(const item of items){
      total += item.quantity * item.price
    }
    return total
  }

  const totalItems = () => {
    let total = 0
    for(const item of items){
      total += item.quantity
    }
    return total
  }

    return (
      <CartContext.Provider
        value={{
          items,
          addItem,
          removeItem,
          deleteItem,
          clearCart,
          totalAmount,
          totalItems
        }}
      >
        {children}
      </CartContext.Provider>
    )
}

export default CartProvider