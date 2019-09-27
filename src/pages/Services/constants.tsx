import * as React from 'react'
import { Icon, Popconfirm, Checkbox } from 'antd'
import { getColumnSearchProps } from '../../utils/helpers'
import { ITariffsStore, ITariff } from '../../interfaces'

export const pageName = 'services'
export const apiUrl = '/api/Tariff/Tariff'
export const actionPrefix: String = 'SERVICES'
export interface IPageStore extends ITariffsStore {}
export interface IItem extends ITariff {}

export const getColumns = ({ handleRemove, handleSearch }: any) => [
  {
    title: 'Название',
    dataIndex: 'name',
    width: '30%',
    sorter: true,
    ...getColumnSearchProps('name', handleSearch)
  },
  {
    title: 'Периодический',
    dataIndex: 'isPeriodic',
    width: '15%',
    render: (_: any, record: ITariff) => (
      <Checkbox checked={record.isPeriodic} />
    )
  },
  {
    title: 'Стоимость',
    dataIndex: 'cost',
    width: '15%',
    sorter: true,
    ...getColumnSearchProps('cost', handleSearch)
  },
  {
    title: 'Комментарий',
    dataIndex: 'comment',
    width: '30%',
    ...getColumnSearchProps('comment', handleSearch)
  },
  {
    width: '10%',
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
