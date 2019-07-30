import * as React from 'react'
import { Modal, Form, Input, Button, Select } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router'
import { connect, DispatchProp } from 'react-redux'
import { IStore, ISubnet } from '../../interfaces'
import { pageName, IPageStore } from './constants'
import { FormProps } from 'antd/lib/form'
import { actions } from './store'
import { get, reduce, map } from 'lodash'
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

  React.useEffect(() => {
    props.dispatch(actions.getSubnets())
    return () => {
      props.dispatch(actions.clearSubnets())
    }
  }, [])

  React.useEffect(() => {
    if (get(props, 'match.params.id') !== 'new') {
      props.dispatch(actions.getItem(get(props, 'match.params.id')))
    } else {
      setVisible(true)
    }

    return () => {
      props.dispatch(actions.clearItem())
    }
  }, [])

  React.useEffect(() => {
    if (props.item)
      if (get(props, 'match.params.id') === 'new') {
        props.history.push(`/${pageName}/${props.item.id}`)
      } else {
        initFieldsValues()
        setVisible(true)
      }
  }, [props.item])

  function initFieldsValues() {
    props.form &&
      props.form!.setFields(
        reduce(
          props.item,
          (result, value, key) => {
            result[key] = { value }
            return result
          },
          {}
        )
      )
  }

  function handleCancel() {
    props.history.push(`/${pageName}`)
  }

  function handleOk() {
    props.form!.validateFieldsAndScroll((err, values) => {
      if (!err) {
        props.dispatch(
          actions.saveItem({
            id: get(props, 'item.id', undefined),
            ...values
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
            >
              {map(get(props, 'subnets'), (subnet: ISubnet) => (
                <Select.Option value={subnet.id}>
                  {`${subnet.address}/${subnet.mask}`}
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

const EditModalForm = Form.create({ name: `${pageName}_edit_form` })(EditModal)

export default withRouter(
  connect<any, any, any, any>((state: IStore) => ({ ...state[pageName] }))(
    EditModalForm
  )
)
