export interface IBaseAuditedEntity<T = number> {
  createdDateTime?: Date;
  created_date_time?: Date;
  lastModifiedDate?: Date;
  id: T;
  displayName?: string;
  systemName?: string;
  priority?: number;
}
