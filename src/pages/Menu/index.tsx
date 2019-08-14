import * as React from 'react'
import { Menu as AntMenu } from 'antd'
import { ClickParam } from 'antd/lib/menu'
import { withRouter, RouteComponentProps } from 'react-router'

class Menu extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <AntMenu
        mode="inline"
        selectedKeys={[this.props.location.pathname]}
        style={{ height: '100%' }}
        onClick={this.handleClick}
      >
        <AntMenu.ItemGroup key="catalogs" title="Справочники">
          <AntMenu.Item key="/houses">Дома</AntMenu.Item>
          <AntMenu.Item key="/tariffs">Тарифы</AntMenu.Item>
          <AntMenu.Item key="/services">Услуги</AntMenu.Item>
          <AntMenu.Item key="/clients">Клиенты</AntMenu.Item>
        </AntMenu.ItemGroup>
        <AntMenu.ItemGroup key="reports" title="Отчёты">
          <AntMenu.Item key="/report1">Отчет 1</AntMenu.Item>
        </AntMenu.ItemGroup>
      </AntMenu>
    )
  }

  private handleClick = (e: ClickParam) => {
    this.props.history.push(e.key)
  }
}

export default withRouter(Menu)
