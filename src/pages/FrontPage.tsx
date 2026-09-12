import { Typography, theme, Carousel } from 'antd'
import React from 'react'
import PageSection from '../components/PageSection'
import LinkedText from '../components/LinkedText'
import { HERO_CONTENT, SLIDES } from '../content/site'
import { DIVIDER_HEIGHT, SLIDE_HEIGHT } from '../theme/layout'
import { DISPLAY_TYPE, onMarketingBackground } from '../theme/typography'

const { Title, Text } = Typography

const VIEW_BOX = '0 0 90 18'
const OVERLAY_COLOR = 'rgba(255, 255, 255, 0.5)'

/** Slide decoration behind the copy. */
const SlideCaption = ({ children }: { children: string }) => (
  <svg viewBox={VIEW_BOX} fill={OVERLAY_COLOR}>
    <text x="50%" y="15" textAnchor="middle">
      {children}
    </text>
  </svg>
)

export default function FrontPage() {
  const { token } = theme.useToken()
  const foreground = onMarketingBackground(token)

  return (
    <>
      <PageSection background={token.colorPrimary}>
        <Title
          level={1}
          style={{ ...foreground, fontSize: DISPLAY_TYPE.heroTitle }}
        >
          {HERO_CONTENT.title}
        </Title>
        <Text style={{ ...foreground, fontSize: DISPLAY_TYPE.body }}>
          {HERO_CONTENT.body}
        </Text>
      </PageSection>
      <div
        style={{
          background: token.colorLink,
          height: DIVIDER_HEIGHT,
          width: '100vw',
        }}
      />
      <Carousel
        autoplay
        style={{ paddingTop: 0, marginTop: 0 }}
        autoplaySpeed={5000}
      >
        {SLIDES.map((slide) => (
          <PageSection
            key={slide.caption}
            background={token.colorPrimary}
            height={SLIDE_HEIGHT}
          >
            <SlideCaption>{slide.caption}</SlideCaption>
            <Text style={{ ...foreground, fontSize: DISPLAY_TYPE.body }}>
              <LinkedText>{slide.body}</LinkedText>
            </Text>
          </PageSection>
        ))}
      </Carousel>
    </>
  )
}
