import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import {
  GoogleItem,
  handleSocialLogin,
  FacebookItem
} from '../components/SocialSpan'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { DEVELOPERS } from '../routes/names'
import { setApiKey } from '../actions/apiKey'
import { setClientInformation } from '../actions/clientInformation'
import { setUsagePlan } from '../actions/usagePlan'
import PropTypes from 'prop-types'
const padding = { paddingTop: 40, paddingBottom: 20 }
const githubUrl = 'https://github.com/realoptions'
const documentationUrl = `${process.env.PUBLIC_URL}/OptionCalculation.pdf`
const linkStyle = {
  padding: 0,
  margin: 0,
  border: 0,
  display: 'inline',
  verticalAlign: 'inherit'
}
export const Products = ({
  profilePicture,
  setUsagePlan,
  setApiKey,
  setClientInformation
}) => {
  const onLogin = handleSocialLogin({
    setUsagePlan,
    setApiKey,
    setClientInformation
  })
  return (
    <Container>
      <Row key="description">
        <Col xs={12} sm={9} style={padding}>
          <h1 className="display-4">Real Options</h1>
          <p>
            Our flagship project! Computes call and put prices, Black Scholes
            implied volatilities, value at risk, densities, and expected
            shortfall for three cutting edge models.
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={6}>
          <h3>Cutting edge models</h3>
          <p>
            Heston, Extended Merton Jump-Diffusion, and Extended CGMY! Each
            model includes a diffusion component which is correlated with a
            stochastic clock. Incorporates skew, excess kurtosis, leverage
            effect, and stochastic volatility!
          </p>
        </Col>
        <Col xs={12} sm={6}>
          <h3>Easy to use</h3>
          {profilePicture ? (
            <p>
              You are logged in and your API key is ready! Head over to the{' '}
              <Link to={DEVELOPERS}>developer</Link> section to start pricing
              options!
            </p>
          ) : (
            <p>
              Simply log in using{' '}
              <GoogleItem
                onLogin={onLogin}
                render={({ onClick }) => (
                  <Button style={linkStyle} color="link" onClick={onClick}>
                    Google
                  </Button>
                )}
              />{' '}
              or{' '}
              <FacebookItem
                onLogin={onLogin}
                render={({ onClick }) => (
                  <Button style={linkStyle} color="link" onClick={onClick}>
                    Facebook
                  </Button>
                )}
              />{' '}
              to obtain an API key!
            </p>
          )}
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
            <a
              href={documentationUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              documentation
            </a>{' '}
            for the model theory and assumptions.
          </p>
        </Col>
      </Row>
    </Container>
  )
}
Products.propTypes = {
  profilePicture: PropTypes.string.isRequired,
  setUsagePlan: PropTypes.func.isRequired,
  setApiKey: PropTypes.func.isRequired,
  setClientInformation: PropTypes.func.isRequired
}
const mapStateToProps = ({ clientInformation: { profilePicture } }) => ({
  profilePicture
})

const mapDispatchToProps = dispatch => ({
  setApiKey: setApiKey(dispatch),
  setClientInformation: setClientInformation(dispatch),
  setUsagePlan: setUsagePlan(dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products)
