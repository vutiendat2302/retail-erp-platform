import axios from "axios";
import { listBrands } from "../../services/inventery-api/BrandService";
const REST_API_PRODUCT_URL = 'http://localhost:8080/optima/api/product';

export const listProducts = () => {
    return axios.get(REST_API_PRODUCT_URL);
}

type ProductRequestDto = {
    name: string;
    description: string;
    priceNormal: number;
    status: boolean;
    brandId: string;
    categoryId: string;
    manufacturingLocationId: string;
}


export type BrandResponseDto = {
    id: string;
    name: string;
}

type CategoryResponseDto = {
    id: string;
    name: string;
}

type ManufacturingLocationResponseDto = {
    id: string;
    name: string;
}

type ProductResponseDto = {
    name: string;
    description: string;
    priceNormal: number;
    status: boolean;
    brandResponseDto: BrandResponseDto;
    categoryResponseDto: CategoryResponseDto;
    manufacturingResponseDto: ManufacturingLocationResponseDto;
}

export const createProduct = (product: ProductRequestDto) => axios.post<ProductResponseDto>(REST_API_PRODUCT_URL, product);

export const getProduct = (productId: string) => axios.get(REST_API_PRODUCT_URL + '/' + productId);

export const updateProduct = (productId: string, product: ProductRequestDto) => axios.put(REST_API_PRODUCT_URL + '/' + productId, product);

export const deleteProduct = (productId: string) => axios.delete(REST_API_PRODUCT_URL + '/' + productId);

export const fetchAllBrands = () => listBrands();