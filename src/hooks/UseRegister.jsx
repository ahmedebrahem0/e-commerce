import { useState } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { authService } from "../services";
import { registerValidationSchema } from "../validation/authValidation";

export default function UseRegister() {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(true);

  const handelRegister = (values) => {
    setLoading(false);
    authService.register(values)
      .then((data) => {
        console.log('data', data)
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
    validationSchema: registerValidationSchema,
  });

  return { Loading, RegisterFormik };
}
