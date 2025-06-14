import React, { createContext, useState, useEffect } from "react";

// Creezi contextul
export const CartContext = createContext();

// Providerul principal
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartInitialized, setIsCartInitialized] = useState(false);
  // Încarcă coșul din localStorage la inițializare
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    console.log("Cart loaded from localStorage:", savedCart);
    if (savedCart) setCart(JSON.parse(savedCart));
    setIsCartInitialized(true);
  }, []);

  // Salvează coșul în localStorage la orice modificare
  // Asigură-te că nu salvezi înainte de a fi inițializat
  useEffect(() => {
    if (isCartInitialized) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isCartInitialized]);

  // Adaugă produs în coș (sau crește cantitatea dacă există deja)
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

  // Elimină produs din coș
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  // Actualizează cantitatea unui produs
  const updateCartItem = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Golește complet coșul
  const clearCart = () => {
    setCart([]);
  };

  // Numărul total de produse (ex: 2x pizza + 1x supă = 3)
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Suma totală (cu cantități)
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
        setCart, // doar dacă ai nevoie avansat
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
