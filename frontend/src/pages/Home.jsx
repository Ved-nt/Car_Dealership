import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const navigate = useNavigate();
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const carRef = useRef(null);
  const featureRefs = useRef([]);
  const aboutImgRef = useRef(null);
  const aboutTextRef = useRef(null);

  const cars = [
    { name: "AUDI A6 35 TFSI", status: "Sold", img: "./image2.jpg" },
    { name: "Innova Crysta", status: "2020 • 94300 km • Diesel", img: "./image.jpeg" },
    { name: "Coming Soon", status: "Available", img: null },
  ];

  const addToRefs = (el) => {
    if (el && !featureRefs.current.includes(el)) {
      featureRefs.current.push(el);
    }
  };

  useEffect(() => {
    ScrollTrigger.refresh();

    // ✍️ Hero text animation
    const tl = gsap.timeline({ delay: 0.3 });
    const heading = headingRef.current;
    const chars = heading.innerText.split("");
    heading.innerHTML = chars
      .map((char) => `<span class="inline-block opacity-0">${char}</span>`)
      .join("");

    tl.to(heading.querySelectorAll("span"), {
      opacity: 1,
      y: 0,
      stagger: 0.04,
      duration: 0.6,
      ease: "power3.out",
      startAt: { y: 30 },
    })
      .to(
        textRef.current,
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.2"
      )
      .to(
        buttonRef.current,
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.3"
      )
      .to(
        carRef.current,
        { opacity: 1, x: 0, rotate: 0, scale: 1, duration: 1.5, ease: "power3.out" },
        "-=1.2"
      );

    // 🚗 Floating car animation
    gsap.to(carRef.current, {
      y: -6,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // 🌐 About section image animation (replays)
    ScrollTrigger.create({
      trigger: aboutImgRef.current,
      start: "top 85%",
      onEnter: () =>
        gsap.fromTo(
          aboutImgRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        ),
      onLeaveBack: () => gsap.set(aboutImgRef.current, { opacity: 0, y: 30 }),
    });

    // ✍️ About section text scroll-in from right (replays)
    ScrollTrigger.create({
      trigger: aboutTextRef.current,
      start: "top 85%",
      onEnter: () =>
        gsap.fromTo(
          aboutTextRef.current,
          { opacity: 0, x: 100 },
          { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
        ),
      onLeaveBack: () => gsap.set(aboutTextRef.current, { opacity: 0, x: 100 }),
    });

    // 🧭 Featured cars animation (replays)
    featureRefs.current.forEach((card) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 85%",
        onEnter: () =>
          gsap.fromTo(
            card,
            { opacity: 0, y: 60, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
          ),
        onLeaveBack: () => gsap.set(card, { opacity: 0, y: 60, scale: 0.9 }),
      });
    });
  }, []);

  return (
    <div className="bg-white">
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full min-h-screen pt-24 md:pt-32 flex flex-col md:flex-row items-center justify-center px-4 md:px-16 overflow-hidden">
        {/* Left Text */}
        <div className="flex-1 flex flex-col px-12 items-start md:pr-8 z-10 text-center md:text-left">
          <h1
            ref={headingRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 leading-tight tracking-tight"
          >
            AapkiDreamCar
          </h1>
          <p
            ref={textRef}
            className="text-base sm:text-lg md:text-xl text-cyan-900 mb-8 max-w-md mx-auto md:mx-0 opacity-0 translate-y-4"
          >
            Explore premium second-hand cars with trust and style.
          </p>
          <button
            ref={buttonRef}
            onClick={() => navigate("/cars")}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg transition-transform duration-300 hover:scale-110 hover:shadow-xl opacity-0 scale-95 mx-auto md:mx-0"
          >
            Explore Cars
          </button>
        </div>

        {/* Right Car */}
        <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0 relative z-10">
          <div className="relative">
            <img
              ref={carRef}
              src="/bmw-removebg-preview.png"
              alt="Car"
              className="w-64 sm:w-96 md:w-[38rem] lg:w-[35rem] drop-shadow-2xl opacity-0 translate-x-4 md:translate-x-20"
            />
            {[...Array(20)].map((_, i) => {
              const top = Math.random() * 70;
              const left = Math.random() * 90 + 5;
              const delay = Math.random() * 2;
              const size = 1 + Math.random() * 3;
              return (
                <div
                  key={`sparkle-${i}`}
                  className="absolute bg-cyan-400 rounded-full opacity-70 animate-sparkle"
                  style={{
                    top: `${top}%`,
                    left: `${left}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    animationDelay: `${delay}s`,
                  }}
                ></div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section className="relative z-0 px-6 md:px-16 py-16 md:py-24 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 flex justify-center md:justify-start mb-6 md:mb-0">
          <img
            ref={aboutImgRef}
            src="deal-removebg-preview.png"
            alt="About Icon"
            className="w-48 sm:w-60 md:w-72"
          />
        </div>
        <div ref={aboutTextRef} className="flex-1 text-center md:text-left opacity-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-cyan-700 mb-4 md:mb-6">
            About Our Company
          </h2>
          <p className="text-cyan-900 text-sm sm:text-base md:text-lg mb-2 md:mb-4 leading-relaxed">
            At <strong>AUTOTRADZ LLP</strong>, we specialize in premium second-hand cars. Each vehicle is carefully inspected to ensure <span className="text-cyan-700 font-semibold">trust</span>, transparency, and quality.
          </p>
          <p className="text-cyan-900 text-sm sm:text-base md:text-lg leading-relaxed">
            From verified ownership to after-sale support, we provide a seamless car buying experience. Our team is passionate about cars and committed to delivering satisfaction with every purchase.
          </p>
        </div>
      </section>

      {/* ================= FEATURED CARS SECTION ================= */}
      <section className="relative z-0 px-6 md:px-16 py-16 md:py-20 max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-cyan-700 mb-8 md:mb-12 text-center">
          Featured Cars
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {cars.map((car) => (
            <div
              key={car.name}
              ref={addToRefs}
              className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 flex flex-col items-center shadow-lg transform transition-all hover:scale-105 hover:rotate-[0.5deg] hover:shadow-cyan-500/40 hover:shadow-2xl opacity-0"
            >
              {car.img ? (
                <img
                  src={car.img}
                  alt={car.name}
                  className="w-48 sm:w-56 md:w-64 h-32 sm:h-36 md:h-40 object-contain mb-4 transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="w-48 sm:w-56 md:w-64 h-32 sm:h-36 md:h-40 mb-4 bg-gray-100 flex items-center justify-center text-gray-400">
                  Image not available
                </div>
              )}
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-cyan-700">{car.name}</h3>
              <p className={`mt-1 text-sm sm:text-base md:text-md font-medium ${car.status === "Sold" ? "text-red-500" : "text-black"}`}>
                {car.status}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Sparkle CSS */}
      <style>
        {`
          @keyframes sparkle {
            0%, 100% { transform: translateY(0px) scale(0.8); opacity: 0.6; }
            50% { transform: translateY(-6px) scale(1.2); opacity: 1; }
          }
          .animate-sparkle { animation: sparkle 1.5s ease-in-out infinite; }
        `}
      </style>
    </div>
  );
};

export default Home;
