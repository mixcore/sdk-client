export declare const API: import("axios").AxiosInstance;
/**
 * Updates the Axios instance configuration
 * @param config - Partial configuration object to update
 * @example
 * updateConfig({
 *   baseURL: 'https://api.example.com',
 *   headers: { Authorization: 'Bearer token' }
 * })
 */
export declare const updateConfig: (config: Partial<typeof API.defaults>) => void;
/**
 * Sets the authorization token in the Axios instance
 * @param token - The authorization token, if undefined, the token will be removed
 * @param type - The token type (default: 'Bearer')
 */
export declare const setAuthToken: (accessToken: string | undefined, type?: string) => void;
/**
 * Sets the base URL for the Axios instance
 * @param domainUrl - The base domain of mixcore server to set, if undefined, it will reset to the default BASE_URL
 * @param customApiPath - The custom API path to set, if undefined, it will reset to the default BASE_API_PATH
 */
export declare const setDomainUrl: (domainUrl: string | undefined, customApiPath?: string) => void;
/**
 * Sets the base URL for the Axios instance
 * @param baseUrl - The base domain of mixcore server to set, if undefined, it will reset to the default BASE_URL
 */
export declare const setBaseUrl: (baseUrl: string | undefined) => void;
