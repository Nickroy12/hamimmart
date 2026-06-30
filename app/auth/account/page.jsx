"use client";

import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import React, { useState } from 'react';

const AuthPage = () => {
  // true = Sign Up, false = Sign In
  const [isSignUp, setIsSignUp] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '', 
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        const { data, error } = await authClient.signUp.email({
          email: formData.email,
          password: formData.password,
          name: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          callbackURL:'/'
        });

        if (error) {
          alert(error.message || "Signup failed");
          return;
        }

        alert("Account created successfully!");
        console.log('Sign Up Success:', data);
      } catch (err) {
        console.error(err);
        alert("An unexpected error occurred.");
      }
    } else {
      try {
        const { data, error } = await authClient.signIn.email({
          email: formData.email,
          password: formData.password,
          callbackURL:'/'
        });

        if (error) {
          alert(error.message || "Sign in failed");
          return;
        }

        alert("Signed in successfully!");
        console.log('Sign In Success:', data);
      } catch (err) {
        console.error(err);
        alert("An unexpected error occurred.");
      }
    }
  };

  // টগল পরিবর্তন করার ফাংশন
  const handleToggle = (targetState) => {
    setIsSignUp(targetState);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="min-h-screen flex flex-col py-17 md:flex-row" style={{ fontFamily: 'sans-serif' }}>
      
      {/* LEFT PARTITION: Brand Banner */}
      <div className="hidden md:flex md:w-1/2  flex-col justify-center items-center p-12 border-r border-gray-100">
        <div className="max-w-md text-center md:text-left space-y-6">
          <div className="flex items-center justify-center md:justify-start gap-2 text-2xl font-normal tracking-wide">
            <Image src='/hm.png' width={60} height={60} alt='logo'/>
            <span className="text-[#FF5722] font-medium">Hamim</span>
            <span className="text-[#4CAF50] font-light">Mart</span>
          </div>
          
          <h1 className="text-4xl font-light text-gray-900 tracking-tight leading-tight">
            Your Daily Essentials <br />
            All Under One Roof.
          </h1>
          
          <p className="text-gray-500 text-base font-light leading-relaxed">
            From rice, lentils, and oil to packaged food and household items—order everything you need easily and enjoy lightning-fast delivery.
          </p>

          <div className="pt-4 space-y-3">
            <div className="flex items-center gap-3 text-sm font-light text-gray-600">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4CAF50]/10 text-[#4CAF50] font-normal">✓</span>
              Daily Fresh Essentials
            </div>
            <div className="flex items-center gap-3 text-sm font-light text-gray-600">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4CAF50]/10 text-[#4CAF50] font-normal">✓</span>
              Fast & Safe Delivery
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PARTITION: Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 md:w-1/2">
        <div className="max-w-md w-full space-y-6">
          
          {/* Mobile View Header */}
          <div className="text-center md:hidden mb-4">
            <h2 className="text-2xl font-normal tracking-wide text-gray-900">
              <span className="text-[#FF5722] font-medium">Hamim</span><span className="text-[#4CAF50] font-light">Mart</span>
            </h2>
          </div>

          {/* TOGGLE SWITCH */}
          <div className="flex justify-center md:justify-start">
            <div className="relative p-1 -[#FF5722] rounded-lg flex w-64 shadow-inner">
              {/* Sliding Background */}
              <div 
                className={`absolute top-1 bottom-1 rounded-md bg-[#FF5722]  shadow-sm transition-all duration-300 ease-out w-[calc(50%-4px)] ${
                  isSignUp ? 'left-[calc(50%+2px)]' : 'left-1'
                }`}
              />
              
              <button
                type="button"
                onClick={() => handleToggle(false)}
                className={`relative z-10 w-1/2 cursor-pointer text-center py-1.5 text-xs font-normal rounded-md transition-colors duration-200 ${
                  !isSignUp ? 'text-white font-medium' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Sign In
              </button>
              
              <button
                type="button"
                onClick={() => handleToggle(true)}
                className={`relative z-10 w-1/2 text-center cursor-pointer py-1.5 text-xs font-normal rounded-md transition-colors duration-200 ${
                  isSignUp ? 'text-white font-medium' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Form Heading */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-light text-gray-950 tracking-tight">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-sm font-light text-gray-400 mt-1">
              {isSignUp ? "Get started with your free account today." : "Sign in to your account to continue shopping."}
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {/* Full Name (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-light text-gray-600 mb-1">Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-200 font-light placeholder-gray-300 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#FF5722] focus:border-[#FF5722] sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
            )}

            {/* Email Address (Both) */}
            <div>
              <label className="block text-sm font-light text-gray-600 mb-1">Email Address</label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-200 font-light placeholder-gray-300 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#FF5722] focus:border-[#FF5722] sm:text-sm"
                placeholder="name@example.com"
              />
            </div>

            {/* Phone Number (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-light text-gray-600 mb-1">Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-200 font-light placeholder-gray-300 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#FF5722] focus:border-[#FF5722] sm:text-sm"
                  placeholder="+880 1XXX-XXXXXX"
                />
              </div>
            )}

            {/* Delivery Address (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-light text-gray-600 mb-1">Delivery Address</label>
                <textarea
                  name="address"
                  required
                  rows="2"
                  value={formData.address}
                  onChange={handleChange}
                  className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-200 font-light placeholder-gray-300 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#FF5722] focus:border-[#FF5722] sm:text-sm resize-none"
                  placeholder="House #, Road #, Area, City"
                />
              </div>
            )}

            {/* Password (Both) */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-light text-gray-600">Password</label>
                {!isSignUp && (
                  <a href="#" className="text-xs font-light text-[#FF5722] hover:underline">
                    Forgot Password?
                  </a>
                )}
              </div>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none rounded-md block w-full px-3 py-2 pr-12 border border-gray-200 font-light placeholder-gray-300 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#FF5722] focus:border-[#FF5722] sm:text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-xs font-normal text-gray-400 hover:text-gray-600 select-none focus:outline-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Confirm Password (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-light text-gray-600 mb-1">Confirm Password</label>
                <div className="relative flex items-center">
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="appearance-none rounded-md block w-full px-3 py-2 pr-12 border border-gray-200 font-light placeholder-gray-300 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#FF5722] focus:border-[#FF5722] sm:text-sm"
                    placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 text-xs font-normal text-gray-400 hover:text-gray-600 select-none focus:outline-none"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
                </div>
              </div>
            )}

            {/* Terms and Conditions (Sign Up Only) */}
            {isSignUp && (
              <div className="flex items-center">
                <input
                  name="agreeTerms"
                  type="checkbox"
                  required
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#FF5722] focus:ring-[#FF5722] border-gray-200 rounded cursor-pointer"
                />
                <label className="ml-2 block text-sm font-light text-gray-500 select-none">
                  I agree to the <a href="#" className="text-[#FF5722] hover:underline font-normal">Terms & Conditions</a>
                </label>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-light rounded-md text-white bg-[#FF5722] hover:bg-[#e64a19] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5722] transition-colors duration-200 shadow-sm"
              >
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default AuthPage;