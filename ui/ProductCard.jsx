import React from 'react'
import Image from 'next/image' // Next.js Image ইম্পোর্ট করা হয়েছে

const ProductCard = ({ item }) => {
  const discountedPrice = item.discount > 0 
    ? item.price - (item.price * item.discount / 100) 
    : item.price;

  return (
    <div className='group relative bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden'>
      {/* ডিসকাউন্ট ব্যাজ */}
      {item.discount > 0 && (
        <span className='absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-md z-10 animate-pulse'>
          {item.discount}% OFF
        </span>
      )}

      {/* প্রোডাক্ট ইমেজ কন্টেইনার */}
      {/* Next.js responsive বা fill ইমেজ ব্যবহারের জন্য কন্টেইনারে relative উইডথ/হাইট থাকা দরকার */}
      <div className='relative aspect-square bg-gray-50 flex items-center justify-center p-4 overflow-hidden'>
        <Image 
          src={item.image} 
          alt={item.name} 
          fill // কন্টেইনারের পুরো জায়গা জুড়ে থাকার জন্য
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" // রেসপনসিভ সাইজ অপ্টিমাইজেশন
          className='object-contain p-4 group-hover:scale-105 transition-transform duration-300'
          loading="lazy" // বাই-ডিফল্ট লেজি লোড হয়, তাও নিশ্চিত করার জন্য রাখা হলো
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

        <p className='text-xs text-gray-500 mb-4'>
          Available: <span className='font-semibold text-gray-700'>{item.quantity} items</span>
        </p>

        <div className='mt-auto pt-3 border-t border-gray-50 flex items-center justify-between'>
          <div>
            <span className='text-xl font-bold text-gray-900'>
              ৳{discountedPrice.toLocaleString()}
            </span>
            {item.discount > 0 && (
              <span className='block text-xs text-gray-400 line-through'>
                ৳{item.price.toLocaleString()}
              </span>
            )}
          </div>

          <button 
            disabled={item.status !== 'in-stock'}
            className='bg-orange-400 hover:bg-orange-500 text-white disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed px-4 py-2 rounded-xl text-sm font-medium transition-colors'
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard