import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/optima/api/product';

export const listProducts = () => {
    return axios.get(REST_API_BASE_URL);
}

export const createProduct = (product: {name:string; description: string;
    priceNormal: number; status: boolean}) => axios.post(REST_API_BASE_URL, product);

export const getProduct = (productId: string) => axios.get(REST_API_BASE_URL + '/' + productId);

