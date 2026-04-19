import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout function
  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <NavLink
            to="/"
            className="text-black font-bold text-2xl tracking-wide hover:scale-105 transition-transform"
          >
            Elegant.
          </NavLink>
          <div className="flex items-center lg:hidden">
            <button
              className="text-black hover:text-gray-600 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <div
            className={`flex-1 justify-end items-center w-full lg:flex ${
              menuOpen
                ? "block bg-white absolute left-0 top-16 w-full p-4"
                : "hidden"
            } lg:static lg:bg-transparent lg:p-0`}
          >
              <ul className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-base font-medium ${
                      isActive ? "text-black" : "text-black hover:text-gray-600"
                    } transition`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {({ isActive }) => (
                    <span className="relative inline-block">
                      <span>Home</span>
                      <span
                        className="absolute left-1/2 -bottom-1 h-[2px] bg-black transition-all duration-1000 ease-out"
                        style={{
                          width: isActive ? "100%" : "0%",
                          transform: "translateX(-50%)",
                        }}
                      />
                    </span>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop"
                  className={({ isActive }) =>
                    `flex items-center gap-1 text-base font-medium ${
                      isActive ? "text-black" : "text-black hover:text-gray-600"
                    } transition`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {({ isActive }) => (
                    <span className="relative inline-block">
                      <span>Shop</span>
                      <span
                        className="absolute left-1/2 -bottom-1 h-[2px] bg-black transition-all duration-1000 ease-out"
                        style={{
                          width: isActive ? "100%" : "0%",
                          transform: "translateX(-50%)",
                        }}
                      />
                    </span>
                  )}
                </NavLink>
              </li>
              <li className="relative">
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `flex items-center gap-1 text-base font-medium ${
                      isActive ? "text-black" : "text-black hover:text-gray-600"
                    } transition`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative w-full lg:inline-block lg:w-auto flex justify-end lg:justify-start">
                        <span>Cart</span>
                        <span
                          className="absolute left-1/2 -bottom-1 h-[2px] bg-black transition-all duration-1000 ease-out"
                          style={{
                            width: isActive ? "100%" : "0%",
                            transform: "translateX(-50%)",
                          }}
                        />
                      </span>
                      {cart.length > 0 && (
                        <span className="absolute -top-1 -right-5 bg-red-600 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold border-2 border-white">
                          {cart.length}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
              {/* Account Dropdown */}
              <li className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center gap-1 text-base font-medium text-black hover:text-gray-600 focus:outline-none transition"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                >
                  Account
                  <svg
                    className={`ml-1 w-4 h-4 transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {dropdownOpen && (
                  <ul className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50 animate-slideDown">
                    {!auth.user ? (
                      <>
                        <li>
                          <NavLink
                            to="/register"
                            className="block px-4 py-2 text-black hover:bg-gray-100 hover:text-gray-700 rounded-t-md transition"
                            onClick={() => setDropdownOpen(false)}
                          >
                            Register
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/login"
                            className="block px-4 py-2 text-black hover:bg-gray-100 hover:text-gray-700 rounded-b-md transition"
                            onClick={() => setDropdownOpen(false)}
                          >
                            Login
                          </NavLink>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <NavLink
                            to={`/dashboard/${
                              auth?.user?.role === 1 ? "admin" : "user"
                            }`}
                            className="block px-4 py-2 text-black hover:bg-gray-100 hover:text-gray-700 rounded-t-md transition"
                            onClick={() => setDropdownOpen(false)}
                          >
                            Dashboard
                          </NavLink>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              handleLogout();
                              setDropdownOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100 hover:text-gray-700 rounded-b-md transition"
                          >
                            Logout
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
