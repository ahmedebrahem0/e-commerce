import React from "react";
import { MoonLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import UseForgetPass from "../../hooks/UseForgetPass";
import LoadingAuth from "../../components/LoadingAuth";

export default function ForgetPassword() {
  const { Loading, ForgetPasswordFormik } = UseForgetPass();

  return (
    <>
      <form onSubmit={ForgetPasswordFormik.handleSubmit}>
        <div className="flex flex-col justify-center items-center p-5">
          <div className="w-[70%] mb-3">
            <div className="my-2 text-xl">
              <h1>ForgetPassword:</h1>
            </div>
          </div>

          <div className="w-[70%]">
            <label htmlFor="email">Email:</label>
            <input
              value={ForgetPasswordFormik.values.email}
              onChange={ForgetPasswordFormik.handleChange}
              onBlur={ForgetPasswordFormik.handleBlur}
              id="email"
              type="email"
              className="w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm"
            />
            {ForgetPasswordFormik.errors.email &&
            ForgetPasswordFormik.touched.email ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {ForgetPasswordFormik.errors.email}
              </div>
            ) : null}
          </div>

          <div className="w-[70%] flex justify-end items-center mt-3">
            <button
              type="submit"
              className="bg-[#0aad0a] text-white py-2 px-3 rounded"
            >
              {Loading ? (
                                <LoadingAuth/>
              ) : (
                "ForgetPassword"
              )}
            </button>
            <ToastContainer hideProgressBar="true" />
          </div>
        </div>
      </form>
    </>
  );
}
