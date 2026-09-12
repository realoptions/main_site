import React from 'react'
import { Col, Row, theme } from 'antd'
import { CONTENT_COLS } from '../theme/layout'

export interface PageSectionProps {
  children: React.ReactNode
  /** Section background — pass a theme token (e.g. `colorPrimary`), not a literal. */
  background?: string
  /** Vertical padding; defaults to the theme's `paddingMD` (20px). */
  paddingY?: React.CSSProperties['padding']
  /** Horizontal padding; defaults to 0, since the grid gutters handle the sides. */
  paddingX?: React.CSSProperties['padding']
  /** Fixed content height, e.g. a carousel slide. */
  height?: React.CSSProperties['height']
  /** Forwarded so wrappers such as antd `Carousel` can attach their own classes. */
  className?: string
  /** Merged last. */
  style?: React.CSSProperties
}

/**
 * The single centered-section primitive for the marketing pages.
 *
 * Renders one responsive content column, centered by the grid rather than by
 * empty spacer columns, and takes its vertical rhythm from the active antd theme
 * tokens. Replaces the `<Col xs={1} sm={4} xxl={6}></Col>` / content /
 * `<Col xs={1} sm={4} xxl={6}></Col>` pattern that was previously copy-pasted
 * into the hero and every carousel slide.
 */
export default function PageSection({
  children,
  background,
  paddingY,
  paddingX = 0,
  height,
  className,
  style,
}: PageSectionProps) {
  const { token } = theme.useToken()
  const y = paddingY ?? token.paddingMD
  return (
    <div
      className={className}
      style={{
        background,
        paddingTop: y,
        paddingBottom: y,
        paddingLeft: paddingX,
        paddingRight: paddingX,
        height,
        ...style,
      }}
    >
      <Row justify="center">
        <Col {...CONTENT_COLS}>{children}</Col>
      </Row>
    </div>
  )
}
