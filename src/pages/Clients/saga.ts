import { call, put, takeEvery, select, takeLatest } from 'redux-saga/effects'
import { actionNames } from './store'
import { actionNames as globalActionNames } from '../../reducer'
import rest from './rest'
import { IAction, Payload, IStore } from '../../interfaces'
import { pageName } from './constants'

export default {
  *sagas() {
    yield takeEvery(actionNames.getList, getList)
    yield takeEvery(actionNames.saveItem, saveItem)
    yield takeEvery(actionNames.saveItemSucceed, getList)
    yield takeEvery(actionNames.getItem, getItem)
    yield takeEvery(actionNames.removeItem, removeItem)
    yield takeEvery(actionNames.getHouses, getHouses)
    yield takeEvery(actionNames.getTariffs, getTariffs)
    yield takeEvery(actionNames.addPayment, addPayment)

    yield takeLatest(actionNames.removeItemSucceed, getList)
    yield takeLatest(actionNames.setPage, getList)
    yield takeLatest(actionNames.setPageSize, getList)
    yield takeLatest(actionNames.setFilter, getList)
    yield takeLatest(actionNames.setSort, getList)
    yield takeLatest(actionNames.addPaymentSucceed, getList)
  }
}

function* getList(action: IAction<Payload>) {
  try {
    const {
      [pageName]: { page, pageSize, filter, sort }
    }: IStore = yield select()

    const res = yield call(rest.getList, {
      skip: pageSize * (page - 1),
      limit: pageSize,
      sort,
      filter
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

function* getHouses(action: IAction<Payload>) {
  try {
    const res = yield call(rest.getHouses, {
      skip: 0,
      limit: 30,
      filter: {
        composite: action.payload
      }
    })

    yield put({
      type: actionNames.getHousesSucceed,
      payload: res.data.data
    })
  } catch (err) {
    yield put({ type: globalActionNames.showError, payload: err })
  }
}

function* getTariffs(action: IAction<Payload>) {
  try {
    const res = yield call(rest.getTariffs, {
      skip: 0,
      limit: 30,
      filter: {
        name: action.payload
      }
    })

    yield put({
      type: actionNames.getTariffsSucceed,
      payload: res.data.data
    })
  } catch (err) {
    yield put({ type: globalActionNames.showError, payload: err })
  }
}

function* addPayment(action: IAction<Payload>) {
  try {
    const res = yield call(rest.addPayment, action.payload)

    yield put({
      type: actionNames.addPaymentSucceed,
      payload: res.data.data
    })
  } catch (err) {
    yield put({ type: globalActionNames.showError, payload: err })
  }
}
