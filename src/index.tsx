import * as React from "react";
import createSagaMiddleware from "redux-saga";
import Routes from "./Routes";
import rootReducer from "./reducer";
import sagas from "./sagas";
import { applyMiddleware, createStore, Store } from "redux";
import { BrowserRouter } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import { IStore } from "./interfaces";
import { Provider } from "react-redux";
import { render } from "react-dom";
import "react-app-polyfill/ie11";
import { LocaleProvider, Layout } from "antd";
import Login from "./pages/Login";
import ruRU from "antd/lib/locale-provider/ru_RU";
import "./style.css";
import Menu from "./pages/Menu";

const composeEnhancers = composeWithDevTools({});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(sagaMiddleware))
) as Store<IStore>;

sagas.forEach((saga) => {
  // tslint:disable-next-line: forin
  for (const name in saga) {
    sagaMiddleware.run(saga[name]);
  }
});

render(
  <Provider store={store}>
    <BrowserRouter>
      <LocaleProvider locale={ruRU}>
        <Layout>
          <Layout.Header>
            <div className="logo">Light Billing v1.0</div>
            {false && <Login />}
          </Layout.Header>
          <Layout>
            <Layout.Sider>
              <Menu />
            </Layout.Sider>

            <Layout.Content
              style={{
                height: "calc(100vh - 133px)",
                backgroundColor: "white",
                borderBottom: "1px solid #e8e8e8",
              }}
            >
              <Routes />
            </Layout.Content>
          </Layout>

          <Layout.Footer
            style={{ textAlign: "center", backgroundColor: "white" }}
          >
            {`🐕 & 🦊©${new Date().getFullYear()}`}
          </Layout.Footer>
        </Layout>
      </LocaleProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
