import React from 'react'
import App from './App'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

//note that there will be not be any actual API calls if catalog.free.id is defined at this level
describe('app', () => {
  it('renders app', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
  })
})

describe('navigating around app', () => {
  it('loads FrontPage by default', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByText("Derivatives Modeling as a Service")).toBeDefined()
  })
  it('correctly loads Products when going to products', () => {
    render(
      <MemoryRouter initialEntries={['/products']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByText("Real Options")).toBeDefined()
  })
  it('correctly loads Demo when going to Demo', () => {
    render(
      <MemoryRouter initialEntries={['/demo']}>
        <App />
      </MemoryRouter>
    )
  })
})
