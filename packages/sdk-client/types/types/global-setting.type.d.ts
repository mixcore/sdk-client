export interface IRsaKeys {
    PrivateKey: string;
    PublicKey: string;
}
export interface IGlobalSettings {
    domain: string;
    apiEncryptKey: string;
    rsaKeys: IRsaKeys;
    isEncryptApi: boolean;
    pageTypes: string[];
    moduleTypes: string[];
    mixDatabaseTypes: string[];
    dataTypes: string[];
    statuses: string[];
    expiredAt: Date;
}
