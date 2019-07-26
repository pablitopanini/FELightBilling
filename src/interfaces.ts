import { AnyAction } from 'redux'

export interface IAction<T> extends AnyAction {
  payload?: T
}

export interface IHouse {
  id: String
  address: String
  number: String
  additionalNumber: String
  comment: String
}

export interface IHousesStore {
  list: IHouse[]
  page: number
  pageSize: number
  total: number
  item?: IHouse
}

export interface IStore {
  houses: IHousesStore
}

export type Payload = any

export interface IGlobalStore {
  lastError: any
}
