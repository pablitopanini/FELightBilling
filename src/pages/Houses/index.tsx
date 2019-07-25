import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { Table, Button } from 'antd'
import { IStore, IHousesStore, IHouse } from 'src/interfaces'
import { actions } from './store'
import { getColumns } from './constants'
import House from './House'
import { get } from 'lodash'

interface State {
  data: any
  searchText?: String
}

const data: any = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    id: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`
  })
}

class Houses extends React.Component<
  RouteComponentProps & IHousesStore & DispatchProp,
  State
> {
  constructor(props: any) {
    super(props)
    this.state = { data }
    this.columns = getColumns({
      handleReset: this.handleReset,
      handleSearch: this.handleSearch
    })
  }

  columns: any[] = []
  searchInput: any

  handleSearch = (selectedKeys: any, confirm: any) => {
    confirm()
    this.setState({ searchText: selectedKeys[0] })
  }

  handleReset = (clearFilters: any) => {
    clearFilters()
    this.setState({ searchText: '' })
  }

  render() {
    return (
      <React.Fragment>
        <Button onClick={() => {}} style={{ margin: 16 }} icon="plus" />

        <Table
          bordered
          dataSource={this.state.data}
          columns={this.columns}
          pagination={{
            showTotal: (total: number, range: number[]) =>
              `${range[0]}-${range[1]} из ${total}`,
            showSizeChanger: true,
            onChange: (page: number) => {
              this.props.dispatch(actions.setPage(page))
            },
            defaultPageSize: 10,
            pageSize: this.props.pageSize,
            pageSizeOptions: ['10', '50', '100'],
            onShowSizeChange: (current: number, size: number) => {
              this.props.dispatch(actions.setPageSize(size))
            },
            total: this.props.total
          }}
          onRow={(record: IHouse) => {
            return {
              onDoubleClick: () => {
                this.props.history.push(`/houses/${record.id}`)
              }
            }
          }}
        />

        {get(this, 'props.match.params.id') && <House />}
      </React.Fragment>
    )
  }
}

const mapState2Props = (state: IStore) => ({ ...state.houses })

export default withRouter(
  connect<IHousesStore, any, any, IStore>(mapState2Props)(Houses)
)
