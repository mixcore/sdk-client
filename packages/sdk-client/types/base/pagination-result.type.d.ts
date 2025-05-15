export declare class PaginationModel {
    pageIndex: number;
    page?: number;
    pageSize: number;
    total?: number;
    totalPage?: number;
}
export interface IPaginationResultModel<T> {
    items: T[];
    pagingData: PaginationModel;
}
