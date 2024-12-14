import axios from 'axios'

const apiKey = import.meta.env.VITE_CARBON_API_KEY;
const apiUrl = import.meta.env.VITE_CARBON_API_URL;

const http = axios.create({
    baseURL: apiUrl,
})


http.interceptors.request.use(
    (config) => {
        if (!apiKey) {
            console.error('API Key is missing');
            return Promise.reject('API Key is missing');
        }
        config.headers['Authorization'] = `Bearer ${apiKey}`;
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);


const getEstimate = (store) => {
    return http.post('/estimates', {
    type: "shipping", 
    weight_value: store.totalWeight, 
    weight_unit: String(store.weightUnit).toLowerCase(), 
    distance_value: store.distanceToMadrid, 
    distance_unit: String(store.distanceUnit).toLowerCase(),  
    transport_method: String(store.transportMethod).toLowerCase(),  
  });
}


export {
    getEstimate
}