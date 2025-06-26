import React, { createContext, useState, useEffect } from "react";

// Create context
export const CartContext = createContext();

// Main provider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartInitialized, setIsCartInitialized] = useState(false);
  // Load the cart from localStorage when initialized
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    console.log("Cart loaded from localStorage:", savedCart);
    if (savedCart) setCart(JSON.parse(savedCart));
    setIsCartInitialized(true);
  }, []);

  // Save cart only if initialized
  useEffect(() => {
    if (isCartInitialized) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isCartInitialized]);

  // Add to card function/check if the product exists
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // Delete the product
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  // Update cart 
  const updateCartItem = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculating total of products
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculating total of price and quantity
  const getTotalSum = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        getTotalItems,
        getTotalSum,
        setCart, 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
