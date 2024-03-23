import { Col, Row, Typography, theme, Carousel } from 'antd';
import { DEVELOPERS, RAPIDAPI } from '../routes/names'
const githubUrl = 'https://github.com/realoptions'
const documentationUrl =
  'https://github.com/realoptions/option_price_faas/raw/master/techdoc/OptionCalculation.pdf'

//const colorStyle = { backgroundColor: blue.primary }
const { Title, Text } = Typography;
const TEXT_STYLE = { color: "white" }
const TITLE_TEXT_STYLE: React.CSSProperties = {
  color: "rgba(255, 255, 255, 0.5)",
  fontSize: "11cqw",
  textAlign: "center"
}
export default () => {
  const {
    token: { colorPrimary, },
  } = theme.useToken();
  const contentStyle = {
    height: '50vh',
    background: colorPrimary,
    margin: 0,
    color: "white"
  }
  return <>
    <div style={{ background: colorPrimary, paddingTop: "48px", paddingBottom: "0px" }}>
      <Row>
        <Col xs={1} sm={4} xxl={6}></Col>
        <Col xs={22} sm={16} xxl={12}>
          <Title style={TEXT_STYLE}>Real Options: Derivatives Modeling as a Service</Title>
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
    <Carousel autoplay style={{ paddingTop: 0, marginTop: 0 }} autoplaySpeed={5000}>
      <div>
        <div style={contentStyle}>
          <Row>
            <Col xs={1} sm={4} xxl={6}></Col>
            <Col xs={22} sm={16} xxl={12}>
              <Title level={2} style={TITLE_TEXT_STYLE}>Cutting Edge</Title>
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
              <Title level={2} style={TITLE_TEXT_STYLE}>Easy to Use</Title>
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
              <Title level={2} style={TITLE_TEXT_STYLE}>Tested</Title>
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
              <Title level={2} style={TITLE_TEXT_STYLE}>Documented</Title>
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
