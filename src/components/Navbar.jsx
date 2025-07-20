import React, { useContext, useEffect, useState, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { motion } from "framer-motion";
import img from "../assets/images/freshcart-logo.svg";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
  const { Token, setToken, decodedToken } = useContext(AuthContext);
  const { numOfCartItems, numOfWishlist, setNumOfWishlist, getUserWishlist } = useContext(CartContext);
  const [showUserData, setShowUserData] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const navigate = useNavigate();
  const userMenuRef = useRef();
  const userButtonRef = useRef();

    // useEffect(() => {
    //   console.log("useEffect in navbar");
    //   // getUserWishlist()
    //   setNumOfWishlist()
    // },[])


  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    if (decodedToken?.id) {
      axios
        .get(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${decodedToken.id}`
        )
        .then((res) => setUserOrders(res.data))
        .catch((error) => console.error("Error fetching orders:", error));
    }
  }, [decodedToken]);

  useEffect(() => {
    if (!showUserData) return;
    function handleClickOutside(event) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target)
      ) {
        setShowUserData(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showUserData]);

  function handelLogout() {
    localStorage.removeItem("tkn");
    setToken(null);
    setDarkMode(null);
    setNumOfWishlist(0);
    toast.success("You are welcome anytime", { position: "top-left" });
    navigate("/login");
  }

  return (
    <nav className="text-[#909090] bg-[#f0f3f2] dark:bg-gray-900 dark:backdrop-blur shadow-md transition-colors duration-500 border-b-[0.5px] border-white dark:border-gray-700">
      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo and Hamburger */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-2xl text-gray-600 dark:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
            <img src={img} alt="logo" className="h-12 w-auto max-sm:w-[70%]" />
          </div>

          {/* Middle Section - Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            {Token && (
              <ul className="flex items-center gap-6">
                <li>
                  <NavLink
                    to="/Home"
                    className="hover:text-[#0aad0a] transition-colors"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Products"
                    className="hover:text-[#0aad0a] transition-colors"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Categories"
                    className="hover:text-[#0aad0a] transition-colors"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Brands"
                    className="hover:text-[#0aad0a] transition-colors"
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Dashboard"
                    className="hover:text-[#0aad0a] transition-colors"
                  >
                    Dashboard
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          {/* Right Section - Icons and User */}
          <div className="flex items-center gap-4 max-lg:ml-4">
            <div className="hidden md:flex items-center gap-4 ">
              {/* Social Media Icons */}
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="text-xl text-black dark:text-white hover:text-[#0aad0a]"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="text-xl text-black dark:text-white hover:text-[#0aad0a]"
                >
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a
                  href="#"
                  className="text-xl text-black dark:text-white hover:text-[#0aad0a]"
                >
                  <i className="fa-brands fa-linkedin"></i>
                </a>
                <a
                  href="#"
                  className="text-xl text-black dark:text-white hover:text-[#0aad0a]"
                >
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="text-xl text-black dark:text-white hover:text-[#0aad0a]"
                >
                  <i className="fa-brands fa-youtube"></i>
                </a>
                <a
                  href="#"
                  className="text-xl text-black dark:text-white hover:text-[#0aad0a]"
                >
                  <i className="fa-brands fa-tiktok"></i>
                </a>
              </div>

              {Token && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full shadow-md"
                  >
                    {darkMode ? "🌑" : "🌞"}
                  </motion.button>

                  <Link to="/wishlist" className="relative">
                    <i className="fa-solid fa-heart text-xl text-black dark:text-white"></i>
                    {numOfWishlist > 0 && (
                      <span className="absolute -top-2 -right-2 px-2 py-1 text-xs rounded-full text-white bg-[#0aad0a]">
                        {numOfWishlist}
                      </span>
                    )}
                  </Link>

                  <Link to="/cart" className="relative">
                    <i className="fa-solid fa-cart-shopping text-xl text-black dark:text-white"></i>
                    {numOfCartItems > 0 && (
                      <span className="absolute -top-2 -right-2 px-2 py-1 text-xs rounded-full text-white bg-[#0aad0a]">
                        {numOfCartItems}
                      </span>
                    )}
                  </Link>
                </>
              )}
            </div>

            {/* User Section */}
            <div className="flex items-center gap-2">
              {Token ? (
                <div className="relative flex items-center gap-2">
                  <button
                    ref={userButtonRef}
                    onClick={() => setShowUserData((prev) => !prev)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                  >
                    <i className="fa-solid fa-user text-[#0aad0a]"></i>
                  </button>

                  {showUserData && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="absolute right-0 top-full mt-3 w-80 rounded-2xl shadow-2xl z-50 overflow-hidden ring-1 ring-[#0aad0a]/10 border border-gray-100 dark:border-gray-700"
                      ref={userMenuRef}
                    >
                      {/* الجزء العلوي: بيانات المستخدم */}
                      <div className="flex flex-col items-center gap-2 p-6 bg-gradient-to-br from-[#0aad0a]/90 via-[#e8fbe8] to-[#b2f2bb] dark:bg-gray-800">
                        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white border-4 border-[#0aad0a] shadow-lg text-[#0aad0a] text-4xl font-extrabold mb-2">
                          {userOrders[0]?.user?.name?.charAt(0)?.toUpperCase() || <i className='fa-solid fa-user'></i>}
                        </div>
                        <p className="text-xl font-bold text-[#0aad0a] dark:text-[#b2f2bb]">{userOrders[0]?.user?.name || "No Name"}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-200 font-medium">{userOrders[0]?.user?.email || "No Email"}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{userOrders[0]?.user?.phone || "No Phone"}</p>
                      </div>
                      {/* فاصل ملون */}
                      <div className="h-2 w-full bg-gradient-to-r from-[#0aad0a] via-[#b2f2bb] to-[#e8fbe8] dark:bg-gray-700"></div>
                      {/* الجزء السفلي: الأزرار */}
                      <div className="flex flex-col gap-2 p-5 bg-white dark:bg-gray-900">
                        <Link
                          to="/Profile"
                          className="w-full text-center py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 mb-1 shadow"
                          onClick={() => setShowUserData(false)}
                        >
                          <i className="fa-solid fa-user"></i> My Profile
                        </Link>
                        <Link
                          to="/ChangeMyPassword"
                          className="w-full text-center py-2 rounded-lg text-sm font-semibold text-white bg-[#0aad0a] hover:bg-[#099409] dark:bg-[#14532d] dark:hover:bg-[#0aad0a] transition-colors flex items-center justify-center gap-2 mb-1 shadow"
                          onClick={() => setShowUserData(false)}
                        >
                          <i className="fa-solid fa-key"></i> Change Password
                        </Link>
                        <button
                          onClick={handelLogout}
                          className="w-full text-center py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-red-500 via-red-400 to-red-600 hover:from-red-600 hover:to-red-700 dark:from-red-700 dark:to-red-900 transition-colors flex items-center justify-center gap-2 shadow"
                        >
                          <i className="fas fa-sign-out-alt"></i> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="flex gap-4 justify-center items-center max-sm:ml-4">
                  <NavLink
                    to="/Login"
                    className="hover:text-[#0aad0a] transition-colors"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/Register"
                    className="hover:text-[#0aad0a] transition-colors"
                  >
                    Register
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            {Token && (
              <div className="flex flex-col gap-4">
                <NavLink
                  to="/Home"
                  className="py-2 hover:text-[#0aad0a] active"
                >
                  Home
                </NavLink>
                <NavLink to="/Products" className="py-2 hover:text-[#0aad0a]">
                  Products
                </NavLink>
                <NavLink to="/Categories" className="py-2 hover:text-[#0aad0a]">
                  Categories
                </NavLink>
                <NavLink to="/Brands" className="py-2 hover:text-[#0aad0a]">
                  Brands
                </NavLink>
                <NavLink to="/Dashboard" className="py-2 hover:text-[#0aad0a]">
                  Dashboard
                </NavLink>
                <NavLink to="/Profile" className="py-2 hover:text-[#0aad0a]">
                  My Profile
                </NavLink>

                <div className="flex items-center gap-4 justify-between">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full"
                  >
                    {darkMode ? "🌑" : "🌞"}
                  </motion.button>

                  <div className="flex gap-4">
                    <Link to="/wishlist" className="relative">
                      <i className="fa-solid fa-heart text-xl"></i>
                      {numOfWishlist > 0 && (
                        <span className="absolute -top-2 -right-2 px-2 py-1 text-xs rounded-full text-white bg-[#0aad0a]">
                          {numOfWishlist}
                        </span>
                      )}
                    </Link>
                    <Link to="/cart" className="relative">
                      <i className="fa-solid fa-cart-shopping text-xl"></i>
                      {numOfCartItems > 0 && (
                        <span className="absolute -top-2 -right-2 px-2 py-1 text-xs rounded-full text-white bg-[#0aad0a]">
                          {numOfCartItems}
                        </span>
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 flex gap-4 justify-center">
              <a href="#" className="text-2xl">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="text-2xl">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="#" className="text-2xl">
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href="#" className="text-2xl">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#" className="text-2xl">
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a href="#" className="text-2xl">
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
