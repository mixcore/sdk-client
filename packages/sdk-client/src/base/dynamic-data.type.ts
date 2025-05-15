import { IBaseAuditedEntity } from "./base-audited-entity.model";

export interface IMixDynamicData<T = number> extends IBaseAuditedEntity<T> {
    [key: string]: IMixDynamicDataValue;
}

export type IMixDynamicDataValue =
    | string
    | string[]
    | Date
    | number
    | boolean
    | undefined
    | object
    | null
    | any
    | any[];