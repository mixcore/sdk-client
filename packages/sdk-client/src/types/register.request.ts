export interface IRegisterAccountRequest {
    userName: string;
    email: string;
    phoneNumber?: string;
    provider?: 'Facebook';
    providerKey?: string;
    password: string;
    confirmPassword: string;
    data?: Record<string, string>;
}