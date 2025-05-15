import { ICulture } from "./culture.type";
export interface IRole {
    roleId: string;
    userId: string;
}
export interface IProfile {
    joinDate: Date;
    isActived: false;
    lastModified?: Date;
    modifiedBy: string;
    registerType?: string;
    avatar?: string;
    name?: string;
    nickName?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    countryId?: number;
    culture?: ICulture;
    dob?: string;
    roles?: IRole[];
    claims?: string[];
    logins?: string[];
    id: string;
    userName: string;
    normalizedUserName?: string;
    email: string;
    normalizedEmail?: string;
    emailConfirmed: boolean;
    passwordHash: string;
    securityStamp: string;
    concurrencyStamp: string;
    phoneNumber?: string;
    phoneNumberConfirmed: boolean;
    contactNumber?: string;
    twoFactorEnabled: boolean;
    fullname?: string;
    birthDate?: Date;
    userData?: Record<string, string>;
    province?: string;
    district?: string;
    ward?: string;
    address?: string;
}
