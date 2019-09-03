import { call, put, takeEvery, select, takeLatest } from 'redux-saga/effects'
import { actionNames } from './store'
import { actionNames as globalActionNames } from '../../reducer'
import rest from './rest'
import { IAction, Payload, IStore } from '../../interfaces'
import { pageName } from './constants'

export default {
  *sagas() {
    yield takeEvery(actionNames.getList, getList)
    yield takeEvery(actionNames.getClients, getClients)
  }
}

function* getList(action: IAction<Payload>) {
  try {
    const res = yield call(rest.getList, action.payload)

    yield put({
      type: actionNames.getListSucceed,
      payload: res.data
    })
  } catch (err) {
    yield put({ type: globalActionNames.showError, payload: err })
  }
}

function* getClients(action: IAction<Payload>) {
  try {
    const res = yield call(rest.getClients, {
      skip: 0,
      limit: 30,
      filter: {
        composite: action.payload
      }
    })

    yield put({
      type: actionNames.getClientsSucceed,
      payload: res.data.data
    })
  } catch (err) {
    yield put({ type: globalActionNames.showError, payload: err })
  }
}
