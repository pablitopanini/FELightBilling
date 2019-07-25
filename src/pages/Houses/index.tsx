import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Button,
  Icon,
  Divider
} from 'antd'
import { IStore, IHousesStore } from 'src/interfaces'
import { actions } from './store'
import { getColumns } from './constants'

interface State {
  data: any
  editingKey: String
  searchText?: String
}

const data: any = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`
  })
}
const EditableContext = React.createContext({})

class EditableCell extends React.Component<any, any> {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />
    }
    return <Input />
  }

  renderCell = ({ getFieldDecorator }: any) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: dataIndex !== 'comment',
                  message: `Please Input ${title}!`
                }
              ],
              initialValue: record[dataIndex]
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    )
  }

  render() {
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    )
  }
}

class EditableTable extends React.Component<any, State> {
  constructor(props: any) {
    super(props)
    this.state = { data, editingKey: '' }
    this.columns = getColumns({
      handleReset: this.handleReset,
      handleSearch: this.handleSearch,
      operations: (text: any, record: any) => {
        const editable = this.isEditing(record)
        return editable ? (
          <span>
            <EditableContext.Consumer>
              {form => (
                <Icon type="save" onClick={() => this.save(form, record.key)} />
              )}
            </EditableContext.Consumer>
            <Divider type="vertical" />
            <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel()}>
              <Icon type="close" />
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Icon type="edit" onClick={() => this.edit(record.key)} />
            <Divider type="vertical" />
            <Icon type="delete" onClick={() => this.remove(record.key)} />
          </span>
        )
      }
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

  isEditing = (record: any) => record.key === this.state.editingKey

  cancel = () => {
    this.setState({ editingKey: '' })
  }

  save(form: any, key: any) {
    form.validateFields((error: any, row: any) => {
      if (error) {
        return
      }
      const newData = [...this.state.data]
      const index = newData.findIndex(item => key === item.key)
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row
        })
        this.setState({ data: newData, editingKey: '' })
      } else {
        newData.push(row)
        this.setState({ data: newData, editingKey: '' })
      }
    })
  }

  edit(key: any) {
    this.setState({ editingKey: key })
  }

  add = () => {
    this.setState({
      data: [
        {
          key: 'new'
        },
        ...data
      ],
      editingKey: 'new'
    })
  }

  remove = (key: string) => {
    debugger
  }

  render() {
    const components = {
      body: {
        cell: EditableCell
      }
    }

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: (record: any) => ({
          record,
          inputType: 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      }
    })

    return (
      <EditableContext.Provider value={this.props.form}>
        <Button onClick={this.add} type="primary" style={{ margin: 16 }}>
          +
        </Button>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName={() => 'editable-row'}
          pagination={{
            showTotal: (total: number, range: number[]) =>
              `${range[0]}-${range[1]} из ${total}`,
            showSizeChanger: true,
            onChange: (page: number) => {
              this.props.setPage(page)
            },
            defaultPageSize: 10,
            pageSize: this.props.pageSize,
            pageSizeOptions: ['10', '50', '100'],
            onShowSizeChange: (current: number, size: number) => {
              this.props.setPageSize(size)
            },
            total: this.props.total
          }}
        />
      </EditableContext.Provider>
    )
  }
}

const EditableFormTable = Form.create()(EditableTable)

const mapState2Props = (state: IStore) => ({ ...state.houses })

const mapDispatch2Props = (dispatch: Dispatch) => ({
  getData: () => dispatch(actions.getData())
  // selectReport: (item: IReport) => dispatch(actions.selectReport(item))
})

export default withRouter(
  connect<IHousesStore, any, any, IStore>(
    mapState2Props,
    mapDispatch2Props
  )(EditableFormTable)
)
