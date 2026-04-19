import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-4 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12">
          {/* Brand Section */}
          <div className="flex-1 min-w-[220px]">
            <div className="text-2xl font-semibold mb-6">Elegant.</div>

            <div className="mb-6">
              <div className="text-lg mb-1">More than products.</div>
              <div className="text-lg">It’s a lifestyle.</div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-6 mt-4 text-white">
              <Link to="https://github.com/AnkitShaw-100" aria-label="GitHub" className="hover:text-gray-300">
                <FaGithub className="w-6 h-6" />
              </Link>
              <Link
                to="https://leetcode.com/u/ankitcode6933/"
                aria-label="LeetCode"
                className="hover:text-gray-300"
              >
                <SiLeetcode className="w-6 h-6" />
              </Link>
              <Link
                to="https://www.linkedin.com/in/ankit-shaw-884b0728a/"
                aria-label="LinkedIn"
                className="hover:text-gray-300"
              >
                <FaLinkedin className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* Page Links */}
          <div className="flex-1 min-w-[140px]">
            <div className="font-semibold mb-6">Page</div>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-gray-300">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Info Links */}
          <div className="flex-1 min-w-[140px]">
            <div className="font-semibold mb-6">Info</div>
            <ul className="space-y-3">
              <li>
                <Link to="/shipping-policy" className="hover:text-gray-300">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/refund" className="hover:text-gray-300">
                  Return & Refund
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-gray-300">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-gray-300">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Office */}
          <div className="flex-1 min-w-[180px]">
            <div className="font-semibold mb-6">Office</div>
            <div className="text-gray-300 mb-3">
              Salt Lake, Kolkata <br />
              Sector 5, Godrej Genesis <br />
              India
            </div>
            <div className="text-gray-300">+91-34958-60918</div>
          </div>
        </div>

        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom */}
        <div className="text-gray-400 text-sm">
          Copyright © 2023 Elegant.
          <span className="mx-2">|</span>
          <Link to="/privacy" className="hover:text-gray-200">
            Privacy Policy
          </Link>
          <span className="mx-2">|</span>
          <Link to="/terms" className="hover:text-gray-200">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
