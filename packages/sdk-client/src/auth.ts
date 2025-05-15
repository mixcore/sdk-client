import { API, setAuthToken } from "./api";
import { TApiResponse } from "./base";
import type { MixcoreClient } from "./client";
import { cryptoService } from "./crypto";
import { SafeLocalStorage } from "./helpers";
import { IActionCallback, ILoginRequest, IProfile, IRegisterAccountRequest, ITokenInfo } from "./types";

export class MixcoreAuth {
    public client: MixcoreClient;
    public tokenInfo?: ITokenInfo;
    public currentUser?: IProfile;

    public get config() {
        return this.client.config;
    }

    constructor(client: MixcoreClient) {
        this.client = client;
    }

    /**
 * Authenticates a user with the provided login credentials
 * @param loginData - Object containing login information (email/username, password, etc.)
 * @param apiEncryptKey - Optional encryption key for securing the login request. Defaults to empty string
 * @returns Promise containing token information upon successful login
 * @throws Error if login fails
 */
    public login = async (
        request: ILoginRequest,
        callBack?: IActionCallback<ITokenInfo>
    ) => {
        const encrypted = cryptoService.encryptAES(
            JSON.stringify(request),
            this.client.globalSetting?.apiEncryptKey || '',
        );

        try {
            const resposne = await API.post<{ message: string }, TApiResponse<ITokenInfo>>(this.client.ENDPOINT.auth.signIn, {
                message: encrypted,
            }).then((res) => res.data)

            this._handleAuthSuccess(resposne)
            callBack?.success(resposne)
            return resposne
        } catch (error) {
            callBack?.error(error)
            throw error;
        } finally {
            callBack?.finally()
        }
    }

    /**
     * Registers a new user account with the provided information
     * @param userData - Object containing registration details (username, email, password, etc.)
     * @returns Promise that resolves when registration is successful
     * @throws Error if registration fails
     */
    public register = async (userData: IRegisterAccountRequest, callBack?: IActionCallback<void>) => {
        try {
            const response = await API.post<IRegisterAccountRequest, TApiResponse<void>>(this.client.ENDPOINT.auth.signIn, userData).then(res => res.data);
            callBack?.success(response)

            return response;
        } catch (error) {
            callBack?.error(error)
            throw error;
        } finally {
            callBack?.finally()
        }
    }

    /**
     * Logs out the current user by clearing authentication tokens and user data
     * @param callback - Optional callback function to execute after logout is complete
     * @example
     * // Basic logout
     * client.logout();
     * 
     * // Logout with callback
     * client.logout(() => {
     *   console.log('Logged out successfully');
     *   // Perform post-logout actions
     * });
     */
    public logout(callback?: () => void): void {
        SafeLocalStorage.removeItem(this.config.tokenKey);
        SafeLocalStorage.removeItem(this.config.refreshTokenKey);

        this.tokenInfo = undefined;
        this.currentUser = undefined;

        if (callback) callback();
    }

    /**
   * Initializes user data by fetching the current user's profile information
   * @returns Promise containing the user profile data
   * @throws Error if user data cannot be fetched
   */
    public initUserData = async () => {
        const response = await API.get<IProfile>(this.client.ENDPOINT.auth.getProfile).then(res => res.data);

        this.currentUser = response;
        return response;
    }

    private _handleAuthSuccess = (data: ITokenInfo) => {
        this.tokenInfo = data;

        SafeLocalStorage.setItem(this.config.tokenKey, data.accessToken);
        SafeLocalStorage.setItem(this.config.refreshTokenKey, data.refreshToken);

        setAuthToken(data.accessToken, data.tokenType || 'Bearer');
    }
}