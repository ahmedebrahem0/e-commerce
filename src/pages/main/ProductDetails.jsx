import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { productService } from '../../services';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { CartContext } from '../../context/CartContext';
import LoadingAuth from '../../components/LoadingAuth';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';

export default function ProductDetails() {
  const { addProduct, showing } = useContext(CartContext);

  async function handelProduct(id) {
    const response = await addProduct(id);
    if (response.status === true) {
      toast.success(response.res.data.message);
    } else {
      toast.error(response.error.response.data.message);
    }
  }

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    waitForAnimate: false,
    arrows: true,
  };

  const { id } = useParams();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["ProductDetails", id],
    queryFn: () => productService.getProductById(id),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h1>Error fetching product details</h1>;
  }

  const details = data?.data?.data || [];

  return (
    <div className="dark:bg-gray-900 py-8">
      <div className="container w-[80%] mx-auto flex justify-between items-center max-sm:flex-col">
        <div className="w-1/4 my-2">
          <Slider {...settings}>
            {details.images.map((image, index) => (
              <div key={index} className="p-2">
                <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={image}
                    alt={details.brand.name}
                    className="w-full h-64 object-cover rounded-lg transform hover:scale-105 transition-transform duration-300"
                    loading="lazy" // تحسين أداء التحميل
                  />
                  {/* إطار حول الصورة */}
                  <div className="absolute inset-0 border-2 border-white/20 rounded-lg"></div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="w-[70%] dark:text-white">
          <h1 className="text-2xl font-bold dark:text-white">{details.category.name}</h1>
          <p className="text-[#9CA3AF] my-4 ml-2">{details.description}</p>
          <h5 className="text-xl font-semibold dark:text-white">{details.brand.name}</h5>
          <h5 className="my-3 text-xl font-semibold dark:text-white">
            {details.price}
            <span className="ml-1">EGP</span>
          </h5>

          <button
            className="bg-[#0aad0a] text-white p-3 rounded w-full hover:bg-[#088708] transition-colors duration-300"
            onClick={() => handelProduct(details._id)}
          >
            {showing ? "+ Add to cart" : <LoadingAuth />}
          </button>
        </div>
      </div>
    </div>
  );
}