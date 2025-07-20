import React, { useContext, useEffect, useState, useMemo } from "react";
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
  const [heart, setHeart] = useState(null);
  const [isFetching, setIsFetching] = useState(true); // حالة تحميل أولية
  const { addProduct, getUserWishlist, handelWishlist, addProductToCart, addProductToWishlist } =
    useContext(CartContext);
  
    async function Wishlist(id) {
    if (isInWishlist(id)) {
      toast.info("Product is already in your wishlist.");
      return;
    }
    if (heart === id) return; // إذا كان نفس المنتج مضاف بالفعل لا نفعل شيء
    setHeart(id); // تعيين المنتج الحالي في حالة الانتظار
    const response = await handelWishlist(id);
    console.log("response from handelWishlist", response);
  
    if (response.status === true) {
      // بعد نجاح العملية، قم بتحديث قائمة المفضلة
      const res = await getUserWishlist();
      console.log(res);
      if (res === false) {
        toast.success(response.res.data.message); // فقط عند النجاح
        console.log('res');
        setTimeout(() => {
          setHeart(null);
        }, 2000);
      }
    }
    else {
      setHeart(null);
      toast.error(response.error.response.data.message);
    }
  }

  function isInCart(productId) {
    return addProductToCart?.some(item => item.product._id === productId);
  }
  function isInWishlist(productId) {
    return addProductToWishlist?.some(item => item._id === productId);
  }

  async function handelProduct(id) {
    if (isInCart(id)) {
      toast.info("Product is already in your cart.");
      return;
    }
    const response = await addProduct(id);
    setCorrect(id);
    // لا تغير heart هنا إطلاقًا

    if (response.status === true) {
      setTimeout(() => {
        setCorrect(null);
      }, 2000);
      toast.success(response.res.data.message);
    } else {
      toast.error(response.error.response.data.message);
    }
  }

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedRating, setSelectedRating] = useState(0);

  const { isError, isLoading, data } = useProduct();

  const products = data?.data?.data || [];

  // استخراج كل التصنيفات والماركات والأسعار من المنتجات
  const categories = useMemo(() => Array.from(new Set(products.map(p => p.category.name))), [products]);
  const brands = useMemo(() => Array.from(new Set(products.map(p => p.brand.name))), [products]);
  const minPrice = useMemo(() => Math.min(...products.map(p => p.price)), [products]);
  const maxPrice = useMemo(() => Math.max(...products.map(p => p.price)), [products]);

  // فلترة المنتجات
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory ? product.category.name === selectedCategory : true;
      const matchesBrand = selectedBrand ? product.brand.name === selectedBrand : true;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = selectedRating ? Math.floor(product.ratingsAverage) >= selectedRating : true;
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating;
    });
  }, [products, search, selectedCategory, selectedBrand, priceRange, selectedRating]);


  useEffect(() => {
    // Scroll to top when component mounts
    animate(() => window.scrollY, 0, {
      duration: 0.8,
      easing: "ease-out",
      onUpdate: (value) => window.scrollTo(0, value),
    });
  }, []);

  useEffect(() => {
    // عند انتهاء التحميل، قم بتحديث الحالة
    if (!isLoading) {
      setTimeout(() => setIsFetching(false), 1000); // عرض SkeletonCard لفترة قصيرة
    }
  }, [isLoading]);

  return (
    <>
      {/* Progress bar for scroll */}
      <motion.div
        className="progress-bar fixed top-0 left-0 h-1 bg-blue-500 z-50"
        style={{ scaleX }}
      />
      <div className="dark:bg-gray-900">
        <div className="container w-[90%] mx-auto">
          <div className="pt-3 grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-80 px-2 mb-20">
            {/* Slider Section */}
            <div className="w-full h-60 md:h-80 md:col-span-2 md:mb-30 rounded-md">
              <HomeSlider />
            </div>

            {/* Side Images Section */}
            <div className="w-full h-60 md:h-80 grid gap-4 grid-rows-2 mt-[100px] sm:mt-0">
              <div className="h-full">
                <img
                  className="w-full h-full object-cover rounded-md"
                  src={img1}
                  alt="Image 1"
                />
              </div>
              <div className="h-full">
                <img
                  className="w-full h-full object-cover rounded-md"
                  src={img2}
                  alt="Image 2"
                />
              </div>
            </div>
          </div>
          {/* //Shop Popular Categories */}
          <div className="mt-5">
            <h2 className="text-lg my-1 dark:text-white">
              Shop Popular Categories
            </h2>
            <HomeCategory />
          </div>
          {/* قبل عرض المنتجات: */}
          <div className="bg-white dark:bg-[#222] rounded-xl shadow p-4 mb-6 flex flex-col md:flex-row md:items-end gap-4">
            {/* شريط البحث */}
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1 text-[#0aad0a]">Search</label>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search for products..."
                className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:border-[#0aad0a] dark:bg-gray-800 dark:text-white"
              />
            </div>
            {/* فلتر التصنيف */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-[#0aad0a]">Category</label>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:border-[#0aad0a] dark:bg-gray-800 dark:text-white"
              >
                <option value="">All</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            {/* فلتر الماركة */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-[#0aad0a]">Brand</label>
              <select
                value={selectedBrand}
                onChange={e => setSelectedBrand(e.target.value)}
                className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:border-[#0aad0a] dark:bg-gray-800 dark:text-white"
              >
                <option value="">All</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            {/* فلتر السعر */}
            <div className="flex flex-col min-w-[120px]">
              <label className="block text-sm font-semibold mb-1 text-[#0aad0a]">Price</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[0]}
                  onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
                  className="w-24 h-10 text-lg rounded border border-gray-300 px-3 py-2 focus:outline-none focus:border-[#0aad0a] dark:bg-gray-800 dark:text-white"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={e => setPriceRange([priceRange[0], +e.target.value])}
                  className="w-24 h-10 text-lg rounded border border-gray-300 px-3 py-2 focus:outline-none focus:border-[#0aad0a] dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
            {/* فلتر التقييم */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-[#0aad0a]">Rating</label>
              <select
                value={selectedRating}
                onChange={e => setSelectedRating(Number(e.target.value))}
                className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:border-[#0aad0a] dark:bg-gray-800 dark:text-white"
              >
                <option value={0}>All</option>
                {[5,4,3,2,1].map(r => (
                  <option key={r} value={r}>{r}+</option>
                ))}
              </select>
            </div>
          </div>
          {/* عند عرض المنتجات: */}
          <div className="allProduct grid md:grid-cols-3 lg:grid-cols-6 mt-8">
            {isFetching
              ? Array(12)
                  .fill(0)
                  .map((_, index) => <SkeletonCard key={index} />)
              : filteredProducts.map((product) => (
                  <motion.div
                    className="product  mb-5 bg-white px-4 pb-2 rounded-lg shadow-md cursor-pointer dark:bg-[#2A3E4B]  dark:shadow-gray-800"
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
                    <div className="hover:shadow-orange-400 overflow-hidden pt-2 group">
                      <i
                        onClick={() => handelProduct(product._id)}
                        className={`
                          ${correct === product._id
                            ? `fa fa-check bg-green-500`
                            : isInCart(product._id)
                              ? `fa-solid fa-cart-shopping bg-[#e63946]`
                              : `fa-solid fa-cart-shopping bg-[#0aad0a]`
                          }
                          hidden group-hover:flex 
                          w-10 h-10 
                          text-white 
                          p-2 rounded-full shadow-md 
                          items-center justify-center 
                          absolute top-2 right-2 
                          transition-all duration-300 ease-in-out`}
                        style={{ cursor: isInCart(product._id) ? 'not-allowed' : 'pointer' }}
                      ></i>
                      <i
                        onClick={() => Wishlist(product._id)}
                        className={`
                          ${heart === product._id
                            ? `fa fa-check bg-green-500`
                            : isInWishlist(product._id)
                              ? `fa-solid fa-heart bg-[#e63946]`
                              : `fa-solid fa-heart bg-[#0aad0a]`
                          }
                          hidden group-hover:flex 
                          w-10 h-10 
                          text-white 
                          p-2 mt-1 rounded-full shadow-md 
                          items-center justify-center 
                          absolute top-12 right-2
                          transition-all duration-300 ease-in-out`}
                        style={{ cursor: isInWishlist(product._id) ? 'not-allowed' : 'pointer' }}
                      >
                        {/* {console.log(product._id)} */}
                      </i>
                      <Link to={`/ProductDetails/${product._id}`}>
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
                            <>
                              <p className="line-through text-red-600 font-semibold flex items-center mr-2">
                                {product.price}
                                <span className="text-xs ml-1">EGP</span>
                              </p>
                              <p className="text-[#0aad0a] font-bold flex items-center">
                                {product.priceAfterDiscount}
                                <span className="text-xs ml-1">EGP</span>
                              </p>
                            </>
                          ) : (
                            <p className="text-[#0aad0a] font-bold flex items-center">
                              {product.price}
                              <span className="text-xs ml-1">EGP</span>
                            </p>
                          )}
                          <p>
                            <i className="fa-solid fa-star text-yellow-500 "></i>
                            <span className="dark:text-white ml-1">{product.ratingsAverage}</span>
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
