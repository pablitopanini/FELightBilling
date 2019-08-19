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
  id: string
  address: string
  number: string
  additionalNumber: string
  comment: string
  porch: string
}

export interface ITariff {
  id: string
  name: string
  comment: string
  isPeriodic: boolean
  type: number
  typeString: string
  inputRate: number
  outputRate: number
  cost: number
}

export interface ISubnet {
  id: number
  net: string
  mask: number
  gateway: string
}

export interface IClient {
  id: number
  name: string
  surname: string
  middleName: string
  login: string
  balance: number
  status: string
  isActive: boolean
}

export interface IGreyAddress {
  id: number
  address: string
  compositeAddress: string
}

export interface IHousesStore extends IPageStore<IHouse> {
  subnets?: ISubnet[]
}

export interface ITariffsStore extends IPageStore<ITariff> {}

export interface IClientsStore extends IPageStore<IClient> {
  houses?: IHouse[]
  greyAddress?: IGreyAddress
  tariffs?: ITariff[]
}

export interface IStore {
  houses: IHousesStore
  tariffs: ITariffsStore
  services: ITariffsStore
  clients: IClientsStore
}

export type Payload = any

export interface IGlobalStore {
  lastError: any
}
