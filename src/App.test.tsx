import React from 'react'
import App from './App'
import { render, screen, waitFor } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { toRouteObjects } from './routes/config'

//note that there will be not be any actual API calls if catalog.free.id is defined at this level
const renderAt = (path: string) => {
  // Routes come from the shared nav config rather than being re-declared here, so
  // this suite exercises the same route tree the app itself builds.
  const router = createMemoryRouter(
    [{ path: '/', element: <App />, children: toRouteObjects() }],
    { initialEntries: [path] },
  )
  return render(<RouterProvider router={router} />, {
    baseElement: document.body,
  })
}

describe('app', () => {
  it('renders app', async () => {
    await waitFor(() => renderAt('/'))
  })
})

describe('navigating around app', () => {
  it('loads FrontPage by default', async () => {
    await waitFor(() => renderAt('/'))
    expect(
      screen.getByText('Real Options: Derivatives Modeling as a Service'),
    ).toBeDefined()
  })
  it('correctly loads Demo when going to Demo', async () => {
    await waitFor(() => renderAt('/demo'))
  })
})
