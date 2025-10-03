// src/pages/CarsAdmin.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CarsAdmin = () => {
  const navigate = useNavigate();
  const [carData, setCarData] = useState({
    name: "",
    brand: "",
    price: "",
    images: ["", "", ""], // 3 placeholders
    description: "",
    year: "",
    fuelType: "",
    driven: "",
    transmission: "",
    ownership: "",
    registration: "",
    color: "",
    bodyType: "",
  });

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    if (name.startsWith("image") && index !== null) {
      const newImages = [...carData.images];
      newImages[index] = value;
      setCarData({ ...carData, images: newImages });
    } else {
      setCarData({ ...carData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/cars", carData);
      alert("Car added successfully!");
      navigate("/cars");
    } catch (err) {
      console.error(err);
      alert("Error adding car!");
    }
  };

  return (
    <div className="min-h-screen px-6 pt-24 pb-16 bg-gray-50">
      <h1 className="text-4xl font-bold text-cyan-500 mb-8 text-center">
        Add New Car
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-2xl flex flex-col gap-4"
      >
        {/* Car Name */}
        <input
          type="text"
          name="name"
          value={carData.name}
          onChange={handleChange}
          placeholder="Car Model (e.g., Endeavour 3.2 4X4 AT)"
          className="p-3 border placeholder-gray-400 text-black rounded-lg"
        />

        {/* Brand */}
        <input
          type="text"
          name="brand"
          value={carData.brand}
          onChange={handleChange}
          placeholder="Brand (e.g., Ford)"
          className="p-3 border placeholder-gray-400 text-black rounded-lg"
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          value={carData.price}
          onChange={handleChange}
          placeholder="Price (e.g., 2395000)"
          className="p-3 border placeholder-gray-400 text-black rounded-lg"
        />

        {/* Image URLs */}
        <div className="flex flex-col gap-2">
          {carData.images.map((img, idx) => (
            <input
              key={idx}
              type="text"
              name={`image${idx}`}
              value={img}
              onChange={(e) => handleChange(e, idx)}
              placeholder={`Image URL ${idx + 1}`}
              className="p-3 border placeholder-gray-400 text-black rounded-lg"
            />
          ))}
        </div>

        {/* Preview first image */}
        <div className="mt-4 text-center">
          <p className="mb-2 font-semibold">Preview:</p>
          <img
            src={carData.images[0] || "/placeholder.jpg"}
            alt="Preview"
            className="w-64 h-40 object-cover mx-auto rounded-xl shadow-lg"
          />
        </div>

        {/* Description */}
        <textarea
          name="description"
          value={carData.description}
          onChange={handleChange}
          placeholder="Description"
          className="p-3 border placeholder-gray-400 text-black rounded-lg"
        />

        {/* Other details */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="year"
            value={carData.year}
            onChange={handleChange}
            placeholder="Year"
            className="p-3 border placeholder-gray-400 text-black rounded-lg"
          />
          <input
            type="text"
            name="fuelType"
            value={carData.fuelType}
            onChange={handleChange}
            placeholder="Fuel Type (e.g., Diesel)"
            className="p-3 border placeholder-gray-400 text-black rounded-lg"
          />
          <input
            type="text"
            name="driven"
            value={carData.driven}
            onChange={handleChange}
            placeholder="Driven (e.g., 69,000 KM)"
            className="p-3 border placeholder-gray-400 text-black rounded-lg"
          />
          <input
            type="text"
            name="transmission"
            value={carData.transmission}
            onChange={handleChange}
            placeholder="Transmission (Automatic / Manual)"
            className="p-3 border placeholder-gray-400 text-black rounded-lg"
          />
          <input
            type="text"
            name="ownership"
            value={carData.ownership}
            onChange={handleChange}
            placeholder="Ownership (First / Second)"
            className="p-3 border placeholder-gray-400 text-black rounded-lg"
          />
          <input
            type="text"
            name="registration"
            value={carData.registration}
            onChange={handleChange}
            placeholder="Registration (e.g., HR)"
            className="p-3 border placeholder-gray-400 text-black rounded-lg"
          />
          <input
            type="text"
            name="color"
            value={carData.color}
            onChange={handleChange}
            placeholder="Color (e.g., White)"
            className="p-3 border placeholder-gray-400 text-black rounded-lg"
          />
          <input
            type="text"
            name="bodyType"
            value={carData.bodyType}
            onChange={handleChange}
            placeholder="Body Type (SUV / Sedan)"
            className="p-3 border placeholder-gray-400 text-black rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-xl transition-transform hover:scale-105 shadow-lg"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default CarsAdmin;
