'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Slider Data with live Unsplash Demo Images
const slides = [
  {
    id: 1,
    title: "Fresh & Organic Daily Essentials",
    subtitle: "Trust in Hamim Mart",
    description: "Get your daily groceries, from premium rice and lentils to pure oils, sourced directly and delivered safely to your doorstep.",
    buttonText: "Shop Now",
    buttonLink: "/shop",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1920&auto=format&fit=crop", 
    badge: "100% Safe Delivery",
    showSearch: true // Custom flag to uniquely render a search bar on this slide
  },
  {
    id: 2,
    title: "Massive Discounts on Household Care",
    subtitle: "Best Brands, Best Prices",
    description: "Enjoy unbeatable deals on laundry detergents, soaps, shampoos, and all household cleaning products. Order hassle-free.",
    buttonText: "View Offers",
    buttonLink: "/offers",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=1920&auto=format&fit=crop",
    badge: "Limited Time Offer",
    showSearch: false
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-play mechanism (Slides switch every 5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Triggers the text animation reset on slide change
  const triggerAnimation = () => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 50);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    triggerAnimation();
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    triggerAnimation();
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
    triggerAnimation();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Directs user to your shop search results page
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full flex items-center transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Full Screen Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
              <Image 
                src={slide.image} 
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover object-center"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent md:bg-gradient-to-r md:from-white/95 md:via-white/75 md:to-transparent bg-white/80" />
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 lg:px-8 z-20 relative w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-7xl h-full">
              
              {/* Left Side: Text Content */}
              <div className={`space-y-4 md:space-y-6 max-w-xl transition-all duration-700 ease-out ${
                animate && index === currentSlide 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}>
                
                {slide.badge && (
                  <span className="inline-block bg-orange-100 text-[#EA580C] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    {slide.badge}
                  </span>
                )}
                
                <div className="space-y-2">
                  <p className="text-sm md:text-base font-bold text-[#4CBB17] tracking-wide uppercase">
                    {slide.subtitle}
                  </p>
                  <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                    {slide.title.split(" ").map((word, i) => 
                      word.toLowerCase().includes("essentials") || word.toLowerCase().includes("discounts") ? (
                        <span key={i} className="text-[#EA580C]"> {word} </span>
                      ) : ` ${word} `
                    )}
                  </h1>
                </div>

                <p className="text-base md:text-lg text-gray-800 font-medium leading-relaxed">
                  {slide.description}
                </p>

                {/* Conditional Slide Feature: Interactive Search Bar or Standard CTA Button */}
                {slide.showSearch ? (
                  <form onSubmit={handleSearchSubmit} className="pt-2 w-full max-w-lg">
                    <div className="relative flex items-center shadow-lg rounded-xl overflow-hidden bg-white border border-gray-200 focus-within:ring-2 focus-within:ring-[#EA580C] focus-within:border-transparent transition-all">
                      <div className="pl-4 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Search for fresh vegetables, rice, oils..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-3 pr-28 py-4 text-gray-900 placeholder-gray-400 font-normal focus:outline-none text-sm md:text-base"
                      />
                      <button
                        type="submit"
                        className="absolute right-2 bg-[#EA580C] hover:bg-[#d44f0b] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all active:scale-95 shadow-sm"
                      >
                        Search
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="pt-2">
                    <Link
                      href={slide.buttonLink}
                      className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-md text-white bg-[#EA580C] hover:bg-[#d44f0b] transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-orange-500/30"
                    >
                      {slide.buttonText}
                    </Link>
                  </div>
                )}
              </div>

              {/* Right Side: Glassmorphism Accent Panel */}
              <div className={`hidden md:flex justify-end items-center h-full relative transition-all duration-1000 delay-100 ${
                animate && index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
                <div className="relative border border-white/40 rounded-2xl bg-white/10 backdrop-blur-md p-8 shadow-2xl max-w-xs text-center border-l-orange-500 border-l-4">
                  <p className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                    {slide.badge}
                  </p>
                  <p className="text-sm text-gray-800 font-medium">
                    {slide.id === 1 
                      ? "Search thousands of items directly from your hero screen." 
                      : "Premium quality products curated carefully for your family."}
                  </p>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-xl transition-all hover:scale-110 active:scale-95 border border-gray-200 hidden sm:block"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={handleNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-xl transition-all hover:scale-110 active:scale-95 border border-gray-200 hidden sm:block"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'w-10 bg-[#EA580C]' : 'w-3 bg-white/60 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </section>
  );
}