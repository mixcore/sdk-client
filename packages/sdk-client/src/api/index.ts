import axios  from "axios";
import { TApiError } from "../base";


const BASE_API_PATH = '/api/v2';

export const API = axios.create({
  baseURL: BASE_API_PATH,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

API.interceptors.response.use(
  response => response,
  (error: TApiError) => {
    // TODO: ** write error logs
    
    // ** catch error
    if (error?.response?.status && [401, 403].includes(error.response.status)) {
      throw error.response.status;
    }

    throw error?.response?.data?.code || 'default';
  }
);

/**
 * Updates the Axios instance configuration
 * @param config - Partial configuration object to update
 * @example
 * updateConfig({
 *   baseURL: 'https://api.example.com',
 *   headers: { Authorization: 'Bearer token' }
 * })
 */
export const updateConfig = (config: Partial<typeof API.defaults>) => {
  Object.assign(API.defaults, config);
};

/**
 * Sets the authorization token in the Axios instance
 * @param token - The authorization token, if undefined, the token will be removed
 * @param type - The token type (default: 'Bearer')
 */
export const setAuthToken = (accessToken: string | undefined, type: string = 'Bearer') => {
  if (accessToken) API.defaults.headers.common.Authorization = `${type} ${accessToken}`;
  else delete API.defaults.headers.common.Authorization;
};

/**
 * Sets the base URL for the Axios instance
 * @param domainUrl - The base domain of mixcore server to set, if undefined, it will reset to the default BASE_URL
 * @param customApiPath - The custom API path to set, if undefined, it will reset to the default BASE_API_PATH
 */
export const setDomainUrl = (domainUrl: string | undefined, customApiPath: string = BASE_API_PATH) => {
  API.defaults.baseURL = `${domainUrl}${customApiPath}`;
};

/**
 * Sets the base URL for the Axios instance
 * @param baseUrl - The base domain of mixcore server to set, if undefined, it will reset to the default BASE_URL
 */
export const setBaseUrl = (baseUrl: string | undefined) => {
  API.defaults.baseURL = `${baseUrl}`;
};


