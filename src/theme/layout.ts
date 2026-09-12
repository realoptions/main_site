/**
 * Named layout scale.
 *
 * Vertical rhythm is taken from antd's own padding tokens (paddingSM / padding /
 * paddingMD / paddingLG / paddingXL) so it tracks the active theme — see
 * `PageSection`, which reads those tokens at render time. The constants below are
 * the handful of page-specific dimensions that have no antd token equivalent, plus
 * the responsive content-width contract shared by every marketing section.
 */

/**
 * Responsive content column width (of 24) used by every page section:
 *   xs  -> 22/24 (~92%)
 *   sm  -> 16/24 (~67%)
 *   xxl -> 12/24 (50%)
 *
 * These are the exact ratios the old hand-rolled
 * `<Col xs={1}/> <Col xs={22}/> <Col xs={1}/>` spacer pattern produced, now
 * expressed once as the content width and centered via `Row justify="center"`.
 */
export const CONTENT_COLS = { xs: 22, sm: 16, xxl: 12 } as const

/** Height of a single carousel slide. */
export const SLIDE_HEIGHT = '50vh'

/** Thin accent rule between the hero and the carousel. */
export const DIVIDER_HEIGHT = 6

/**
 * Aspect ratio of the demo viewport, taken from the phone-shaped 360x740 frame the
 * page used when it was hard-sized. Expressed as a ratio rather than fixed
 * pixels so the frame scales with the column instead of overflowing on mobile.
 */
export const DEMO_ASPECT_RATIO = '360 / 740'

/**
 * Upper bound on the demo frame width. Beyond this the phone-shaped frame stops
 * growing, so it stays a believable device rather than a stretched slab.
 */
export const DEMO_MAX_WIDTH = '420px'
