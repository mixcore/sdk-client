/**
 * Enum representing different search methods that can be used in queries
 */
export declare enum ESearchMethod {
    /** Performs a LIKE search operation */
    Like = "Like",
    /** Performs an IN search operation */
    In = "In",
    /** Performs a range-based search operation */
    InRange = "InRange",
    /** Performs an exact match search operation */
    Equal = "Equal"
}
/**
 * Enum representing different comparison operators for filtering data
 */
export declare enum ECompareOperator {
    /** Case-sensitive pattern matching */
    Like = "Like",
    /** Case-insensitive pattern matching */
    ILike = "ILike",
    /** Exact equality comparison */
    Equal = "Equal",
    /** Not equal comparison */
    NotEqual = "NotEqual",
    /** Less than or equal to comparison */
    LessThanOrEqual = "LessThanOrEqual",
    /** Less than comparison */
    LessThan = "LessThan",
    /** Greater than comparison */
    GreaterThan = "GreaterThan",
    /** Greater than or equal to comparison */
    GreaterThanOrEqual = "GreaterThanOrEqual",
    /** Checks if value contains the specified string */
    Contain = "Contain",
    /** Checks if value does not contain the specified string */
    NotContain = "NotContain",
    /** Checks if value falls within a specified range */
    InRange = "InRange"
}
/**
 * Enum representing sort directions for ordering data
 */
export declare enum ESortDirection {
    /** Sort in ascending order */
    Asc = "Asc",
    /** Sort in descending order */
    Desc = "Desc"
}
/**
 * Interface representing a sort configuration for data
 */
export interface IMixSort {
    /** Display name for the sort column */
    displayName?: string;
    /** System name of the column to sort by */
    colSysName: string;
    /** Direction of the sort (ascending or descending) */
    direction: ESortDirection;
    /** Indicates if this is a temporary sort */
    temporary?: boolean;
}
/**
 * Interface representing a pagination request model
 * Used for requesting paginated data with various filtering and sorting options
 */
export interface IPaginationRequestModel {
    /** Number of items per page */
    pageSize?: number;
    /** Search keyword for filtering results */
    keyword?: string;
    /** Current page index (0-based) */
    pageIndex?: number;
    /** Columns to search in when using keyword */
    searchColumns?: string | string[];
    /** Method to use for searching */
    searchMethod?: ESearchMethod;
    /** Sort direction for the results */
    direction?: ESortDirection;
    /** ID of the parent entity */
    parentId?: number;
    /** GUID of the parent entity */
    guidParentId?: string;
    /** Name of the parent entity */
    parentName?: string;
    /** Column to order results by */
    orderBy?: string;
    /** Status filter */
    status?: string;
    /** Additional filters to apply */
    filters?: {
        [key: string]: unknown;
    };
    /** Sort configurations */
    sorts?: IMixSort[];
    /** Query filters */
    queries?: IMixFilter[];
    /** Metadata query filters */
    metadataQueries?: IMixFilter[];
    /** Whether to load nested data */
    loadNestedData?: boolean;
    /** Name of the database to query */
    mixDatabaseName?: string;
    /** Additional properties */
    [key: string]: unknown;
}
/**
 * Interface representing a filter condition
 */
export interface IMixFilter {
    /** Name of the field to filter on */
    fieldName: string;
    /** Value to compare against */
    value: string | number | null | Date | boolean;
    /** Operator to use for comparison */
    compareOperator: ECompareOperator;
    /** Whether this filter is required */
    isRequired?: boolean;
    /** Display name for the filter */
    displayName?: string;
    /** Available options for the filter */
    options?: string[];
    /** Type of the filter (select or date) */
    type?: 'select' | 'date';
    /** Whether this is a draft filter */
    draft?: boolean;
}
