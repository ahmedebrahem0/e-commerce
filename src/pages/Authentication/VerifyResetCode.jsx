import React, { useState } from "react";
import { MoonLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import UseResetCode from "../../hooks/UseResetCode";
import LoadingAuth from "../../components/LoadingAuth";


export default function VerifyResetCode() {
const { Loading, Showing, VerifyResetCodeFormik } = UseResetCode();

  return (
    <>
      <form onSubmit={VerifyResetCodeFormik.handleSubmit}>
        <div className="flex flex-col justify-center items-center p-5">
          <div className="w-[70%] mb-3">
            <div className="my-2 text-xl">
              <h1>VerifyResetCode:</h1>
            </div>
          </div>
          <div className="w-[70%] my-2">
            <label htmlFor="resetCode">Code:</label>
            <div className="relative">
              <input
                value={VerifyResetCodeFormik.values.resetCode}
                onChange={VerifyResetCodeFormik.handleChange}
                onBlur={VerifyResetCodeFormik.handleBlur}
                id="resetCode"
                type={Showing ? "password" : "text"}
                className="w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm pr-10"
              />

              {/* {VerifyResetCodeFormik.values.resetCode ? (
                <button
                  type="button"
                  onClick={() => {
                    setShowing(!Showing);
                  }}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black"
                >
                  {Showing ? <HiMiniEyeSlash /> : <HiEye />}
                </button>
              ) : (
                ""
              )} */}
            </div>
            {/* <HiMiniEyeSlash /> مغلق */}
            {VerifyResetCodeFormik.errors.resetCode &&
            VerifyResetCodeFormik.touched.resetCode ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {VerifyResetCodeFormik.errors.resetCode}
              </div>
            ) : null}
          </div>

          <div className="w-[70%] flex justify-end items-center mt-3">
            <button
              type="submit"
              className="bg-[#0aad0a] text-white py-2 px-3 rounded"
            >
              {Loading ? (
                "VerifyResetCode"
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
