export declare class ILoginRequest {
    email: string | undefined;
    username: string | undefined;
    password: string | undefined;
    rememberMe: boolean;
    returnUrl: string | undefined;
}
export declare class ITokenInfo {
    accessToken: string;
    tokenType: string;
    refreshToken: string;
    expiresIn: number | undefined;
    clientId: string | undefined;
    issuedAt: Date | undefined;
    expiresAt: Date | undefined;
    deviceId: string | undefined;
}
