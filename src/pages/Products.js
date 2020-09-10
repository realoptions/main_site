import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { DEVELOPERS, RAPIDAPI } from '../routes/names'
const padding = { paddingTop: 40, paddingBottom: 20 }
const githubUrl = 'https://github.com/realoptions'
const documentationUrl = `https://github.com/phillyfan1138/fang_oost_cal_charts/raw/master/docs/OptionCalculation.pdf`

export const Products = () => (
  <Container>
    <Row key="description">
      <Col xs={12} sm={9} style={padding}>
        <h1 className="display-4">Real Options</h1>
        <p>
          Our flagship project! Computes call and put prices, Black Scholes
          implied volatilities, value at risk, densities, and expected shortfall
          for three cutting edge models.
        </p>
      </Col>
    </Row>
    <Row>
      <Col xs={12} sm={6}>
        <h3>Cutting edge models</h3>
        <p>
          Heston, Extended Merton Jump-Diffusion, and Extended CGMY! Each model
          includes a diffusion component which is correlated with a stochastic
          clock. Incorporates skew, excess kurtosis, leverage effect, and
          stochastic volatility!
        </p>
      </Col>
      <Col xs={12} sm={6}>
        <h3>Easy to use</h3>
        <p>
          Head over to the <a href={DEVELOPERS}>developer</a> section to start
          pricing options! After that, head over to the{' '}
          <a href={RAPIDAPI}>api portal</a> to purchase a plan.
        </p>
      </Col>
    </Row>
    <Row>
      <Col xs={12} sm={6}>
        <h3>Open and tested</h3>
        <p>
          We extensively test our projects for accuracy.{' '}
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            All our code is open source
          </a>{' '}
          so you can review the code yourself!
        </p>
      </Col>
      <Col xs={12} sm={6}>
        <h3>Documented</h3>
        <p>
          No option models are complete without documentation! We provide
          comprehensive{' '}
          <a href={documentationUrl} target="_blank" rel="noopener noreferrer">
            documentation
          </a>{' '}
          for the model theory and assumptions.
        </p>
      </Col>
    </Row>
  </Container>
)
export default Products
