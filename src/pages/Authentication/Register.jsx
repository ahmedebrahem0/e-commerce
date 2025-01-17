import React from 'react'
import { MoonLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import UseRegister from './../../hooks/UseRegister';
import LoadingAuth from '../../components/LoadingAuth';


export default function Register() {
    const { Loading, RegisterFormik } = UseRegister();  
  
  return (
    <>
      <form onSubmit={RegisterFormik.handleSubmit}>
        <div className="flex flex-col justify-center items-center p-5 ">
          <div className=" w-[70%] mb-3">
            <div className="my-2 text-xl">
              <h1>Register New:</h1>
            </div>
            <label htmlFor="name">name:</label>
            <input
              value={RegisterFormik.values.name}
              onChange={RegisterFormik.handleChange}
              onBlur={RegisterFormik.handleBlur}
              id="name"
              type="text"
              className=" w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300  focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm/6"
            />
            {RegisterFormik.errors.name && RegisterFormik.touched.name ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                role="alert"
              >
                {RegisterFormik.errors.name}
              </div>
            ) : (
              ""
            )}
          </div>

          <div className=" w-[70%]">
            <label htmlFor="email">email:</label>
            <input
              value={RegisterFormik.values.email}
              onChange={RegisterFormik.handleChange}
              onBlur={RegisterFormik.handleBlur}
              id="email"
              type="email"
              placeholder="exe123@exe.com"
              className=" w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300  focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm/6"
            />
            {RegisterFormik.errors.email && RegisterFormik.touched.email ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                role="alert"
              >
                {RegisterFormik.errors.email}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className=" w-[70%] my-2">
            <label htmlFor="password">password:</label>
            <input
              value={RegisterFormik.values.password}
              onChange={RegisterFormik.handleChange}
              onBlur={RegisterFormik.handleBlur}
              id="password"
              type="password"
              className=" w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300  focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm/6"
            />
            {RegisterFormik.errors.password &&
            RegisterFormik.touched.password &&
            RegisterFormik.touched.password ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                role="alert"
              >
                {RegisterFormik.errors.password}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className=" w-[70%] my-2">
            <label htmlFor="rePassword">re-Password:</label>
            <input
              value={RegisterFormik.values.rePassword}
              onChange={RegisterFormik.handleChange}
              onBlur={RegisterFormik.handleBlur}
              id="rePassword"
              type="password"
              className=" w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300  focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm/6"
            />
            {RegisterFormik.errors.rePassword &&
            RegisterFormik.touched.rePassword ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                role="alert"
              >
                {RegisterFormik.errors.rePassword}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className=" w-[70%]">
            <label htmlFor="phone">phone:</label>
            <input
              value={RegisterFormik.values.phone}
              onChange={RegisterFormik.handleChange}
              onBlur={RegisterFormik.handleBlur}
              id="phone"
              type="tel"
              className=" w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300  focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm/6"
            />
            {RegisterFormik.errors.phone && RegisterFormik.touched.phone ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                role="alert"
              >
                {RegisterFormik.errors.phone}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="w-[70%] flex justify-end items-center mt-3 ">
            <button
              type="submit"
              className="bg-[#0aad0a] text-white py-2 px-3 rounded"
            >
              {Loading ? (
                "Register"
              ) : (
                                <LoadingAuth/>
              )}
            </button>
            <ToastContainer hideProgressBar="true" />
          </div>
        </div>
      </form>
    </>
  );
}
