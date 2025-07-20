    import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import LoadingAuth from "../../components/LoadingAuth";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { paymentValidationSchema } from "../../validation/authValidation";


    export default function Login() {
const navigate = useNavigate()
        const [LoadingCash, setLoadingCash] = useState(true);
        const [LoadingOrder ,setLoadingOrder]= useState(true)
        const [cashOrder ,setCashOrder]= useState(true)

      const { CartId, clearUI, } = useContext(CartContext);
      
      function detectOrder(value) {
        if (cashOrder) {
          createCashOrder(value);
          console.log("createCashOrder");

        } else {
          onlinePayment(value);
          console.log("online order");

        }
      }

        function createCashOrder(value) {
            setLoadingCash(false);
            console.log('cartID',CartId);
            const backendBody = {
                shippingAddress: value
            };
            axios
            .post(
                `https://ecommerce.routemisr.com/api/v1/orders/${CartId}`,
                backendBody,
                {
                headers: { token: localStorage.getItem("tkn") },
                }
            )
            .then((res) => {
                console.log(res);
                setTimeout(() => {
                setLoadingCash(true);
                  toast.success("Order successfully")
                   navigate("/allOrders");
                }, 2000);
             
                clearUI()
            })
            .catch((error) => {
                console.log(error);
                setLoadingCash(true);
                toast.error("Order Failed");    
            })
      }
        function onlinePayment(value) {
            setLoadingOrder(false);
            console.log(value);
            const backendBody = {
                shippingAddress: value
            };
            axios
              .post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}`,
                backendBody,
                {
                  headers: { token: localStorage.getItem("tkn") },
                },
                {
                  params: { url: "http://localhost:3000" },
                }
              )
              .then((res) => {
                console.log(res);
                setTimeout(() => {
                  setLoadingOrder(true);
                  console.log("hello");
                  toast.success("Order online successfully ");
                }, 2000);
                window.open(res.data.session.url);

                clearUI();
              })
              .catch((error) => {
                console.log(error);
                setLoadingOrder(true);
                toast.error("Order Failed");
              });
      }


        const PaymentFormik = useFormik({
          initialValues: {
            details: "",
            phone: "",
            city: "",
          },
          validationSchema: paymentValidationSchema,
          onSubmit: detectOrder,
        });

    return (
      <>
        <form onSubmit={PaymentFormik.handleSubmit} className="dark:bg-gray-900 dark:text-white">
          <div className="flex flex-col justify-center items-center p-5">
            <div className="w-[70%] mb-3">
              <div className="my-2 text-xl">
                <h1>Cash Order :</h1>
              </div>
            </div>

            <div className="w-[70%]">
              <label htmlFor="details">details:</label>
              <input
                value={PaymentFormik.values.details}
                onChange={PaymentFormik.handleChange}
                onBlur={PaymentFormik.handleBlur}
                id="details"
                type="text"
                className="w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm"
              />
              {PaymentFormik.errors.details && PaymentFormik.touched.details ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  {PaymentFormik.errors.details}
                </div>
              ) : null}
            </div>

            <div className="w-[70%] my-2">
              <label htmlFor="phone">phone:</label>
              <input
                value={PaymentFormik.values.phone}
                onChange={PaymentFormik.handleChange}
                onBlur={PaymentFormik.handleBlur}
                id="phone"
                type="tel"
                className="w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm"
              />
              {PaymentFormik.errors.phone && PaymentFormik.touched.phone ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  {PaymentFormik.errors.phone}
                </div>
              ) : null}
            </div>

            <div className="w-[70%]">
              <label htmlFor="city">city:</label>
              <input
                value={PaymentFormik.values.city}
                onChange={PaymentFormik.handleChange}
                onBlur={PaymentFormik.handleBlur}
                id="city"
                type="tel"
                className="w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm"
              />
              {PaymentFormik.errors.city && PaymentFormik.touched.city ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  {PaymentFormik.errors.city}
                </div>
              ) : null}
            </div>

            <div className="w-[70%] flex justify-between items-center mt-3 ml-3">
              <div>
                <Link
                  to="/cart"
                  className="bg-[#0aad0a] text-white py-2 px-3 rounded mr-3"
                >
                  <i className="fa-solid fa-arrow-left mr-1"></i>
                  {/* <FontAwesomeIcon icon="fa-solid fa-arrow-left" /> */}
                  Back
                </Link>
              </div>
              <div>
                <button
                  onClick={() => {
                    setCashOrder(true);
                  }}
                  type="submit"
                  className="bg-[#0aad0a] text-white py-2 px-3 rounded"
                >
                  {/* Cash Order */}
                  {LoadingCash ? "Cash Order" : <LoadingAuth />}
                </button>

                <button
                  onClick={() => {
                    setCashOrder(false);
                  }}
                  type="submit"
                  className="bg-[#0aad0a] text-white mx-2 py-2 px-3 rounded"
                >
                  {/* Cash Order */}
                  {LoadingOrder ? "Online Order" : <LoadingAuth />}
                </button>
              </div>
            </div>
          </div>
        </form>
        <Toaster />
      </>
    );
    }
