import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import './styles/finside.scss'
import registerServiceWorker from './registerServiceWorker'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { DEMO, HOME, PRODUCTS } from './routes/names'
import FrontPage from './pages/FrontPage'
import Products from './pages/Products'
import Demo from './pages/Demo'

const router = createHashRouter([
  {
    path: process.env.PUBLIC_URL,
    element: <App />,
    children: [
      {
        path: HOME,
        element: <FrontPage />,
      },
      {
        path: PRODUCTS,
        element: <Products />,
      },
      {
        path: DEMO,
        element: <Demo />,
      },
    ],
  },
])

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById('root')
)
registerServiceWorker()
