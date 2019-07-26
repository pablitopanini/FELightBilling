import { IAction, Payload, IHousesStore, IHouse } from '../../interfaces'
import { getActions } from '../../utils/helpers'
import { notification } from 'antd'
import { createBrowserHistory } from 'history'
import { pageName } from './constants'

export interface IActionNames {
  getList: string
  getListSucceed: string
  setPage: string
  setPageSize: string
  saveItem: string
  saveItemSucceed: string
  getItem: string
  getItemSucceed: string
  getItemFailed: string
  clearItem: string
  removeItem: string
  removeItemSucceed: string
}

export interface IActions {
  getList: (payload?: any) => IAction<any>
  getListSucceed: (payload?: any) => IAction<any>
  setPage: (payload?: any) => IAction<any>
  setPageSize: (payload?: any) => IAction<any>
  saveItem: (payload?: any) => IAction<any>
  saveItemSucceed: (payload?: any) => IAction<any>
  getItem: (payload?: any) => IAction<any>
  getItemSucceed: (payload?: any) => IAction<any>
  getItemFailed: (payload?: any) => IAction<any>
  clearItem: (payload?: any) => IAction<any>
  removeItem: (payload?: any) => IAction<any>
  removeItemSucceed: (payload?: any) => IAction<any>
}

export const actionNames: IActionNames = {
  getList: 'HOUSES.GET_LIST',
  getListSucceed: 'HOUSES.GET_LIST_SUCCEED',

  setPage: 'HOUSES.SET_PAGE',
  setPageSize: 'HOUSES.SET_PAGE_SIZE',

  saveItem: 'HOUSES.SAVE_ITEM',
  saveItemSucceed: 'HOUSES.SAVE_ITEM_SUCCEED',

  getItem: 'HOUSES.GET_ITEM',
  getItemSucceed: 'HOUSES.GET_ITEM_SUCCEED',
  getItemFailed: 'HOUSES.GET_ITEM_FAILED',

  clearItem: 'HOUSES.CLEAR_ITEM',

  removeItem: 'HOUSES.REMOVE_ITEM',
  removeItemSucceed: 'HOUSES.REMOVE_ITEM_SUCCEED'
}

export const actions = getActions<IActions, IActionNames>(actionNames)

const defaultData: IHouse[] = []

const defaultState: IHousesStore = {
  list: defaultData,
  page: 1,
  pageSize: 10,
  total: 0
}

export const reducer: (
  state: IHousesStore,
  action: IAction<Payload>
) => IHousesStore = (state: IHousesStore, action: IAction<Payload>) => {
  switch (action.type) {
    case actionNames.getListSucceed:
      return {
        ...state,
        list: action.payload.data as IHouse[],
        total: action.payload.total
      }

    case actionNames.setPage:
      return {
        ...state,
        page: action.payload
      }

    case actionNames.setPageSize:
      return {
        ...state,
        pageSize: action.payload
      }

    case actionNames.saveItemSucceed:
      notification.success({
        placement: 'bottomRight',
        message: 'Успех',
        description: 'Данные успешно сохранены'
      })
      return {
        ...state,
        item: action.payload
      }

    case actionNames.getItemSucceed:
      return {
        ...state,
        item: action.payload
      }

    case actionNames.getItemFailed:
      createBrowserHistory().push(`/${pageName}`)
      return {
        ...state,
        item: undefined
      }

    case actionNames.clearItem:
      return {
        ...state,
        item: undefined
      }

    case actionNames.removeItemSucceed:
      notification.success({
        placement: 'bottomRight',
        message: 'Успех',
        description: 'Данные успешно удалены'
      })
      return state

    default:
      return state || defaultState
  }
}
