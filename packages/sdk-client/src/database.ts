import { API } from "./api";
import { IPaginationResultModel, TApiResponse } from "./base";
import type { MixcoreClient } from "./client";
import { MixQuery } from "./query";
import { IActionCallback, IExportDataResponse } from "./types";

/**
 * MixcoreDatabase class provides methods to interact with the Mixcore database system.
 * It handles CRUD operations and data export functionality.
 */
export class MixcoreDatabase {
    public client: MixcoreClient;

    constructor(client: MixcoreClient) {
        this.client = client;
    }

    // Database data

    /**
     * Retrieves paginated data from a specified database using query parameters
     * @param databaseSystemName - The system name of the database to query
     * @param query - MixQuery instance containing filter, sort, and pagination parameters
     * @param callBack - Optional callback functions for success, error and completion
     * @returns Promise containing paginated result data of type T
     * @throws Error if the request fails
     */
    public getData = async <T>(
        databaseSystemName: string,
        query: MixQuery,
        callBack?: IActionCallback<IPaginationResultModel<T>>
    ): Promise<IPaginationResultModel<T>> => {
        try {
            const endpoint = `${this.client.ENDPOINT.content.mixDb}/${databaseSystemName}/filter`;

            query.mixDatabaseName = databaseSystemName;

            const response = await API.post<MixQuery, TApiResponse<IPaginationResultModel<T>>>(
                endpoint,
                query
            ).then((res: { data: any; }) =>
                res.data
            );

            return response;
        } catch (error) {
            callBack?.error?.(error);
            throw error;
        } finally {
            callBack?.finally?.();
        }
    }

    
    /**
     * Creates or updates a record in the specified database
     * @param databaseSystemName - The system name of the database
     * @param dataId - Optional ID of the record to update. If provided, performs PUT operation, otherwise POST
     * @param data - The data to create or update
     * @param callBack - Optional callback functions for success, error and completion
     * @returns Promise containing the created/updated data
     * @throws Error if the request fails
     */
    public postData = async <T>(
        databaseSystemName: string,
        dataId: number | string | undefined,
        data: Partial<T>,
        callBack?: IActionCallback<Partial<T>>
    ): Promise<Partial<T>> => {
        try {
            const endpoint = `${this.client.ENDPOINT.content.mixDb}/${databaseSystemName}/`;
            const request = dataId ? API.post<Partial<T>, TApiResponse<Partial<T>>>(
                endpoint,
                data
            ) : API.put<Partial<T>, TApiResponse<Partial<T>>>(
                endpoint,
                data)


            const response = await request.then((res: { data: any; }) => res.data);

            callBack?.success?.(response);
            return response;
        } catch (error) {
            callBack?.error?.(error);
            throw error;
        } finally {
            callBack?.finally?.();
        }
    }

    /**
     * Partially updates a record in the specified database
     * @param databaseSystemName - The system name of the database
     * @param dataId - ID of the record to update
     * @param data - The partial data to update
     * @param callBack - Optional callback functions for success, error and completion
     * @returns Promise containing the updated data
     * @throws Error if the request fails
     */
    public patchData = async <T>(
        databaseSystemName: string,
        dataId: number | string | undefined,
        data: Partial<T>,
        callBack?: IActionCallback<Partial<T>>
    ): Promise<Partial<T>> => {
        try {
            const endpoint = `${this.client.ENDPOINT.content.mixDb}/${databaseSystemName}/`;
            const response = await API.patch<Partial<T>, TApiResponse<Partial<T>>>(
                endpoint,
                { ...data, id: dataId }
            ).then((res: { data: any; }) => res.data);

            callBack?.success?.(response);
            return response;
        } catch (error) {
            callBack?.error?.(error);
            throw error;
        } finally {
            callBack?.finally?.();
        }
    }

    /**
     * Partially updates multiple records in the specified database
     * @param databaseSystemName - The system name of the database
     * @param data - Array of partial data objects to update
     * @param callBack - Optional callback functions for success, error and completion
     * @returns Promise containing the updated data
     * @throws Error if the request fails
     */
    public patchManyData = async <T>(
        databaseSystemName: string,
        data: Partial<T>[],
        callBack?: IActionCallback<Partial<T>>
    ): Promise<Partial<T>> => {
        try {
            const endpoint = `${this.client.ENDPOINT.content.mixDb}/${databaseSystemName}/patch-many`;
            const response = await API.patch<Partial<T>, TApiResponse<Partial<T>>>(
                endpoint,
                data
            ).then((res: { data: any; }) => res.data);

            callBack?.success?.(response);
            return response;
        } catch (error) {
            callBack?.error?.(error);
            throw error;
        } finally {
            callBack?.finally?.();
        }
    }

    /**
     * Deletes a record from the specified database
     * @param databaseSystemName - The system name of the database
     * @param dataId - ID of the record to delete
     * @param callBack - Optional callback functions for success, error and completion
     * @returns Promise containing the deleted data
     * @throws Error if the request fails
     */
    public deleteData = async <T>(
        databaseSystemName: string,
        dataId: number | string | undefined,
        callBack?: IActionCallback<Partial<T>>
    ): Promise<Partial<T>> => {
        try {
            const endpoint = `${this.client.ENDPOINT.content.mixDb}/${databaseSystemName}/${dataId}`;
            const response = await API.delete<Partial<T>, TApiResponse<Partial<T>>>(
                endpoint
            ).then((res: { data: any; }) => res.data);

            callBack?.success?.(response);
            return response;
        } catch (error) {
            callBack?.error?.(error);
            throw error;
        } finally {
            callBack?.finally?.();
        }
    }

    /**
     * Exports data from the specified database based on query parameters
     * @param databaseSystemName - The system name of the database
     * @param query - MixQuery instance containing filter, sort, and pagination parameters
     * @param callBack - Optional callback functions for success, error and completion
     * @returns Promise containing the export data response
     * @throws Error if the request fails
     */
    public exportData = async <T>(
        databaseSystemName: string,
        query: MixQuery,
        callBack?: IActionCallback<T>
    ): Promise<IExportDataResponse> => {
        try {
            const endpoint = `${this.client.ENDPOINT.content.mixDb}/${databaseSystemName}/export`;
            const response = await API.post<T, TApiResponse<IExportDataResponse>>(endpoint, query).then((res: { data: any; }) => res.data);

            return response;
        } catch (error) {
            callBack?.error?.(error);
            throw error;
        } finally {
            callBack?.finally?.();
        }
    }
}   