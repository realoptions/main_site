import React from 'react'
import { render, screen } from '@testing-library/react'
import Products from './Products'
import { MemoryRouter } from 'react-router-dom'

it('fully mounts', () => {
  render(
    <MemoryRouter>
      <Products />
    </MemoryRouter>
  )
  expect(screen.getByText('Real Options')).toBeDefined()
})
