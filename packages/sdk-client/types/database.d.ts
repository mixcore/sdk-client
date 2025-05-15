import { IPaginationResultModel } from "./base";
import type { MixcoreClient } from "./client";
import { MixQuery } from "./query";
import { IActionCallback, IExportDataResponse } from "./types";
/**
 * MixcoreDatabase class provides methods to interact with the Mixcore database system.
 * It handles CRUD operations and data export functionality.
 */
export declare class MixcoreDatabase {
    client: MixcoreClient;
    constructor(client: MixcoreClient);
    /**
     * Retrieves paginated data from a specified database using query parameters
     * @param databaseSystemName - The system name of the database to query
     * @param query - MixQuery instance containing filter, sort, and pagination parameters
     * @param callBack - Optional callback functions for success, error and completion
     * @returns Promise containing paginated result data of type T
     * @throws Error if the request fails
     */
    getData: <T>(databaseSystemName: string, query: MixQuery, callBack?: IActionCallback<IPaginationResultModel<T>>) => Promise<IPaginationResultModel<T>>;
    /**
     * Creates or updates a record in the specified database
     * @param databaseSystemName - The system name of the database
     * @param dataId - Optional ID of the record to update. If provided, performs PUT operation, otherwise POST
     * @param data - The data to create or update
     * @param callBack - Optional callback functions for success, error and completion
     * @returns Promise containing the created/updated data
     * @throws Error if the request fails
     */
    postData: <T>(databaseSystemName: string, dataId: number | string | undefined, data: Partial<T>, callBack?: IActionCallback<Partial<T>>) => Promise<Partial<T>>;
    /**
     * Partially updates a record in the specified database
     * @param databaseSystemName - The system name of the database
     * @param dataId - ID of the record to update
     * @param data - The partial data to update
     * @param callBack - Optional callback functions for success, error and completion
     * @returns Promise containing the updated data
     * @throws Error if the request fails
     */
    patchData: <T>(databaseSystemName: string, dataId: number | string | undefined, data: Partial<T>, callBack?: IActionCallback<Partial<T>>) => Promise<Partial<T>>;
    /**
     * Partially updates multiple records in the specified database
     * @param databaseSystemName - The system name of the database
     * @param data - Array of partial data objects to update
     * @param callBack - Optional callback functions for success, error and completion
     * @returns Promise containing the updated data
     * @throws Error if the request fails
     */
    patchManyData: <T>(databaseSystemName: string, data: Partial<T>[], callBack?: IActionCallback<Partial<T>>) => Promise<Partial<T>>;
    /**
     * Deletes a record from the specified database
     * @param databaseSystemName - The system name of the database
     * @param dataId - ID of the record to delete
     * @param callBack - Optional callback functions for success, error and completion
     * @returns Promise containing the deleted data
     * @throws Error if the request fails
     */
    deleteData: <T>(databaseSystemName: string, dataId: number | string | undefined, callBack?: IActionCallback<Partial<T>>) => Promise<Partial<T>>;
    /**
     * Exports data from the specified database based on query parameters
     * @param databaseSystemName - The system name of the database
     * @param query - MixQuery instance containing filter, sort, and pagination parameters
     * @param callBack - Optional callback functions for success, error and completion
     * @returns Promise containing the export data response
     * @throws Error if the request fails
     */
    exportData: <T>(databaseSystemName: string, query: MixQuery, callBack?: IActionCallback<T>) => Promise<IExportDataResponse>;
}
