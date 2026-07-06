'use client'
import React, { createContext, useContext, useState } from 'react';

// ১. কনটেক্সট তৈরি
const CartContext = createContext();

// ২. প্রোভাইডার কম্পোনেন্ট
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // কার্টে আইটেম যোগ করার গ্লোবাল ফাংশন
  const addToCartGlobal = (itemData) => {
    setCart((prevCart) => {
      // চেক করা হচ্ছে প্রোডাক্টটি অলরেডি কার্টে আছে কিনা
      const existingItemIndex = prevCart.findIndex(i => i.productId === itemData.productId);

      if (existingItemIndex > -1) {
        // থাকলে একদম নিখুঁত উপায়ে নতুন অবজেক্ট তৈরি করে আপডেট করা হচ্ছে (ইমিউটেবলি)
        return prevCart.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: item.quantity + itemData.quantity,
              totalPrice: item.totalPrice + itemData.totalPrice,
              originalPrice: (item.originalPrice || 0) + (itemData.originalPrice || 0)
            };
          }
          return item;
        });
      } else {
        // না থাকলে সম্পূর্ণ নতুন আইটেম হিসেবে পুশ হবে
        return [...prevCart, itemData];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCartGlobal }}>
      {children}
    </CartContext.Provider>
  );
};

// ৩. কাস্টম হুক
export const useCart = () => useContext(CartContext);