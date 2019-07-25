import * as React from 'react'
import { Button, Icon, Input } from 'antd'

export const getColumnSearchProps = (
  dataIndex: any,
  handleSearch: any,
  handleReset: any
) => {
  //   let searchInput
  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            // searchInput = node
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        // setTimeout(() => searchInput.select())
      }
    }
  }
}

export const getColumns = ({ operations, handleSearch, handleReset }: any) => [
  {
    title: 'address',
    dataIndex: 'address',
    width: '25%',
    editable: true,
    sorter: true,
    ...getColumnSearchProps('address', handleSearch, handleReset)
  },
  {
    title: 'number',
    dataIndex: 'number',
    width: '15%',
    editable: true,
    sorter: true,
    ...getColumnSearchProps('number', handleSearch, handleReset)
  },
  {
    title: 'additionalNumber',
    dataIndex: 'additionalNumber',
    width: '15%',
    editable: true,
    sorter: true,
    ...getColumnSearchProps('additionalNumber', handleSearch, handleReset)
  },
  {
    title: 'comment',
    dataIndex: 'comment',
    width: '40%',
    editable: true
  },
  {
    dataIndex: 'operation',
    render: operations
  }
]
