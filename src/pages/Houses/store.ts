import { IAction, Payload, IHousesStore, IHouse } from '../../interfaces'
import { getActions } from '../../utils/helpers'
import { notification } from 'antd'
import { createBrowserHistory } from 'history'
import { pageName, storageName } from './constants'

export interface IActions<T> {
  getList: T
  getListSucceed: T
  setPage: T
  setPageSize: T
  saveItem: T
  saveItemSucceed: T
  getItem: T
  getItemSucceed: T
  getItemFailed: T
  clearItem: T
  removeItem: T
  removeItemSucceed: T
  setFilter: T
  setSort: T
}

export const actionNames: IActions<string> = {
  getList: `${storageName}.GET_LIST`,
  getListSucceed: `${storageName}.GET_LIST_SUCCEED`,

  setPage: `${storageName}.SET_PAGE`,
  setPageSize: `${storageName}.SET_PAGE_SIZE`,

  saveItem: `${storageName}.SAVE_ITEM`,
  saveItemSucceed: `${storageName}.SAVE_ITEM_SUCCEED`,

  getItem: `${storageName}.GET_ITEM`,
  getItemSucceed: `${storageName}.GET_ITEM_SUCCEED`,
  getItemFailed: `${storageName}.GET_ITEM_FAILED`,

  clearItem: `${storageName}.CLEAR_ITEM`,

  removeItem: `${storageName}.REMOVE_ITEM`,
  removeItemSucceed: `${storageName}.REMOVE_ITEM_SUCCEED`,

  setFilter: `${storageName}.SET_FILTER`,
  setSort: `${storageName}.SET_SORT`
}

export const actions = getActions<
  IActions<(payload?: any) => IAction<any>>,
  IActions<string>
>(actionNames)

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

    case actionNames.setFilter:
      return {
        ...state,
        filter: { ...state.filter, ...action.payload }
      }

    case actionNames.setSort:
      return {
        ...state,
        sort: action.payload
      }

    default:
      return state || defaultState
  }
}
