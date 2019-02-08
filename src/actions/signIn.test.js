import {
  UPDATE_AWS_CLIENT,
  LOGOUT,
  IS_LOGGING_IN,
  LOGIN_ERROR,
  UPDATE_API_KEY,
  API_ERROR,
  NO_LOGIN_ERROR
} from './constants'
import {
  updateSignIn,
  updateLogOut,
  loginError,
  noLoginError,
  updateLoggingIn,
  updateApiKey,
  apiError
} from './signIn'

describe('updateSignIn', () => {
  let dispatch
  beforeEach(() => {
    dispatch = jest.fn()
  })
  it('dispatches event when provided a client and user', () => {
    updateSignIn(dispatch)('hello')
    expect(dispatch.mock.calls.length).toEqual(1)
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: UPDATE_AWS_CLIENT,
      //client: 'hello',
      user: 'hello'
    })
  })
})
describe('updateLogOut', () => {
  let dispatch
  beforeEach(() => {
    dispatch = jest.fn()
  })
  it('dispatches event', () => {
    updateLogOut(dispatch)({
      signOut: jest.fn()
    })
    expect(dispatch.mock.calls.length).toEqual(1)
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOGOUT
    })
  })
})
describe('loginError', () => {
  let dispatch
  beforeEach(() => {
    dispatch = jest.fn()
  })
  it('dispatches event with error', () => {
    loginError(dispatch)('error')
    expect(dispatch.mock.calls.length).toEqual(1)
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOGIN_ERROR,
      value: 'error'
    })
  })
})
describe('noLoginError', () => {
  let dispatch
  beforeEach(() => {
    dispatch = jest.fn()
  })
  it('dispatches event', () => {
    noLoginError(dispatch)()
    expect(dispatch.mock.calls.length).toEqual(1)
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: NO_LOGIN_ERROR
    })
  })
})
describe('updateLoggingIn', () => {
  let dispatch
  beforeEach(() => {
    dispatch = jest.fn()
  })
  it('dispatches event with logging in value', () => {
    updateLoggingIn(dispatch)('hello')
    expect(dispatch.mock.calls.length).toEqual(1)
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: IS_LOGGING_IN,
      value: 'hello'
    })
  })
})
describe('updateApiKey', () => {
  let dispatch
  beforeEach(() => {
    dispatch = jest.fn()
  })
  it('dispatches key', () => {
    updateApiKey(dispatch)('hello')
    expect(dispatch.mock.calls.length).toEqual(1)
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: UPDATE_API_KEY,
      value: 'hello'
    })
  })
})
describe('apiError', () => {
  let dispatch
  beforeEach(() => {
    dispatch = jest.fn()
  })
  it('dispatches err', () => {
    apiError(dispatch)('error')
    expect(dispatch.mock.calls.length).toEqual(1)
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: API_ERROR,
      value: 'error'
    })
  })
})
