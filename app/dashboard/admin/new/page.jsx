"use client";

import { addGrocery } from "@/lib/action/action";
import React, { useState, useRef } from "react";

export default function GroceryUploadForm() {
  const formRef = useRef(null); // Ref to reset the file input field

  const initialFormState = {
    name: "",
    detail: "",
    category: "",
    quantity: "",
    price: "",
    isStockout: false,
    hasDiscount: false,
    discount: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
      const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const imgbbFormData = new FormData();
      imgbbFormData.append("image", imageFile);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        {
          method: "POST",
          body: imgbbFormData,
        }
      );

      const data = await response.json();

      if (data.success) {
        const uploadedImageUrl = data.data.url;

        const finalProductData = {
          name: formData.name,
          detail: formData.detail,
          category: formData.category,
          quantity: Number(formData.quantity) || 0,
          price: Number(formData.price) || 0,
          image: uploadedImageUrl,
          rating: 5.0,
          status: formData.isStockout ? "soldout" : "in-stock",
          discount: formData.hasDiscount ? Number(formData.discount) || 0 : 0,
        };

        await addGrocery(finalProductData);
        alert("Item uploaded successfully!");

        // Reset fields after successful submit
        setFormData(initialFormState);
        setImageFile(null);
        if (formRef.current) {
          formRef.current.reset(); 
        }
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
    <div className="w-10/12 mx-auto my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-md font-sans">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Upload Grocery Item (Admin)
      </h2>

      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Grocery Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Grocery Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g., Organic Bananas"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EA580C] focus:border-[#EA580C]"
          />
        </div>

        {/* Detail */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Detail / Description
          </label>
          <textarea
            name="detail"
            value={formData.detail}
            onChange={handleChange}
            required
            placeholder="Describe the item..."
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EA580C] focus:border-[#EA580C]"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#EA580C] focus:border-[#EA580C] cursor-pointer text-gray-700"
          >
            <option value="" disabled>
              Select a Category
            </option>
            <option value="riceAttaMaida">Rice, Atta & Maida</option>
            <option value="dalLentilsSpices">Dal, Lentils & Spices</option>
            <option value="edibleOilGhee">Edible Oil & Ghee</option>
            <option value="teaCoffeeSnacks">Tea, Coffee & Snacks</option>
            <option value="soapShampooToiletries">
              Soap, Shampoo & Toiletries
            </option>
            <option value="detergentsCleaners">Detergents & Cleaners</option>
            {/* Newly added categories */}
            <option value="masala">Masala</option>
            <option value="peyajAluRasun">Peyaj Alu Rasun</option>
            <option value="DryFruit">Dry Fruit</option>
          </select>
        </div>

        {/* Quantity and Price Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="0"
              placeholder="50"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EA580C] focus:border-[#EA580C]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="2.99"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EA580C] focus:border-[#EA580C]"
            />
          </div>
        </div>

        {/* Image File Upload Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-[#EA580C] hover:file:bg-orange-100 cursor-pointer"
          />
        </div>

        {/* Toggles Container */}
        <div className="flex flex-col gap-4 mt-2 select-none">
          {/* Soldout / Stockout Toggle Switch */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-100">
            <label
              htmlFor="isStockout"
              className={`text-sm font-semibold cursor-pointer transition-colors duration-200 ${formData.isStockout ? "text-[#EA580C]" : "text-gray-700"}`}
            >
              Mark as Sold Out / Stock Out
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="isStockout"
                name="isStockout"
                checked={formData.isStockout}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EA580C]"></div>
            </label>
          </div>

          {/* Discount Toggle Switch */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-100">
            <label
              htmlFor="hasDiscount"
              className={`text-sm font-semibold cursor-pointer transition-colors duration-200 ${formData.hasDiscount ? "text-[#EA580C]" : "text-gray-700"}`}
            >
              Apply Discount / Offer
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="hasDiscount"
                name="hasDiscount"
                checked={formData.hasDiscount}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EA580C]"></div>
            </label>
          </div>
        </div>

        {/* Conditional Discount Input Field */}
        {formData.hasDiscount && (
          <div className="transition-all duration-300 ease-in-out">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Discount Percentage (%) or Amount
            </label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              required={formData.hasDiscount}
              min="0"
              placeholder="e.g., 10"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EA580C] focus:border-[#EA580C]"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isUploading}
          className={`w-full py-2.5 px-4 rounded-md text-white font-bold transition-colors duration-200 shadow-sm ${
            isUploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#EA580C] hover:bg-[#d64f0b] active:bg-[#bd4408]"
          }`}
        >
          {isUploading ? "Uploading Image..." : "Generate & Upload Item"}
        </button>
      </form>
    </div>
  );
}