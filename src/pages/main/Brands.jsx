import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
// import SkeletonCard from "../../components/SkeletonCard"; // استيراد المكون

export default function Brands() {
  function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: "getCategories",
    queryFn: getAllBrands,
  });

  function SkeletonCard() {
    return (
      <div className="brand bg-gray-300 animate-pulse p-4 rounded-lg shadow-lg">
        <div className="w-full h-80 bg-gray-400 rounded-md mb-3"></div>
        <h6 className="w-1/2 h-4 bg-gray-400 mx-auto rounded"></h6>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container w-[90%] mx-auto my-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-3">
          {Array(8) // عرض 8 بطاقات وهمية أثناء التحميل
            .fill(0)
            .map((_, index) => (
              <SkeletonCard  key={index} />
            ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return <h1>Error fetching brands</h1>;
  }

  const brands = data?.data?.data || [];

  return (
    <div className="container w-[90%] mx-auto my-4">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-3">
        {brands.map((brand) => (
          <div
            key={brand._id}
            className="brand bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-80 object-cover rounded-md mb-3"
            />
            <h6 className="text-center text-white font-semibold text-lg">
              {brand.name}
            </h6>
          </div>
        ))}
      </div>
    </div>
  );
}
