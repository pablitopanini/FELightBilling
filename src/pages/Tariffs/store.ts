import { IAction, Payload } from '../../interfaces'
import { getActions } from '../../utils/helpers'
import { notification } from 'antd'
import { createBrowserHistory } from 'history'
import { pageName, actionPrefix, IPageStore, IItem } from './constants'

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
  getList: `${actionPrefix}.GET_LIST`,
  getListSucceed: `${actionPrefix}.GET_LIST_SUCCEED`,

  setPage: `${actionPrefix}.SET_PAGE`,
  setPageSize: `${actionPrefix}.SET_PAGE_SIZE`,

  saveItem: `${actionPrefix}.SAVE_ITEM`,
  saveItemSucceed: `${actionPrefix}.SAVE_ITEM_SUCCEED`,

  getItem: `${actionPrefix}.GET_ITEM`,
  getItemSucceed: `${actionPrefix}.GET_ITEM_SUCCEED`,
  getItemFailed: `${actionPrefix}.GET_ITEM_FAILED`,

  clearItem: `${actionPrefix}.CLEAR_ITEM`,

  removeItem: `${actionPrefix}.REMOVE_ITEM`,
  removeItemSucceed: `${actionPrefix}.REMOVE_ITEM_SUCCEED`,

  setFilter: `${actionPrefix}.SET_FILTER`,
  setSort: `${actionPrefix}.SET_SORT`
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
  total: 0,
  filter: {
    type: 1
  }
}

export const reducer: (
  state: IPageStore,
  action: IAction<Payload>
) => IPageStore = (state: IPageStore, action: IAction<Payload>) => {
  switch (action.type) {
    case actionNames.getListSucceed:
      return {
        ...state,
        list: action.payload.data as IItem[],
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
