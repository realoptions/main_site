import apiKey from './apiKey'
import { UPDATE_API_KEY } from '../actions/constants'

it('sets apiKey to empty string when no state', () => {
  const state = apiKey(undefined, { type: 'test' })
  expect(state).toEqual('')
})
it('sets apiKey to string when action provided and no state', () => {
  const state = apiKey(undefined, { type: UPDATE_API_KEY, value: 'hello' })
  expect(state).toEqual('hello')
})
it('sets apiKey to existing string when state but no action', () => {
  const state = apiKey('hello', { type: 'test' })
  expect(state).toEqual('hello')
})
it('sets apiKey to string when action provided and existing state', () => {
  const state = apiKey('goodbye', { type: UPDATE_API_KEY, value: 'hello' })
  expect(state).toEqual('hello')
})
