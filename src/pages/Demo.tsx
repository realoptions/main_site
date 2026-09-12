import React from 'react'
import { Alert, Typography, theme } from 'antd'
import PageSection from '../components/PageSection'
import { DEMO_ASPECT_RATIO, DEMO_MAX_WIDTH } from '../theme/layout'
import { DEMO_CONTENT } from '../content/site'

/**
 * Demo page.
 *
 * Previously an `<embed>` hard-sized to 360x740 with no title, no lazy loading
 * and no fallback — unreadable to screen readers, overflowing on narrow screens,
 * and leaving a blank box if the frame failed. Now a lazy iframe inside a
 * responsive aspect-ratio container, with a caption that is always visible and a
 * direct link that is offered as a fallback in both states.
 */
export default function Demo() {
  const { token } = theme.useToken()
  const [failed, setFailed] = React.useState(false)
  const frameRef = React.useRef<HTMLIFrameElement>(null)

  // Bound imperatively rather than via React's onError prop: the `error` event on
  // an <iframe> does not bubble, so the prop is unreliable. A direct listener on
  // the node fires when the frame cannot load.
  //
  // Note: cross-origin frames do not surface every failure as an `error` event,
  // so the always-visible caption + direct link below is the primary fallback;
  // this Alert is opportunistic.
  React.useEffect(() => {
    const node = frameRef.current
    if (!node) return
    const onError = () => setFailed(true)
    node.addEventListener('error', onError)
    return () => node.removeEventListener('error', onError)
  }, [])

  return (
    <PageSection>
      <figure
        style={{
          margin: 0,
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: DEMO_MAX_WIDTH,
        }}
      >
        {failed && (
          <Alert
            type="warning"
            showIcon
            style={{ marginBottom: token.marginSM }}
            message={DEMO_CONTENT.loadFailureMessage}
            action={
              <a
                href={DEMO_CONTENT.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {DEMO_CONTENT.openDirectLabel}
              </a>
            }
          />
        )}
        <div
          style={{
            width: '100%',
            aspectRatio: DEMO_ASPECT_RATIO,
            border: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
            borderRadius: token.borderRadiusLG,
            overflow: 'hidden',
            background: token.colorBgContainer,
          }}
        >
          <iframe
            ref={frameRef}
            src={DEMO_CONTENT.href}
            title={DEMO_CONTENT.title}
            loading="lazy"
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              border: 0,
            }}
          />
        </div>
        <figcaption style={{ marginTop: token.marginXS }}>
          <Typography.Text type="secondary">
            {DEMO_CONTENT.caption}{' '}
          </Typography.Text>
          <a href={DEMO_CONTENT.href} target="_blank" rel="noopener noreferrer">
            {DEMO_CONTENT.openDirectLabel}
          </a>
        </figcaption>
      </figure>
    </PageSection>
  )
}
