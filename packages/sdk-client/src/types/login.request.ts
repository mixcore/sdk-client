export class ILoginRequest {
    public email: string | undefined;
    public username: string | undefined;
    public password: string | undefined;
    public rememberMe = false;
    public returnUrl: string | undefined;
}

export class ITokenInfo {
    public accessToken!: string;
    public tokenType!: string;
    public refreshToken!: string;
    public expiresIn: number | undefined;
    public clientId: string | undefined;
    public issuedAt: Date | undefined;
    public expiresAt: Date | undefined;
    public deviceId: string | undefined;
}