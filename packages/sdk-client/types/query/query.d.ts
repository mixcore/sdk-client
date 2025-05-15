import { ESearchMethod, ESortDirection, IMixFilter, IMixSort, IPaginationRequestModel } from "../base";
/**
 * A query builder class for constructing complex database queries with pagination, filtering, and sorting capabilities.
 * Implements IPaginationRequestModel to support pagination and filtering operations.
 */
export declare class MixQuery implements IPaginationRequestModel {
    [key: string]: unknown;
    pageSize?: number | undefined;
    keyword?: string | undefined;
    pageIndex?: number | undefined;
    searchColumns?: string | string[] | undefined;
    selectColumns?: string | undefined;
    searchMethod?: ESearchMethod | undefined;
    direction?: ESortDirection | undefined;
    parentId?: number | undefined;
    guidParentId?: string | undefined;
    parentName?: string | undefined;
    orderBy?: string | undefined;
    status?: string | undefined;
    filters?: {
        [key: string]: unknown;
    } | undefined;
    sorts?: IMixSort[] | undefined;
    queries?: IMixFilter[] | undefined;
    metadataQueries?: IMixFilter[] | undefined;
    loadNestedData?: boolean | undefined;
    mixDatabaseName?: string | undefined;
    columns?: string | undefined;
    compareOperator?: ESearchMethod | undefined;
    conjunction?: 'And' | 'Or';
    /**
     * Creates a new MixQuery instance
     * @param value - Optional initial values for the query
     */
    constructor(value?: Partial<IPaginationRequestModel>);
    /**
     * Sets default pagination values
     * @param pageSize - Number of items per page (default: 25)
     * @returns The current MixQuery instance for method chaining
     */
    default(pageSize?: number): this;
    /**
     * Sets pagination parameters for the query
     * @param pageIndex - Zero-based index of the page to retrieve
     * @param pageSize - Number of items per page
     * @returns The current MixQuery instance for method chaining
     * @example
     * // Get the second page with 10 items per page
     * const query = new MixQuery().page(1, 10);
     */
    page(pageIndex: number, pageSize: number): this;
    /**
     * Sets sorting parameters for the query
     * @param column - Name of the column to sort by
     * @param direction - Sort direction ('Asc' or 'Desc')
     * @returns The current MixQuery instance for method chaining
     * @example
    */
    sort(column: string, direction: ESortDirection): this;
    /**
     * Specifies columns to select in the query
     * @param columns - List of column names to select
     * @returns The current MixQuery instance for method chaining
     */
    select(...columns: string[]): this;
    /**
     * Adds a LIKE condition to the query
     * @param colName - Name of the column to filter
     * @param value - Value to search for
     * @param isRequired - Whether this condition is required
     * @returns The current MixQuery instance for method chaining
     */
    like(colName: string, value: string | number | Date | null, isRequired?: boolean): this;
    /**
     * Adds an EQUAL condition to the query
     * @param colName - Name of the column to filter
     * @param value - Value to match exactly
     * @param isRequired - Whether this condition is required
     * @returns The current MixQuery instance for method chaining
     */
    equal(colName: string, value: string | number | Date | boolean | null, isRequired?: boolean): this;
    between(colName: string, value1: string | number | Date | boolean | null, value2: string | number | Date | boolean | null, isRequired?: boolean): this;
    /**
     * Adds an IN condition to the query
     * @param colName - Name of the column to filter
     * @param value - Array of values to match
     * @param isRequired - Whether this condition is required
     * @returns The current MixQuery instance for method chaining
     */
    includes(colName: string, value: (string | number)[], isRequired?: boolean): this;
    /**
     * Adds a GREATER THAN condition to the query
     * @param colName - Name of the column to filter
     * @param value - Value to compare against
     * @param isRequired - Whether this condition is required
     * @param isEquals - Whether to include equality (>= instead of >)
     * @returns The current MixQuery instance for method chaining
     */
    greaterThan(colName: string, value: string | number | Date | null, isRequired?: boolean, isEquals?: boolean): this;
    /**
     * Adds a LESS THAN condition to the query
     * @param colName - Name of the column to filter
     * @param value - Value to compare against
     * @param isRequired - Whether this condition is required
     * @param isEquals - Whether to include equality (<= instead of <)
     * @returns The current MixQuery instance for method chaining
     */
    lessThan(colName: string, value: string | number | Date | null, isRequired?: boolean, isEquals?: boolean): this;
    /**
     * Adds a keyword search condition to the query
     * @param keyword - Search term to look for
     * @param searchColumns - Columns to search in
     * @returns The current MixQuery instance for method chaining
     */
    searchByKeyword(keyword: string, searchColumns: string | string[]): this;
    /**
     * Adds a text search condition to the query
     * @param colName - Name of the column to search in
     * @param value - Text to search for
     * @param isRequired - Whether this condition is required
     * @returns The current MixQuery instance for method chaining
     */
    searchByText(colName: string, value: string, isRequired?: boolean): this;
    /**
     * Conditionally adds a filter to the query
     * @param condition - Boolean condition to evaluate
     * @param fn - Function that returns a filter to add if condition is true
     * @returns The current MixQuery instance for method chaining
     */
    whereIf(condition: boolean | undefined, fn: () => IMixFilter): this;
    /**
     * Creates a LIKE filter condition
     * @param colName - Name of the column to filter
     * @param value - Value to search for
     * @param isRequired - Whether this condition is required
     * @returns A filter object for the LIKE condition
     */
    static Like(colName: string, value: string | number | Date | null, isRequired?: boolean): IMixFilter;
    /**
     * Creates an EQUAL filter condition
     * @param colName - Name of the column to filter
     * @param value - Value to match exactly
     * @param isRequired - Whether this condition is required
     * @returns A filter object for the EQUAL condition
     */
    static Equal(colName: string, value: string | number | Date | boolean | null, isRequired?: boolean): IMixFilter;
    /**
     * Creates a case-insensitive LIKE filter condition
     * @param colName - Name of the column to filter
     * @param value - Value to search for
     * @param isRequired - Whether this condition is required
     * @returns A filter object for the case-insensitive LIKE condition
     */
    static Search(colName: string, value: string | number | Date | null, isRequired?: boolean): IMixFilter;
    /**
     * Creates a GREATER THAN filter condition
     * @param colName - Name of the column to filter
     * @param value - Value to compare against
     * @param isRequired - Whether this condition is required
     * @param isEquals - Whether to include equality (>= instead of >)
     * @returns A filter object for the GREATER THAN condition
     */
    static GreaterThan(colName: string, value: string | number | Date | boolean | null, isRequired?: boolean, isEquals?: boolean): IMixFilter;
    /**
     * Creates a LESS THAN filter condition
     * @param colName - Name of the column to filter
     * @param value - Value to compare against
     * @param isRequired - Whether this condition is required
     * @param isEquals - Whether to include equality (<= instead of <)
     * @returns A filter object for the LESS THAN condition
     */
    static LessThan(colName: string, value: string | number | Date | boolean | null, isRequired?: boolean, isEquals?: boolean): IMixFilter;
    /**
     * Creates an IN filter condition
     * @param colName - Name of the column to filter
     * @param value - Array of values to match
     * @param isRequired - Whether this condition is required
     * @returns A filter object for the IN condition
     */
    static Includes(colName: string, value: (string | number)[], isRequired?: boolean): IMixFilter;
}
