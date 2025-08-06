import axios from "axios";

const REST_API_MANUFACTURING_LOCATION_URL = 'http://localhost:8080/optima/api/manufacturinglocation';

export const listManufacturingLocations = () => {
    return axios.get(REST_API_MANUFACTURING_LOCATION_URL);
}