import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-200 mt-20 py-14 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* Logo & Description */}
        <div>
          <h2 className="text-3xl font-bold mb-4 tracking-wide text-cyan-400">CarSite</h2>
          <p className="text-gray-400 leading-relaxed max-w-xs">
            Your trusted destination for buying and selling premium cars. Drive
            your dream with us with confidence and style.
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="https://www.instagram.com/autotradzllp/"
              className="p-3 bg-gray-800 rounded-full hover:bg-cyan-500 hover:text-white transition-colors shadow-md"
            >
              <FaInstagram size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-cyan-400">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="text-gray-300 hover:text-cyan-400 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/cars"
                className="text-gray-300 hover:text-cyan-400 transition-colors"
              >
                Cars
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-cyan-400 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Placeholder for extra info / empty space */}
        <div className="hidden md:flex flex-col">
          <h3 className="text-xl font-semibold mb-4 text-cyan-400">About CarSite</h3>
          <p className="text-gray-400 leading-relaxed">
            CarSite connects car enthusiasts with premium second-hand vehicles.
            Each listing is verified and carefully curated to ensure quality and trust.
          </p>
          <div className="mt-12 text-gray-300 text-mid">
            <p>
              📧 Email:{" "}
              <a
                href="mailto:autotradzllp@gmail.com"
                className="text-cyan-400 hover:underline"
              >
                autotradzllp@gmail.com
              </a>
            </p>
            <p className="mt-2">
              📞 Phone:{" "}
              <a
                href="tel:+919599706662"
                className="text-cyan-400 hover:underline"
              >
                +91 9599706662
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} CarSite. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
