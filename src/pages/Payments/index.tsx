import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { Table, Button, DatePicker, Select, Row, Col } from 'antd'
import { IStore } from '../../interfaces'
import { actions } from './store'
import { getColumns, pageName, IPageStore, paymentTypes } from './constants'
import { getTableHandlers } from '../../utils/helpers'
import * as moment from 'moment'
import { get, map } from 'lodash'

function Page(props: RouteComponentProps & IPageStore & DispatchProp) {
  const [handlers, setHandlers] = React.useState<any>({})
  const [period, setPeriod] = React.useState<any>([
    moment().startOf('month'),
    moment().endOf('month')
  ])
  const [clientId, setClientId] = React.useState<any>()
  const [paymentType, setPaymentType] = React.useState<any>()

  React.useEffect(() => {
    props.dispatch(actions.getClients())
    return () => {
      props.dispatch(actions.reset())
    }
  }, [])

  React.useEffect(() => {
    setHandlers(getTableHandlers(props, actions, pageName))
  }, [props.page])

  function getList() {
    props.dispatch(
      actions.getList({
        from: get(period, '[0]', undefined),
        to: get(period, '[1]', undefined),
        clientId,
        paymentType
      })
    )
  }

  return (
    <React.Fragment>
      <Row>
        <Col span={10} style={{ padding: '16px' }}>
          <DatePicker.RangePicker
            style={{ width: '100%' }}
            format="DD-MM-YYYY"
            value={period}
            onChange={setPeriod}
          />
        </Col>

        <Col span={5} style={{ padding: '16px' }}>
          <Select
            style={{ width: '100%' }}
            showSearch
            onSearch={(value: string) => {
              props.dispatch(actions.getClients(value))
            }}
            filterOption={() => true}
            // labelInValue
            allowClear
            placeholder="Клиент"
            value={clientId}
            onChange={setClientId}
          >
            {map(get(props, 'clients'), (item: any) => (
              <Select.Option key={item.id} value={item.id}>
                {`${item.fullName}`}
              </Select.Option>
            ))}
          </Select>
        </Col>

        <Col span={5} style={{ padding: '16px' }}>
          <Select
            style={{ width: '100%' }}
            allowClear
            placeholder="Тип начисления"
            value={paymentType}
            onChange={setPaymentType}
          >
            {map(paymentTypes, (item: any) => (
              <Select.Option key={item.key} value={item.key}>
                {`${item.label}`}
              </Select.Option>
            ))}
          </Select>
        </Col>

        <Col span={4} style={{ padding: '16px' }}>
          <Button
            onClick={getList}
            style={{ width: '100%' }}
            type={'primary'}
            disabled={!period.length}
          >
            Сформировать
          </Button>
        </Col>
      </Row>

      <Table
        bordered
        scroll={{ x: true, y: 'calc(100vh - 315px)' }}
        dataSource={props.list}
        columns={getColumns()}
        pagination={false}
      />
    </React.Fragment>
  )
}

const mapState2Props = (state: IStore) => ({ ...state[pageName] })

export default withRouter(
  connect<IPageStore, any, any, IStore>(mapState2Props)(Page)
)
