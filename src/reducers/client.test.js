import client from './client'
import { UPDATE_AWS_CLIENT, LOGOUT } from '../actions/constants'

it('returns obj default', () => {
  const state = client(undefined, { type: 'hello' })
  expect(state).toEqual({})
})
it('returns client', () => {
  const state = client(undefined, {
    type: UPDATE_AWS_CLIENT,
    client: { hello: 'world' }
  })
  expect(state).toEqual({ hello: 'world' })
})
it('returns obj when logout', () => {
  const state = client({ hello: 'world' }, { type: LOGOUT })
  expect(state).toEqual({})
})
