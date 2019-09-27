import * as React from 'react'
import { transform } from 'lodash'
import { Input, Button, Icon } from 'antd'
import { PaginationProps } from 'antd/lib/pagination'
import * as moment from 'moment'

export const getActions = <T, A>(actionNames: A) =>
  transform<any, any>(actionNames, (result: any, value, key) => {
    result[key] = (payload?: any) => ({
      type: value,
      payload
    })
  }) as T

interface IPaginationParams {
  defaultPageSize?: number
  pageSizeOptions?: Array<string>
}

export const getPaginationOptions = ({
  defaultPageSize,
  pageSizeOptions
}: IPaginationParams) => ({
  showTotal: (total: number, range: number[]) =>
    `${range[0]}-${range[1]} из ${total}`,
  showSizeChanger: true,
  defaultPageSize: defaultPageSize || 10,
  pageSizeOptions: pageSizeOptions || ['10', '50', '100']
})

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

export const getTableHandlers = (
  props: any,
  actions: any,
  pageName: string,
  setSortedInfo?: any
) => ({
  handleSearch: (dataIndex: string, value: any, confirm: any) => {
    confirm()
    props.dispatch(actions.setFilter({ [dataIndex]: value }))
  },

  handleRemove: (record: any) => {
    props.dispatch(actions.removeItem(record))
  },

  handleCreate: () => {
    props.history.push(`/${pageName}/new`)
  },

  handleRowDoubleClick: (record: { id: number }) => {
    return {
      onDoubleClick: () => {
        props.history.push(`/${pageName}/${record.id}`)
      }
    }
  },

  handleTableChange: (pagination: PaginationProps, __: any, sorter: any) => {
    pagination.current !== props.page &&
      props.dispatch(actions.setPage(pagination.current))

    setSortedInfo && setSortedInfo(sorter)

    sorter.field &&
      sorter.order &&
      props.dispatch(
        actions.setSort({
          fieldName: sorter.field,
          order:
            sorter.order === 'ascend'
              ? 'asc'
              : sorter.order === 'descend'
              ? 'desc'
              : undefined
        })
      )
  },

  handlePaginationChange: (page: number) => {
    // page !== props.page && props.dispatch(actions.setPage(page))
  },

  handlePaginationShowSizeChange: (current: number, size: number) => {
    props.dispatch(actions.setPageSize(size))
  }
})

export const requiredRules = {
  rules: [
    {
      required: true,
      message: 'Обязательно к заполнению!'
    }
  ]
}

export const title = (value: string) => (
  <div
    style={{
      wordWrap: 'break-word',
      wordBreak: 'break-all'
    }}
  >
    {value}
  </div>
)

export const render = (text: string) => (
  <div style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>{text}</div>
)

export const renderDate = (text: string) => (
  <div style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>
    {moment(text).format('DD-MM-YYYY HH:mm')}
  </div>
)

export const generatePassword = () => {
  const length = 6,
    charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let retVal = ''
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n))
  }
  return retVal
}
