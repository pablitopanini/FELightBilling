import { combineReducers } from 'redux'
import { reducer as main } from './pages/Clients/store'

const reducers = {
  main
}

export default combineReducers(reducers)
