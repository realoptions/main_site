import type { GlobalToken } from 'antd'

/**
 * Display type scale for the marketing pages.
 *
 * These are the sizes that used to be inlined on the front page as magic em
 * values (`TITLE_STYLE = 5em`, `TEXT_STYLE = 1.5em`), interleaved with layout
 * markup. They live here so the display scale has one home and can be retuned
 * without opening a component — and so components can carry semantic heading
 * levels at the same time.
 *
 * Values are kept deliberately equal to the previous rendering so this is a
 * mechanism change, not a redesign. Nothing in `index.html` or the global CSS
 * sets a root font size, so `em` resolved against the browser default 16px:
 *   5em   -> 80px
 *   1.5em -> 24px
 */
export const DISPLAY_TYPE = {
  /** Marketing hero headline. Was `5em` (= 80px). */
  heroTitle: 80,
  /** Hero / slide body copy. Was `1.5em` (= 24px). */
  body: 24,
} as const

/**
 * Foreground colour for copy sitting on the primary (dark) marketing background.
 * Read from the theme rather than hard-coding the string `"white"`.
 */
export const onMarketingBackground = (token: GlobalToken) => ({
  color: token.colorWhite,
})
