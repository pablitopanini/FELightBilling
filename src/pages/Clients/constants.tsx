import * as React from 'react'
import { Icon, Popconfirm, Checkbox } from 'antd'
import { getColumnSearchProps, title, render } from '../../utils/helpers'
import { IHousesStore, IHouse, IClientsStore, IClient } from '../../interfaces'

export const pageName = 'clients'
export const apiUrl = '/api/Client/Client'
export const actionPrefix: String = 'CLIENTS'
export interface IPageStore extends IClientsStore {}
export interface IItem extends IClient {}

export const getColumns = ({ handleRemove, handleSearch }: any) => [
  {
    title: title('ФИО'),
    dataIndex: 'surname',
    width: '20%',
    sorter: true,
    render: (text: string, record: IItem) => (
      <div style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>
        {`${record.surname} ${record.name} ${record.middleName}`}
      </div>
    ),
    ...getColumnSearchProps('surname', handleSearch)
  },
  {
    title: title('Адрес'),
    dataIndex: 'CompositeAddress',
    width: '15%',
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
    width: '15%',
    render
  },
  {
    title: title('Статус'),
    dataIndex: 'status',
    width: '30%',
    render,
    ...getColumnSearchProps('status', handleSearch)
  },
  {
    title: title('Активность'),
    dataIndex: 'isActive',
    width: '5%',
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
        </span>
      )
    }
  }
]
