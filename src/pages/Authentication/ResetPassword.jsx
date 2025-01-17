import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { HiEye } from "react-icons/hi";
import { HiMiniEyeSlash } from "react-icons/hi2";
import UseResetPass from './../../hooks/UseResetPass';
import LoadingAuth from "../../components/LoadingAuth";

export default function ResetPassword() {

const { ResetPasswordFormik, Showing,setShowing, Loading } = UseResetPass();

  return (
    <>
      <form onSubmit={ResetPasswordFormik.handleSubmit}>
        <div className="flex flex-col justify-center items-center p-5">
          <div className="w-[70%] mb-3">
            <div className="my-2 text-xl">
              <h1>ResetPassword:</h1>
            </div>
          </div>

          <div className="w-[70%]">
            <label htmlFor="email">Email:</label>
            <input
              value={ResetPasswordFormik.values.email}
              onChange={ResetPasswordFormik.handleChange}
              onBlur={ResetPasswordFormik.handleBlur}
              id="email"
              type="email"
              className="w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm"
            />
            {ResetPasswordFormik.errors.email && ResetPasswordFormik.touched.email ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {ResetPasswordFormik.errors.email}
              </div>
            ) : null}
          </div>

          <div className="w-[70%] my-2">
            <label htmlFor="newPassword">newPassword:</label>
            <div className="relative">
              <input
                value={ResetPasswordFormik.values.newPassword}
                onChange={ResetPasswordFormik.handleChange}
                onBlur={ResetPasswordFormik.handleBlur}
                id="newPassword"
                type={Showing ? "text" : "password"}
                className="w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm pr-10"
              />

              {ResetPasswordFormik.values.newPassword ? (
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
            {ResetPasswordFormik.errors.newPassword && ResetPasswordFormik.touched.newPassword ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {ResetPasswordFormik.errors.newPassword}
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

            <ToastContainer hideProgressBar="true" />
          </div>
        </div>
      </form>
    </>
  );
}
