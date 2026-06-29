'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto font-light text-gray-600">
      <div className="mx-auto max-w-7xl">
        
        {/* Top Grid Section */}
        <div className="px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            
            {/* Column 1: Brand Info */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="w-9 h-9 flex items-center justify-center transition-transform group-hover:scale-105">
                  <Image src="/hm.png" width={436} height={436} alt="Logo" className="object-contain" />
                </div>
                <span className="self-center text-2xl font-light whitespace-nowrap text-gray-900 tracking-wide">
                  Hamim<span className="text-[#EA580C] font-normal">Mart</span>
                </span>
              </Link>
              <p className="text-sm text-gray-500 leading-relaxed">
                আপনার নিত্যদিনের প্রয়োজনীয় চাল, ডাল, তেল থেকে শুরু করে প্যাকেটজাত খাবার ও হাউসহোল্ড সামগ্রী এক ছাদের নিচে।
              </p>
            </div>

            {/* Column 2: Daily Essentials */}
            <div>
              <h3 className="font-normal text-gray-900 pb-2 mb-4 text-xs tracking-wider uppercase border-b border-gray-50">
                Daily Essentials
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/category/rice-flour" className="hover:text-[#4CBB17] transition-colors">
                    Rice, Atta & Maida
                  </Link>
                </li>
                <li>
                  <Link href="/category/dal-spices" className="hover:text-[#4CBB17] transition-colors">
                    Dal, Lentils & Spices
                  </Link>
                </li>
                <li>
                  <Link href="/category/oil-ghee" className="hover:text-[#4CBB17] transition-colors">
                    Edible Oil & Ghee
                  </Link>
                </li>
                <li>
                  <Link href="/category/packaged-food" className="hover:text-[#4CBB17] transition-colors">
                    Noodles & Pasta
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Household & Care */}
            <div>
              <h3 className="font-normal text-gray-900 pb-2 mb-4 text-xs tracking-wider uppercase border-b border-gray-50">
                Household & Care
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/category/personal-care" className="hover:text-[#4CBB17] transition-colors">
                    Soap & Shampoo
                  </Link>
                </li>
                <li>
                  <Link href="/category/household" className="hover:text-[#4CBB17] transition-colors">
                    Detergents & Cleaners
                  </Link>
                </li>
                <li>
                  <Link href="/category/snacks" className="hover:text-[#4CBB17] transition-colors">
                    Tea, Coffee & Snacks
                  </Link>
                </li>
                <li>
                  <Link href="/offers" className="text-[#EA580C] font-normal hover:underline">
                    Top Deals & Offers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Customer Support & Contact */}
            <div>
              <h3 className="font-normal text-gray-900 pb-2 mb-4 text-xs tracking-wider uppercase border-b border-gray-50">
                Contact Us
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start space-x-2.5">
                  <svg className="w-4 h-4 mt-0.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span className="text-gray-500">Uttara, Dhaka, Bangladesh</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <span className="text-gray-500">+880 1XXX-XXXXXX</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <span className="text-gray-500">support@hamimmart.com</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Copyright Section with Gradient */}
        <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 border-t border-gray-100/80 px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 space-y-4 md:space-y-0">
            <p className="text-gray-500">© 2026 Hamim Mart. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/privacy-policy" className="hover:text-gray-600 transition-colors hover:underline">Privacy Policy</Link>
              <Link href="/terms-conditions" className="hover:text-gray-600 transition-colors hover:underline">Terms & Conditions</Link>
              <Link href="/return-refund" className="hover:text-gray-600 transition-colors hover:underline">Return & Refund</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}