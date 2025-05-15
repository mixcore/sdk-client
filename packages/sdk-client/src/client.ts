import { MixcoreAuth } from './auth';
import { API, setBaseUrl } from './api';
import { IPaginationRequestModel, IPaginationResultModel, TApiResponse } from './base';
import { MixcoreDatabase } from './database';
import { MixcoreStorage } from './storage';
import { IActionCallback, ICulture, IGlobalSettings } from './types';

export interface IClientConfig {
  endpoint?: string;
  tokenKey: string;
  refreshTokenKey: string;
  tokenType?: string;
}

export class MixcoreClient {
  public BASE_ENDPOINT = 'https://api.mixcore.io/api/v2'
  public ENDPOINT = {
    auth: {
      signIn: '/rest/auth/user/login',
      externalLogin: '/rest/auth/p4ps/external-login-unsecure',
      register: '/rest/auth/user/register',
      getProfile: '/rest/auth/user/my-profile',
      culture: '/rest/mix-portal/culture',
      renewToken: '/rest/auth/user/renew-token',
    },
    global: {
      globalSetting: '/rest/shared/get-global-settings',
      dashboardInfo: '/rest/mix-portal/common/en-US/dashboard',
      restartApp: '/rest/shared/stop-application',
      clearCache: '/rest/shared/clear-cache',
    },
    content: {
      pageContent: '/rest/mix-portal/mix-page-content',
      application: '/rest/mix-portal/mix-application',
      postContent: '/rest/mix-portal/mix-post-content',
      moduleContent: '/rest/mix-portal/mix-module-content',
      moduleData: '/rest/mix-portal/mix-module-data',
      postToPost: '/rest/mix-portal/mix-post-post',
      template: '/rest/mix-portal/mix-template',
      database: '/rest/mix-portal/mix-database',
      databaseRelation: '/rest/mix-portal/mix-database-relationship',
      databaseContext: '/rest/mix-portal/mixdb-context',
      getDatabaseBySystemName: '/rest/mix-portal/mix-database/get-by-name',
      mixDb: '/rest/mix-portal/mix-db',
      mixDbColumn: '/rest/mix-portal/mix-database-column',
    },
    storage: {
      upload: '/rest/mix-storage/upload-file',
      delete: '/rest/mix-storage/delete-file',
    },
    service: {
      metadata: '/rest/mix-services/metadata',
      getMetadata: '/rest/mix-services/metadata/get-metadata',
      createMetadataAsc:
        '/rest/mix-services/metadata/create-metadata-association',
      deleteMetadataAsc:
        '/rest/mix-services/metadata/delete-metadata-association',
      sync: '/api/daphale/sync/products',
    },
    settings: {
      config: '/rest/mix-portal/configuration',
    },
    user: {
      list: '/rest/auth/user/list',
      detail: '/rest/auth/user/details',
      register: '/rest/auth/user/register',
      role: '/rest/auth/role',
      permission: '/rest/mix-services/permission',
      delete: '/rest/auth/user/remove-user',
      toggleRole: '/rest/auth/user/user-in-role',
    },
    events: {
      scheduler: '/scheduler',
    },
    ecommerce: {
      updateDeliveryCode: '/ecommerce/update-delivery-code',
    },
    log: {
      search: '/rest/mix-log/audit-log/search',
    },
    tms: {
      masterCategory: '/tms/rest/master-category',
    },
  };

  public config: IClientConfig = {
    endpoint: this.BASE_ENDPOINT,
    tokenType: 'Bearer',
    tokenKey: 'mix_access_token',
    refreshTokenKey: 'mix_refresh_token',
  }

  public headers = {
    'x-sdk-name': 'Web',
    'x-sdk-platform': 'client',
    'x-sdk-language': 'web',
    'x-sdk-version': '0.0.1',
  };

  public auth: MixcoreAuth;
  public database: MixcoreDatabase;
  public storage: MixcoreStorage;

  public cultures: ICulture[] = [];
  public initializedCulture = false;

  public set globalSetting(value: IGlobalSettings | undefined) {
    this._globalSetting = value;
  }

  public get globalSetting() {
    return this._globalSetting;
  }

  private _globalSetting?: IGlobalSettings;

  constructor(config: Partial<IClientConfig> = {}) {
    this.config = { ...this.config, ...config }

    setBaseUrl(this.config.endpoint || this.BASE_ENDPOINT)

    this.getGlobalSetting()
    this.auth = new MixcoreAuth(this)
    this.database = new MixcoreDatabase(this)
    this.storage = new MixcoreStorage(this)
  }

  /**
   * Fetches the global settings from the server
   * @param callBack - Optional callback function to execute after fetching is complete
   * @returns Promise containing the global settings
   * @throws Error if global settings cannot be fetched
   */
  public getGlobalSetting = async (callBack?: IActionCallback<IGlobalSettings>) => {
    try {
      const response = await API.get<IGlobalSettings>(this.ENDPOINT.global.globalSetting).then(res => res.data);
      this.globalSetting = response;
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
   * Initializes localization data by fetching the available cultures
   * @returns Promise containing the cultures data
   * @throws Error if cultures cannot be fetched
   */
  public initLocalization = async () => {
    if (this.initializedCulture) return;

    const response = await API.get<IPaginationRequestModel, TApiResponse<IPaginationResultModel<ICulture>>>(this.ENDPOINT.auth.culture, {
      params: { pageSize: 100 }
    }).then(res => res.data);

    this.initializedCulture = true;
    this.cultures = response.items || [];

    return response;
  }
} 