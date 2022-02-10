import React from 'react'
import { render, screen } from '@testing-library/react'
import FrontPage from './FrontPage'
import { MemoryRouter } from 'react-router-dom'

it('fully mounts', () => {
  render(
    <MemoryRouter>
      <FrontPage />
    </MemoryRouter>
  )
  expect(screen.getByText("Derivatives Modeling as a Service")).toBeDefined()
})
