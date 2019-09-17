import * as React from 'react'
import { Button, Popconfirm, notification } from 'antd'
import http from '../../utils/http'

export default () => {
  return (
    <div
      style={{
        padding: '16px'
      }}
    >
      <Popconfirm
        placement="bottomRight"
        title={'Вы уверены?'}
        onConfirm={() => {
          http
            .patch('/api/Payment/WithdrawMonthlyFee')
            .then(() => {
              notification.success({
                placement: 'bottomRight',
                message: 'Успех',
                description: 'Абонентская плата списана'
              })
            })
            .catch(() => {
              notification.error({
                placement: 'bottomRight',
                message: 'Ошибка',
                description: 'Абонентская плата не списана'
              })
            })
        }}
        okText="Да"
        cancelText="Нет"
      >
        <Button type="danger" size="large">
          Списать месячную абонентскую плату
        </Button>
      </Popconfirm>
    </div>
  )
}
