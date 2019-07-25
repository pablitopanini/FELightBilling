import * as React from 'react'
import { Modal } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { IStore } from 'src/interfaces'

export interface IHouseProps {
  //   id: string
}

function House(props: IHouseProps & RouteComponentProps) {
  return (
    <Modal
      title="Basic Modal"
      visible={true}
      onOk={() => {}}
      onCancel={() => {
        props.history.push('/houses')
      }}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
}

export default withRouter(
  connect<any, any, any, any>((state: IStore) => ({ ...state }))(House)
)
