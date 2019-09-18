import * as React from 'react'
import { Icon, Popconfirm, Checkbox } from 'antd'
import { getColumnSearchProps } from '../..//utils/helpers'
import { ITariffsStore, ITariff } from '../../interfaces'

export const pageName = 'tariffs'
export const apiUrl = '/api/Tariff/Tariff'
export const actionPrefix: String = 'TARIFFS'
export interface IPageStore extends ITariffsStore {}
export interface IItem extends ITariff {}

export const getColumns = ({ handleRemove, handleSearch }: any) => [
  {
    title: 'Название',
    dataIndex: 'name',
    width: '25%',
    sorter: true,
    ...getColumnSearchProps('name', handleSearch)
  },
  {
    title: 'Периодический',
    dataIndex: 'isPeriodic',
    width: '5%',
    render: (_: any, record: ITariff) => (
      <Checkbox checked={record.isPeriodic} />
    )
  },
  {
    title: 'Входящая скорость',
    dataIndex: 'inputRate',
    width: '15%',
    sorter: true,
    ...getColumnSearchProps('inputRate', handleSearch)
  },
  {
    title: 'Исходящая скорость',
    dataIndex: 'outputRate',
    width: '15%',
    sorter: true,
    ...getColumnSearchProps('outputRate', handleSearch)
  },
  {
    title: 'Стоимость',
    dataIndex: 'cost',
    width: '10%',
    sorter: true,
    ...getColumnSearchProps('cost', handleSearch)
  },
  {
    title: 'Комментарий',
    dataIndex: 'comment',
    width: '20%',
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
