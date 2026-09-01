import axios from 'axios';
import router from '../routes/index';

// Base URLs with environment fallbacks
const COINGECKO_BASE_URL =
  import.meta.env.VITE_COINGECKO_BASE_URL || 'https://api.coingecko.com/api/v3/';
const POKEMON_BASE_URL =
  import.meta.env.VITE_POKEMON_BASE_URL || 'https://pokeapi.co/api/v2/';

// Client instances
const httpClient = axios.create({
  baseURL: COINGECKO_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const pokemonClient = axios.create({
  baseURL: POKEMON_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Common Request Interceptor
 */
const onRequest = (config) => {
  // CoinGecko API key auto-injection (if set in .env)
  const coingeckoKey = import.meta.env.VITE_COINGECKO_API_KEY;
  if (coingeckoKey && config.baseURL?.includes('coingecko.com')) {
    config.headers['x-cg-demo-api-key'] = coingeckoKey;
  }
  return config;
};

const onRequestError = (error) => {
  console.error('[API Request Error]:', error?.message || error);
  return Promise.reject(error);
};

/**
 * Common Response Interceptor
 */
const onResponse = (response) => response;

const onResponseError = async (error) => {
  if (error.response) {
    const { status, data } = error.response;
    const serverMessage = data?.message || data?.error || error.message;

    switch (status) {
      case 400:
        console.error('[400 Bad Request]:', serverMessage);
        break;

      case 401:
      case 403:
        console.error('[401/403 Unauthorized/Forbidden]: You do not have access to this resource.');
        break;

      case 404:
        console.warn('[404 Not Found]: Redirecting to 404 view...');
        if (router.currentRoute?.value?.path !== '/not-found') {
          await router.push('/not-found');
        }
        break;

      case 429:
        console.warn(
          '[429 Rate Limit]: Rate limit reached (CoinGecko free tier ~10-30 req/min). Please slow down.'
        );
        break;

      case 500:
      case 502:
      case 503:
        console.error(`[${status} Server Error]: Upstream service unavailable.`);
        break;

      default:
        console.error(`[API Error ${status}]:`, serverMessage);
    }
  } else if (error.code === 'ECONNABORTED') {
    console.error('[Timeout]: The request took longer than 10 seconds.');
  } else if (error.request) {
    console.error('[Network Error]: No response received from server. Check your connection.');
  } else {
    console.error('[Client Error]:', error.message);
  }

  // Reject the promise so downstream callers know the request failed
  return Promise.reject(error);
};

// Apply shared interceptors to both clients
httpClient.interceptors.request.use(onRequest, onRequestError);
httpClient.interceptors.response.use(onResponse, onResponseError);

pokemonClient.interceptors.request.use(onRequest, onRequestError);
pokemonClient.interceptors.response.use(onResponse, onResponseError);

export { httpClient, pokemonClient };