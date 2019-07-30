import * as React from 'react'
import { Icon, Popconfirm } from 'antd'
import { getColumnSearchProps } from '../../utils/helpers'
import { IHousesStore, IHouse } from '../../interfaces'

export const pageName = 'houses'
export const apiUrl = '/api/House/House'
export const actionPrefix: String = 'HOUSES'
export interface IPageStore extends IHousesStore {}
export interface IItem extends IHouse {}

export const getColumns = ({ handleRemove, handleSearch }: any) => [
  {
    title: 'Улица',
    dataIndex: 'address',
    width: '30%',
    sorter: true,
    ...getColumnSearchProps('address', handleSearch)
  },
  {
    title: 'Дом',
    dataIndex: 'number',
    width: '10%',
    sorter: true,
    ...getColumnSearchProps('number', handleSearch)
  },
  {
    title: 'Корпус',
    dataIndex: 'additionalNumber',
    width: '10%',
    sorter: true,
    ...getColumnSearchProps('additionalNumber', handleSearch)
  },
  {
    title: 'Подъезд',
    dataIndex: 'porch',
    width: '10%',
    sorter: true,
    ...getColumnSearchProps('porch', handleSearch)
  },
  {
    title: 'Комментарий',
    dataIndex: 'comment',
    width: '40%',
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
