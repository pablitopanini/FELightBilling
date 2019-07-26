import { call, put, takeEvery, select } from 'redux-saga/effects'
import { actionNames } from './store'
import rest from './rest'
import { IAction, Payload, IStore } from 'src/interfaces'

export default {
  *sagas() {
    yield takeEvery(actionNames.getData, function* getData(
      action: IAction<Payload>
    ) {
      try {
        const {
          houses: { page, pageSize }
        }: IStore = yield select()

        const res = yield call(rest.getData, {
          skip: pageSize * (page - 1),
          limit: pageSize
        })

        yield put({
          type: actionNames.getDataSucceed,
          payload: res.data
        })
      } catch (err) {
        yield put({ type: actionNames.getDataFailed, payload: err })
      }
    })
  }
}
