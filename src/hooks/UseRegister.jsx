import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export default function UseRegister() {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(true);

  const handelRegister = (values) => {
    setLoading(false);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((data) => {
        console.log('data', data)
        // console.log('values',values)
        setLoading(false);
        toast.success("Successfully signed up ");
        setTimeout(() => {
          navigate("/Login");
        }, 2000);
      })
      .catch((error) => {
        setLoading(true);
        toast.error(error.response?.data?.message || "An error occurred.");
      });
  };

  const RegisterValidationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    password: yup
      .string()
      .required("Password is required")
      .min(3, "Password must be at least 3 characters"),
    // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    // .matches(/\d/, "Password must contain at least one number")
    // .matches(
    //   /[@$!%*?&#]/,
    //   "Password must contain at least one special character"
    // ),
    rePassword: yup
      .string()
      .required("Re-entering password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),

    phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^01[01235][0-9]{8}$/, "Invalid phone number"),
  });

  const RegisterFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: (values) => {
      handelRegister(values);
    },
    validationSchema: RegisterValidationSchema,
  });

  return { Loading, RegisterFormik };
}
