import React, { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import Loading from "../../components/Loading";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { addProductToWishlist, DeleteFromWishlist, getUserWishlist } =
    useContext(CartContext);
    // console.log("getUserWishlist", getUserWishlist());
  
  
  

  useEffect(() => {
    getUserWishlist
    console.log('my ahmed')
  }, []);

  async function RemoveFromWishlist(productId) {
    const res = await DeleteFromWishlist(productId);
    if (res == true) {
      toast.success("Product Removed successfully");
      await getUserWishlist(); // تحديث البيانات من الخادم
    } else {
      toast.error("update failed");
    }
  }

  return (
    <>
      <div className="dark:bg-slate-900 py-3">
        {addProductToWishlist ? (
          <div className="mb-3 rounded-xl">
            <div className="my-3">
              <div className="py-4 px-4 container shadow-md rounded-xl w-[90%]  mx-auto flex justify-between items-center bg-[#f0f3f2]">
                <div className="">
                  <h1 className="text-xl">Wishlist</h1>
                </div>
              </div>
            </div>

            {addProductToWishlist.map((product) => (
              <div
                key={product.id}
                className="container w-[90%] mx-auto mb-3 shadow-md rounded-xl bg-[#f0f3f2] dark:bg-[#2A3E4B]"
              >
                <div className="flex justify-between items-center p-4">
                  <div className="flex justify-between items-center w-[70%]">
                    <div className="mr-4 w-[10%]">
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="w-full"
                      />
                    </div>
                    <div className="w-[90%]">
                      <h3 className=" dark:text-white">{product.title}</h3>
                      <h5 className="text-[#0aad0a] my-2">
                        Price: {product.price}
                      </h5>
                      <p
                        onClick={() => RemoveFromWishlist(product.id)}
                        className="cursor-pointer text-red-500"
                      >
                        <i className="fa fa-trash text-red-500 mr-1"></i>
                        Remove
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Loading />
        )}

        <Toaster />
      </div>
    </>
  );
}
