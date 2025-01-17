import React from "react";
import { MoonLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { HiEye } from "react-icons/hi";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { Link } from "react-router-dom";
import UseLogin from './../../hooks/UseLogin';
import LoadingAuth from "../../components/LoadingAuth";

export default function Login() {
  const { Loading, Showing, setShowing, LoginFormik } = UseLogin();

  return (
    <>
      <form onSubmit={LoginFormik.handleSubmit}>
        <div className="flex flex-col justify-center items-center p-5">
          <div className="w-[70%] mb-3">
            <div className="my-2 text-xl">
              <h1>Login:</h1>
            </div>
          </div>

          <div className="w-[70%]">
            <label htmlFor="email">Email:</label>
            <input
              value={LoginFormik.values.email}
              onChange={LoginFormik.handleChange}
              onBlur={LoginFormik.handleBlur}
              id="email"
              type="email"
              className="w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm"
            />
            {LoginFormik.errors.email && LoginFormik.touched.email ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {LoginFormik.errors.email}
              </div>
            ) : null}
          </div>

          <div className="w-[70%] my-2">
            <label htmlFor="password">Password:</label>
            <div className="relative">
              <input
                value={LoginFormik.values.password}
                onChange={LoginFormik.handleChange}
                onBlur={LoginFormik.handleBlur}
                id="password"
                type={Showing ? "text" : "password"}
                className="w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm pr-10"
              />

              {LoginFormik.values.password ? (
                <button
                  type="button"
                  onClick={() => {
                    setShowing(!Showing);
                  }}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black"
                >
                  {Showing ? <HiEye /> : <HiMiniEyeSlash />}
                </button>
              ) : (
                ""
              )}
            </div>
            {/* <HiMiniEyeSlash /> مغلق */}
            {LoginFormik.errors.password && LoginFormik.touched.password ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {LoginFormik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="w-[70%] flex justify-end items-center mt-3">
            <button
              type="submit"
              className="bg-[#0aad0a] text-white py-2 px-3 rounded"
            >
              {Loading ? (
                "Login"
              ) : (
                <LoadingAuth/>
                  
              )}
            </button>

            <Link
              to="/ForgetPassword"
              type="submit"
              className="bg-[#0aad0a] text-white py-2 px-3 ml-4 rounded"
            >
              ForgetPassword
            </Link>

          </div>
        </div>
      </form>
    </>
  );
}
