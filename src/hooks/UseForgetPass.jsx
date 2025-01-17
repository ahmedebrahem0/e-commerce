import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';

export default function UseForgetPass() {
    const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);

  const handelForgetPass = (values) => {
    setLoading(true);
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .then((data) => {
        console.log(data);
        
        setLoading(false);
        toast.success("Check your email");
        setTimeout(() => {
          navigate("/VerifyResetCode");
        }, 2000);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response?.data?.message || "An error occurred.");
      });
  };

  const ForgetPasswordValidationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
  });

  const ForgetPasswordFormik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      handelForgetPass(values);
    },
    validationSchema: ForgetPasswordValidationSchema,
  });

  return { Loading, ForgetPasswordFormik };
}
