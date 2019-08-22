import * as React from 'react'
import { Icon, Popconfirm, Checkbox, Divider } from 'antd'
import { getColumnSearchProps, title, render } from '../../utils/helpers'
import { IHousesStore, IHouse, IClientsStore, IClient } from '../../interfaces'

export const pageName = 'clients'
export const apiUrl = '/api/Client/Client'
export const actionPrefix: String = 'CLIENTS'
export interface IPageStore extends IClientsStore {}
export interface IItem extends IClient {}

export const getColumns = ({
  handleRemove,
  handleSearch,
  handleAddPayment
}: any) => [
  {
    title: title('ID'),
    dataIndex: 'id',
    width: '10%',
    render,
    ...getColumnSearchProps('id', handleSearch)
  },
  {
    title: title('ФИО'),
    dataIndex: 'fullName',
    width: '20%',
    sorter: true,
    render,
    ...getColumnSearchProps('fullName', handleSearch)
  },
  {
    title: title('Адрес'),
    dataIndex: 'compositeAddress',
    width: '20%',
    render
  },
  {
    title: title('Логин'),
    dataIndex: 'login',
    width: '10%',
    sorter: true,
    render,
    ...getColumnSearchProps('login', handleSearch)
  },
  {
    title: title('Баланс'),
    dataIndex: 'balance',
    width: '10%',
    render
  },
  {
    title: title('Статус'),
    dataIndex: 'status',
    width: '10%',
    render,
    ...getColumnSearchProps('status', handleSearch)
  },
  {
    title: title('Активность'),
    dataIndex: 'isActive',
    width: '10%',
    render: (_: any, record: any) => <Checkbox checked={record.isActive} />,
    sorter: true
  },
  {
    width: '5%',
    render: (text: any, record: any) => {
      return (
        <span>
          <Popconfirm title="Удалить?" onConfirm={() => handleRemove(record)}>
            <Icon type="delete" />
          </Popconfirm>
          <Divider type="vertical" />
          <Icon
            type="dollar"
            onClick={() => {
              handleAddPayment(record)
            }}
          />
        </span>
      )
    }
  }
]
