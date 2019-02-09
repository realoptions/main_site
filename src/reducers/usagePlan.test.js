import usagePlan from './usagePlan'
import { UPDATE_USAGE_PLAN } from '../actions/constants'

it('sets usageplan to empty string when no state', () => {
  const state = usagePlan(undefined, { type: 'test' })
  expect(state).toEqual('')
})
it('sets usageplan to string when action provided and no state', () => {
  const state = usagePlan(undefined, {
    type: UPDATE_USAGE_PLAN,
    value: 'hello'
  })
  expect(state).toEqual('hello')
})
it('sets usageplan to existing string when state but no action', () => {
  const state = usagePlan('hello', { type: 'test' })
  expect(state).toEqual('hello')
})
it('sets usageplan to string when action provided and existing state', () => {
  const state = usagePlan('goodbye', {
    type: UPDATE_USAGE_PLAN,
    value: 'hello'
  })
  expect(state).toEqual('hello')
})
