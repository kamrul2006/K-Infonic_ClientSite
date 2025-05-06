import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";


const UseProduct = () => {

    const axiosPublic = UseAxiosPublic()

    const { refetch, data: allProduct = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosPublic.get('/products')
            return res.data
        }
    })


    return [allProduct, refetch]
};

export default UseProduct;