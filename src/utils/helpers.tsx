import * as React from 'react'
import { transform } from 'lodash'
import { Input, Button, Icon } from 'antd'
import { PaginationProps } from 'antd/lib/pagination'

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
  pageName: string
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

  handleTableChange: (
    pagination: PaginationProps,
    __: any,
    { field: fieldName, order }: any
  ) => {
    pagination.current !== props.page &&
      props.dispatch(actions.setPage(pagination.current))

    fieldName &&
      order &&
      props.dispatch(
        actions.setSort({
          fieldName,
          order:
            order === 'ascend'
              ? 'asc'
              : order === 'descend'
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
