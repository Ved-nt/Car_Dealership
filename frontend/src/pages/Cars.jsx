import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Cars = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const cardsRef = useRef([]);

  // Fetch all cars
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("https://car-dealership-ft4k.onrender.com/api/cars");
        setCars(res.data.cars);
      } catch (err) {
        console.error("Error fetching cars:", err);
      }
    };
    fetchCars();
  }, []);

  // Animate cards on scroll
  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, [cars]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-24 pb-16">
      <h1 className="text-4xl md:text-5xl font-bold text-cyan-700 mb-12 text-center">
        Available Cars
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car, index) => (
          <div
            key={car._id}
            ref={(el) => (cardsRef.current[index] = el)}
            className={`relative bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-transform hover:scale-105 cursor-pointer ${
              car.isSold ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => !car.isSold && navigate(`/cars/${car._id}`)}
          >
            {/* SOLD Tag */}
            {car.isSold && (
              <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                SOLD
              </div>
            )}

            {/* Car Image */}
            <img
              src={car.images?.[0] || "/placeholder.jpg"}
              alt={car.name}
              className="w-full h-52 object-cover"
            />

            {/* Car Details */}
            <div className="p-5">
              <h2 className="text-xl text-black font-semibold mb-2">{car.name}</h2>
              <p className="text-gray-600 mb-2">
                {car.year} • {car.fuelType} • {car.driven}
              </p>
              <p className="text-gray-800 font-bold mb-4">₹ {car.price}</p>
              <button
                className={`w-full ${
                  car.isSold
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-cyan-500 hover:bg-cyan-600"
                } text-white font-semibold py-2 rounded-xl transition-all shadow-md hover:shadow-cyan-400/50`}
                disabled={car.isSold}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;


