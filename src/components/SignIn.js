import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap'
import { connect } from 'react-redux'
import { register } from '../services/auth'
import Loading from '../components/Loading'
import { HOME, SUCCESS_MARKETPLACE } from '../routes/names'
import { Redirect } from 'react-router-dom'
import { onLogIn } from '../actions/subscriptions'

export const checkIfRegisteringFromMarketplace = (
  isFromMarketPlace,
  isSignedIn,
  freeUsagePlanId
) =>
  isFromMarketPlace && (isSignedIn === false || freeUsagePlanId === undefined)

export const checkIfRegisteredPaid = (isFromMarketPlace, isSignedIn) =>
  isFromMarketPlace && isSignedIn

export const SignIn = ({
  isLoggingIn,
  history,
  error,
  isSignedIn,
  token,
  paidUsagePlanId,
  freeUsagePlanId,
  isFromMarketPlace,
  onLogIn
}) =>
  checkIfRegisteringFromMarketplace(
    isFromMarketPlace,
    isSignedIn,
    freeUsagePlanId
  ) ? (
    <Loading />
  ) : checkIfRegisteredPaid(isFromMarketPlace, isSignedIn) ? (
    <Redirect to={SUCCESS_MARKETPLACE} />
  ) : (
    <Form
      onSubmit={onLogIn(
        getForm(register)({
          paidUsagePlanId,
          freeUsagePlanId,
          token,
          isFromMarketPlace
        }),
        () => history.push(isFromMarketPlace ? SUCCESS_MARKETPLACE : HOME)
      )}
    >
      {error && <Alert color="danger">{error.message}</Alert>}
      <FormGroup>
        <Label for="emailId">Email</Label>
        <Input autoFocus type="email" name="email" id="emailId" />
      </FormGroup>
      <FormGroup>
        <Label for="passwordId">Password</Label>
        <Input type="password" name="password" id="passwordId" />
      </FormGroup>
      {isLoggingIn ? (
        <Loading />
      ) : (
        <Button color="primary" className="login-form-button">
          Register/Log In
        </Button>
      )}
    </Form>
  )
SignIn.propTypes = {
  isLoggingIn: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired
  }).isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired
  }),
  token: PropTypes.string,
  paidUsagePlanId: PropTypes.string,
  freeUsagePlanId: PropTypes.string,
  isFromMarketPlace: PropTypes.bool.isRequired,
  onLogIn: PropTypes.func.isRequired
}
//exported for testing
export const getForm = fn => aggr => e => {
  e.preventDefault()
  const [{ value: email }, { value: password }] = e.target
  return fn(aggr)(email, password)
}
const mapDispatchToProps = dispatch => ({
  onLogIn: onLogIn(dispatch)
})
const mapStateToProps = ({
  loading: { isLoggingIn },
  auth: { token, isFromMarketPlace, isSignedIn },
  errors: { loginError: error },
  catalog: {
    free: { id: freeUsagePlanId },
    paid: { id: paidUsagePlanId }
  }
}) => ({
  isLoggingIn,
  error,
  token,
  paidUsagePlanId,
  freeUsagePlanId,
  isFromMarketPlace,
  isSignedIn
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn)
