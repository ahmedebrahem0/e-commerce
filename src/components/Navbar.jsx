import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import img from "../assets/images/freshcart-logo.svg";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";
import axios from "axios";

export default function Navbar() {
  const { Token, setToken, decodedToken } = useContext(AuthContext);
  const { numOfCartItems } = useContext(CartContext);
  const [showUserData, setShowUserData] = useState(false);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    setShop(Token);
  }, [Token]);

  useEffect(() => {
    if (decodedToken && decodedToken.id) {
      axios
        .get(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${decodedToken.id}`
        )
        .then((res) => {
          setUserOrders(res.data);
          // console.log("User Orders:", res.data); // Log the first order for debugging
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    }
  }, [decodedToken]);

  const [shop, setShop] = useState(true);
  const navigate = useNavigate();

  function handelLogout() {
    localStorage.removeItem("tkn");
    setShop(false);
    setToken(null);
    toast.success("You are welcome anytime", { position: "top-left" });
    navigate("/login");
  }

  return (
    <>
      <nav className="text-[#909090] bg-[#f0f3f2]">
        <div className="p-3 flex justify-center items-center">
          <div className="max-sm:flex-row max-xl:gap-5 max-xl:flex-col max-md:flex-col max-sm:gap-3 max-md:gap-3  w-[90%] flex justify-between items-center">
            <div className="max-sm:flex-col max-md:flex-col max-sm:gap-0 max-md:gap-0 flex  gap-5">
              <img src={img} alt="logo" className="" />
              {Token ? (
                <ul className=" max-sm:flex-col  flex items-center gap-5 ">
                  <li>
                    <NavLink to="/Home">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/Products">Products</NavLink>
                  </li>
                  <li>
                    <NavLink to="/Categories">Categories</NavLink>
                  </li>
                  <li>
                    <NavLink to="/Brands">Brands</NavLink>
                  </li>
                </ul>
              ) : null}
            </div>
            <div className="flex justify-center items-center gap-4  max-sm:gap-9 max-md:gap-9 max-sm:flex-row max-md:flex-row">
              <ul className=" max-sm:flex-col  flex gap-5 items-center">
                <li>
                  <Link className="fa-brands fa-instagram text-black"></Link>
                </li>
                <li>
                  <Link className="fa-brands fa-facebook text-black"></Link>
                </li>
                <li>
                  <Link className="fa-brands fa-linkedin text-black"></Link>
                </li>
                <li>
                  <Link className="fa-brands fa-twitter text-black"></Link>
                </li>
                <li>
                  <Link className="fa-brands fa-youtube text-black"></Link>
                </li>
                <li>
                  <Link className="fa-brands fa-tiktok text-black"></Link>
                </li>
                <li>
                  {Token ? (
                    <Link
                      to="/cart"
                      className="fa-solid fa-cart-shopping text-black"
                    >
                      {shop && numOfCartItems ? (
                        <span className="px-2 py-1 text-xs rounded text-white bg-[#0aad0a] relative bottom-3 right-3">
                          {numOfCartItems}
                        </span>
                      ) : (
                        ""
                      )}
                    </Link>
                  ) : (
                    ""
                  )}
                </li>
              </ul>
              <ul className="max-sm:flex-col  flex gap-5 items-center">
                {Token ? (
                  <li className="relative">
                    <span
                      className="cursor-pointer mx-2"
                      onClick={handelLogout}
                    >
                      SignOut
                    </span>
                    <span
                      className="cursor-pointer"
                      onClick={() => setShowUserData(!showUserData)}
                    >
                      <i className="fa-solid fa-user text-[#0aad0a]"></i>
                    </span>
                    {showUserData && (
                      <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg">
                        <div className="p-4">
                          <p className="text-sm font-medium text-gray-900">
                            {userOrders[0].user.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {userOrders[0].user.email}
                            {/* {decodedToken?.email || "user@example.com"} */}
                          </p>
                          <p className="text-sm text-gray-500">
                            {userOrders[0].user.phone}
                            {/* {decodedToken?.email || "user@example.com"} */}
                          </p>
                        </div>
                        <div className="border-t border-gray-200"></div>
                      </div>
                    )}
                  </li>
                ) : (
                  <>
                    <li>
                      <NavLink to="/Login">Login</NavLink>
                    </li>
                    <NavLink to="/Register">Register</NavLink>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
