
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export default function UseResetPass() {
      let navigate = useNavigate();
      const [Loading, setLoading] = useState(true);
      const [Showing, setShowing] = useState(false);
    
    const handelResetPassword = (values) => {
        setLoading(false);
              axios
                .put(
                  "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
                  values
                )
                .then((data) => {
                  console.log(data)
                  setLoading(false);
                  toast.success("password reset is done");
                  setTimeout(() => {
                    navigate("/home");
                  }, 2000);
                })
                .catch((error) => {
                  toast.error(`${error.response.data.message}`);
                  setLoading(true);
                })
    }

    const handelValidationSchema =yup.object().shape({
      email: yup
        .string()
        .required("Email is required")
        .email("Invalid email format"),
      newPassword: yup
        .string()
        .required("newPassword is required")
        .min(3, "newPassword must be at least 3 characters"),
    })

    const  ResetPasswordFormik= useFormik({
      initialValues: {
        email: "",
        newPassword: "",
      },
      onSubmit: (values) => {
        handelResetPassword(values);
      },
      validationSchema: handelValidationSchema,
    });

  return { ResetPasswordFormik, Showing, setShowing, Loading };
}
