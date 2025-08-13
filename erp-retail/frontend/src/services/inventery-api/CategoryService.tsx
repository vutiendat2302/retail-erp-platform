import axios from "axios";

const REST_API_CATEGORY_URL = 'http://localhost:8080/optima/api/category';

export const listCategories = () => {
    return axios.get(REST_API_CATEGORY_URL);
}