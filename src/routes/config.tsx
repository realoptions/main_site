import React from 'react'
import type { MenuProps } from 'antd'
import type { RouteObject } from 'react-router'
import FrontPage from '../pages/FrontPage'
import Demo from '../pages/Demo'
import { DEMO, DEVELOPERS, HOME } from './names'

/**
 * Single source of truth for navigation.
 *
 * Every entry is exactly one of two kinds, and the kind — never a guess about the
 * key's shape — decides how the entry is wired up:
 *
 *   - `internal` entries become BOTH a menu item and a router child route.
 *   - `external` entries become a menu item only, and are never handed to the
 *     router (previously `DEVELOPERS` produced a route whose path was a literal
 *     `https://…` URL).
 */

/** A destination rendered inside this SPA. */
export interface InternalNavItem {
  kind: 'internal'
  /**
   * Path segment relative to the app root, and the antd menu key.
   * The empty string (`HOME`) is special-cased into a real `index` route rather
   * than being emitted as `path: ''`.
   */
  key: string
  label: string
  element: React.ReactElement
}

/** A destination outside this SPA. */
export interface ExternalNavItem {
  kind: 'external'
  /**
   * Stable antd menu key. Deliberately NOT the URL, so the key no longer doubles
   * as a half-typed destination.
   */
  key: string
  label: string
  href: string
}

export type NavItem = InternalNavItem | ExternalNavItem

export const NAV_ITEMS: NavItem[] = [
  { kind: 'internal', key: HOME, label: 'Home', element: <FrontPage /> },
  {
    kind: 'external',
    key: 'developers',
    label: 'Developers',
    href: DEVELOPERS,
  },
  { kind: 'internal', key: DEMO, label: 'Demo', element: <Demo /> },
]

/** What the menu should do when an entry is clicked. */
export type NavAction =
  | { readonly kind: 'navigate'; readonly path: string }
  | { readonly kind: 'open-external'; readonly href: string }

const isInternal = (item: NavItem): item is InternalNavItem =>
  item.kind === 'internal'

/**
 * antd `Menu` items derived from the nav config.
 *
 * Uses antd's own `MenuProps['items']` type rather than a hand-rolled mirror of
 * it, so the menu typing cannot drift from the library.
 */
export const toMenuItems = (items: NavItem[] = NAV_ITEMS): MenuProps['items'] =>
  items.map(({ key, label }) => ({ key, label }))

/**
 * Router children derived from the nav config.
 *
 * Only `internal` entries are emitted, so an external URL can never become a
 * route path. `HOME` becomes an `index` route.
 */
export const toRouteObjects = (items: NavItem[] = NAV_ITEMS): RouteObject[] =>
  items
    .filter(isInternal)
    .map((item) =>
      item.key === ''
        ? { index: true, element: item.element }
        : { path: item.key, element: item.element },
    )

/**
 * Resolve what a clicked menu key should do.
 *
 * Returned as a plain value instead of being performed here so the routing
 * decision is a pure function of the config, and is directly unit-testable.
 */
export const resolveNavAction = (
  key: string,
  items: NavItem[] = NAV_ITEMS,
): NavAction | undefined => {
  const item = items.find((candidate) => candidate.key === key)
  if (!item) return undefined
  if (item.kind === 'external') {
    return { kind: 'open-external', href: item.href }
  }
  return { kind: 'navigate', path: item.key === '' ? '/' : `/${item.key}` }
}
