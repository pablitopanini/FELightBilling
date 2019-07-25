import { combineReducers } from 'redux'
import { reducer as houses } from './pages/Houses/store'

const reducers = {
  houses
}

export default combineReducers(reducers)
