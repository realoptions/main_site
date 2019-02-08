import {
  UPDATE_AWS_CLIENT,
  LOGOUT,
  IS_LOGGING_IN,
  LOGIN_ERROR,
  UPDATE_API_KEY,
  API_ERROR,
  NO_API_ERROR,
  NO_LOGIN_ERROR
} from './constants'
import { logout } from '../services/auth'

export const updateSignIn = dispatch => user =>
  dispatch({
    type: UPDATE_AWS_CLIENT,
    //client,
    user
  })

export const updateLogOut = dispatch => user => {
  logout(user)
  dispatch({ type: LOGOUT })
}

export const loginError = dispatch => err =>
  dispatch({
    type: LOGIN_ERROR,
    value: err
  })
export const noLoginError = dispatch => () =>
  dispatch({
    type: NO_LOGIN_ERROR
  })

export const updateLoggingIn = dispatch => value =>
  dispatch({
    type: IS_LOGGING_IN,
    value
  })

export const updateApiKey = dispatch => value =>
  dispatch({ type: UPDATE_API_KEY, value })

export const apiError = dispatch => err =>
  dispatch({ type: API_ERROR, value: err })

export const noApiError = dispatch => () => dispatch({ type: NO_API_ERROR })
