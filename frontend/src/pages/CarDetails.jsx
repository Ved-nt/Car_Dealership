// src/pages/CarDetails.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [relatedCars, setRelatedCars] = useState([]);
  const relatedRefs = useRef([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`https://car-dealership-1.onrender.com/api/cars/${id}`);
        setCar(res.data.car);
      } catch (err) {
        console.error("Error fetching car:", err);
      }
    };
    fetchCar();
  }, [id]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await axios.get(`https://car-dealership-1.onrender.com/api/cars`);
        setRelatedCars(res.data.cars.filter((c) => c._id !== id));
      } catch (err) {
        console.error("Error fetching related cars:", err);
      }
    };
    fetchRelated();
  }, [id]);

  // Animate related cars
  useEffect(() => {
    relatedRefs.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
        }
      );
    });
  }, [relatedCars]);

  if (!car) return <div className="min-h-screen flex justify-center items-center">Loading...</div>;

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % car.images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + car.images.length) % car.images.length);

  // Scroll carousel left/right
  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -260, behavior: "smooth" });
  };
  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 260, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen px-4 pt-24 pb-16 bg-gray-50">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left: Image carousel */}
        <div className="lg:w-1/2">
          <div className="relative">
            <img
              src={car.images[currentImage] || "/placeholder.jpg"}
              alt={car.name}
              className="w-full h-[400px] object-contain bg-gray-50 rounded-2xl shadow-2xl transition-all duration-500"
            />
            {car.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-200"
                >
                  ◀
                </button>
                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-200"
                >
                  ▶
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {car.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {car.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  className={`w-20 h-20 object-contain rounded-lg cursor-pointer bg-gray-50 border-2 ${
                    idx === currentImage ? "border-blue-500" : "border-transparent"
                  }`}
                  onClick={() => setCurrentImage(idx)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right: Car info */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl text-black font-bold">{car.name}</h1>
          <p className="text-gray-600">{car.year} • {car.driven} km • {car.fuelType}</p>
          <p className="text-red-700 text-2xl font-bold">₹ {car.price.toLocaleString()}</p>

          {/* Car details table */}
          <div className="bg-gray-100 p-5 rounded-xl mt-4">
            <table className="w-full text-gray-700">
              <tbody>
                <tr><td className="font-semibold">Make:</td><td>{car.brand}</td></tr>
                <tr><td className="font-semibold">Model:</td><td>{car.name.replace(car.brand, "").trim()}</td></tr>
                <tr><td className="font-semibold">Year:</td><td>{car.year}</td></tr>
                <tr><td className="font-semibold">Transmission:</td><td>{car.transmission}</td></tr>
                <tr><td className="font-semibold">Ownership:</td><td>{car.ownership}</td></tr>
                <tr><td className="font-semibold">Driven:</td><td>{car.driven} km</td></tr>
                <tr><td className="font-semibold">Fuel Type:</td><td>{car.fuelType}</td></tr>
                <tr><td className="font-semibold">Registration:</td><td>{car.registration}</td></tr>
                <tr><td className="font-semibold">Color:</td><td>{car.color}</td></tr>
                <tr><td className="font-semibold">Body Type:</td><td>{car.bodyType}</td></tr>
              </tbody>
            </table>
          </div>

          {/* WhatsApp & Call buttons */}
          <div className="flex flex-col gap-3 mt-4">
            <button
              onClick={() => window.open(`https://wa.me/+919599706662?text=Hello, I'm interested in ${car.name}`, "_blank")}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-xl"
            >
              WhatsApp
            </button>
            <button
              onClick={() => window.open(`tel:+919599706662`)}
              className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2 rounded-xl"
            >
              Call Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Cars Carousel with arrows */}
      {relatedCars.length > 0 && (
        <div className="mt-16 relative">
          <h2 className="text-2xl text-black font-bold mb-6 text-center">Other Listings</h2>

          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 z-20"
          >
            ◀
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 z-20"
          >
            ▶
          </button>

          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-hidden scroll-smooth pb-4"
          >
            {relatedCars.map((c, index) => (
              <div
                key={c._id}
                ref={(el) => (relatedRefs.current[index] = el)}
                className="relative min-w-[250px] bg-white rounded-2xl shadow-2xl cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => navigate(`/cars/${c._id}`)}
              >
                {/* Sold Badge */}
                {c.isSold && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    SOLD
                  </div>
                )}

                <img
                  src={c.images[0] || "/placeholder.jpg"}
                  alt={c.name}
                  className="w-full h-40 object-cover rounded-t-2xl"
                />
                <div className="p-3">
                  <h3 className="text-black font-semibold">{c.name}</h3>
                  <p className="text-gray-600">{c.year} • {c.driven} km</p>
                </div>
              </div>
            ))}

          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
