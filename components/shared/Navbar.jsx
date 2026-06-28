'use client'
import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  
  // Dummy cart item count status
  const cartCount = 5;

  return (
    <nav className="bg-white border-b border-gray-100 fixed w-full z-20 top-0 start-0 shadow-sm">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        
        {/* ================= PART 1: LOGO (GROCERY MART BRANDING) ================= */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            {/* Fresh Leaf/Cart Groceries Icon Wrapper */}
            <div className="w-9 h-9 rounded-xl bg-[#4CBB17] flex items-center justify-center font-bold text-white transition-transform group-hover:scale-105 shadow-md shadow-green-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
              </svg>
            </div>
            <span className="self-center text-2xl font-black whitespace-nowrap text-gray-900 tracking-tight">
              Hamim<span className="text-[#EA580C]">Mart</span>
            </span>
          </Link>
        </div>

        {/* ================= PART 2: MAIN GROCERY MENU ================= */}
        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMobileMenuOpen ? 'block' : 'hidden'} absolute md:relative top-full left-0 bg-white md:bg-transparent border-b md:border-b-0 border-gray-200 p-4 md:p-0`}>
          <ul className="flex flex-col font-medium md:flex-row md:space-x-8">
            <li>
              <Link href="/" className="block py-2 px-3 text-[#4CBB17] md:p-0 font-semibold">
                Home
              </Link>
            </li>
            
            {/* Mega Menu Parent Link (Categories Dropdown) */}
            <li 
              className="relative group"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <button 
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className="flex items-center justify-between w-full py-2 px-3 text-gray-700 hover:text-[#EA580C] md:hover:bg-transparent md:border-0 md:p-0 transition-colors font-medium"
              >
                Shop Categories 
                <svg 
                  className={`w-2.5 h-2.5 ms-2.5 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180 text-[#EA580C]' : 'text-gray-500'}`} 
                  aria-hidden="true" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 10 6"
                >
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
              </button>
              
              {/* Mega Menu Dropdown Wrapper */}
              <div 
                className={`
                  absolute left-1/2 -translate-x-1/2 top-full z-10 
                  w-screen max-w-screen-md pt-2
                  ${isMegaMenuOpen ? 'block' : 'hidden'}
                `}
              >
                {/* Actual Menu Content Box */}
                <div className="p-6 gap-6 bg-white border border-gray-100 rounded-xl shadow-xl grid grid-cols-1 md:grid-cols-3">
                  {/* Column 1 */}
                  <div>
                    <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2 mb-3 text-xs tracking-wide uppercase">Fresh Produce</h3>
                    <ul className="space-y-2 text-sm">
                      <li><Link href="/category/vegetables" className="text-gray-600 hover:text-[#4CBB17] block transition-colors">Organic Vegetables</Link></li>
                      <li><Link href="/category/fruits" className="text-gray-600 hover:text-[#4CBB17] block transition-colors">Fresh Fruits</Link></li>
                      <li><Link href="/category/herbs" className="text-gray-600 hover:text-[#4CBB17] block transition-colors">Herbs & Seasonings</Link></li>
                    </ul>
                  </div>
                  
                  {/* Column 2 */}
                  <div>
                    <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2 mb-3 text-xs tracking-wide uppercase">Dairy & Meat</h3>
                    <ul className="space-y-2 text-sm">
                      <li><Link href="/category/dairy" className="text-gray-600 hover:text-[#4CBB17] block transition-colors">Milk, Butter & Eggs</Link></li>
                      <li><Link href="/category/meat" className="text-gray-600 hover:text-[#4CBB17] block transition-colors">Fresh Meat & Poultry</Link></li>
                      <li><Link href="/category/seafood" className="text-gray-600 hover:text-[#4CBB17] block transition-colors">Fish & Seafood</Link></li>
                    </ul>
                  </div>
                  
                  {/* Column 3 (Daily Offers Panel with soft Orange background tint) */}
                  <div className="bg-orange-50/60 p-4 rounded-xl flex flex-col justify-between mt-4 md:mt-0 border border-orange-100">
                    <div>
                      <span className="bg-[#EA580C] text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">Super Deal</span>
                      <h3 className="font-bold text-gray-900 mt-2 mb-1 text-sm">Up to 30% Off</h3>
                      <p className="text-xs text-gray-600 leading-relaxed mb-3">
                        Get massive discounts on everyday household essentials this week.
                      </p>
                    </div>
                    <Link href="/offers" className="text-xs font-semibold text-[#EA580C] hover:text-[#c2410c] inline-flex items-center group/link">
                      View Offers 
                      <svg className="w-3 h-3 ms-1 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
            
            <li>
              <Link href="/offers" className="block py-2 px-3 text-gray-700 hover:text-[#EA580C] md:hover:bg-transparent md:p-0 transition-colors">
                Top Deals
              </Link>
            </li>
            <li>
              <Link href="/recipes" className="block py-2 px-3 text-gray-700 hover:text-[#EA580C] md:hover:bg-transparent md:p-0 transition-colors">
                Recipes
              </Link>
            </li>
          </ul>
        </div>

        {/* ================= PART 3: ICONS (CART & ACCOUNT LINK) ================= */}
        <div className="flex items-center space-x-3 md:order-2">
          
          {/* Cart Icon Link with Bright Orange Status Badge */}
          <Link href="/cart" className="relative p-2 text-gray-600 hover:text-[#4CBB17] transition-colors" aria-label="Grocery Cart">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path>
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-black leading-none text-white bg-[#EA580C] rounded-full transform translate-x-1/4 -translate-y-1/4">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Login Icon Link */}
          <Link href="/account" className="p-2 text-gray-600 hover:text-[#4CBB17] transition-colors" aria-label="User Account">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path>
            </svg>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button" 
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-xl md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
          
        </div>

      </div>
    </nav>
  );
}