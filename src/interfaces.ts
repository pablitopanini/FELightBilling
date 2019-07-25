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
  data: IHouse[]
  page: number
  pageSize: number
  total: number
}

export interface IStore {
  houses: IHousesStore
}

export type Payload = any
