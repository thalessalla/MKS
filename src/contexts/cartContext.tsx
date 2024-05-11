import React, { createContext, useContext, useState } from "react";

interface CartItemType {
  photo: string;
  id: number;
  name: string;
  price: number;
  qtd: number;
  value: number;
}

interface CartContextType {
  cart: CartItemType[];
  addToCart: (item: CartItemType) => void;
  removeFromCart: (itemId: number) => void;
  itemSubtraction: (item: CartItemType) => void;
}

const initialCart: CartItemType[] = [];

const AppContext = createContext<CartContextType>({
  cart: initialCart,
  addToCart: () => {},
  removeFromCart: () => {},
  itemSubtraction: () => {},
});

export const useCart = () => useContext(AppContext);

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItemType[]>(initialCart);

  const addToCart = (item: CartItemType) => {
    const copyProductsCart = [...cart];
    const items = copyProductsCart.find((product) => product.id === item.id);

    if (!items) {
      copyProductsCart.push({
        id: item.id,
        qtd: 1,
        photo: item.photo,
        name: item.name,
        price: item.price,
        value: item.price,
      });
    } else {
      items.qtd = items.qtd + 1;
      items.price = items.value * items.qtd;
    }

    setCart(copyProductsCart);
  };

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const itemSubtraction = (item: CartItemType) => {
    setCart((prevCart) => {
      const copyProductsCart = [...prevCart];
      const existingItem = copyProductsCart.find(
        (product) => product.id === item.id
      );

      if (existingItem) {
        existingItem.qtd -= 1;
        existingItem.price -= item.value;
      }

      return copyProductsCart.filter((product) => product.qtd > 0);
    });
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        itemSubtraction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
