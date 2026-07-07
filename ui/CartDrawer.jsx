'use client'
import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext"; 
import { createOrder } from "@/lib/action/action";
// import { createOrder } from "@/lib/actions/cart.actions"; // আপনার অ্যাকশন লাইব্রেরির সঠিক পাথ দিন

export function CartDrawer({user}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const { cart, clearCart } = useCart(); 


  // কার্টের মোট আইটেম সংখ্যা হিসাব
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // কার্টের মোট ডিসকাউন্টেড প্রাইস হিসাব (সাবটোটাল)
  const subtotal = cart.reduce((total, item) => total + item.totalPrice, 0);

  // অ্যাকশন লাইব্রেরি কল করার হ্যান্ডলার ফাংশন (Option 2)
  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setIsLoading(true);
          // ১. প্রতিটি আইটেমের ভেতরেই totalAmount ও totalQty ঢুকিয়ে ফ্ল্যাট অ্যারে তৈরি
      const formattedItems = cart.map((item) => ({
        name: item.productName,
        userEmail: user.email,
        quantity: item.quantity,
        price: item.totalPrice,
        totalAmount: subtotal, // গ্লোবাল সাবটোটাল প্রতিটি আইটেমে পুশ হচ্ছে
        totalQty: totalItems,   // গ্লোবাল কোয়ান্টিটি প্রতিটি আইটেমে পুশ হচ্ছে
      }));

      // ২. কোনো অবজেক্ট র্যাপ বা ডিস্ট্রাকচার না করে সরাসরি শুধু formattedItems অ্যারে পাস
      const result = await createOrder(formattedItems);
      console.log(result , 'form')

  };

  return (
    <>
      {/* 1. CART TRIGGER BUTTON */}
      <button 
        onClick={() => setIsOpen(true)} 
        className="relative p-2 text-green-600 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
        aria-label="Open Shopping Cart"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path>
        </svg>
        {totalItems > 0 && (
          <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-semibold leading-none text-white bg-[#EA580C] rounded-full transform translate-x-1/4 -translate-y-1/4">
            {totalItems}
          </span>
        )}
      </button>

      {/* 2. BACKDROP OVERLAY */}
      <div 
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`} 
      />

      {/* 3. DRAWER SIDE PANEL */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-xl flex flex-col h-screen transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="px-4 py-6 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
          <h2 className="text-lg font-medium text-gray-900">Shopping Cart ({totalItems})</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <span className="sr-only">Close panel</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body Content (স্ক্রোলযোগ্য এরিয়া) */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 py-12">
              <svg className="w-16 h-16 mb-2 stroke-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              <p className="text-sm font-medium">Your cart is empty</p>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                {item.productImage && (
                  <div className="relative w-16 h-16 bg-white border border-gray-100 rounded-lg p-1 overflow-hidden flex-shrink-0">
                    <Image 
                      src={item.productImage} 
                      alt={item.productName} 
                      fill 
                      className="object-contain"
                    />
                  </div>
                )}
                
                <div className="flex-grow min-w-0">
                  <h4 className="text-sm font-medium text-gray-800 truncate">{item.productName}</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Qty: <span className="font-semibold text-gray-700">{item.quantity}</span>
                  </p>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="text-sm font-bold text-gray-900">
                    ৳{item.totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 px-4 py-5 bg-gray-50 flex-shrink-0 space-y-4">
          <div className="flex items-center justify-between text-base font-medium text-gray-900">
            <span>Subtotal</span>
            <span className="text-xl font-bold text-green-600">৳{subtotal.toLocaleString()}</span>
          </div>
          
          <p className="text-xs text-gray-500">Shipping and taxes calculated at checkout.</p>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button 
              onClick={() => setIsOpen(false)}
              className="flex-1 sm:flex-none px-5 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 bg-white transition-colors"
            >
              Continue Shopping
            </button>
            <button 
              onClick={handleCheckout} 
              disabled={cart.length === 0 || isLoading}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors shadow-sm min-w-[120px] flex items-center justify-center"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Checkout"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}