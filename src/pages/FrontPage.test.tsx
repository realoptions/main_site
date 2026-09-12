import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import FrontPage from './FrontPage'
import { HERO_CONTENT, SLIDES } from '../content/site'

it('fully mounts', async () => {
  await waitFor(() =>
    render(
      <MemoryRouter>
        <FrontPage />
      </MemoryRouter>,
    ),
  )
  expect(screen.getByText(HERO_CONTENT.title)).toBeDefined()
})

it('renders every slide body from the content module', async () => {
  await waitFor(() =>
    render(
      <MemoryRouter>
        <FrontPage />
      </MemoryRouter>,
    ),
  )
  for (const slide of SLIDES) {
    // antd's Carousel keeps duplicate slide nodes around for transitions, so the
    // caption can legitimately appear more than once.
    expect(screen.getAllByText(slide.caption).length).toBeGreaterThan(0)
  }
})
