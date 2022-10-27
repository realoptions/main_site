import React from 'react'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '../routes/names'
import Jumbotron from '../components/Jumbtron'
const heightStyle = { height: 640 }

export default () => [
  <Jumbotron
    key="top"
    style={heightStyle}
    className="bg-dark light-text no-margin"
  >
    <Container>
      <h1 className="display-3">Derivatives Modeling as a Service</h1>
      <p className="lead">
        For decades, the same financial models have been programmed and
        re-programmed at every bank. We are changing that. Combining
        state-of-the-art modeling with modern REST APIs, our models as a service
        provides robust, scalable infrastructure.
      </p>
    </Container>
  </Jumbotron>,
  <Jumbotron
    key="bottom"
    style={heightStyle}
    fluid
    className="no-margin light-background"
  >
    <Container>
      <h1 className="display-3">Option Pricing Models</h1>
      <p className="lead">
        Our models are the most sophisticated in the industry. Our software
        engineering is top notch.
      </p>
      <ul className="lead">
        <li>Robust Black-Scholes implied volatility</li>
        <li>Option Pricing under extended Merton, Heston, and CGMY</li>
        <li>Greeks</li>
        <li>Value at Risk and Expected Shortfall</li>
      </ul>
      <p className="lead">
        For more information on the models see the{' '}
        <Link to={PRODUCTS}>products page</Link>.
      </p>
    </Container>
  </Jumbotron>,
]
