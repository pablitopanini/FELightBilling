import * as React from 'react'
import { Switch, Route, withRouter } from 'react-router'
import Clients from './pages/Clients'
import Login from './pages/Login'
import { Layout } from 'antd'
import Menu from './pages/Menu'
import './style.css'

@withRouter
export default class Routes extends React.Component<any, any> {
  public render(): any {
    return (
      <Layout>
        <Layout.Header>
          <div className="logo">Light Billing v1.0</div>
          {false && <Login />}
        </Layout.Header>
        <Layout>
          <Layout.Sider>
            <Menu />
          </Layout.Sider>

          <Layout.Content style={{ height: 'calc(100vh - 133px)' }}>
            <Switch>
              <Route path="/clients/:id?" component={Clients} />
            </Switch>
          </Layout.Content>
        </Layout>

        <Layout.Footer
          style={{ textAlign: 'center', backgroundColor: 'white' }}
        >
          {`🐕& 🦊©${new Date().getFullYear()}`}
        </Layout.Footer>
      </Layout>
    )
  }
}
