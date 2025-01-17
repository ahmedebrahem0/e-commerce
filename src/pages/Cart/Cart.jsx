import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext';
import Loading from '../../components/Loading';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {
    const {
      addProductToCart,
      totalCartPrice,
      handelButton,
      DeleteProduct,
      RemoveItems,
      productId,
    } = useContext(CartContext);

  // useEffect(() => {
  //   setAddProductToCart();
  //   setNumOfCartItems();
  //   setTotalCartPrice();
  //   setCartId();
  // }, []);

    // console.log(localStorage.getItem('tkn'));
  function RemoveAllProduct() {
    
    // setAddProductToCart()
    RemoveItems()
    // console.log(x)
  }
    // console.log(localStorage.getItem("tkn"));



  async  function handelBtnCount(productId, newCount) {
    const res = await handelButton(productId, newCount);
    if (res == true) {
      toast.success("Product updated successfully");
    }
    else {
    toast.error("update failed");
    }
  }

console.log('productId',productId);

  async function RemoveProduct(productId) {
    const res = await DeleteProduct(productId);
    if (res == true) {
      toast.success("Product Removed successfully");
    } else {
      toast.error("update failed");
    }
  }


  

  return (
    <>
      <div>
        {addProductToCart || [] ? (
          <div>
            {addProductToCart || [] ? (
              <div className="mb-3 rounded-xl">
                <div>
                  {console.log("addProductToCart", addProductToCart)}
                  <div className=" py-4 px-4 container shadow-md rounded-xl w-[90%] my-4 mx-auto flex justify-between items-center bg-[#f0f3f2]">
                    <div>
                      <h1 className="text-xl">Shop Cart</h1>
                      <h3 className="text-[#0aad0a]">
                        Total Cart Price : {totalCartPrice}
                        <span className="text-[#0aad0a] ml-1">EGP</span>
                      </h3>
                    </div>
                    <div className="text-red-500 cursor-pointer">
                      <button onClick={RemoveAllProduct}>
                        <i className="fa fa-trash text-red-500"></i> Remove All
                      </button>
                    </div>
                  </div>
                </div>

                {addProductToCart?.map((product) => (
                  <div
                    key={product._id}
                    className="container w-[90%] mx-auto mb-3 shadow-md rounded-xl bg-[#f0f3f2]"
                  >
                    {/* {console.log(product)} */}
                    <div className=" flex justify-between items-center p-4">
                      <div className="flex justify-between items-center w-[70%] ">
                        <div className="mr-4 w-[10%]">
                          <img
                            src={product.product.imageCover}
                            alt={product.product.title}
                            className="w-full"
                          />
                        </div>
                        <div className="w-[90%] ">
                          <h3>{product.product.title}</h3>
                          {/* <h3>{product.product._id}id </h3> */}
                          <h5 className="text-[#0aad0a] my-2">
                            price :{product.price}
                          </h5>
                          <p
                            onClick={() => RemoveProduct(product.product._id)}
                            className="cursor-pointer text-red-500"
                          >
                            <i className="fa fa-trash text-red-500"></i>
                            Remove
                          </p>
                        </div>
                      </div>
                      <div className=" flex justify-end items-center w-[25%]">
                        <button
                          className="px-2   border-2 border-[#0aad0a] rounded"
                          onClick={() =>
                            handelBtnCount(
                              product.product._id,
                              product.count + 1
                            )
                          }
                        >
                          +
                        </button>
                        <p className="mx-3">{product.count}</p>
                        {product.count === 1 ? (
                          <button className="p-3  border-2 border-[#0aad0a] bg-[#0aad0a] rounded"></button>
                        ) : (
                          <button
                            className="px-2  border-2 border-[#0aad0a] rounded"
                            onClick={() =>
                              handelBtnCount(
                                product.product._id,
                                product.count - 1
                              )
                            }
                          >
                            -
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {console.log(addProductToCart)}
                {addProductToCart && addProductToCart.length > 0 ? (
                  <div className="w-[90%] mx-auto my-8 text-center">
                    <Link
                      to="/Payment"
                      className="bg-[#0aad0a] w-1/4 text-white rounded-xl p-4 transition-all duration-300 hover:bg-[#087508] hover:shadow-lg hover:scale-105"
                    >
                      Go to Payment
                    </Link>
                  </div>
                ) : null}
              </div>
            ) : (
              <Loading />
            )}
          </div>
        ) : (
          <Loading />
        )}

        <Toaster />
      </div>
    </>
  );
}
