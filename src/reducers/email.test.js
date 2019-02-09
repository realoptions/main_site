import email from './email'
import { UPDATE_EMAIL } from '../actions/constants'

it('sets email to empty string when no state', () => {
  const state = email(undefined, { type: 'test' })
  expect(state).toEqual('')
})
it('sets email to string when action provided and no state', () => {
  const state = email(undefined, { type: UPDATE_EMAIL, value: 'hello' })
  expect(state).toEqual('hello')
})
it('sets email to existing string when state but no action', () => {
  const state = email('hello', { type: 'test' })
  expect(state).toEqual('hello')
})
it('sets email to string when action provided and existing state', () => {
  const state = email('goodbye', { type: UPDATE_EMAIL, value: 'hello' })
  expect(state).toEqual('hello')
})
