import DashboardSidebar from '@/ui/DashboardSidebar'
import React from 'react'

const layout = ({children}) => {
  return (
    // pt-20 দেওয়ায় নেভবারের নিচে পারফেক্টলি জায়গা তৈরি হবে এবং সাইডবার নিচে নামবে
    <div className='flex pt-19 min-h-screen '>
        {/* আপনার ড্যাশবোর্ড সাইডবার */}
        <DashboardSidebar />
        
        {/* মেইন কेशन বা চিলড্রেন কন্টেন্ট */}
        <main className='flex-1 p-4 md:p-6 overflow-x-hidden'>
           {children}
        </main>
    </div>
  )
}

export default layout