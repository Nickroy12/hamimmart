'use client'
import { addGrocery } from '@/lib/action/action';
import React, { useState } from 'react';

export default function GroceryUploadForm() {
  const [formData, setFormData] = useState({
    name: '',
    detail: '',
    quantity: '',
    price: '',
    isStockout: false,
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Please select an image to upload.");
      return;
    }

    setIsUploading(true);

    try {
      const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY; // <-- Replace with your real API key
      const imgbbFormData = new FormData();
      imgbbFormData.append('image', imageFile);

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: 'POST',
        body: imgbbFormData,
      });

      const data = await response.json();

      if (data.success) {
        const uploadedImageUrl = data.data.url;

        const finalProductData = {
          name: formData.name,
          detail: formData.detail,
          quantity: Number(formData.quantity) || 0,
          price: Number(formData.price) || 0,
          image: uploadedImageUrl,
          rating: 5.0,             
         
          status: formData.isStockout ? "soldout" : "in-stock"
        };

       
        addGrocery(finalProductData)
      } else {
        alert("Image upload failed: " + data.error.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred during image upload.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-md font-sans">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Upload Grocery Item (Admin)</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        
        {/* Grocery Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Grocery Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            placeholder="e.g., Organic Bananas"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {/* Detail */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Detail / Description</label>
          <textarea 
            name="detail" 
            value={formData.detail} 
            onChange={handleChange} 
            required 
            placeholder="Describe the item..."
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {/* Quantity and Price Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Quantity</label>
            <input 
              type="number" 
              name="quantity" 
              value={formData.quantity} 
              onChange={handleChange} 
              required 
              min="0"
              placeholder="50"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Price ($)</label>
            <input 
              type="number" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              required 
              min="0"
              step="0.01"
              placeholder="2.99"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Image File Upload Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Product Image</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleFileChange} 
            required
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
          />
        </div>

        {/* Soldout / Stockout Toggle */}
        <div className="flex items-center gap-3 mt-2 select-none">
          <input 
            type="checkbox" 
            id="isStockout"
            name="isStockout" 
            checked={formData.isStockout} 
            onChange={handleChange} 
            className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer"
          />
          <label 
            htmlFor="isStockout" 
            className={`text-sm font-semibold cursor-pointer transition-colors duration-200 ${formData.isStockout ? 'text-red-600' : 'text-gray-700'}`}
          >
            Mark as Sold Out / Stock Out
          </label>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={isUploading}
          className={`w-full py-2.5 px-4 rounded-md text-white font-bold transition-colors duration-200 shadow-sm ${
            isUploading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800'
          }`}
        >
          {isUploading ? 'Uploading Image...' : 'Generate & Upload Item'}
        </button>
      </form>

      {/* Live Output Preview */}

    </div>
  );
}