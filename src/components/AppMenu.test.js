import { AppMenu } from './AppMenu'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

describe('AppMenu', () => {
  it('renders ', () => {
    render(
      <MemoryRouter>
        <AppMenu />
      </MemoryRouter>
    )
    expect(screen.getByText('Home')).toBeDefined()
    expect(screen.getByText('Products')).toBeDefined()
    expect(screen.getByText('Developers')).toBeDefined()
    expect(screen.getByText('Demo')).toBeDefined()
  })
})
