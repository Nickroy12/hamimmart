import { getAllProduct } from '@/lib/api/product'
import { getUserSession } from '@/lib/core/session'
import ProductCard from '@/ui/ProductCard'
import React from 'react'


const AllProductPage = async () => {
  // এপিআই থেকে ডাটা ফেচ করা হচ্ছে
  const products = await getAllProduct()
  const user = await getUserSession()
  console.log(user , 'User')

  return (
    <div className='py-20 w-11/12 md:w-10/12 mx-auto'>
      <h1 className='text-3xl font-bold mb-8 text-gray-800'>
        All Products ({products?.length || 0})
      </h1>

      {/* প্রোডাক্ট কার্ড গ্রিড */}
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {products?.map((item) => (
          <ProductCard key={item._id} item={item} user={user} />
        ))}
      </div>
    </div>
  )
}

export default AllProductPage