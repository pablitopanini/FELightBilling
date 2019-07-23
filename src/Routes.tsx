import * as React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router'
import Clients from './pages/Clients'
import Login from './pages/Login'

@withRouter
export default class Routes extends React.Component<any, any> {
  public render(): any {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/clients" component={Clients} />
          <Route path="/login" component={Login} />
        </Switch>

        {true && this.props.location.pathname !== '/login' && (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: this.props.location }
            }}
          />
        )}
      </React.Fragment>
    )
  }
}
