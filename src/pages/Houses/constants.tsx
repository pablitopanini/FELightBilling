import * as React from 'react'
import { Button, Icon, Input, Popconfirm } from 'antd'

export const pageName = 'houses'
export const apiUrl = '/api/House/House'
export const storageName: String = 'HOUSES'

export const getColumnSearchProps = (dataIndex: any, handleSearch: any) => {
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
          placeholder={`Введите запрос..`}
          value={selectedKeys}
          onChange={e => setSelectedKeys(e.target.value)}
          onPressEnter={() => handleSearch(dataIndex, selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(dataIndex, selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Найти
        </Button>
        <Button
          onClick={() => {
            setSelectedKeys(undefined)
            handleSearch(dataIndex, undefined, confirm)
          }}
          size="small"
          style={{ width: 90 }}
        >
          Сброс
        </Button>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    )
  }
}

export const getColumns = ({ handleRemove, handleSearch }: any) => [
  {
    title: 'Улица',
    dataIndex: 'address',
    width: '25%',
    sorter: true,
    ...getColumnSearchProps('address', handleSearch)
  },
  {
    title: 'Дом',
    dataIndex: 'number',
    width: '15%',
    sorter: true,
    ...getColumnSearchProps('number', handleSearch)
  },
  {
    title: 'Корпус',
    dataIndex: 'additionalNumber',
    width: '15%',
    sorter: true,
    ...getColumnSearchProps('additionalNumber', handleSearch)
  },
  {
    title: 'Комментарий',
    dataIndex: 'comment',
    width: '40%',
    sorter: true,
    ...getColumnSearchProps('comment', handleSearch)
  },
  {
    render: (text: any, record: any) => {
      return (
        <span>
          <Popconfirm title="Удалить?" onConfirm={() => handleRemove(record)}>
            <Icon type="delete" />
          </Popconfirm>
        </span>
      )
    }
  }
]
