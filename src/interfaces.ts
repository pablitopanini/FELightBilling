import { AnyAction } from 'redux'

export interface IAction<T> extends AnyAction {
  payload?: T
}

export type Filter<T> =
  | {
      composite?: string
    }
  | { [P in keyof T]?: string | number | boolean }

export type Sort<T> = {
  fieldName: keyof T
  order: 'desc' | 'asc'
}

export interface IPageStore<T> {
  list: T[]
  page: number
  pageSize: number
  total: number
  item?: T
  filter?: Filter<T>
  sort?: Sort<T>
}

export interface IGetLIstParams<T> {
  skip: number
  limit: number
  filter?: Filter<T>
  sort?: Sort<T>
}

export interface IHouse {
  id: String
  address: String
  number: String
  additionalNumber: String
  comment: String
}

export interface ITariff {
  id: String
  name: String
  comment: String
  isPeriodic: boolean
  type: number
  typeString: String
  inputRate: number
  outputRate: number
  cost: number
}

export interface ISubnet {
  id: number
  address: string
  mask: number
  gateway: string
}

export interface IHousesStore extends IPageStore<IHouse> {
  subnets?: ISubnet[]
}

export interface ITariffsStore extends IPageStore<ITariff> {}

export interface IStore {
  houses: IHousesStore
  tariffs: ITariffsStore
  services: ITariffsStore
}

export type Payload = any

export interface IGlobalStore {
  lastError: any
}
