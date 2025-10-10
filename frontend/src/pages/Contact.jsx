import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    budget: "",
    interestedCar: "",
  });
  const [message, setMessage] = useState("");

  const formRef = useRef(null);
  const inputsRef = useRef([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://car-dealership-1.onrender.com/api/contact", formData);
      setMessage("Your details have been submitted successfully!");
      setFormData({
        name: "",
        email: "",
        whatsapp: "",
        budget: "",
        interestedCar: "",
      });
      gsap.fromTo(
        formRef.current,
        { backgroundColor: "#f0fff4" },
        { backgroundColor: "#f9fafb", duration: 1.5 }
      );
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    inputsRef.current.forEach((input) => {
      gsap.fromTo(
        input,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: input,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-10"
      >
        <h2 className="text-3xl font-bold text-cyan-700 mb-6 text-center">
          Contact Us
        </h2>

        {message && (
          <p className="mb-6 text-center text-green-600 font-medium animate-fade">
            {message}
          </p>
        )}

        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "WhatsApp Number", name: "whatsapp", type: "text" },
          { label: "Budget", name: "budget", type: "text" },
          { label: "Interested Car", name: "interestedCar", type: "text" },
        ].map((field, index) => (
          <div key={field.name} className="mb-5">
            <label className="block text-gray-700 mb-2 font-medium">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={`Enter ${field.label}`}
              ref={(el) => (inputsRef.current[index] = el)}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-cyan-500
                         placeholder-gray-400 text-gray-900 shadow-sm transition-all"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-xl transition-all shadow-lg hover:shadow-cyan-400/50"
        >
          Submit
        </button>
      </form>

      <style>
        {`
          @keyframes fade {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          .animate-fade { animation: fade 1.2s ease forwards; }
        `}
      </style>
    </div>
  );
};

export default Contact;
