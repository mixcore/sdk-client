import { ECompareOperator, ESearchMethod, ESortDirection, IMixFilter, IMixSort, IPaginationRequestModel } from "../base";

/**
 * A query builder class for constructing complex database queries with pagination, filtering, and sorting capabilities.
 * Implements IPaginationRequestModel to support pagination and filtering operations.
 */
export class MixQuery implements IPaginationRequestModel {
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
  filters?: { [key: string]: unknown } | undefined;
  sorts?: IMixSort[] | undefined;
  queries?: IMixFilter[] | undefined;
  metadataQueries?: IMixFilter[] | undefined;
  loadNestedData?: boolean | undefined;
  mixDatabaseName?: string | undefined;
  columns?: string | undefined;
  compareOperator?: ESearchMethod | undefined;
  conjunction?: 'And' | 'Or' = 'And';

  /**
   * Creates a new MixQuery instance
   * @param value - Optional initial values for the query
   */
  constructor(value?: Partial<IPaginationRequestModel>) {
    if (value) Object.assign(this, value);
  }

  /**
   * Sets default pagination values
   * @param pageSize - Number of items per page (default: 25)
   * @returns The current MixQuery instance for method chaining
   */
  public default(pageSize = 25) {
    this.pageIndex = 0;
    this.pageSize = pageSize;

    return this;
  }

  /**
   * Sets pagination parameters for the query
   * @param pageIndex - Zero-based index of the page to retrieve
   * @param pageSize - Number of items per page
   * @returns The current MixQuery instance for method chaining
   * @example
   * // Get the second page with 10 items per page
   * const query = new MixQuery().page(1, 10);
   */
  public page(pageIndex: number, pageSize: number) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;

    return this;
  }

  /**
   * Sets sorting parameters for the query
   * @param column - Name of the column to sort by
   * @param direction - Sort direction ('Asc' or 'Desc')
   * @returns The current MixQuery instance for method chaining
   * @example
  */
  public sort(column: string, direction: ESortDirection) {
    this.direction = direction;
    this.orderBy = column;;

    return this;
  }

  /**
   * Specifies columns to select in the query
   * @param columns - List of column names to select
   * @returns The current MixQuery instance for method chaining
   */
  public select(...columns: string[]) {
    this.selectColumns = columns.join(', ');

    return this;
  }

  /**
   * Adds a LIKE condition to the query
   * @param colName - Name of the column to filter
   * @param value - Value to search for
   * @param isRequired - Whether this condition is required
   * @returns The current MixQuery instance for method chaining
   */
  public like(
    colName: string,
    value: string | number | Date | null,
    isRequired = false,
  ) {
    this.queries = [
      ...(this.queries || []),
      MixQuery.Like(colName, value, isRequired),
    ];

    return this;
  }

  /**
   * Adds an EQUAL condition to the query
   * @param colName - Name of the column to filter
   * @param value - Value to match exactly
   * @param isRequired - Whether this condition is required
   * @returns The current MixQuery instance for method chaining
   */
  public equal(
    colName: string,
    value: string | number | Date | boolean | null,
    isRequired = false,
  ) {
    this.queries = [
      ...(this.queries || []),
      MixQuery.Equal(colName, value, isRequired),
    ];

    return this;
  }

  public between(
    colName: string,
    value1: string | number | Date | boolean | null,
    value2: string | number | Date | boolean | null,
    isRequired = false,
  ) {
    this.queries = [
      ...(this.queries || []),
      MixQuery.GreaterThan(colName, value1, isRequired),
      MixQuery.LessThan(colName, value2, isRequired),
    ];

    return this;
  }

  /**
   * Adds an IN condition to the query
   * @param colName - Name of the column to filter
   * @param value - Array of values to match
   * @param isRequired - Whether this condition is required
   * @returns The current MixQuery instance for method chaining
   */
  public includes(
    colName: string,
    value: (string | number)[],
    isRequired = false,
  ) {
    this.queries = [
      ...(this.queries || []),
      MixQuery.Includes(colName, value, isRequired),
    ];

    return this;
  }

  /**
   * Adds a GREATER THAN condition to the query
   * @param colName - Name of the column to filter
   * @param value - Value to compare against
   * @param isRequired - Whether this condition is required
   * @param isEquals - Whether to include equality (>= instead of >)
   * @returns The current MixQuery instance for method chaining
   */
  public greaterThan(colName: string, value: string | number | Date | null, isRequired = false, isEquals = false) {
    this.queries = [
      ...(this.queries || []),
      MixQuery.GreaterThan(colName, value, isRequired, isEquals),
    ];

    return this;
  }

  /**
   * Adds a LESS THAN condition to the query
   * @param colName - Name of the column to filter
   * @param value - Value to compare against
   * @param isRequired - Whether this condition is required
   * @param isEquals - Whether to include equality (<= instead of <)
   * @returns The current MixQuery instance for method chaining
   */
  public lessThan(colName: string, value: string | number | Date | null, isRequired = false, isEquals = false) {
    this.queries = [
      ...(this.queries || []),
      MixQuery.LessThan(colName, value, isRequired, isEquals),
    ];

    return this;
  }

  /**
   * Adds a keyword search condition to the query
   * @param keyword - Search term to look for
   * @param searchColumns - Columns to search in
   * @returns The current MixQuery instance for method chaining
   */
  public searchByKeyword(keyword: string, searchColumns: string | string[]) {
    this.keyword = keyword;
    this.searchColumns = searchColumns;
    this.compareOperator = ESearchMethod.Like;
    this.conjunction = 'And';

    return this;
  }

  /**
   * Adds a text search condition to the query
   * @param colName - Name of the column to search in
   * @param value - Text to search for
   * @param isRequired - Whether this condition is required
   * @returns The current MixQuery instance for method chaining
   */
  public searchByText(colName: string, value: string, isRequired = false) {
    this.queries = [
      ...(this.queries || []),
      MixQuery.Search(colName, value, isRequired),
    ];

    return this;
  }

  /**
   * Conditionally adds a filter to the query
   * @param condition - Boolean condition to evaluate
   * @param fn - Function that returns a filter to add if condition is true
   * @returns The current MixQuery instance for method chaining
   */
  public whereIf(condition: boolean | undefined, fn: () => IMixFilter) {
    if (condition) {
      this.queries = [...(this.queries || []), fn()];
    }
    return this;
  }

  /**
   * Creates a LIKE filter condition
   * @param colName - Name of the column to filter
   * @param value - Value to search for
   * @param isRequired - Whether this condition is required
   * @returns A filter object for the LIKE condition
   */
  public static Like(
    colName: string,
    value: string | number | Date | null,
    isRequired = false,
  ): IMixFilter {
    return {
      value: value,
      fieldName: colName,
      compareOperator: ECompareOperator.Like,
      isRequired,
    };
  }

  /**
   * Creates an EQUAL filter condition
   * @param colName - Name of the column to filter
   * @param value - Value to match exactly
   * @param isRequired - Whether this condition is required
   * @returns A filter object for the EQUAL condition
   */
  public static Equal(
    colName: string,
    value: string | number | Date | boolean | null,
    isRequired = false,
  ): IMixFilter {
    return {
      value: value,
      fieldName: colName,
      compareOperator: ECompareOperator.Equal,
      isRequired,
    };
  }

  /**
   * Creates a case-insensitive LIKE filter condition
   * @param colName - Name of the column to filter
   * @param value - Value to search for
   * @param isRequired - Whether this condition is required
   * @returns A filter object for the case-insensitive LIKE condition
   */
  public static Search(
    colName: string,
    value: string | number | Date | null,
    isRequired = false,
  ): IMixFilter {
    return {
      value: value,
      fieldName: colName,
      compareOperator: ECompareOperator.ILike,
      isRequired,
    };
  }

  /**
   * Creates a GREATER THAN filter condition
   * @param colName - Name of the column to filter
   * @param value - Value to compare against
   * @param isRequired - Whether this condition is required
   * @param isEquals - Whether to include equality (>= instead of >)
   * @returns A filter object for the GREATER THAN condition
   */
  public static GreaterThan(
    colName: string,
    value: string | number | Date | boolean | null,
    isRequired = false,
    isEquals = false,
  ): IMixFilter {
    return {
      value: value,
      fieldName: colName,
      compareOperator: isEquals ? ECompareOperator.GreaterThanOrEqual : ECompareOperator.GreaterThan,
      isRequired,
    };
  }

  /**
   * Creates a LESS THAN filter condition
   * @param colName - Name of the column to filter
   * @param value - Value to compare against
   * @param isRequired - Whether this condition is required
   * @param isEquals - Whether to include equality (<= instead of <)
   * @returns A filter object for the LESS THAN condition
   */
  public static LessThan(
    colName: string,
    value: string | number | Date | boolean | null,
    isRequired = false,
    isEquals = false,
  ): IMixFilter {
    return {
      value: value,
      fieldName: colName,
      compareOperator: isEquals ? ECompareOperator.LessThanOrEqual : ECompareOperator.LessThan,
      isRequired,
    };
  }

  /**
   * Creates an IN filter condition
   * @param colName - Name of the column to filter
   * @param value - Array of values to match
   * @param isRequired - Whether this condition is required
   * @returns A filter object for the IN condition
   */
  public static Includes(
    colName: string,
    value: (string | number)[],
    isRequired?: boolean,
  ): IMixFilter {
    return {
      value: value?.join(','),
      fieldName: colName,
      compareOperator: ECompareOperator.InRange,
      isRequired,
    };
  }
}
