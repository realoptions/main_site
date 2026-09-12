import { describe, expect, it } from 'vitest'
import {
  NAV_ITEMS,
  resolveNavAction,
  toMenuItems,
  toRouteObjects,
} from './config'
import { DEMO, DEVELOPERS, HOME } from './names'

describe('toRouteObjects', () => {
  const routes = toRouteObjects()

  it('never declares an external URL as a route path', () => {
    for (const route of routes) {
      const path = route.path ?? ''
      expect(path).not.toMatch(/^https?:\/\//)
      expect(path).not.toContain('http')
    }
  })

  it('excludes the external entry from the router entirely', () => {
    expect(
      routes.some((route) => (route.path ?? '').includes('developer')),
    ).toBe(false)
    // Two internal destinations only: Home and Demo.
    expect(routes).toHaveLength(2)
  })

  it('declares Home as an index route rather than path: ""', () => {
    const indexRoute = routes.find((route) => 'index' in route && route.index)
    expect(indexRoute).toBeDefined()
    expect(indexRoute?.path).toBeUndefined()
    // And no route is declared with the empty-string path HOME used to produce.
    expect(routes.some((route) => route.path === HOME)).toBe(false)
  })

  it('routes Demo at its own path', () => {
    expect(routes.some((route) => route.path === DEMO)).toBe(true)
  })
})

describe('toMenuItems', () => {
  it('renders every nav entry, including the external one', () => {
    const items = toMenuItems() as Array<{ key: string; label: string }>
    expect(items.map((i) => i.label)).toEqual(['Home', 'Developers', 'Demo'])
  })

  it('does not leak the external URL into the menu key', () => {
    const items = toMenuItems() as Array<{ key: string }>
    expect(items.some((i) => i.key.includes('http'))).toBe(false)
  })
})

describe('resolveNavAction', () => {
  it('routes Home internally to the app root', () => {
    expect(resolveNavAction(HOME)).toEqual({ kind: 'navigate', path: '/' })
  })

  it('routes Demo internally to /demo', () => {
    expect(resolveNavAction(DEMO)).toEqual({ kind: 'navigate', path: '/demo' })
  })

  it('opens Developers as an external destination', () => {
    expect(resolveNavAction('developers')).toEqual({
      kind: 'open-external',
      href: DEVELOPERS,
    })
  })

  it('does nothing for an unknown key', () => {
    expect(resolveNavAction('no-such-key')).toBeUndefined()
  })

  it('decides from the config kind, not by sniffing the key shape', () => {
    // A key that looks like a URL is NOT treated as external unless the config
    // declares that entry as `external`.
    const items = [
      { kind: 'internal', key: 'https://not-really', label: 'x' },
    ] as unknown as typeof NAV_ITEMS
    expect(resolveNavAction('https://not-really', items)).toEqual({
      kind: 'navigate',
      path: '/https://not-really',
    })
    // ...while a bare non-URL key declared `external` IS external.
    const alsoExternal = [
      { kind: 'external', key: 'docs', label: 'Docs', href: 'https://d.org' },
    ] as unknown as typeof NAV_ITEMS
    expect(resolveNavAction('docs', alsoExternal)).toEqual({
      kind: 'open-external',
      href: 'https://d.org',
    })
  })
})
