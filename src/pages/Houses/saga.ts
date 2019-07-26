import { call, put, takeEvery, select } from 'redux-saga/effects'
import { actionNames } from './store'
import { actionNames as globalActionNames } from '../../reducer'
import rest from './rest'
import { IAction, Payload, IStore } from 'src/interfaces'

export default {
  *sagas() {
    yield takeEvery(actionNames.getList, getList)
    yield takeEvery(actionNames.saveItem, saveItem)
    yield takeEvery(actionNames.saveItemSucceed, getList)
    yield takeEvery(actionNames.getItem, getItem)
    yield takeEvery(actionNames.removeItem, removeItem)
    yield takeEvery(actionNames.removeItemSucceed, getList)
  }
}

function* getList(action: IAction<Payload>) {
  try {
    const {
      houses: { page, pageSize }
    }: IStore = yield select()

    const res = yield call(rest.getList, {
      skip: pageSize * (page - 1),
      limit: pageSize
    })

    yield put({
      type: actionNames.getListSucceed,
      payload: res.data
    })
  } catch (err) {
    yield put({ type: globalActionNames.showError, payload: err })
  }
}

function* saveItem(action: IAction<Payload>) {
  try {
    const res = yield call(
      action.payload.id ? rest.saveItem : rest.createItem,
      action.payload
    )

    yield put({
      type: actionNames.saveItemSucceed,
      payload: res.data
    })
  } catch (err) {
    yield put({ type: globalActionNames.showError, payload: err })
  }
}

function* getItem(action: IAction<Payload>) {
  try {
    const res = yield call(rest.getItem, action.payload)

    yield put({
      type: actionNames.getItemSucceed,
      payload: res.data
    })
  } catch (err) {
    yield put({ type: actionNames.getItemFailed, payload: err })
    yield put({ type: globalActionNames.showError, payload: err })
  }
}

function* removeItem(action: IAction<Payload>) {
  try {
    const res = yield call(rest.removeItem, action.payload)

    yield put({
      type: actionNames.removeItemSucceed,
      payload: res.data
    })
  } catch (err) {
    yield put({ type: globalActionNames.showError, payload: err })
  }
}
