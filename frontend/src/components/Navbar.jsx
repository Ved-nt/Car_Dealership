import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Cars", to: "/cars" },
    { name: "Contact", to: "/contact" },
  ];

  const handleLogin = () => {
    navigate("/admin-login");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
    window.location.reload(); // optional to fully reset state
  };

  return (
    <nav
      className={`fixed w-full z-50 px-6 py-4 flex items-center justify-between transition-all duration-500 ${
        isScrolled ? "backdrop-blur-md bg-white/70 shadow-lg" : "bg-white/40"
      }`}
    >
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="text-3xl font-extrabold text-black cursor-pointer tracking-wider"
      >
        CarSite
      </div>

      {/* Desktop Links */}
      <ul className="hidden md:flex gap-6 items-center font-semibold">
        {navLinks.map((link) => (
          <li key={link.name} className="relative group">
            <Link
              to={link.to}
              className="text-black transition-colors duration-300 group-hover:text-cyan-500"
            >
              {link.name}
            </Link>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
          </li>
        ))}

        {isAdmin ? (
          <>
            <li>
              <Link
                to="/admin/add-car"
                className="ml-4 text-red-500 font-bold transition-colors duration-300 hover:text-red-600"
              >
                Add Car
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="ml-4 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-6 rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={handleLogin}
              className="ml-4 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-6 rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              Login
            </button>
          </li>
        )}
      </ul>

      {/* Mobile Hamburger */}
      <div
        className="md:hidden text-black cursor-pointer"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white/90 text-black transform transition-transform duration-300 shadow-xl ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-6 mt-24 ml-6 text-lg">
          {navLinks.map((link) => (
            <li
              key={link.name}
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-cyan-500 transition-colors duration-300"
            >
              <Link to={link.to}>{link.name}</Link>
            </li>
          ))}

          {isAdmin ? (
            <>
              <li>
                <Link
                  to="/admin/add-car"
                  className="mt-4 text-red-500 font-bold hover:text-red-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Add Car
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="mt-4 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-6 rounded-lg w-full"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={handleLogin}
                className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-6 rounded-lg w-full"
              >
                Login
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
