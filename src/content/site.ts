import { DEVELOPERS, RAPIDAPI } from '../routes/names'

/**
 * All marketing copy for the front page, in one module.
 *
 * Layout components render this data; they must not carry copy of their own. To
 * change what the site *says*, edit this file. To change how it *looks*, edit
 * `src/components/PageSection.tsx` / `src/pages/FrontPage.tsx`.
 *
 * Inline links are referenced from the prose with a `{placeholder}` token and
 * resolved against `SITE_LINKS`, so link targets stay data rather than being
 * hard-coded into JSX. See `src/components/LinkedText.tsx` for the renderer.
 */

/** Named link targets that copy may reference as `{key}`. */
export const SITE_LINKS = {
  developers: { href: DEVELOPERS, label: 'developer' },
  apiPortal: {
    href: RAPIDAPI,
    label: 'api portal',
  },
  openSource: {
    href: 'https://github.com/realoptions',
    label: 'All our code is open source',
  },
  documentation: {
    href: 'https://github.com/realoptions/option_price_faas/raw/master/techdoc/OptionCalculation.pdf',
    label: 'documentation',
  },
} as const

export type SiteLinkKey = keyof typeof SITE_LINKS

export interface SlideContent {
  /** Large overlay word rendered behind the body. */
  caption: string
  /** Body prose; may contain `{linkKey}` placeholders. */
  body: string
}

export const HERO_CONTENT = {
  title: 'Real Options: Derivatives Modeling as a Service',
  body: 'For decades, the same financial models have been programmed and re-programmed at every bank. We are changing that. Combining state-of-the-art modeling with modern REST APIs, our models as a service provides robust, scalable infrastructure. Our products compute call and put prices, Black Scholes implied volatilities, value at risk, densities, and expected shortfall for three cutting edge models.',
} as const

export const SLIDES: SlideContent[] = [
  {
    caption: 'Cutting Edge',
    body: 'Heston, Extended Merton Jump-Diffusion, and Extended CGMY! Each model includes a diffusion component which is correlated with a stochastic clock. Incorporates skew, excess kurtosis, leverage effect, and stochastic volatility!',
  },
  {
    caption: 'Easy to Use',
    body: 'Head over to the {developers} section to start pricing options! After that, head over to the {apiPortal} to purchase a plan.',
  },
  {
    caption: 'Tested',
    body: 'We extensively test our projects for accuracy. {openSource} so you can review the code yourself!',
  },
  {
    caption: 'Documented',
    body: 'No option models are complete without documentation! We provide comprehensive {documentation} for the model theory and assumptions.',
  },
]

/** Copy for the demo page, including the fallback shown if the frame won't load. */
export const DEMO_CONTENT = {
  /** Embedded app. Kept here so the page has no hard-coded target either. */
  href: 'https://demo.finside.org',
  /** Rendered as the iframe `title` (required for screen readers). */
  title: 'finside.org interactive options pricing demo',
  /** Always-visible caption under the frame. */
  caption:
    'Interactive demo: price options across all three models in your browser.',
  /** Shown if the embedded frame fails to load. */
  loadFailureMessage:
    "The embedded demo didn't load. It may be blocked by your browser, a content blocker, or a network problem.",
  openDirectLabel: 'Open the demo in a new tab',
} as const
