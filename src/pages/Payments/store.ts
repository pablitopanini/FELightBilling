import { IAction, Payload } from '../../interfaces'
import { getActions } from '../../utils/helpers'
import { notification } from 'antd'
import { createBrowserHistory } from 'history'
import { pageName, actionPrefix, IPageStore, IItem } from './constants'

export interface IActions<T> {
  getList: T
  getListSucceed: T
  reset: T
  getClients: T
  getClientsSucceed: T
}

export const actionNames: IActions<string> = {
  getList: `${actionPrefix}.GET_LIST`,
  getListSucceed: `${actionPrefix}.GET_LIST_SUCCEED`,
  reset: `${actionPrefix}.RESET`,
  getClients: `${actionPrefix}.GET_CLIENTS`,
  getClientsSucceed: `${actionPrefix}.GET_CLIENTS_SUCCEED`
}

export const actions = getActions<
  IActions<(payload?: any) => IAction<any>>,
  IActions<string>
>(actionNames)

const defaultData: IItem[] = []

const defaultState: IPageStore = {
  list: defaultData,
  page: 1,
  pageSize: 50,
  total: 0
}

export const reducer: (
  state: IPageStore,
  action: IAction<Payload>
) => IPageStore = (state: IPageStore, action: IAction<Payload>) => {
  switch (action.type) {
    case actionNames.getListSucceed:
      return {
        ...state,
        list: action.payload as IItem[]
      }

    case actionNames.getClientsSucceed:
      return {
        ...state,
        clients: action.payload as IItem[]
      }

    default:
      return state || defaultState
  }
}
