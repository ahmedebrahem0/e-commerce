import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/Loading";

export default function AllOrders() {
  const { decodedToken } = useContext(AuthContext); // User data
  const [orders, setOrders] = useState([]); // Initialize orders array
  const [loading, setLoading] = useState(true); // Loading state

  // Function to fetch orders
  const fetchAllOrders = () => {
    if (!decodedToken?.id) {
      console.error("User is not logged in or data is unavailable");
      return;
    }

    axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${decodedToken.id}`
      )
      .then((res) => {
        console.log('res all',res)
        setOrders(res.data || []); // Set data or empty array if no data
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setOrders([]); // Set empty array in case of error
      })
      .finally(() => {
        setLoading(false); // Stop loading state
      });
  };

  // Call fetch when decodedToken is ready
  useEffect(() => {
    if (decodedToken?.id) {
      fetchAllOrders();
    }
  }, [decodedToken]);

  // Filter orders by payment method
  const cashOrders = orders.filter(
    (order) => order.paymentMethodType === "cash"
  );
  const cardOrders = orders.filter(
    (order) => order.paymentMethodType === "card"
  );

  return (
    <div className="p-6 min-h-screen w-[90%] mx-auto">
      <h1 className="text-2xl  mb-6 text-gray-800">All Orders</h1>

      {loading ? (
        <Loading />
      ) : orders && orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cash Orders Section */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-green-700">
              Cash Orders
            </h2>
            {cashOrders.length > 0 ? (
              <div className="grid gap-6">
                {cashOrders.map((order) =>
                  order.cartItems.map((item, index) => (
                    <div
                      key={`${order.id}-${index}`}
                      className="border p-4 rounded-lg shadow-md bg-white flex items-center justify-around 
                          transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                    >
                      {/* {console.log("order", order)} */}

                      <div className="w-[20%]">
                        {/* {console.log("item", item.product)} */}
                        <img
                          src={item.product.imageCover}
                          className=" h-32 object-cover w-full "
                          alt={item.product.title}
                        />
                      </div>
                      <div className="w-[70%]">
                        <h2 className="text-md font-semibold text-blue-600">
                          {item.product.category.name}
                        </h2>
                        <p className="text-sx text-[#0aad0a] my-2">
                          {item.product.title}
                        </p>
                        <p className="text-sm font-bold text-gray-600">
                          Price: {item.price} EGP
                        </p>
                        <p className="text-sm text-gray-600">
                          <i className="fa-solid fa-star text-yellow-500"></i>{" "}
                          {item.product.ratingsAverage}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <p className="text-gray-600">No cash orders available.</p>
            )}
          </div>

          {/* Card Orders Section */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-blue-700">
              Card Orders
            </h2>
            {cardOrders.length > 0 ? (
              <div className="grid gap-6">
                {cardOrders.map((order) =>
                  order.cartItems.map((item, index) => (
                    <div
                      key={`${order.id}-${index}`}
                      className="border p-4 rounded-lg shadow-md bg-white flex items-center justify-around 
  transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                    >
                      {/* {console.log(order.product)} */}
                      <div className="w-[20%]">
                        <img
                          src={item.product.imageCover}
                          className=" h-32 object-cover  w-full"
                          alt={item.product.title}
                        />
                      </div>
                      <div className="w-[70%]">
                        <h2 className="text-md font-semibold text-blue-600">
                          {item.product.category.name}
                        </h2>
                        <p className="text-sx text-[#0aad0a] my-2">
                          {item.product.title}
                        </p>
                        <p className="text-sm font-bold text-gray-600">
                          Price: {item.price} EGP
                        </p>

                        <p className="text-sm text-gray-600">
                          <i className="fa-solid fa-star text-yellow-500"></i>{" "}
                          {item.product.ratingsAverage}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <p className="text-gray-600">No card orders available.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-600">No orders available yet.</p>
      )}
    </div>
  );
}
