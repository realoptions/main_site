import errors from './errors'
import {
  NO_SUBSCRIPTION_ERROR,
  SUBSCRIPTION_ERROR,
  LOGIN_ERROR,
  NO_LOGIN_ERROR,
  API_ERROR,
  NO_API_ERROR
} from '../actions/constants'
import { subscribeError, noSubscribeError } from '../actions/subscriptions'
import {
  loginError,
  noLoginError,
  apiError,
  noApiError
} from '../actions/signIn'
describe('unit tests', () => {
  it('returns null default', () => {
    const state = errors(undefined, { type: 'hello' })
    expect(state).toEqual({
      subscriptionError: null,
      loginError: null,
      apiError: null
    })
  })
  it('returns error when subscription error event is passed', () => {
    const state = errors(undefined, {
      type: SUBSCRIPTION_ERROR,
      value: 'error!'
    })
    expect(state).toEqual({
      subscriptionError: 'error!',
      loginError: null,
      apiError: null
    })
  })
  it('returns null when subscription error and then not', () => {
    const state = errors(
      {
        subscriptionError: 'error!',
        loginError: null,
        apiError: null
      },
      { type: NO_SUBSCRIPTION_ERROR }
    )
    expect(state).toEqual({
      subscriptionError: null,
      loginError: null,
      apiError: null
    })
  })
  it('returns error when login error event is passed', () => {
    const state = errors(undefined, { type: LOGIN_ERROR, value: 'error!' })
    expect(state).toEqual({
      subscriptionError: null,
      loginError: 'error!',
      apiError: null
    })
  })
  it('returns null when login error and then not', () => {
    const state = errors(
      {
        subscriptionError: null,
        loginError: 'error!',
        apiError: null
      },
      { type: NO_LOGIN_ERROR }
    )
    expect(state).toEqual({
      subscriptionError: null,
      loginError: null,
      apiError: null
    })
  })
  it('returns error when api error event is passed', () => {
    const state = errors(undefined, { type: API_ERROR, value: 'error!' })
    expect(state).toEqual({
      subscriptionError: null,
      loginError: null,
      apiError: 'error!'
    })
  })
  it('returns error when api error event is passed and other errors exist', () => {
    const state = errors(
      {
        subscriptionError: 'err',
        loginError: 'err',
        apiError: null
      },
      { type: API_ERROR, value: 'error!' }
    )
    expect(state).toEqual({
      subscriptionError: 'err',
      loginError: 'err',
      apiError: 'error!'
    })
  })
  it('returns null when api error and then not', () => {
    const state = errors(
      {
        subscriptionError: null,
        loginError: null,
        apiError: 'error!'
      },
      { type: NO_API_ERROR }
    )
    expect(state).toEqual({
      subscriptionError: null,
      loginError: null,
      apiError: null
    })
  })
})
describe('integration tests', () => {
  let dispatch
  beforeEach(() => {
    dispatch = jest.fn()
  })
  it('correctly returns error when subscription error', () => {
    subscribeError(dispatch)('err')
    const action = dispatch.mock.calls[0][0]
    expect(errors(undefined, action)).toEqual({
      subscriptionError: 'err',
      loginError: null,
      apiError: null
    })
  })
  it('correctly resolves error when not subscription error', () => {
    noSubscribeError(dispatch)()
    const action = dispatch.mock.calls[0][0]
    expect(
      errors(
        {
          subscriptionError: 'err',
          loginError: null,
          apiError: null
        },
        action
      )
    ).toEqual({
      subscriptionError: null,
      loginError: null,
      apiError: null
    })
  })
  it('correctly returns error when login error', () => {
    loginError(dispatch)('err')
    const action = dispatch.mock.calls[0][0]
    expect(errors(undefined, action)).toEqual({
      subscriptionError: null,
      loginError: 'err',
      apiError: null
    })
  })
  it('correctly resolves error when not login error', () => {
    noLoginError(dispatch)()
    const action = dispatch.mock.calls[0][0]
    expect(
      errors(
        {
          subscriptionError: null,
          loginError: 'err',
          apiError: null
        },
        action
      )
    ).toEqual({
      subscriptionError: null,
      loginError: null,
      apiError: null
    })
  })
  it('correctly returns error when api error', () => {
    apiError(dispatch)('err')
    const action = dispatch.mock.calls[0][0]
    expect(errors(undefined, action)).toEqual({
      subscriptionError: null,
      loginError: null,
      apiError: 'err'
    })
  })
  it('correctly resolves error when not api error', () => {
    noApiError(dispatch)()
    const action = dispatch.mock.calls[0][0]
    expect(
      errors(
        {
          subscriptionError: null,
          loginError: null,
          apiError: 'err'
        },
        action
      )
    ).toEqual({
      subscriptionError: null,
      loginError: null,
      apiError: null
    })
  })
})
