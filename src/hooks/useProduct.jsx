import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function useProduct() {

        

    function GetAllProduct() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      }    
      const res = useQuery({
        queryKey: ["allProduct"],
        queryFn: GetAllProduct,
      });
    
    return res
}
