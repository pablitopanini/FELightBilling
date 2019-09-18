import * as React from 'react'
import { Modal, Form, Input, Button, Select } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router'
import { connect, DispatchProp } from 'react-redux'
import { IStore } from '../../interfaces'
import { pageName, IPageStore } from './constants'
import { FormProps } from 'antd/lib/form'
import { actions } from './store'
import { get, map } from 'lodash'
import { requiredRules } from '../../utils/helpers'

export type IProps = RouteComponentProps & FormProps & DispatchProp & IPageStore

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
}

function EditModal(props: IProps) {
  const [visible, setVisible] = React.useState<boolean>(false)

  // get links
  React.useEffect(() => {
    props.dispatch(actions.getSubnets())
    return () => {
      props.dispatch(actions.clearSubnets())
    }
  }, [])

  // get item if not new
  React.useEffect(() => {
    if (get(props, 'match.params.id') !== 'new') {
      props.dispatch(actions.getItem(get(props, 'match.params.id')))
    }
    setVisible(true)

    return () => {
      props.dispatch(actions.clearItem())
    }
  }, [])

  // new => id in url
  React.useEffect(() => {
    if (props.item && get(props, 'match.params.id') === 'new') {
      props.history.push(`/${pageName}/${props.item.id}`)
    }
  }, [props.item])

  function handleCancel() {
    props.history.push(`/${pageName}`)
  }

  function handleOk() {
    props.form!.validateFieldsAndScroll((err, values) => {
      if (!err) {
        props.dispatch(
          actions.saveItem({
            id: get(props, 'item.id', undefined),
            ...values,
            subnetId: get(values, 'subnet.key', undefined)
          })
        )
      }
    })
  }

  const { form } = props
  const { getFieldDecorator } = form!
  return (
    <Modal
      title="Редактирование"
      visible={visible}
      footer={[
        <Button key="submit" type="primary" icon="save" onClick={handleOk} />,
        <Button key="back" onClick={handleCancel}>
          Закрыть
        </Button>
      ]}
      closable={false}
    >
      <Form {...formItemLayout}>
        <Form.Item label="Улица">
          {getFieldDecorator('address', {
            ...requiredRules
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Номер">
          {getFieldDecorator('number', {
            ...requiredRules
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Корпус">
          {getFieldDecorator('additionalNumber')(<Input />)}
        </Form.Item>

        <Form.Item label="Подъезд">
          {getFieldDecorator('porch')(<Input />)}
        </Form.Item>

        <Form.Item label="Подсеть">
          {getFieldDecorator('subnet')(
            <Select
              showSearch
              onSearch={(value: string) => {
                props.dispatch(actions.getSubnets(value))
              }}
              filterOption={() => true}
              labelInValue
              allowClear
            >
              {map(get(props, 'subnets'), (subnet: any) => (
                <Select.Option key={subnet.id} value={subnet.id}>
                  {`${subnet.net}/${subnet.mask}`}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item label="Комментарий">
          {getFieldDecorator('comment')(<Input.TextArea />)}
        </Form.Item>
      </Form>
    </Modal>
  )
}

function getForm(mapPropsToFields: any) {
  return Form.create({
    name: `${pageName}_edit_form`,
    mapPropsToFields
  })(EditModal)
}

const EditModalForm = getForm((props: any) => ({
  address: Form.createFormField({
    value: get(props, 'item.address', undefined)
  }),
  number: Form.createFormField({
    value: get(props, 'item.number', undefined)
  }),
  additionalNumber: Form.createFormField({
    value: get(props, 'item.additionalNumber', undefined)
  }),
  porch: Form.createFormField({
    value: get(props, 'item.porch', undefined)
  }),
  subnet: Form.createFormField({
    value: {
      key: get(props, 'item.subnet.id', undefined),
      label: get(props, 'item.subnet.net')
        ? `${get(props, 'item.subnet.net')}/${get(props, 'item.subnet.mask')}`
        : ''
    }
  }),
  comment: Form.createFormField({
    value: get(props, 'item.comment', undefined)
  })
}))

export default withRouter(
  connect<any, any, any, any>((state: IStore) => ({ ...state[pageName] }))(
    EditModalForm
  )
)
