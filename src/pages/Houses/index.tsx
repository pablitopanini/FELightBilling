import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { Table, Button } from 'antd'
import { IStore, IHousesStore, IHouse } from '../../interfaces'
import { actions } from './store'
import { getColumns, pageName } from './constants'
import EditModal from './EditModal'
import { get } from 'lodash';

interface State {
  searchText?: String
}

class Page extends React.Component<
  RouteComponentProps & IHousesStore & DispatchProp,
  State
> {
  constructor(props: any) {
    super(props)
    this.columns = getColumns({
      handleReset: this.handleReset,
      handleSearch: this.handleSearch,
      handleRemove: this.handleRemove
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

  handleRemove = (record: any) => {
    this.props.dispatch(actions.removeItem(record))
  }

  public componentDidMount() {
    this.props.dispatch(actions.getList())
  }

  create = () => {
    this.props.history.push(`/${pageName}/new`)
  }

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.create} style={{ margin: 16 }} icon="plus" />

        <Table
          bordered
          dataSource={this.props.list}
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
                this.props.history.push(`/${pageName}/${record.id}`)
              }
            }
          }}
        />

        {get(this, 'props.match.params.id') && <EditModal />}
      </React.Fragment>
    )
  }
}

const mapState2Props = (state: IStore) => ({ ...state.houses })

export default withRouter(
  connect<IHousesStore, any, any, IStore>(mapState2Props)(Page)
)
