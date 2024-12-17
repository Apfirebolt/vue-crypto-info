import axios from 'axios';
import router from '../routes/index';

let baseURL = 'https://api.coingecko.com/api/v3/';
let pokemonUrl = 'https://pokeapi.co/api/v2/';

const httpClient = axios.create({ baseURL });
const pokemonClient = axios.create({ baseURL: pokemonUrl });

// Create a request interceptor

const requestInterceptor = httpClient.interceptors.request.use(
    config => {
        // Do something before request is sent
        return config;
    },
    error => {
        // Do something with request error
        console.log('Error here')
        return Promise.reject(error);
    }
);

// Create a response interceptor
const responseInterceptor = httpClient.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response.status === 401 || error.response.status === 403) {
            console.error('You are not authorized to access this resource');
        }
        else if (error.response.status === 404) {
            router.push('/not-found');
        }
        else if (error.response.status === 400) {
            console.error('Bad request');
        }
        // Do something with response error
        else {
            console.error(error.response.data.message)
            return Promise.reject(error);
        }
    }
);

export { httpClient, pokemonClient };

