import * as React from 'react'
import { Modal, Button, InputNumber, Form } from 'antd'

interface Props {
  client: any
  handleOk: any
  handleCancel: any
}

export default function AddPaymentModal(props: Props) {
  const [sum, setSum] = React.useState(0)
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
      width={320}
    >
      <Form.Item
        label="Сумма"
        labelCol={{
          xs: { span: 24 },
          sm: { span: 6 }
        }}
        wrapperCol={{
          xs: { span: 24 },
          sm: { span: 18 }
        }}
      >
        <InputNumber
          value={sum}
          onChange={value => {
            setSum(value as number)
          }}
        />
      </Form.Item>
    </Modal>
  )
}
