import * as React from 'react'
import './style.css'
import { IStore, IClientsProps, IClientsStore } from 'src/interfaces'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { LocaleProvider } from 'antd'
import ruRU from 'antd/lib/locale-provider/ru_RU'

class Clients extends React.Component<
  IClientsProps & IClientsStore & RouteComponentProps
> {
  public render() {
    return (
      <LocaleProvider locale={ruRU}>
        <div>test_188</div>
      </LocaleProvider>
    )
  }
}

const mapState2Props = (state: IStore) => ({ ...state.main })

const mapDispatch2Props = (dispatch: Dispatch) => ({
  // selectReport: (item: IReport) => dispatch(actions.selectReport(item))
})

export default withRouter(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(Clients)
)
