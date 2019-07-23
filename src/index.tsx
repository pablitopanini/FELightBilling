import * as React from 'react'
import createSagaMiddleware from 'redux-saga'
import Routes from './Routes'
import rootReducer from './reducer'
import sagas from './sagas'
import { applyMiddleware, createStore, Store } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'
import { IStore } from './interfaces'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import 'react-app-polyfill/ie11'

const composeEnhancers = composeWithDevTools({})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(sagaMiddleware))
) as Store<IStore>

sagas.forEach(saga => {
  // tslint:disable-next-line: forin
  for (const name in saga) {
    sagaMiddleware.run(saga[name])
  }
})

render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
