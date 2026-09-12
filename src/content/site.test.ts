import { readFileSync } from 'fs'
import { resolve } from 'path'
import { HERO_CONTENT, SITE_LINKS, SLIDES } from './site'
import { unknownPlaceholders } from '../components/LinkedText'

const allCopy = [
  HERO_CONTENT.title,
  HERO_CONTENT.body,
  ...SLIDES.map((s) => s.body),
]

describe('content module integrity', () => {
  it('has no unresolved {placeholder} tokens in any copy', () => {
    const bad = allCopy
      .map((text) => unknownPlaceholders(text))
      .filter((list) => list.length > 0)
    expect(bad).toEqual([])
  })

  it('every referenced link has an href and a label', () => {
    for (const [key, link] of Object.entries(SITE_LINKS)) {
      expect(link.href, key).toMatch(/^https?:\/\//)
      expect(link.label.trim().length, key).toBeGreaterThan(0)
    }
  })

  it('ships the expected slide set', () => {
    expect(SLIDES.map((s) => s.caption)).toEqual([
      'Cutting Edge',
      'Easy to Use',
      'Tested',
      'Documented',
    ])
  })
})

describe('copy is not duplicated in layout JSX', () => {
  const frontPage = readFileSync(
    resolve(__dirname, '../pages/FrontPage.tsx'),
    'utf8',
  )

  it.each([
    'For decades',
    'Heston',
    'stochastic volatility',
    'open source',
    'model theory and assumptions',
  ])('layout does not hard-code prose: %s', (fragment) => {
    expect(frontPage).not.toContain(fragment)
  })
})
