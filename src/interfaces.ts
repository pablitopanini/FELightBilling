import { AnyAction } from 'redux'

export interface IAction<T> extends AnyAction {
  payload?: T
}

export interface IClientsProps {
  // selectReport: (item: IReport) => void
}

export interface IClientsStore {
  //   report?: IReport
  //   viewMode: VIEW_MODES
}

export interface IArrayWithPaging<T> extends Array<T> {
  total?: number
  pageSize?: number
  page?: number
}

export interface IStore {
  main: IClientsStore
}

export interface IObject {
  Label?: string
  Reference?: string
  Description?: string
  TemplateReference?: string
}

export interface IOnDataChangePayload {
  path: string
  value: string | number | boolean | object | undefined
}

export interface IPaging {
  page: number
  pageSize: number
}

export type Payload = string | undefined | IOnDataChangePayload | IPaging
