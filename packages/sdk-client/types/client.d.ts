import { MixcoreAuth } from './auth';
import { IPaginationResultModel } from './base';
import { MixcoreDatabase } from './database';
import { MixcoreStorage } from './storage';
import { IActionCallback, ICulture, IGlobalSettings } from './types';
export interface IClientConfig {
    endpoint?: string;
    tokenKey: string;
    refreshTokenKey: string;
    tokenType?: string;
}
export declare class MixcoreClient {
    BASE_ENDPOINT: string;
    ENDPOINT: {
        auth: {
            signIn: string;
            externalLogin: string;
            register: string;
            getProfile: string;
            culture: string;
            renewToken: string;
        };
        global: {
            globalSetting: string;
            dashboardInfo: string;
            restartApp: string;
            clearCache: string;
        };
        content: {
            pageContent: string;
            application: string;
            postContent: string;
            moduleContent: string;
            moduleData: string;
            postToPost: string;
            template: string;
            database: string;
            databaseRelation: string;
            databaseContext: string;
            getDatabaseBySystemName: string;
            mixDb: string;
            mixDbColumn: string;
        };
        storage: {
            upload: string;
            delete: string;
        };
        service: {
            metadata: string;
            getMetadata: string;
            createMetadataAsc: string;
            deleteMetadataAsc: string;
            sync: string;
        };
        settings: {
            config: string;
        };
        user: {
            list: string;
            detail: string;
            register: string;
            role: string;
            permission: string;
            delete: string;
            toggleRole: string;
        };
        events: {
            scheduler: string;
        };
        ecommerce: {
            updateDeliveryCode: string;
        };
        log: {
            search: string;
        };
        tms: {
            masterCategory: string;
        };
    };
    config: IClientConfig;
    headers: {
        'x-sdk-name': string;
        'x-sdk-platform': string;
        'x-sdk-language': string;
        'x-sdk-version': string;
    };
    auth: MixcoreAuth;
    database: MixcoreDatabase;
    storage: MixcoreStorage;
    globalSetting?: IGlobalSettings;
    cultures: ICulture[];
    initializedCulture: boolean;
    constructor(config?: Partial<IClientConfig>);
    /**
     * Fetches the global settings from the server
     * @param callBack - Optional callback function to execute after fetching is complete
     * @returns Promise containing the global settings
     * @throws Error if global settings cannot be fetched
     */
    getGlobalSetting: (callBack?: IActionCallback<IGlobalSettings>) => Promise<IGlobalSettings>;
    /**
     * Initializes localization data by fetching the available cultures
     * @returns Promise containing the cultures data
     * @throws Error if cultures cannot be fetched
     */
    initLocalization: () => Promise<IPaginationResultModel<ICulture> | undefined>;
}
