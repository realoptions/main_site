import { Col, Row, Typography, theme, Carousel, Divider } from 'antd';
import { DEVELOPERS, RAPIDAPI } from '../routes/names'
const githubUrl = 'https://github.com/realoptions'
const documentationUrl =
  'https://github.com/realoptions/option_price_faas/raw/master/techdoc/OptionCalculation.pdf'

const PADDING = 20
const VIEW_BOX = "0 0 90 18"
const OVERLAY_COLOR = "rgba(255, 255, 255, 0.5)"
const { Title, Text } = Typography;
const TEXT_STYLE = { color: "white", fontSize: "1.5em" }
const TITLE_STYLE = { color: "white", fontSize: "5em" }
export default () => {
  const {
    token: { colorPrimary, colorLink },
  } = theme.useToken();
  const contentStyle = {
    height: '50vh',
    background: colorPrimary,
    margin: 0,
    paddingTop: PADDING,
    color: "white"
  }
  return <>
    <div style={{ background: colorPrimary, paddingTop: PADDING, paddingBottom: PADDING }}>
      <Row>
        <Col xs={1} sm={4} xxl={6}></Col>
        <Col xs={22} sm={16} xxl={12}>
          <Title style={TITLE_STYLE}>Real Options: Derivatives Modeling as a Service</Title>
          <Text style={TEXT_STYLE} >
            For decades, the same financial models have been programmed and
            re-programmed at every bank. We are changing that. Combining
            state-of-the-art modeling with modern REST APIs, our models as a service
            provides robust, scalable infrastructure.  Our products compute call and put prices, Black Scholes
            implied volatilities, value at risk, densities, and expected shortfall
            for three cutting edge models.
          </Text>
        </Col>
        <Col xs={1} sm={4} xxl={6}></Col>
      </Row>
    </div >
    <div style={{ background: colorLink, height: "6px", width: "100vw" }} />
    <Carousel autoplay style={{ paddingTop: 0, marginTop: 0 }} autoplaySpeed={5000}>
      <div>
        <div style={contentStyle}>
          <Row>
            <Col xs={1} sm={4} xxl={6}></Col>
            <Col xs={22} sm={16} xxl={12} >
              <svg viewBox={VIEW_BOX} fill={OVERLAY_COLOR} >
                <text x="50%" y="15" text-anchor="middle">Cutting Edge</text>
              </svg>
              <Text style={TEXT_STYLE} >
                Heston, Extended Merton Jump-Diffusion, and Extended CGMY! Each model
                includes a diffusion component which is correlated with a stochastic
                clock. Incorporates skew, excess kurtosis, leverage effect, and
                stochastic volatility!
              </Text>
            </Col>
            <Col xs={1} sm={4} xxl={6}></Col>
          </Row>
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <Row>
            <Col xs={1} sm={4} xxl={6}></Col>
            <Col xs={22} sm={16} xxl={12}>
              <svg viewBox={VIEW_BOX} fill={OVERLAY_COLOR}  >
                <text x="50%" y="15" text-anchor="middle">Easy to Use</text>
              </svg>
              <Text style={TEXT_STYLE} >
                Head over to the <a href={DEVELOPERS}>developer</a> section to start
                pricing options! After that, head over to the{' '}
                <a href={RAPIDAPI}>api portal</a> to purchase a plan.
              </Text>
            </Col>
            <Col xs={1} sm={4} xxl={6}></Col>
          </Row>
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <Row>
            <Col xs={1} sm={4} xxl={6}></Col>
            <Col xs={22} sm={16} xxl={12}>
              <svg viewBox={VIEW_BOX} fill={OVERLAY_COLOR}   >
                <text x="50%" y="15" text-anchor="middle">Tested</text>
              </svg>
              <Text style={TEXT_STYLE} >
                We extensively test our projects for accuracy.{' '}
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  All our code is open source
                </a>{' '}
                so you can review the code yourself!
              </Text>
            </Col>
            <Col xs={1} sm={4} xxl={6}></Col>
          </Row>
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <Row>
            <Col xs={1} sm={4} xxl={6}></Col>
            <Col xs={22} sm={16} xxl={12}>
              <svg viewBox={VIEW_BOX} fill={OVERLAY_COLOR}   >
                <text x="50%" y="15" text-anchor="middle">Documented</text>
              </svg>
              <Text style={TEXT_STYLE} >
                No option models are complete without documentation! We provide
                comprehensive{' '}
                <a href={documentationUrl} target="_blank" rel="noopener noreferrer">
                  documentation
                </a>{' '}
                for the model theory and assumptions.
              </Text>
            </Col>
            <Col xs={1} sm={4} xxl={6}></Col>
          </Row>
        </div>
      </div>
    </Carousel>
  </>

}
