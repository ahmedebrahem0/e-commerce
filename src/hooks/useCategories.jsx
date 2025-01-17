import axios from "axios";
import { useQuery } from "react-query";
import { GridLoader } from "react-spinners";

export default function useCategories() {
  function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
      
  }
  const res = useQuery({
    queryKey: ["getCategories"],
    queryFn: getAllCategories,
  });

  return res;
}
