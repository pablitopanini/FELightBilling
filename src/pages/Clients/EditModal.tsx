import * as React from 'react'
import {
  Modal,
  Form,
  Input,
  Button,
  Select,
  Checkbox,
  InputNumber,
  Icon,
  DatePicker
} from 'antd'
import { withRouter, RouteComponentProps } from 'react-router'
import { connect, DispatchProp } from 'react-redux'
import { IStore, ITariff, IHouse, IGreyAddress } from '../../interfaces'
import { pageName, IPageStore } from './constants'
import { FormProps, FormComponentProps } from 'antd/lib/form'
import { actions } from './store'
import { get, map } from 'lodash'
import { requiredRules, generatePassword } from '../../utils/helpers'
import rest from './rest'
import * as moment from 'moment'

export type IProps = RouteComponentProps & FormProps & DispatchProp & IPageStore

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}

function EditModal(props: IProps) {
  const [visible, setVisible] = React.useState<boolean>(false)
  const [greyAddresses, setGreyAddresses] = React.useState<Array<IGreyAddress>>(
    []
  )
  const [whiteAddresses, setWhiteAddresses] = React.useState<
    Array<IGreyAddress>
  >([])

  // get links
  React.useEffect(() => {
    props.dispatch(actions.getHouses())
    props.dispatch(actions.getTariffs())
    return () => {
      props.dispatch(actions.clearLinks())
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
    if (get(props, 'item.houseId')) {
      getGreyAddresses(get(props, 'item.houseId'))
    }
    if (get(props, 'item.greyAddress')) {
      getWhiteAddresses()
    }
  }, [props.item])

  React.useEffect(() => {
    if (
      get(props, 'match.params.id') === 'new' &&
      !props.form!.getFieldValue('password')
    ) {
      genPass()
    }
  }, [props.form])

  function genPass() {
    props.form!.setFieldsValue({
      password: generatePassword()
    })
  }

  function getGreyAddresses(houseId: number) {
    rest.getGreyAddress(houseId).then((res: any) => {
      setGreyAddresses(get(res, 'data', []))
    })
  }

  function getWhiteAddresses() {
    rest.getWhiteAddress().then((res: any) => {
      setWhiteAddresses(get(res, 'data', []))
    })
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
            ...values,
            houseId: get(values, 'house.key', undefined),
            greyAddressId: get(values, 'greyAddress.key', undefined),
            whiteAddressId: get(values, 'whiteAddress.key', undefined),
            tariffIds: map(
              get(values, 'tariffs', []),
              (tariff: any) => tariff.key
            ),
            creditValidFrom: values.creditDate[0],
            creditValidTo: values.creditDate[1]
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
      width={640}
    >
      <div
        onKeyPress={(e: any) => {
          if (!e) e = window.event
          const keyCode = e.keyCode || e.which
          if (keyCode == '13') {
            handleOk()
            return false
          }
          return true
        }}
      >
        <Form {...formItemLayout}>
          <Form.Item label="ФИО">
            {getFieldDecorator('fullName', { ...requiredRules })(<Input />)}
          </Form.Item>

          <Form.Item label="Телефон">
            {getFieldDecorator('phoneNumber')(<Input />)}
          </Form.Item>

          <Form.Item label="Паспорт">
            {getFieldDecorator('passportData')(<Input />)}
          </Form.Item>

          <Form.Item label="Дом">
            {getFieldDecorator('house')(
              <Select
                showSearch
                onSearch={(value: string) => {
                  props.dispatch(actions.getHouses(value))
                }}
                filterOption={() => true}
                labelInValue
                allowClear
                onChange={(value: any) => {
                  if (value && value.key) getGreyAddresses(value.key)
                  else {
                    setGreyAddresses([])
                    setWhiteAddresses([])
                  }
                }}
              >
                {map(get(props, 'houses'), (house: IHouse) => (
                  <Select.Option key={house.id} value={house.id}>
                    {`${(house.address && house.address + ` `) ||
                      ''}${(house.number && house.number + ` `) ||
                      ''}${(house.additionalNumber &&
                      house.additionalNumber + ` `) ||
                      ''}${house.porch || ''}`}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item label="Квартира">
            {getFieldDecorator('apartmentNumber')(<Input />)}
          </Form.Item>

          <Form.Item label="Серый IP">
            {getFieldDecorator('greyAddress')(
              <Select
                showSearch
                onSearch={(value: string) => {
                  // TODO
                }}
                filterOption={() => true}
                labelInValue
                allowClear
                onChange={(value: any) => {
                  if (value && value.key) getWhiteAddresses()
                  else setWhiteAddresses([])
                }}
              >
                {map(greyAddresses, (item: IGreyAddress) => (
                  <Select.Option key={item.id} value={item.id}>
                    {`${item.address}`}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item label="Белый IP">
            {getFieldDecorator('whiteAddress')(
              <Select
                showSearch
                onSearch={(value: string) => {
                  // TODO
                }}
                filterOption={() => true}
                labelInValue
                allowClear
              >
                {map(whiteAddresses, (item: IGreyAddress) => (
                  <Select.Option key={item.id} value={item.id}>
                    {`${item.address}`}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item label="Тариф">
            {getFieldDecorator('tariffs')(
              <Select
                showSearch
                onSearch={(value: string) => {
                  props.dispatch(actions.getTariffs(value))
                }}
                filterOption={() => true}
                labelInValue
                allowClear
                mode="multiple"
              >
                {map(get(props, 'tariffs'), (item: ITariff) => (
                  <Select.Option key={item.id} value={item.id}>
                    {`${item.name}`}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item label="Логин">
            {getFieldDecorator('login', { ...requiredRules })(<Input />)}
          </Form.Item>

          <Form.Item label="Пароль">
            {getFieldDecorator('password', { ...requiredRules })(
              <Input
                addonAfter={
                  <Icon
                    type="reload"
                    onClick={() => {
                      genPass()
                    }}
                  />
                }
              />
            )}
          </Form.Item>

          <Form.Item label="IP адрес оборудования">
            {getFieldDecorator('hwIpAddress')(<Input />)}
          </Form.Item>

          <Form.Item label="Порт оборудования">
            {getFieldDecorator('hwPort')(<Input />)}
          </Form.Item>

          <Form.Item label="Баланс">
            {getFieldDecorator('balance')(<InputNumber disabled />)}
          </Form.Item>

          <Form.Item label="Кредит">
            {getFieldDecorator('credit')(<InputNumber />)}
          </Form.Item>

          <Form.Item label="Статус">
            {getFieldDecorator('status')(<Input disabled />)}
          </Form.Item>

          <Form.Item label="Активность">
            {getFieldDecorator('isActive', {
              valuePropName: 'checked'
            })(<Checkbox />)}
          </Form.Item>

          <Form.Item label="Комментарий">
            {getFieldDecorator('comment')(<Input.TextArea />)}
          </Form.Item>

          <Form.Item label="Кредит">
            {getFieldDecorator('creditDate', {
              rules: [
                {
                  type: 'array'
                }
              ]
            })(<DatePicker.RangePicker format="DD-MM-YYYY" />)}
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

function getForm(mapPropsToFields: any) {
  return Form.create({
    name: `${pageName}_edit_form`,
    mapPropsToFields,
    onValuesChange: (props: any, changedValues: Object, allValues) => {
      if (changedValues.hasOwnProperty('house')) {
        props.form.setFieldsValue({
          greyAddress: undefined,
          whiteAddress: undefined
        })
      }

      if (changedValues.hasOwnProperty('greyAddress')) {
        props.form.setFieldsValue({
          whiteAddress: undefined
        })
      }
    }
  })(EditModal)
}

const EditModalForm = getForm((props: any) => ({
  fullName: Form.createFormField({
    value: get(props, 'item.fullName', undefined)
  }),
  apartmentNumber: Form.createFormField({
    value: get(props, 'item.apartmentNumber', undefined)
  }),
  login: Form.createFormField({
    value: get(props, 'item.login', undefined)
  }),
  password: Form.createFormField({
    value: get(props, 'item.password', undefined)
  }),
  hwIpAddress: Form.createFormField({
    value: get(props, 'item.hwIpAddress', undefined)
  }),
  hwPort: Form.createFormField({
    value: get(props, 'item.hwPort', undefined)
  }),
  balance: Form.createFormField({
    value: get(props, 'item.balance', undefined)
  }),
  credit: Form.createFormField({
    value: get(props, 'item.credit', undefined)
  }),
  status: Form.createFormField({
    value: get(props, 'item.status', undefined)
  }),
  isActive: Form.createFormField({
    value: get(props, 'item.isActive', undefined)
  }),
  passportData: Form.createFormField({
    value: get(props, 'item.passportData', undefined)
  }),
  phoneNumber: Form.createFormField({
    value: get(props, 'item.phoneNumber', undefined)
  }),
  house: Form.createFormField({
    value: get(props, 'item.house.address')
      ? {
          key: get(props, 'item.house.id', undefined),
          label: `${get(props, 'item.house.address')}`
        }
      : undefined
  }),
  greyAddress: Form.createFormField({
    value: get(props, 'item.greyAddress.id')
      ? {
          key: get(props, 'item.greyAddress.id', undefined),
          label: `${get(props, 'item.greyAddress.address')}`
        }
      : undefined
  }),
  whiteAddress: Form.createFormField({
    value: get(props, 'item.whiteAddress.id')
      ? {
          key: get(props, 'item.whiteAddress.id', undefined),
          label: `${get(props, 'item.whiteAddress.address')}`
        }
      : undefined
  }),
  tariffs: Form.createFormField({
    value: get(props, 'item.tariffs')
      ? map(get(props, 'item.tariffs', []), (tariff: ITariff) => ({
          key: get(tariff, 'id', undefined),
          label: get(tariff, 'name', undefined)
        }))
      : undefined
  }),
  comment: Form.createFormField({
    value: get(props, 'item.comment', undefined)
  }),
  creditDate: Form.createFormField({
    value: [
      get(props, 'item.creditValidFrom', undefined)
        ? moment(get(props, 'item.creditValidFrom', undefined))
        : undefined,
      get(props, 'item.creditValidTo', undefined)
        ? moment(get(props, 'item.creditValidTo', undefined))
        : undefined
    ]
  })
}))

export default withRouter(
  connect<any, any, any, any>((state: IStore) => ({ ...state[pageName] }))(
    EditModalForm
  )
)
