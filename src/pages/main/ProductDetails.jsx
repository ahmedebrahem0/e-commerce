    import React, { useContext } from 'react'
    import { useParams } from 'react-router-dom';
    // import useProduct from '../../hooks/useProduct';
    import Loading from '../../components/Loading';
    import { useQuery } from 'react-query';
    import axios from 'axios';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { CartContext } from '../../context/CartContext';
import LoadingAuth from '../../components/LoadingAuth';
import { toast } from 'react-toastify';
export default function ProductDetails() {
  
  const { addProduct, showing } = useContext(CartContext);
  // console.log(addProduct);

  async function handelProduct(id) {

    const response = await addProduct(id);
    // console.log(response.status);
    if (response.status == true) {
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
  // console.log(id);

  function GetProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["ProductDetails", id],
    queryFn: GetProductDetails,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h1>error</h1>;
  }
  const details = data?.data?.data || [];
  // console.log(details.name);

  return (
    <>
      <div className="container w-[80%] mx-auto flex justify-between items-center max-sm:flex-col">
        <div className="w-1/4 my-2">
          <Slider {...settings}>
            {details.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={details.brand.name}
                  className="w-full h-50"
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="w-[70%]">
          <h1>{details.category.name}</h1>
          <p className="text-[#9CA3AF] my-4 ml-2">{details.description}</p>
          <h5>{details.brand.name}</h5>
          <h5 className="my-3">
            {details.price}
            <span className="ml-1">EGP</span>
          </h5>

          <button
            className="bg-[#0aad0a] text-white p-3 rounded w-full"
            onClick={() => handelProduct(details._id)}
          >
            {showing ? "+ Add to cart" : <LoadingAuth />}
          </button>
        </div>
      </div>
      <div></div>
    </>
  );
}
