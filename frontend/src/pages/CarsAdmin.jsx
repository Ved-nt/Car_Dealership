// src/pages/CarsAdmin.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const CarsAdmin = () => {
  const [carData, setCarData] = useState({
    name: "",
    brand: "",
    price: "",
    images: [""],
    description: "",
    year: "",
    fuelType: "",
    driven: "",
    transmission: "",
    ownership: "",
    registration: "",
    color: "",
    bodyType: "",
    sold: false, // track sold status
  });

  const [allCars, setAllCars] = useState([]);

  // Fetch all cars to display in admin panel
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cars");
        setAllCars(res.data.cars);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCars();
  }, []);

  const handleChange = (e, index = null) => {
    const { name, value, type, checked } = e.target;

    if (name === "image" && index !== null) {
      const newImages = [...carData.images];
      newImages[index] = value;
      setCarData({ ...carData, images: newImages });
    } else if (type === "checkbox") {
      setCarData({ ...carData, [name]: checked });
    } else {
      setCarData({ ...carData, [name]: value });
    }
  };

  const addImageField = () => {
    setCarData({ ...carData, images: [...carData.images, ""] });
  };

  const removeImageField = (index) => {
    const newImages = carData.images.filter((_, i) => i !== index);
    setCarData({ ...carData, images: newImages });
  };

  // Submit new car
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/cars", carData);
      alert("Car added successfully!");
      setCarData({
        name: "",
        brand: "",
        price: "",
        images: [""],
        description: "",
        year: "",
        fuelType: "",
        driven: "",
        transmission: "",
        ownership: "",
        registration: "",
        color: "",
        bodyType: "",
        sold: false,
      });
      const res = await axios.get("http://localhost:5000/api/cars");
      setAllCars(res.data.cars);
    } catch (err) {
      console.error(err);
      alert("Error adding car!");
    }
  };

  // Mark car as sold
  const markAsSold = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/cars/${id}/sold`);
      setAllCars(allCars.map(car => car._id === id ? { ...car, sold: true } : car));
    } catch (err) {
      console.error(err);
      alert("Error marking car as sold");
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
          required
        />

        {/* Brand */}
        <input
          type="text"
          name="brand"
          value={carData.brand}
          onChange={handleChange}
          placeholder="Brand (e.g., Ford)"
          className="p-3 border placeholder-gray-400 text-black rounded-lg"
          required
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          value={carData.price}
          onChange={handleChange}
          placeholder="Price (e.g., 2395000)"
          className="p-3 border placeholder-gray-400 text-black rounded-lg"
          required
        />

        {/* Image URLs */}
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-black mb-1">Image URLs:</p>
          {carData.images.map((img, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <input
                type="text"
                name="image"
                value={img}
                onChange={(e) => handleChange(e, idx)}
                placeholder={`Image URL ${idx + 1}`}
                className="p-3 border placeholder-gray-400 text-black rounded-lg flex-1"
              />
              {carData.images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageField(idx)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="mt-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm self-start"
          >
            + Add Image
          </button>
        </div>

        {/* Preview first image */}
        {carData.images[0] && (
          <div className="mt-4 text-center">
            <p className="mb-2 font-semibold">Preview:</p>
            <img
              src={carData.images[0]}
              alt="Preview"
              className="w-64 h-40 object-cover mx-auto rounded-xl shadow-lg"
            />
          </div>
        )}

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

        {/* Sold Checkbox */}
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            name="sold"
            checked={carData.sold}
            onChange={handleChange}
            id="sold"
          />
          <label htmlFor="sold" className="text-black font-medium">
            Mark as Sold
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-xl transition-transform hover:scale-105 shadow-lg"
        >
          Add Car
        </button>
      </form>

      {/* Manage Cars Section */}
      <h2 className="text-2xl font-bold text-cyan-700 mt-12 mb-4 text-center">
        Manage Cars
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allCars.map((car) => (
          <div key={car._id} className="bg-white p-4 rounded-xl shadow-lg relative">
            {car.sold && (
              <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                SOLD
              </div>
            )}
            <img
              src={car.images[0] || "/placeholder.jpg"}
              alt={car.name}
              className="w-full h-40 object-cover rounded-lg mb-2"
            />
            <h3 className="font-semibold text-black text-lg">{car.name}</h3>
            <p className="text-gray-600">{car.brand} • ₹ {car.price}</p>
            {!car.sold && (
              <button
                onClick={() => markAsSold(car._id)}
                className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg"
              >
                Mark as Sold
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarsAdmin;
