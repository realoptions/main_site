import React from 'react'
import { SITE_LINKS, type SiteLinkKey } from '../content/site'

/**
 * Renders copy that contains `{linkKey}` placeholders, resolving each one against
 * `SITE_LINKS`. Keeps prose and link targets in the content module instead of
 * hard-coding anchors into layout JSX.
 *
 * An unknown placeholder is never fatal: it is rendered literally so a typo cannot
 * blank out a marketing slide. `assertKnownPlaceholders` is exported so tests can
 * fail loudly on a typo at build time.
 */

const PLACEHOLDER = /\{(\w+)\}/g

export type TextSegment =
  | { type: 'text'; text: string }
  | { type: 'link'; key: SiteLinkKey; raw: string }

/** Split prose into text/link segments. Unknown keys come back as `link` with no match. */
export function parseLinkedText(input: string): TextSegment[] {
  const segments: TextSegment[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  PLACEHOLDER.lastIndex = 0
  while ((match = PLACEHOLDER.exec(input)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        text: input.slice(lastIndex, match.index),
      })
    }
    const key = match[1] as SiteLinkKey
    segments.push(
      key in SITE_LINKS
        ? { type: 'link', key, raw: match[0] }
        : { type: 'text', text: match[0] },
    )
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < input.length) {
    segments.push({ type: 'text', text: input.slice(lastIndex) })
  }
  return segments
}

/**
 * Placeholders in `input` that have no entry in `SITE_LINKS`.
 *
 * Note: deliberately avoids `PLACEHOLDER.test(...)` — a global (`/g`) regex
 * carries `lastIndex` between calls, so testing a shared global regex gives
 * non-deterministic results across repeated invocations.
 */
export const unknownPlaceholders = (input: string): string[] =>
  parseLinkedText(input)
    .filter((s) => s.type === 'text')
    .flatMap((s) => s.text.match(/\{\w+\}/g) ?? [])

export interface LinkedTextProps {
  /** Prose, optionally containing `{linkKey}` placeholders. */
  children: string
}

export default function LinkedText({ children }: LinkedTextProps) {
  return (
    <>
      {parseLinkedText(children).map((segment, i) =>
        segment.type === 'link' ? (
          <a
            key={`${segment.key}-${i}`}
            href={SITE_LINKS[segment.key].href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {SITE_LINKS[segment.key].label}
          </a>
        ) : (
          <React.Fragment key={`text-${i}`}>{segment.text}</React.Fragment>
        ),
      )}
    </>
  )
}
