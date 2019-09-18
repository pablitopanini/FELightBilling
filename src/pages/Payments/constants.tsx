import * as React from 'react'
import { title, render, renderDate } from '../../utils/helpers'
import { IClientsStore, IClient } from '../../interfaces'

export const pageName = 'payments'
export const apiUrl = '/api/Report/PaymentReport'
export const actionPrefix: String = 'PAYMENTS'
export interface IPageStore extends IClientsStore {}
export interface IItem extends IClient {}

export const getColumns = () => [
  {
    title: title('Дата'),
    dataIndex: 'dateTime',
    width: '20%',
    render: renderDate
  },
  {
    title: title('ID'),
    dataIndex: 'clientId',
    width: '10%',
    render
  },
  {
    title: title('ФИО'),
    dataIndex: 'fullName',
    width: '20%',
    render
  },
  {
    title: title('Сумма'),
    dataIndex: 'amount',
    width: '10%',
    render
  },
  {
    title: title('Тип'),
    dataIndex: 'paymentType',
    width: '10%',
    render
  },
  {
    title: title('Комментарий'),
    dataIndex: 'comment',
    width: '30%',
    render
  }
]

export const paymentTypes = [
  {
    key: 1,
    label: 'User'
  },
  {
    key: 2,
    label: 'System'
  }
]
