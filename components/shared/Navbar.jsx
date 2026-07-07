'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client'; // আপনার প্রজেক্টের পাথ অনুযায়ী ঠিক করে নিন
import { CartDrawer } from '@/ui/CartDrawer';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  
  // States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Better Auth Session Hook
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const userMenuRef = useRef(null);
 

  // Trigger initial entry animation
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close mobile menus whenever a route change happens
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  // ড্রপডাউনের বাইরে ক্লিক করলে যেন মেনু বন্ধ হয়ে যায়
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sign Out Handler
  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.push('/');
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const isActive = (path) => pathname === path;
  const isCategoryActive = (categoryPath) => pathname.startsWith(categoryPath);

  return (
    <nav 
      className={`
        bg-white border-b border-gray-100 fixed w-full z-20 shadow-sm
        transition-all duration-700 ease-out transform
        ${isMounted ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}
      `}
    >
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        
        {/* ================= PART 1: LOGO ================= */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-9 flex items-center justify-center transition-transform group-hover:scale-105">
              <Image src="/hm.png" width={436} height={436} alt="Logo" className="object-contain" />
            </div>
            <span className="self-center text-2xl font-light whitespace-nowrap text-gray-900 tracking-wide">
              Hamim<span className="text-[#EA580C] font-normal">Mart</span>
            </span>
          </Link>
        </div>

        {/* ================= PART 2: MAIN MENU ================= */}
        <div 
          className={`
            items-center justify-between w-full md:flex md:w-auto md:order-1 
            ${isMobileMenuOpen ? 'block' : 'hidden'} 
            absolute md:relative top-full left-0 bg-white md:bg-transparent 
            border-b md:border-b-0 border-gray-200 p-4 md:p-0 shadow-lg md:shadow-none
          `}
        >
          <ul className="flex flex-col font-light md:flex-row md:space-x-8">
            <li>
              <Link 
                href="/" 
                className={`block py-2 px-3 md:p-0 transition-colors ${
                  isActive('/') ? 'text-[#4CBB17] font-normal' : 'text-gray-600 hover:text-[#4CBB17]'
                }`}
              >
                Home
              </Link>
            </li>
            
            {/* Mega Menu Parent Link */}
            <li 
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <button 
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className={`flex items-center justify-between w-full py-2 px-3 md:p-0 transition-colors font-light ${
                  isCategoryActive('/category') ? 'text-[#EA580C] font-normal' : 'text-gray-600 hover:text-[#EA580C]'
                }`}
              >
                Shop Categories 
                <svg 
                  className={`w-2.5 h-2.5 ms-2.5 transition-transform duration-200 ${
                    isMegaMenuOpen || isCategoryActive('/category') ? 'rotate-180 text-[#EA580C]' : 'text-gray-500'
                  }`} 
                  aria-hidden="true" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 10 6"
                >
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
              </button>
              
              {/* Mega Menu Dropdown */}
              <div 
                className={`
                  absolute left-1/2 -translate-x-1/2 md:top-full z-30 
                  w-[calc(100vw-2rem)] md:w-screen max-w-screen-md pt-2
                  transition-all duration-300 ease-out transform
                  ${isMegaMenuOpen 
                    ? 'opacity-100 translate-y-0 pointer-events-auto visible' 
                    : 'opacity-0 -translate-y-2 pointer-events-none invisible'
                  }
                `}
              >
                <div className="p-6 gap-6 bg-white border border-gray-100 rounded-xl shadow-xl grid grid-cols-1 md:grid-cols-3">
                  <div>
                    <h3 className="font-normal text-gray-900 border-b border-gray-100 pb-2 mb-3 text-xs tracking-wider uppercase">Daily Essentials</h3>
                    <ul className="space-y-2 text-sm font-light">
                      <li>
                        <Link href="/category/rice-flour" className={`block transition-colors ${isActive('/category/rice-flour') ? 'text-[#4CBB17] font-normal' : 'text-gray-500 hover:text-[#4CBB17]'}`}>
                          Rice, Atta & Maida
                        </Link>
                      </li>
                      <li>
                        <Link href="/category/dal-spices" className={`block transition-colors ${isActive('/category/dal-spices') ? 'text-[#4CBB17] font-normal' : 'text-gray-500 hover:text-[#4CBB17]'}`}>
                          Dal, Lentils & Spices
                        </Link>
                      </li>
                      <li>
                        <Link href="/category/oil-ghee" className={`block transition-colors ${isActive('/category/oil-ghee') ? 'text-[#4CBB17] font-normal' : 'text-gray-500 hover:text-[#4CBB17]'}`}>
                          Edible Oil & Ghee
                        </Link>
                      </li>
                             <li>
                        <Link href="/category/peyajAluRasun" className={`block transition-colors ${isActive('/category/peyajAluRasun') ? 'text-[#4CBB17] font-normal' : 'text-gray-500 hover:text-[#4CBB17]'}`}>
                         peyaj Alu Rasun
                        </Link>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-normal text-gray-900 border-b border-gray-100 pb-2 mb-3 text-xs tracking-wider uppercase">Packaged & Care</h3>
                    <ul className="space-y-2 text-sm font-light">
                      <li>
                        <Link href="/category/snacks" className={`block transition-colors ${isActive('/category/snacks') ? 'text-[#4CBB17] font-normal' : 'text-gray-500 hover:text-[#4CBB17]'}`}>
                          Tea, Coffee & Snacks
                        </Link>
                      </li>
                      <li>
                        <Link href="/category/personal-care" className={`block transition-colors ${isActive('/category/personal-care') ? 'text-[#4CBB17] font-normal' : 'text-gray-500 hover:text-[#4CBB17]'}`}>
                          Soap, Shampoo & Toiletries
                        </Link>
                      </li>
     
               
                
                      <li>
                        <Link href="/category/DryFruit" className={`block transition-colors ${isActive('/category/DryFruit') ? 'text-[#4CBB17] font-normal' : 'text-gray-500 hover:text-[#4CBB17]'}`}>
                         Dry Fruit
                        </Link>
                      </li>
                      <li>
                        <Link href="/category/household" className={`block transition-colors ${isActive('/category/household') ? 'text-[#4CBB17] font-normal' : 'text-gray-500 hover:text-[#4CBB17]'}`}>
                          Detergents & Cleaners
                        </Link>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50/40 p-4 rounded-xl flex flex-col justify-between mt-4 md:mt-0 border border-orange-50">
                    <div>
                      <span className="bg-[#EA580C] text-white text-[10px] font-normal px-2 py-0.5 rounded uppercase tracking-wider">Super Deal</span>
                      <h3 className="font-normal text-gray-900 mt-2 mb-1 text-sm">Up to 30% Off</h3>
                      <p className="text-xs text-gray-500 font-light leading-relaxed mb-3">
                        Get massive discounts on everyday grocery provisions and household items.
                      </p>
                    </div>
                    <Link href="/offers" className="text-xs font-normal text-[#EA580C] hover:text-[#c2410c] inline-flex items-center group/link">
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
              <Link href="/product" className={`block py-2 px-3 md:p-0 transition-colors ${isActive('/product') ? 'text-[#EA580C] font-normal' : 'text-gray-600 hover:text-[#EA580C]'}`}>
                All Product
              </Link>
            </li>
            <li>
              <Link href="/offers" className={`block py-2 px-3 md:p-0 transition-colors ${isActive('/offers') ? 'text-[#EA580C] font-normal' : 'text-gray-600 hover:text-[#EA580C]'}`}>
                Top Deals
              </Link>
            </li>
          </ul>
        </div>

        {/* ================= PART 3: ICONS & USER DROPDOWN ================= */}
        <div className="flex items-center space-x-2 md:order-2">
          
          {/* Cart Icon Link */}

          <CartDrawer user={user}/>

          {/* DYNAMIC USER PROFILE / LOGIN SECTION */}
          {isPending ? (
            // Loading State (Skeleton বা খালি স্পেস রাখা যায়)
            <div className="w-10 h-10 rounded-full bg-gray-50 animate-pulse animate-duration-500" />
          ) : user ? (
            // LOGGED IN: User Dropdown Trigger
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center text-sm bg-gray-100 rounded-full focus:ring-2 focus:ring-gray-100 p-1 md:me-0 transition-all hover:bg-gray-200"
              >
                <span className="sr-only">Open user menu</span>
                {user.image ? (
                  <Image 
                    className="w-7 h-7 rounded-full object-cover" 
                    src={user.image} 
                    width={28} 
                    height={28} 
                    alt="user photo" 
                  />
                ) : (
                  // প্রোফাইল পিক না থাকলে নামের প্রথম অক্ষর দেখাবে
                  <div className="w-7 h-7 rounded-full bg-[#EA580C] text-white flex items-center justify-center text-xs font-medium">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </button>

              {/* User Dropdown Box */}
              <div
                className={`
                  absolute right-0 mt-2 z-50 my-4 text-base list-none bg-white border border-gray-100 divide-y divide-gray-100 rounded-xl shadow-xl w-48
                  transition-all duration-200 ease-out transform origin-top-right
                  ${isUserMenuOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}
                `}
              >
                <div className="px-4 py-3">
                  <span className="block text-sm font-normal text-gray-900 truncate">{user.name}</span>
                  <span className="block text-xs font-light text-gray-400 truncate mt-0.5">{user.email}</span>
                </div>
                <ul className="py-1 text-sm font-light text-gray-700" aria-labelledby="user-menu-button">
                  <li>
                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/orders" className="block px-4 py-2 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                      My Orders
                    </Link>
                  </li>
                </ul>
                <div className="py-1">
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm font-light text-red-500 hover:bg-red-50/50 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // NOT LOGGED IN: Show Login Icon Link
            <Link 
              href="/auth/account" 
              className={`p-2 transition-colors ${isActive('/auth/account') ? 'text-[#4CBB17]' : 'text-gray-600 hover:text-[#4CBB17]'}`} 
              aria-label="User Account"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path>
              </svg>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button" 
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-xl md:hidden hover:bg-gray-50 focus:outline-none transition-colors"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
          
        </div>

      </div>
    </nav>
  );
}