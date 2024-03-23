import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, { MENU_ITEMS } from './App';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { ConfigProvider } from 'antd';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    id: "root",
    errorElement: <p>Uh oh, 404</p>,
    children: MENU_ITEMS.map(({ key, element }) => ({ path: key, element }))
  },

]);

const THEME_TOKEN = {
  token: {
    colorPrimary: "#030852",
    colorLink: "#eb2f96",
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
  }
}
root.render(
  <React.StrictMode>
    <ConfigProvider theme={THEME_TOKEN}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);

