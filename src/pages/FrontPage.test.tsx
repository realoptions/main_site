import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import FrontPage from './FrontPage'
import { MemoryRouter } from 'react-router-dom'

it('fully mounts', async () => {
  await waitFor(() => render(
    <MemoryRouter>
      <FrontPage />
    </MemoryRouter>
  )
  )
  expect(screen.getByText('Real Options: Derivatives Modeling as a Service')).toBeDefined()
})
