import { combineReducers } from 'redux'
import { reducer as houses } from './pages/Houses/store'
import { reducer as tariffs } from './pages/Tariffs/store'
import { reducer as services } from './pages/Services/store'
import { reducer as clients } from './pages/Clients/store'
import { reducer as payments } from './pages/Payments/store'
import { IGlobalStore, IAction, Payload } from './interfaces'
import { getActions } from './utils/helpers'
import { notification } from 'antd'

export interface IActionNames {
  showError: string
}

export interface IActions {
  showError: (payload?: any) => IAction<any>
}

export const actionNames: IActionNames = {
  showError: 'GLOBAL.SHOW_ERROR'
}

export const actions = getActions<IActions, IActionNames>(actionNames)

const defaultState: IGlobalStore = {
  lastError: undefined
}

export const global: (
  state: IGlobalStore,
  action: IAction<Payload>
) => IGlobalStore = (state: IGlobalStore, action: IAction<Payload>) => {
  switch (action.type) {
    case actionNames.showError:
      // debugger
      notification.error({
        placement: 'bottomRight',
        message: 'Ошибка',
        description: action.payload.message
      })
      return {
        ...state,
        lastError: action.payload
      }

    default:
      return state || defaultState
  }
}

const reducers = {
  global,
  houses,
  tariffs,
  services,
  clients,
  payments
}

export default combineReducers(reducers)
