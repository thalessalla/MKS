import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "./queryKeys";

export const useGetProducts = () => {
  return useQuery({
    queryKey: [QueryKeys.products],
    queryFn: async () => {
      const response = await fetch(
        "https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=8&sortBy=id&orderBy=ASC"
      );
      const data = await response.json();
      return data;
    },
  });
};
