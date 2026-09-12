import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Demo from './Demo'
import { DEMO_CONTENT } from '../content/site'

describe('Demo embed accessibility', () => {
  const frame = () => document.querySelector('iframe')

  it('uses an iframe, not <embed>', () => {
    render(<Demo />)
    expect(document.querySelector('embed')).toBeNull()
    expect(frame()).not.toBeNull()
  })

  it('has a non-empty title attribute', () => {
    render(<Demo />)
    const title = frame()?.getAttribute('title')
    expect(title).toBeTruthy()
    expect(title?.trim().length).toBeGreaterThan(0)
    expect(title).toBe(DEMO_CONTENT.title)
  })

  it('defers loading with loading="lazy"', () => {
    render(<Demo />)
    expect(frame()?.getAttribute('loading')).toBe('lazy')
  })

  it('is not hard-sized to the old fixed 360x740', () => {
    const { container } = render(<Demo />)
    // Only width/height *declarations* count as hard-sizing. The aspect-ratio
    // declaration deliberately contains "360 / 740" as a ratio, so matching the
    // bare numbers would flag the responsive container itself.
    const styled = Array.from(
      container.querySelectorAll<HTMLElement>('[style]'),
    )
    const offenders = styled.filter((el) => {
      const s = el.getAttribute('style') ?? ''
      return /(?:^|;)\s*(?:width|height)\s*:\s*[^;]*\b(?:360|740)(?:px)?\b/i.test(
        s,
      )
    })
    expect(offenders).toHaveLength(0)
  })

  it('wraps the frame in a responsive aspect-ratio container', () => {
    const { container } = render(<Demo />)
    const aspectHost = Array.from(
      container.querySelectorAll<HTMLElement>('[style]'),
    ).find((el) => /aspect-ratio/i.test(el.getAttribute('style') ?? ''))
    expect(aspectHost).toBeDefined()
    // The frame fills that box rather than carrying its own fixed size.
    expect(frame()?.getAttribute('style')).toMatch(/width:\s*100%/i)
    expect(frame()?.getAttribute('style')).toMatch(/height:\s*100%/i)
  })

  it('shows a visible caption with a direct link', () => {
    render(<Demo />)
    expect(screen.getByText(DEMO_CONTENT.caption)).toBeDefined()
    const direct = screen.getAllByRole('link', {
      name: DEMO_CONTENT.openDirectLabel,
    })
    expect(direct.length).toBeGreaterThan(0)
    expect(direct[0].getAttribute('href')).toBe(DEMO_CONTENT.href)
  })

  it('surfaces a fallback message when the frame fails to load', () => {
    render(<Demo />)
    expect(screen.queryByText(DEMO_CONTENT.loadFailureMessage)).toBeNull()
    fireEvent.error(frame()!)
    expect(screen.getByText(DEMO_CONTENT.loadFailureMessage)).toBeDefined()
  })
})
