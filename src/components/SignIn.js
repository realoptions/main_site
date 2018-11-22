import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap'
import { connect } from 'react-redux'
import { register } from '../services/auth'
import { loginError, updateLoggingIn, noLoginError } from '../actions/signIn'
import Loading from '../components/Loading'
import { HOME, SUCCESS_MARKETPLACE } from '../routes/names'
import { Redirect } from 'react-router-dom'
import { updateSignIn } from '../actions/signIn'
import { addSubscriptionLocal } from '../actions/subscriptions'

export const checkIfRegisteringFromMarketplace = (
  isFromMarketPlace,
  isSignedIn,
  freeUsagePlanId
) =>
  isFromMarketPlace &&
  (isSignedIn === undefined || freeUsagePlanId === undefined)

export const checkIfRegisteredPaid = (isFromMarketPlace, isSignedIn) =>
  isFromMarketPlace && isSignedIn

const logInAndGoHome = ({
  fn,
  history,
  loginError,
  noLoginError,
  isFromMarketPlace,
  updateLoggingIn,
  addSubscription,
  updateSignIn
}) => {
  const navigate = () =>
    history.push(isFromMarketPlace ? SUCCESS_MARKETPLACE : HOME)
  return e => {
    updateLoggingIn(true)
    fn(e)
      .then(([usagePlanId, client, cognitoUser]) =>
        Promise.all([
          navigate(),
          addSubscription(usagePlanId),
          updateSignIn(client, cognitoUser),
          noLoginError()
        ])
      )
      .catch(loginError)
      .then(() => updateLoggingIn(false))
  }
}

export const SignIn = ({
  isLoggingIn,
  history,
  loginError,
  noLoginError,
  error,
  updateLoggingIn,
  isSignedIn,
  token,
  paidUsagePlanId,
  freeUsagePlanId,
  isFromMarketPlace,
  updateSignIn,
  addSubscription
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
      onSubmit={logInAndGoHome({
        fn: getForm(register)({
          paidUsagePlanId,
          freeUsagePlanId,
          token,
          isFromMarketPlace
        }),
        history,
        loginError,
        noLoginError,
        isFromMarketPlace,
        updateLoggingIn,
        updateSignIn,
        addSubscription
      })}
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
  loginError: PropTypes.func.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired
  }),
  updateLoggingIn: PropTypes.func.isRequired,
  token: PropTypes.string,
  paidUsagePlanId: PropTypes.string,
  freeUsagePlanId: PropTypes.string,
  isFromMarketPlace: PropTypes.bool.isRequired,
  updateSignIn: PropTypes.func.isRequired,
  addSubscription: PropTypes.func.isRequired
}
const getForm = fn => aggr => e => {
  e.preventDefault()
  const [{ value: email }, { value: password }] = e.target
  return fn(aggr)(email, password)
}
const mapDispatchToProps = dispatch => ({
  loginError: loginError(dispatch),
  noLoginError: noLoginError(dispatch),
  updateLoggingIn: isLoggingIn => updateLoggingIn(dispatch, isLoggingIn),
  updateSignIn: updateSignIn(dispatch),
  addSubscription: addSubscriptionLocal(dispatch)
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
