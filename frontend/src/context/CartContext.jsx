import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartFromStorage = localStorage.getItem('cartItems');
    if (cartFromStorage) {
      setCartItems(JSON.parse(cartFromStorage));
    }
  }, []);

  const addToCart = (product, qty) => {
    setCartItems((prevItems) => {
      const existItem = prevItems.find((x) => x.product === product._id);
      let newItems;
      if (existItem) {
        newItems = prevItems.map((x) =>
          x.product === product._id ? { ...x, qty: x.qty + qty } : x
        );
      } else {
        newItems = [...prevItems, {
          product: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          countInStock: product.stock,
          qty
        }];
      }
      localStorage.setItem('cartItems', JSON.stringify(newItems));
      return newItems;
    });
  };

  const removeFromCart = (id) => {
    const newItems = cartItems.filter((x) => x.product !== id);
    setCartItems(newItems);
    localStorage.setItem('cartItems', JSON.stringify(newItems));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
