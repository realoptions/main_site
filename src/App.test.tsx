import React from 'react'
import App from './App'
import { render, screen, waitFor } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { DEMO, HOME } from './routes/names'
import FrontPage from './pages/FrontPage'
import Demo from './pages/Demo'

//note that there will be not be any actual API calls if catalog.free.id is defined at this level
describe('app', () => {
  it('renders app', async () => {
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
            path: DEMO,
            element: <Demo />,
          },
        ],
      },
    ], { initialEntries: ["/"] })
    await waitFor(() => render(
      <RouterProvider router={router} />)
    )
  })
})

describe('navigating around app', () => {
  it('loads FrontPage by default', async () => {
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
            path: DEMO,
            element: <Demo />,
          },
        ],
      },
    ], { initialEntries: ["/"] })
    await waitFor(() => render(
      <RouterProvider router={router} />)
    )
    expect(screen.getByText('Real Options: Derivatives Modeling as a Service')).toBeDefined()
  })
  it('correctly loads Demo when going to Demo', async () => {
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
            path: DEMO,
            element: <Demo />,
          },
        ],
      },
    ], { initialEntries: ["/demo"] })
    await waitFor(() => render(
      <RouterProvider router={router} />)
    )
  })
})
