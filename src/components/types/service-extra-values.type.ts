import { DeepPartial } from "typeorm";

export type ServiceExtraValues = object | number | string | boolean | Array<unknown>

export type ServiceOnFailure<T> = (entity: DeepPartial<T>) => void;