import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap'
import { connect } from 'react-redux'
import { register } from '../services/auth'
import { loginError, updateLoggingIn, noLoginError } from '../actions/signIn'
import Loading from '../components/Loading'
import { HOME } from '../routes/names'

export const checkIfRegisteringFromMarketplace = (
  isFromMarketPlace,
  isSignedIn,
  freeUsagePlanId
) =>
  isFromMarketPlace &&
  (isSignedIn === undefined || freeUsagePlanId === undefined)

const logInAndGoHome = (
  fn,
  history,
  loginError,
  noLoginError,
  updateLoggingIn
) => {
  const navigate = () => history.push(HOME)
  return e => {
    updateLoggingIn(true)
    fn(e)
      .then(navigate)
      .then(noLoginError)
      .catch(loginError)
      .then(() => updateLoggingIn(false))
  }
}

export const SignIn = ({
  register,
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
  isFromMarketPlace
}) =>
  checkIfRegisteringFromMarketplace(
    isFromMarketPlace,
    isSignedIn,
    freeUsagePlanId
  ) ? (
    <Loading />
  ) : (
    <Form
      onSubmit={logInAndGoHome(
        register({
          paidUsagePlanId,
          freeUsagePlanId,
          token,
          isFromMarketPlace
        }),
        history,
        loginError,
        noLoginError,
        updateLoggingIn
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
  register: PropTypes.func.isRequired,
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
  isFromMarketPlace: PropTypes.bool.isRequired
}
const getForm = fn => aggr => e => {
  e.preventDefault()
  const [{ value: email }, { value: password }] = e.target
  return fn(aggr)(email, password)
}
const mapDispatchToProps = dispatch => ({
  register: getForm(register(dispatch)),
  loginError: loginError(dispatch),
  noLoginError: noLoginError(dispatch),
  updateLoggingIn: isLoggingIn => updateLoggingIn(dispatch, isLoggingIn)
})
const mapStateToProps = ({
  loading: { isLoggingIn },
  auth: { token, paidUsagePlanId, isFromMarketPlace, isSignedIn },
  errors: { loginError: error },
  catalog: {
    free: { id: freeUsagePlanId }
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
