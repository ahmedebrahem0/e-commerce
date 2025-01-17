import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function UseForgetPass() {
  const navigate = useNavigate();
    const [Showing, setShowing] = useState(false);
  const [Loading, setLoading] = useState(true);
  const {setToken } =useContext(AuthContext)
  const { getUserCart } = useContext(CartContext);

  const handelLogin = (values) => {
    setLoading(false);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((data) => {
        console.log(data);
        localStorage.setItem("tkn", data.data.token);
        console.log(data)
        setToken(data.data.token);
        getUserCart()
        setLoading(false);
        toast.success("Successfully signed in ");
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      })
      .catch((error) => {
        setLoading(true);
        toast.error(error.response?.data?.message || "An error occurred.");
      });
  };

  const LoginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    password: yup
            .string()
            .required("Password is required")
            .min(3, "Password must be at least 3 characters")
            // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            // .matches(/\d/, "Password must contain at least one number")
            // .matches(
            //   /[@$!%*?&#]/,
            //   "Password must contain at least one special character"
          // )
          ,
  });

  const LoginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      handelLogin(values);
    },
    validationSchema: LoginValidationSchema,
  });

  return { Loading,Showing,setShowing, LoginFormik };
}
