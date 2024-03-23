import React from 'react'


import FrontPage from './pages/FrontPage'
import Demo from './pages/Demo'

import { Avatar, Space, Layout, Menu, theme } from 'antd';
import logo from './assets/Logo.png'
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ItemType } from 'antd/es/menu/hooks/useItems'
import { HOME, DEMO, DEVELOPERS } from './routes/names'
const { Header, Content } = Layout;

export const MENU_ITEMS: MenuItem[] = [
  { key: HOME, label: "Home", element: <FrontPage /> },
  { key: DEVELOPERS, label: "Developers" },
  { key: DEMO, label: "Demo", element: <Demo /> }
]
interface MenuItem {
  key: string;
  label: string | JSX.Element;
  children?: ItemType[];
  element?: JSX.Element;
  theme?: string;
}

const isKeyInRoute = (key: string, menu_items: MenuItem[]) => {
  return menu_items.find(v => v.key === key) ? true : false
}

const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString));
  }
  catch (e) {
    return false;
  }
}
const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: colorBgContainer }}>
        <Avatar size="large" icon={<img src={logo} alt="" />} style={{ backgroundColor: colorBgContainer }} />
        <Menu
          style={{ flex: 1, minWidth: 0 }}
          theme="light"
          mode="horizontal"
          onClick={({ key }) => {
            if (isValidUrl(key)) {
              window.location.href = key
            }
            else {
              isKeyInRoute(key, MENU_ITEMS) && navigate(key)
            }
          }}
          selectedKeys={[location.pathname.replace("/", "")]}
          items={MENU_ITEMS.map(({ key, label, children, theme }) => ({ key, label, children, theme }))}
        />
      </Header>
      <Content style={{ padding: '0px' }}>
        <Outlet />
      </Content>
    </Layout >
  );
};


export default App