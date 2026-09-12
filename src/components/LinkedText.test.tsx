import React from 'react'
import { render } from '@testing-library/react'
import LinkedText, { parseLinkedText, unknownPlaceholders } from './LinkedText'

describe('parseLinkedText', () => {
  it('splits plain prose into a single text segment', () => {
    expect(parseLinkedText('no links here')).toEqual([
      { type: 'text', text: 'no links here' },
    ])
  })

  it('resolves a known placeholder to a link segment', () => {
    const segs = parseLinkedText('see {developers} now')
    expect(segs).toHaveLength(3)
    expect(segs[1]).toMatchObject({ type: 'link', key: 'developers' })
  })

  it('keeps surrounding whitespace exactly', () => {
    const segs = parseLinkedText('head over to the {developers} section')
    expect(segs[0]).toEqual({ type: 'text', text: 'head over to the ' })
    expect(segs[2]).toEqual({ type: 'text', text: ' section' })
  })

  it('renders an unknown placeholder literally rather than dropping it', () => {
    const { container } = render(<LinkedText>{'oops {nope} tail'}</LinkedText>)
    expect(container.textContent).toBe('oops {nope} tail')
    expect(container.querySelector('a')).toBeNull()
  })
})

describe('unknownPlaceholders (positive control)', () => {
  it('detects a genuinely unknown key', () => {
    expect(unknownPlaceholders('a {definitelyMissingKey} b')).toEqual([
      '{definitelyMissingKey}',
    ])
  })

  it('is deterministic across repeated calls', () => {
    const input = 'x {alsoMissingOne} y {alsoMissingTwo} z'
    const first = unknownPlaceholders(input)
    const second = unknownPlaceholders(input)
    const third = unknownPlaceholders(input)
    expect(first).toEqual(['{alsoMissingOne}', '{alsoMissingTwo}'])
    expect(second).toEqual(first)
    expect(third).toEqual(first)
  })

  it('reports nothing for copy whose placeholders all resolve', () => {
    expect(unknownPlaceholders('go to {developers} and {apiPortal}')).toEqual(
      [],
    )
  })
})
