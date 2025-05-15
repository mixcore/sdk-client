export class PaginationModel {
  public pageIndex = 0;
  public page?: number;
  public pageSize = 10;
  public total?: number;
  public totalPage?: number;
}

export interface IPaginationResultModel<T> {
  items: T[];
  pagingData: PaginationModel;
}
