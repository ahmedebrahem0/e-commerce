import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import amazon from "../assets/images/amazon.png";
import amirecan from "../assets/images/AMERICAN.png";
import master from "../assets/images/master.png";
import paypal from "../assets/images/paypal.png";
import App_Store from "../assets/images/App_Store_Badge.svg.png";
import  Play_Store from "../assets/images/Google_Play_Store_badge_EN.svg.png";

export default function Footer() {
  return (
    <>
      <footer className=" text-[#909090] bg-[#f0f3f2] p-10">

        <div className=" md:w-full w-[100%]">
          <h4 className="text-black">Get The FreshCart App</h4>
          <p>
            We will send you a link, open it on your phone to download the app.
          </p>
        </div>
        <div className=" flex justify-between px-7 mt-3">
          <input
            type="email"
            placeholder="Email..."
            className=" w-[85%] rounded-md bg-white px-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm/6"
          />
          <button className=" px-8 py-1 bg-[#0aad0a] text-white rounded-md">
            Share App Link
          </button>
        </div>
        <div>
          <nav className="text-[#909090] bg-[#f0f3f2]">
            <div className="p-7  flex justify-center items-center">
              <div className="alon max-sm:flex-col max-sm:justify-center  p-5 divide-y flex justify-between items-center">
                <div className="flex justify-center items-center w-[70%]">
                  <ul className="max-xl:flex-col flex justify-start items-center   ">
                    <li className="">
                      <Link>Payment Partners</Link>
                    </li>
                    <li className="max-sm:w-[20%] max-md:w-[20%] max-lg:w-[20%] w-[5%] mx-2 ">
                      <img
                        src={amazon}
                        alt="amazon"
                        className=" cursor-pointer w-full"
                      />
                    </li>
                    <li className="max-sm:w-[20%] max-md:w-[20%] max-lg:w-[20%] w-[5%] mr-2">
                      <img
                        src={amirecan}
                        alt="amazon"
                        className=" cursor-pointer w-full"
                      />
                    </li>
                    <li className="max-sm:w-[20%] max-md:w-[20%] max-lg:w-[20%] w-[5%] mr-2">
                      <img
                        src={master}
                        alt="amazon"
                        className=" cursor-pointer w-full max-sm:w-[100%]"
                      />
                    </li>
                    <li className="max-sm:w-[20%] max-md:w-[20%] max-lg:w-[20%] w-[5%] mr-2">
                      <img
                        src={paypal}
                        alt="amazon"
                        className=" cursor-pointer w-full"
                      />
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="max-xl:flex-col  max-xl:items-start max-sm:items-center flex gap-3 justify-center items-center ">
                    <li className="cursor-pointer w-full">
                      <Link>Get deliveries with FreshCart</Link>
                    </li>
                    <li>
                      <img
                        src={App_Store}
                        alt="amazon"
                        className="w-24 cursor-pointer"
                      />
                    </li>
                    <li>
                      <img
                        src={Play_Store}
                        alt="amazon"
                        className="w-24 cursor-pointer"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </footer>
    </>
  );
}
