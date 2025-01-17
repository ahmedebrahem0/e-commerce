import React from 'react'
import Footer from "./components/Footer";
import Home from "./pages/main/Home";
import Header from './components/Header';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import Layout from './layouts/Layout';
import Brands from './pages/main/Brands';
import Login from './pages/Authentication/Login';
import Cart from './pages/Cart/Cart';
import Products from "./pages/main/Products";
import Categories from "./pages/main/Categories";
import Register from "./pages/Authentication/Register";
import ForgetPassword from './pages/Authentication/ForgetPassword';
import ChangeMyPassword from './pages/Authentication/ChangePassword';
import ResetPassword from "./pages/Authentication/ResetPassword";
import VerifyResetCode from './pages/Authentication/VerifyResetCode';
import CreateContextProvider from "./context/AuthContext";
import ProtectedRoute from './layouts/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './pages/main/ProductDetails';
import CartContextProvider from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import Payment from './pages/Cart/Payment';
import AllOrders from './pages/Cart/AllOrders';
import { Offline } from 'react-detect-offline';
import OfflineMessage from './components/OfflineMessage';



const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "*", element: <NotFound /> },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },

      {
        path: "/Products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "/ProductDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/allOrders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      { path: "/Register", element: <Register /> },
      { path: "/Login", element: <Login /> },
      { path: "/ForgetPassword", element: <ForgetPassword /> },
      { path: "/VerifyResetCode", element: <VerifyResetCode /> },
      { path: "/VerifyResetCode", element: <VerifyResetCode /> },
      { path: "/ChangeMyPassword", element: <ChangeMyPassword /> },
      { path: "/ResetPassword", element: <ResetPassword /> },
      { path: "/Footer", element: <Footer /> },
    ],
  },
]);

const reactQueryConfig =new QueryClient()

export default function App() {

  return (
    <>
      <CreateContextProvider>
        <CartContextProvider>
          <QueryClientProvider client={reactQueryConfig}>
            <RouterProvider router={router} />
            <Offline>
              <OfflineMessage/>
            </Offline>
            <ToastContainer hideProgressBar="true" />
          </QueryClientProvider>
        </CartContextProvider>
      </CreateContextProvider>
    </>
  );
}
