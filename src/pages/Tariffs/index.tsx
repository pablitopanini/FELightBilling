import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { Table, Button } from 'antd'
import { IStore } from '../../interfaces'
import { actions } from './store'
import { getColumns, pageName, IPageStore } from './constants'
import EditModal from './EditModal'
import { get } from 'lodash'
import { getTableHandlers, getPaginationOptions } from '../../utils/helpers'

function Page(props: RouteComponentProps & IPageStore & DispatchProp) {
  const [handlers, setHandlers] = React.useState<any>({})
  const [sortedInfo, setSortedInfo] = React.useState<any>({})

  React.useEffect(() => {
    props.dispatch(actions.getList())
    setHandlers(getTableHandlers(props, actions, pageName, setSortedInfo))
  }, [])

  React.useEffect(() => {
    setHandlers(getTableHandlers(props, actions, pageName, setSortedInfo))
  }, [props.page])

  return (
    <React.Fragment>
      <Button
        onClick={handlers && handlers.handleCreate}
        style={{ margin: 16 }}
        icon="plus"
      />

      <Table
        bordered
        scroll={{ x: true, y: 'calc(100vh - 315px)' }}
        dataSource={props.list}
        columns={getColumns({
          handleSearch: handlers && handlers.handleSearch,
          handleRemove: handlers && handlers.handleRemove,
          sortedInfo
        })}
        pagination={{
          ...getPaginationOptions({}),
          onChange: handlers && handlers.handlePaginationChange,
          onShowSizeChange: handlers && handlers.handlePaginationShowSizeChange,
          pageSize: props.pageSize,
          total: props.total,
          current: props.page
        }}
        onRow={handlers && handlers.handleRowDoubleClick}
        onChange={handlers && handlers.handleTableChange}
      />

      {get(props, 'match.params.id') && <EditModal />}
    </React.Fragment>
  )
}

const mapState2Props = (state: IStore) => ({ ...state[pageName] })

export default withRouter(
  connect<IPageStore, any, any, IStore>(mapState2Props)(Page)
)
