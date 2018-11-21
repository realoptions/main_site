import auth, { splitHash } from './auth'
import { UPDATE_API_KEY, LOGOUT, UPDATE_AWS_CLIENT } from '../actions/constants'

it('correctly instantiates from market when token and usageplan are provided', () => {
  window.history.replaceState(
    {},
    'Test',
    '/#/test?token=hello&usagePlanId=123fds'
  )
  const state = auth(undefined, { type: 'test' })
  expect(state).toEqual({
    isSignedIn: false,
    token: 'hello',
    paidUsagePlanId: '123fds',
    isFromMarketPlace: true
  })
})
it('correctly does not instantiate from market when token and usageplan are not provided', () => {
  window.history.replaceState({}, 'Test', '/test')
  const state = auth(undefined, { type: 'test' })
  expect(state).toEqual({
    isSignedIn: false,
    token: undefined,
    paidUsagePlanId: undefined,
    isFromMarketPlace: false
  })
})
it('correctly appends api key', () => {
  const state = auth({}, { type: UPDATE_API_KEY, value: 'hello' })
  expect(state).toEqual({
    apiKey: 'hello'
  })
})
it('correctly appends client', () => {
  const state = auth({}, { type: UPDATE_AWS_CLIENT, user: 'hello' })
  expect(state).toEqual({
    isSignedIn: true,
    cognitoUser: 'hello'
  })
})
it('correctly logs out', () => {
  const state = auth({}, { type: LOGOUT })
  expect(state).toEqual({
    isSignedIn: false
  })
})

describe('splitHash', () => {
  it('splits when question mark exists and has text afterwards', () => {
    const testStr = '/hello?goodbye'
    expect(splitHash(testStr)).toEqual('goodbye')
  })
  it('returns empty string when question mark exists but no text afterwards', () => {
    const testStr = '/hello?'
    expect(splitHash(testStr)).toEqual('')
  })
  it('returns empty string when no question mark exists', () => {
    const testStr = '/hello'
    expect(splitHash(testStr)).toEqual('')
  })
})
