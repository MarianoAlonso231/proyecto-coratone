import { createContext, useContext, useState } from "react";

const CartContext = createContext<{ cart: any[]; addToCart: (product: any) => void; removeFromCart: (id: string) => void } | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (product: any) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
};