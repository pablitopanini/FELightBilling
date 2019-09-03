import * as React from 'react'
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
  Redirect
} from 'react-router'
import Houses from './pages/Houses'
import Tariffs from './pages/Tariffs'
import Services from './pages/Services'
import Clients from './pages/Clients'
import Payments from './pages/Payments'

const NoMatch = ({ location }: RouteComponentProps) => {
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  )
}

class Routes extends React.Component<RouteComponentProps> {
  public render() {
    if (this.props.location.pathname === '/') {
      return <Redirect to="/houses" />
    }

    return (
      <Switch>
        <Route path="/houses/:id?" component={Houses} />
        <Route path="/tariffs/:id?" component={Tariffs} />
        <Route path="/services/:id?" component={Services} />
        <Route path="/clients/:id?" component={Clients} />
        <Route path="/payments" component={Payments} />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export default withRouter(Routes)
