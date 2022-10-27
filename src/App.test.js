import React from 'react'
import App from './App'
import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { DEMO, HOME, PRODUCTS } from './routes/names'
import FrontPage from './pages/FrontPage'
import Products from './pages/Products'
import Demo from './pages/Demo'

//note that there will be not be any actual API calls if catalog.free.id is defined at this level
describe('app', () => {
  it('renders app', () => {
    const router = createMemoryRouter([
      {
        path: "/",
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
    ], { initialEntries: ["/"] })
    render(

      <RouterProvider router={router} />
    )
  })
})

describe('navigating around app', () => {
  it('loads FrontPage by default', () => {
    const router = createMemoryRouter([
      {
        path: "/",
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
    ], { initialEntries: ["/"] })
    render(
      <RouterProvider router={router} />
    )
    expect(screen.getByText('Derivatives Modeling as a Service')).toBeDefined()
  })
  it('correctly loads Products when going to products', () => {
    const router = createMemoryRouter([
      {
        path: "/",
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
    ], { initialEntries: ["/products"] })
    render(
      <RouterProvider router={router} />
    )
    expect(screen.getByText('Real Options')).toBeDefined()
  })
  it('correctly loads Demo when going to Demo', () => {
    const router = createMemoryRouter([
      {
        path: "/",
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
    ], { initialEntries: ["/demo"] })
    render(
      <RouterProvider router={router} />
    )
  })
})
