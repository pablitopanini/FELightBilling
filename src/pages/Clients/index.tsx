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
import AddPaymentModal from './AddPaymentModal'

function Page(props: RouteComponentProps & IPageStore & DispatchProp) {
  const [handlers, setHandlers] = React.useState<any>({})
  const [showAddPaymentModal, setShowAddPaymentModal] = React.useState<boolean>(
    false
  )
  const [row, setRow] = React.useState<any>({})
  const [sortedInfo, setSortedInfo] = React.useState<any>({})

  React.useEffect(() => {
    props.dispatch(actions.getList())
    setHandlers(getTableHandlers(props, actions, pageName, setSortedInfo))

    return () => {
      props.dispatch(actions.reset())
    }
  }, [])

  React.useEffect(() => {
    setHandlers(getTableHandlers(props, actions, pageName, setSortedInfo))
  }, [props.page])

  function handleAddPayment(row: any) {
    setRow(row)
    setShowAddPaymentModal(true)
  }

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
          handleAddPayment,
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
      {showAddPaymentModal && (
        <AddPaymentModal
          client={row}
          handleOk={(sum: number, comment?: string) => {
            props.dispatch(
              actions.addPayment({
                ClientId: row.id,
                Amount: sum,
                Comment: comment
              })
            )
            setShowAddPaymentModal(false)
          }}
          handleCancel={() => {
            setShowAddPaymentModal(false)
          }}
        />
      )}
    </React.Fragment>
  )
}

const mapState2Props = (state: IStore) => ({ ...state[pageName] })

export default withRouter(
  connect<IPageStore, any, any, IStore>(mapState2Props)(Page)
)
