import React from 'react'

import { Avatar, Layout, Menu, theme } from 'antd'
import logo from './assets/Logo.png'
import { Outlet, useNavigate, useLocation } from 'react-router'
import { resolveNavAction, toMenuItems } from './routes/config'
const { Header, Content } = Layout

const App: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const handleMenuClick = ({ key }: { key: string }) => {
    const action = resolveNavAction(key)
    if (!action) return
    if (action.kind === 'open-external') {
      window.location.href = action.href
    } else {
      navigate(action.path)
    }
  }
  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: colorBgContainer,
        }}
      >
        <Avatar
          size="large"
          icon={<img src={logo} alt="" />}
          style={{ backgroundColor: colorBgContainer }}
        />
        <Menu
          style={{ flex: 1, minWidth: 0 }}
          theme="light"
          mode="horizontal"
          onClick={handleMenuClick}
          selectedKeys={[location.pathname.replace(/^\//, '')]}
          items={toMenuItems()}
        />
      </Header>
      <Content style={{ padding: '0px' }}>
        <Outlet />
      </Content>
    </Layout>
  )
}

export default App
