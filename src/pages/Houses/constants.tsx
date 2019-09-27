import * as React from 'react'
import { Icon, Popconfirm } from 'antd'
import { getColumnSearchProps, title, render } from '../../utils/helpers'
import { IHousesStore, IHouse } from '../../interfaces'

export const pageName = 'houses'
export const apiUrl = '/api/House/House'
export const actionPrefix: String = 'HOUSES'
export interface IPageStore extends IHousesStore {}
export interface IItem extends IHouse {}

export const getColumns = ({ handleRemove, handleSearch, sortedInfo }: any) => [
  {
    title: 'Улица',
    dataIndex: 'address',
    width: '20%',
    sorter: true,
    render,
    ...getColumnSearchProps('address', handleSearch)
  },
  {
    title: 'Дом',
    dataIndex: 'number',
    width: '10%',
    sorter: true,
    render,
    ...getColumnSearchProps('number', handleSearch)
  },
  {
    title: 'Корпус',
    dataIndex: 'additionalNumber',
    width: '10%',
    sorter: true,
    render,
    ...getColumnSearchProps('additionalNumber', handleSearch)
  },
  {
    title: 'Подъезд',
    dataIndex: 'porch',
    width: '10%',
    sorter: true,
    render,
    ...getColumnSearchProps('porch', handleSearch)
  },
  {
    title: 'Подсеть',
    dataIndex: 'subnetString',
    width: '15%',
    render
  },
  {
    title: 'Комментарий',
    dataIndex: 'comment',
    width: '30%',
    render,
    ...getColumnSearchProps('comment', handleSearch)
  },
  {
    width: '5%',
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
