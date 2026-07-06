'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/context/CartContext' // ১. হুক ইমপোর্ট করা হলো

const ProductCard = ({ item, user }) => {
  // ইউজার কত পিস বা কত প্যাকেট কিনতে চান (বাই-ডিফল্ট ১ প্যাকেট)
  const [orderQuantity, setOrderQuantity] = useState(1); 
  const { addToCartGlobal } = useCart(); // ২. ফাংশনটি কনটেক্সট থেকে নিয়ে আসা হলো

  // একটি একক প্যাকেটের ডিসকাউন্টেড প্রাইস হিসাব
  const singleDiscountedPrice = item.discount > 0 
    ? item.price - (item.price * item.discount / 100) 
    : item.price;

  // গ্রাহকের সিলেক্ট করা মোট কোয়ান্টিটি অনুযায়ী লাইভ দাম হিসাব
  const totalDiscountedPrice = singleDiscountedPrice * orderQuantity;
  const totalOriginalPrice = item.price * orderQuantity;

  // প্যাকেট সংখ্যা বাড়ানোর ফাংশন
  const handleIncrement = () => {
    setOrderQuantity(prev => prev + 1);
  };

  // প্যাকেট সংখ্যা কমানোর ফাংশন (১ এর নিচে নামবে না)
  const handleDecrement = () => {
    if (orderQuantity > 1) {
      setOrderQuantity(prev => prev - 1);
    }
  };

  // কার্টে প্রোডাক্ট যোগ করার ফাংশন (Context API এর সাথে কানেক্টেড)
  const addToCart = () => {
    const cartData = {
      productId: item._id,
      productName: item.name,
      productImage: item.image, // কার্ট ড্রয়ার বা পেজে দেখানোর জন্য ইমেজ পাস করা হলো
      Email: user?.email || null, // ইউজার না থাকলে যেন ক্র্যাশ না করে
      quantity: orderQuantity,
      totalPrice: totalDiscountedPrice,
      originalPrice: totalOriginalPrice
    };

    // ৩. গ্লোবাল কনটেক্সট ফাংশনে ডেটা পাঠিয়ে দেওয়া হলো
    addToCartGlobal(cartData); 
    
    alert(`${item.name} (${orderQuantity} pack) added to cart!`);
  };

  return (
    <div className='group relative bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden'>
      {/* ডিসকাউন্ট ব্যাজ */}
      {item.discount > 0 && (
        <span className='absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-md z-10 animate-pulse'>
          {item.discount}% OFF
        </span>
      )}

      {/* প্রোডাক্ট ইমেজ কন্টেইনার */}
      <div className='relative aspect-square bg-gray-50 flex items-center justify-center p-4 overflow-hidden'>
        <Image 
          src={item.image} 
          alt={item.name} 
          fill 
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" 
          className='object-contain p-4 group-hover:scale-105 transition-transform duration-300'
          loading="lazy" 
        />
      </div>

      {/* প্রোডাক্ট ডিটেইলস */}
      <div className='p-5 flex flex-col flex-grow'>
        <div className='flex items-center justify-between mb-2 text-xs font-medium'>
          <span className={`px-2 py-0.5 rounded-full ${
            item.status === 'in-stock' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {item.status === 'in-stock' ? 'In Stock' : 'Stock Out'}
          </span>
          
          <div className='flex items-center gap-1 text-amber-500'>
            <span>★</span>
            <span className='text-gray-600 font-bold'>{(item.rating || 0).toFixed(1)}</span>
          </div>
        </div>

        <h3 className='text-gray-800 font-semibold text-base line-clamp-2 group-hover:text-orange-400 transition-colors mb-2 min-h-[3rem]'>
          {item.name}
        </h3>

        {/* প্যাকেটের ওজন বা সাইজ */}
        <p className='text-xs text-gray-500 mb-2'>
          Pack Size: <span className='font-semibold text-gray-700'>{item.quantity}</span>
        </p>

        {/* লাইভ প্রাইস এবং কাউন্টার সেকশন */}
        <div className='flex items-center justify-between my-3 pt-2 border-t border-gray-50'>
          <div>
            <span className='text-xl font-bold text-gray-900'>
              ৳{totalDiscountedPrice.toLocaleString()}
            </span>
            {item.discount > 0 && (
              <span className='block text-xs text-gray-400 line-through'>
                ৳{totalOriginalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* কাউন্টার প্লাস-মাইনাস */}
          {item.status === 'in-stock' && (
            <div className='flex items-center justify-between bg-[#81b73e] text-white px-3 py-1 rounded-lg w-24 shadow-sm'>
              <button 
                onClick={handleDecrement}
                disabled={orderQuantity <= 1}
                className='text-lg font-bold hover:scale-110 active:scale-95 transition-transform disabled:opacity-50 px-1 select-none'
              >
                −
              </button>
              <span className='font-semibold text-sm min-w-[1rem] text-center select-none'>
                {orderQuantity}
              </span>
              <button 
                onClick={handleIncrement}
                className='text-lg font-bold hover:scale-110 active:scale-95 transition-transform px-1 select-none'
              >
                +
              </button>
            </div>
          )}
        </div>

        {/* মেইন অ্যাকশন বাটন */}
        <div className='mt-auto pt-2'>
          <button 
            onClick={addToCart}
            disabled={item.status !== 'in-stock'}
            className='w-full bg-orange-400 hover:bg-orange-500 text-white disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed py-2.5 rounded-xl text-sm font-medium transition-colors'
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;