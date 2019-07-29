import * as React from 'react'
import { Modal, Form, Input, Button } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router'
import { connect, DispatchProp } from 'react-redux'
import { IStore } from '../../interfaces'
import { pageName, IPageStore } from './constants'
import { FormProps } from 'antd/lib/form'
import { actions } from './store'
import { get } from 'lodash'

export type IProps = RouteComponentProps & FormProps & DispatchProp & IPageStore

const requiredRules = {
  rules: [
    {
      required: true,
      message: 'Обязательно к заполнению!'
    }
  ]
}

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

class EditModal extends React.Component<IProps, any> {
  state = {
    visible: false
  }

  componentDidMount() {
    if (get(this, 'props.match.params.id') !== 'new') {
      this.props.dispatch(actions.getItem(get(this, 'props.match.params.id')))
    } else {
      this.setState({ visible: true })
    }
  }

  componentWillUnmount() {
    this.props.dispatch(actions.clearItem())
  }

  componentDidUpdate(prevProps: IProps) {
    if (this.props.item && this.props.item !== prevProps.item) {
      if (get(this, 'props.match.params.id') === 'new') {
        this.props.history.push(`/${pageName}/${this.props.item.id}`)
      } else {
        this.initFieldsValues()
        this.setState({ visible: true })
      }
    }
  }

  initFieldsValues = () => {
    // this.props.item &&
    //   this.props.form &&
    //   this.props.form!.setFields({
    //     address: {
    //       value: this.props.item.address
    //     },
    //     number: {
    //       value: this.props.item.number
    //     },
    //     additionalNumber: {
    //       value: this.props.item.additionalNumber
    //     },
    //     comment: {
    //       value: this.props.item.comment
    //     }
    //   })
  }

  handleCancel = () => {
    this.props.history.push(`/${pageName}`)
  }

  handleOk = () => {
    this.props.form!.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch(
          actions.saveItem({
            id: get(this, 'props.item.id', undefined),
            ...values
          })
        )
      }
    })
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form!

    return (
      <Modal
        title="Редактирование"
        visible={this.state.visible}
        footer={[
          <Button
            key="submit"
            type="primary"
            icon="save"
            onClick={this.handleOk}
          />,
          <Button key="back" onClick={this.handleCancel}>
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

          <Form.Item label="Комментарий">
            {getFieldDecorator('comment')(<Input />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

const EditModalForm = Form.create({ name: `${pageName}_edit_form` })(EditModal)

export default withRouter(
  connect<any, any, any, any>((state: IStore) => ({ ...state.houses }))(
    EditModalForm
  )
)
