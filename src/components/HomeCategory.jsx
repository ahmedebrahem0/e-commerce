import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useCategories from "./../hooks/useCategories";

function SkeletonCategory() {
  return (
    <div className="px-2">
      <div className="h-32 w-full bg-gray-200 animate-pulse rounded-md"></div>
      <div className="h-4 bg-gray-300 rounded mt-2 w-3/4 mx-auto"></div>
    </div>
  );
}

export default function HomeCategory() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 10, // الافتراضي للشاشات الكبيرة
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // الشاشات المتوسطة
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 768, // الشاشات الصغيرة
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480, // الشاشات الصغيرة
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const { data, isLoading, isError } = useCategories();
  const categories = data?.data?.data || [];

  if (isError) {
    return <h1>Error fetching categories</h1>;
  }

  return (
    <Slider {...settings}>
      {isLoading
        ? Array(10) // عدد الـ SkeletonCards الذي يعادل عدد الـ slidesToShow
            .fill(0)
            .map((_, index) => <SkeletonCategory key={index} />)
        : categories.map((category) => (
            <div key={category._id} className="px-2">
              <img
                src={category.image}
                className="h-32 w-full object-cover rounded-md"
                alt={category.name}
              />
              <h6 className="text-center text-sm font-medium mt-2">
                {category.name}
              </h6>
            </div>
          ))}
    </Slider>
  );
}
