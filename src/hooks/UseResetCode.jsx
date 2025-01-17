import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";


export default function UseResetCode() {
    const navigate = useNavigate();
    const [Loading, setLoading] = useState(true);
  const [Showing, setShowing] = useState(false);
    

    const handelResetCode = (values) => {
        setLoading(false);
              axios
                .post(
                  "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
                  values
                )
                .then((data) => {
                  console.log(data)
                  setLoading(false);
                  toast.success("code is correct");
                  setTimeout(() => {
                    navigate("/ResetPassword");
                  }, 2000);
                })
                .catch((error) => {
                  toast.error(
                    error.response?.data?.message || "An error occurred."
                  );
                  setLoading(true);
                })
    }
    
    const handelValidationSchema= yup.object().shape({
      resetCode: yup
        .string()
        .required("Please enter the reset code")
        .min(4, "Must be 6 numbers")
        //   .min(6, "Must be 6 numbers")
        .matches(/^[0-9]*$/),
    })

    const VerifyResetCodeFormik = useFormik({
      initialValues: {
        resetCode: "",
      },
      onSubmit: (values) => {
        handelResetCode(values);
      },
      validationSchema: handelValidationSchema,
    });

  return { Loading, VerifyResetCodeFormik };
}
