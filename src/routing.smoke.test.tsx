import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import {
  createHashRouter,
  createMemoryRouter,
  RouterProvider,
} from 'react-router'
import App from './App'
import { toRouteObjects } from './routes/config'
import { DEMO, DEVELOPERS, HOME } from './routes/names'
import { DEMO_CONTENT } from './content/site'

/**
 * Runtime routing smoke test.
 *
 * Builds the route tree the same way `src/index.tsx` does — from the app's real
 * shared nav config — and drives it through react-router's actual hash router.
 * Fails loudly if hash routing, an internal route, or the root `errorElement`
 * stops working.
 */
const renderAtHash = (hash: string) => {
  window.location.hash = hash
  const router = createHashRouter([
    {
      path: '/',
      element: <App />,
      id: 'root',
      errorElement: <p>Uh oh, 404</p>,
      children: toRouteObjects(),
    },
  ])
  return render(<RouterProvider router={router} />, {
    baseElement: document.body,
  })
}

describe('hash routing', () => {
  it('renders FrontPage at the home hash', () => {
    renderAtHash(`#/${HOME}`)
    expect(
      screen.getByText('Real Options: Derivatives Modeling as a Service'),
    ).toBeDefined()
  })

  it('renders the Demo page at #/demo', () => {
    renderAtHash(`#/${DEMO}`)
    const frame = document.querySelector('iframe')
    expect(frame).not.toBeNull()
    expect(frame?.getAttribute('src')).toBe(DEMO_CONTENT.href)
  })

  it('falls back to the errorElement for an unknown route', () => {
    renderAtHash('#/definitely-not-a-real-route')
    expect(screen.getByText('Uh oh, 404')).toBeDefined()
  })
})

/**
 * Menu-driven navigation: clicking each of the three nav entries must do the
 * right thing end-to-end, not just in the pure resolver.
 */
describe('menu navigation', () => {
  const renderAppAt = (path: string) => {
    const router = createMemoryRouter(
      [{ path: '/', element: <App />, children: toRouteObjects() }],
      { initialEntries: [path] },
    )
    render(<RouterProvider router={router} />, { baseElement: document.body })
    return router
  }

  it('clicking Home routes internally to /', () => {
    const router = renderAppAt('/demo')
    fireEvent.click(screen.getByText('Home'))
    expect(router.state.location.pathname).toBe('/')
    expect(
      screen.getByText('Real Options: Derivatives Modeling as a Service'),
    ).toBeDefined()
  })

  it('clicking Demo routes internally to /demo', () => {
    const router = renderAppAt('/')
    fireEvent.click(screen.getByText('Demo'))
    expect(router.state.location.pathname).toBe('/demo')
  })

  it('clicking Developers leaves the SPA for the external site', () => {
    // Replace window.location so the assignment is observable instead of a
    // jsdom "not implemented: navigation" no-op.
    const original = window.location
    const stub: { href: string } = { href: '' }
    Object.defineProperty(window, 'location', {
      configurable: true,
      writable: true,
      value: stub,
    })
    try {
      renderAppAt('/')
      fireEvent.click(screen.getByText('Developers'))
      expect(stub.href).toBe(DEVELOPERS)
    } finally {
      Object.defineProperty(window, 'location', {
        configurable: true,
        writable: true,
        value: original,
      })
    }
  })

  it('does not navigate the router when clicking the external entry', () => {
    const router = renderAppAt('/')
    const original = window.location
    Object.defineProperty(window, 'location', {
      configurable: true,
      writable: true,
      value: { href: '' },
    })
    try {
      fireEvent.click(screen.getByText('Developers'))
      // The SPA's own location must be untouched.
      expect(router.state.location.pathname).toBe('/')
    } finally {
      Object.defineProperty(window, 'location', {
        configurable: true,
        writable: true,
        value: original,
      })
    }
  })
})
