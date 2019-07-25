import * as React from 'react'
import { Modal } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { IStore } from 'src/interfaces'
import { pageName } from './constants'

export interface IProps {
  //   id: string
}

function EditModal(props: IProps & RouteComponentProps) {
  return (
    <Modal
      title="Basic Modal"
      visible={true}
      onOk={() => {}}
      onCancel={() => {
        props.history.push(`/${pageName}`)
      }}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
}

export default withRouter(
  connect<any, any, any, any>((state: IStore) => ({ ...state }))(EditModal)
)
