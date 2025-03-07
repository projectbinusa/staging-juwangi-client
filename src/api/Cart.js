import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCart = async () => {
  const response = await axios.get("http://localhost:4322/api/cart");
  return response.data;
};

export const useGetCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });
};
