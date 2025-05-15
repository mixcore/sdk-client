import type { MixcoreClient } from "./client";
import { IActionCallback, ILoginRequest, IProfile, IRegisterAccountRequest, ITokenInfo } from "./types";
export declare class MixcoreAuth {
    client: MixcoreClient;
    tokenInfo?: ITokenInfo;
    currentUser?: IProfile;
    get config(): import("./client").IClientConfig;
    constructor(client: MixcoreClient);
    /**
 * Authenticates a user with the provided login credentials
 * @param loginData - Object containing login information (email/username, password, etc.)
 * @param apiEncryptKey - Optional encryption key for securing the login request. Defaults to empty string
 * @returns Promise containing token information upon successful login
 * @throws Error if login fails
 */
    login: (request: ILoginRequest, callBack?: IActionCallback<ITokenInfo>) => Promise<ITokenInfo>;
    /**
     * Registers a new user account with the provided information
     * @param userData - Object containing registration details (username, email, password, etc.)
     * @returns Promise that resolves when registration is successful
     * @throws Error if registration fails
     */
    register: (userData: IRegisterAccountRequest, callBack?: IActionCallback<void>) => Promise<void>;
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
    logout(callback?: () => void): void;
    /**
   * Initializes user data by fetching the current user's profile information
   * @returns Promise containing the user profile data
   * @throws Error if user data cannot be fetched
   */
    initUserData: () => Promise<IProfile>;
    private _handleAuthSuccess;
}
