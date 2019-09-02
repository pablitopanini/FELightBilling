import * as React from 'react'
import { Modal, Button, InputNumber, Form, Input } from 'antd'

interface Props {
  client: any
  handleOk: any
  handleCancel: any
}

export default function AddPaymentModal(props: Props) {
  const [sum, setSum] = React.useState(0)
  const [comment, setComment] = React.useState('')
  return (
    <Modal
      title={props.client.fullName}
      visible
      footer={[
        <Button
          key="submit"
          type="primary"
          icon="save"
          onClick={() => {
            props.handleOk(sum)
          }}
        />,
        <Button key="back" onClick={props.handleCancel}>
          Закрыть
        </Button>
      ]}
      closable={false}
      width={480}
    >
      <Form.Item
        label="Сумма"
        labelCol={{
          xs: { span: 24 },
          sm: { span: 10 }
        }}
        wrapperCol={{
          xs: { span: 24 },
          sm: { span: 14 }
        }}
      >
        <InputNumber
          value={sum}
          onChange={value => {
            setSum(value as number)
          }}
        />
      </Form.Item>

      <Form.Item
        label="Комментарий"
        labelCol={{
          xs: { span: 24 },
          sm: { span: 10 }
        }}
        wrapperCol={{
          xs: { span: 24 },
          sm: { span: 14 }
        }}
      >
        <Input.TextArea
          value={comment}
          onChange={(value: any) => {
            setComment(value)
          }}
        />
      </Form.Item>
    </Modal>
  )
}
