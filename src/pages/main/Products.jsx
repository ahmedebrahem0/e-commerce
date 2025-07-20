import React, { useContext, useEffect, useState } from "react";
import img1 from "../../assets/images/slider-2.jpeg";
import img2 from "../../assets/images/grocery-banner-2.jpeg";
import HomeSlider from "../../components/HomeSlider";
import HomeCategory from "./../../components/HomeCategory";
import useProduct from "./../../hooks/useProduct";
import { Link } from "react-router-dom";
import { animate } from "motion";
import { useScroll, useSpring, motion } from "motion/react";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";

// SkeletonCard Component for Loading State
function SkeletonCard() {
  return (
    <div className="product px-2 mb-3 bg-gray-200 animate-pulse rounded-lg shadow-md">
      <div className="w-full h-[270px] bg-gray-300 rounded-md mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
      <div className="flex justify-between items-center mt-2">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  );
}

export default function Products() {
  const [correct, setCorrect] = useState(null);
  const [isFetching, setIsFetching] = useState(true); // حالة تحميل أولية

  const { addProduct, handelWishlist, getUserWishlist, heart, setHeart } =
    useContext(CartContext);
  // console.log(handelWishlist);

  // async function Wishlist(id) {
  //   setHeart(id);
  //   // setNumOfWishlist();
  //   const response = await handelWishlist(id);
  //   console.log(response);

  //   if(response.status === true){
  //     setTimeout(() => {
  //       setHeart(null);
  //     }, 2000);
  //     toast.success(response.res.data.message)
  //   } else {
  //     setHeart(null);
  //     toast.error(response.error.response.data.message);
  //   }
  // }

  async function Wishlist(id) {
    if (heart === id) return; // إذا كان نفس المنتج مضاف بالفعل لا نفعل شيء
    setHeart(id); // تعيين المنتج الحالي في حالة الانتظار
    const response = await handelWishlist(id);
    console.log("response from handelWishlist", response);
    if (response.status === true) {
      const res = await getUserWishlist();
      console.log(res);
      if (res === false) {
        toast.success(response.res.data.message); // فقط عند النجاح
        console.log("res");
        setTimeout(() => {
          setHeart(null);
        }, 2000);
      }
    } else {
      setHeart(null);
      toast.error(response.error.response.data.message);
    }
  }

  async function handelProduct(id) {
    const response = await addProduct(id);
    setCorrect(id);
    // setHeart(id);

    if (response.status === true) {
      setTimeout(() => {
        setCorrect(null);
        // setHeart(null);
      }, 2000);
      toast.success(response.res.data.message);
    } else {
      // setHeart(null);
      toast.error(response.error.response.data.message);
    }
  }

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Scroll to top when component mounts
    animate(() => window.scrollY, 0, {
      duration: 0.8,
      easing: "ease-out",
      onUpdate: (value) => window.scrollTo(0, value),
    });
  }, []);

  const { isError, isLoading, data } = useProduct();

  useEffect(() => {
    // عند انتهاء التحميل، قم بتحديث الحالة
    if (!isLoading) {
      setTimeout(() => setIsFetching(false), 1000); // عرض SkeletonCard لفترة قصيرة
    }
  }, [isLoading]);

  const products = data?.data?.data || [];

  return (
    <>
      {/* Progress bar for scroll */}
      <motion.div
        className="progress-bar fixed top-0 left-0 h-1 bg-blue-500 z-50"
        style={{ scaleX }}
      />
      <div className="dark:bg-gray-900  dark:text-white dark:shadow-lg  dark:shadow-gray-800">
        <div className="container w-[90%] mx-auto">
          <div className="allProduct grid md:grid-cols-3  lg:grid-cols-6 pt-8 shadow-black">
            {isFetching
              ? Array(12)
                  .fill(0)
                  .map((_, index) => <SkeletonCard key={index} />)
              : products.map((product) => (
                  <motion.div
                    className="product  mb-5 bg-white px-4 pb-2 rounded-lg shadow-md cursor-pointer dark:bg-[#2A3E4B] dark:shadow-gray-800"
                    key={product._id}
                    initial={{ opacity: 1 }}
                    whileHover={{
                      scale: 1.05,
                      translateY: -5,
                      opacity: 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                    }}
                  >
                    <div className="hover:shadow-orange-400 overflow-hidden group pt-2">
                      <i
                        onClick={() => handelProduct(product._id)}
                        className={`${
                          correct === product._id
                            ? `fa fa-check`
                            : `fa-solid fa-cart-shopping `
                        }
                        hidden group-hover:flex 
                        w-10 h-10 
                        text-white bg-green-500 
                        p-2 rounded-full shadow-md 
                        items-center justify-center 
                        absolute top-2 right-2 
                        transition-all duration-300 ease-in-out`}
                      ></i>
                      <i
                        onClick={() => Wishlist(product._id)}
                        className={`${
                          heart === product._id
                            ? `fa fa-check`
                            : `fa-solid fa-heart `
                        }
                        hidden group-hover:flex 
                        w-10 h-10 
                        text-white bg-green-500 
                        p-2 mt-1 rounded-full shadow-md 
                        items-center justify-center 
                        absolute top-12 right-2
                        transition-all duration-300 ease-in-out`}
                      >
                        {/* {console.log(product._id)} */}
                      </i>
                      <Link
                        to={`/ProductDetails/${product._id}`}
                        className="dark:bg-black"
                      >
                        <img
                          className="w-full h-[270px] object-cover rounded-md mb-2"
                          src={product.imageCover}
                          alt={product.title}
                        />
                        <h6 className="text-[#0aad0a] font-medium">
                          {product.category.name}
                        </h6>
                        <h2 className="font-semibold text-gray-700 dark:text-white">
                          {product.title.split(" ").slice(0, 2).join(" ")}
                        </h2>
                        <div className="flex justify-between items-center mt-2">
                          {product.priceAfterDiscount ? (
                            <p className="line-through text-red-700 flex items-center">
                              {product.priceAfterDiscount}
                              <span className="text-xs bg-red">EGP</span>
                            </p>
                          ) : (
                            ""
                          )}
                          <p className="flex items-center">
                            {product.price}
                            <span className="text-xs">EGP</span>
                          </p>
                          <p>
                            <i className="fa-solid fa-star text-yellow-500"></i>{" "}
                            {product.ratingsAverage}
                          </p>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}
