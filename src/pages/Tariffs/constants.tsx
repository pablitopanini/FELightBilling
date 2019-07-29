import * as React from 'react'
import { Icon, Popconfirm } from 'antd'
import { getColumnSearchProps } from '../..//utils/helpers'
import { ITariffsStore, ITariff } from '../../interfaces'

export const pageName = 'tariffs'
export const apiUrl = '/api/Tariff/Tariff'
export const actionPrefix: String = 'TARIFFS'
export interface IPageStore extends ITariffsStore {}
export interface IItem extends ITariff {}

export const getColumns = ({ handleRemove, handleSearch }: any) => [
  {
    title: 'Улица1',
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
