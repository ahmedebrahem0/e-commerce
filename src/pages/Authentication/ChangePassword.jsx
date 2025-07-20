import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { authService } from "../../services";
import { changePasswordValidationSchema } from "../../validation/authValidation";

export default function ChangeMyPassword() {
  let navigate = useNavigate();
  const [Loading, setLoading] = useState(true);
  const ChangeMyPasswordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    onSubmit: (values) => {
      setLoading(false);
      authService.changePassword(values)
        .then((data) => {
          setLoading(false);
          toast.success("Password updated successfully");
          setTimeout(() => {
            navigate("/ResetPassword");
          }, 2000);
          console.log("success", data);
        })
        .catch((error) => {
          toast.error(`${error.response.data.message}`);
          setLoading(true);
          console.log(error);
        });
    },
    validationSchema: changePasswordValidationSchema,

    validate: (errors) => {
      console.log(errors);
    },
  });

  // console.log(ChangeMyPasswordFormik.values);

  return (
    <>
      <form onSubmit={ChangeMyPasswordFormik.handleSubmit}>
        <div className="flex flex-col justify-center items-center p-5 ">
          <div className=" w-[70%] mb-3">
            <div className="my-2 text-xl">
              <h1>ChangeMyPassword New:</h1>
            </div>
            <label htmlFor="name">currentPassword:</label>
            <input
              value={ChangeMyPasswordFormik.values.currentPassword}
              onChange={ChangeMyPasswordFormik.handleChange}
              onBlur={ChangeMyPasswordFormik.handleBlur}
              id="currentPassword"
              type="text"
              className=" w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300  focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm/6"
            />
            {ChangeMyPasswordFormik.errors.currentPassword && ChangeMyPasswordFormik.touched.currentPassword ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                role="alert"
              >
                {ChangeMyPasswordFormik.errors.currentPassword}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className=" w-[70%] my-2">
            <label htmlFor="password">password:</label>
            <input
              value={ChangeMyPasswordFormik.values.password}
              onChange={ChangeMyPasswordFormik.handleChange}
              onBlur={ChangeMyPasswordFormik.handleBlur}
              id="password"
              type="password"
              className=" w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300  focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm/6"
            />
            {ChangeMyPasswordFormik.errors.password &&
            ChangeMyPasswordFormik.touched.password &&
            ChangeMyPasswordFormik.touched.password ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                role="alert"
              >
                {ChangeMyPasswordFormik.errors.password}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className=" w-[70%] my-2">
            <label htmlFor="rePassword">re-Password:</label>
            <input
              value={ChangeMyPasswordFormik.values.rePassword}
              onChange={ChangeMyPasswordFormik.handleChange}
              onBlur={ChangeMyPasswordFormik.handleBlur}
              id="rePassword"
              type="password"
              className=" w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300  focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm/6"
            />
            {ChangeMyPasswordFormik.errors.rePassword &&
            ChangeMyPasswordFormik.touched.rePassword ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                role="alert"
              >
                {ChangeMyPasswordFormik.errors.rePassword}
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
                "ChangeMyPassword"
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <MoonLoader size={20} color="#FFFFFF" />
                </div>
              )}
            </button>
            <ToastContainer hideProgressBar="true" />
          </div>
        </div>
      </form>
    </>
  );
}
