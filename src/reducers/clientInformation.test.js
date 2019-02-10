import clientInformation from './clientInformation'
import { UPDATE_CLIENT_INFORMATION } from '../actions/constants'
const defaultClient = {
  email: '',
  profilePicture: '',
  token: '',
  provider: ''
}
it('sets information to default object when no state', () => {
  const state = clientInformation(undefined, { type: 'test' })
  expect(state).toEqual(defaultClient)
})
it('sets information to updated object when action provided and no state', () => {
  const state = clientInformation(undefined, {
    type: UPDATE_CLIENT_INFORMATION,
    value: { email: 'hello' }
  })
  expect(state).toEqual({
    email: 'hello',
    profilePicture: '',
    token: '',
    provider: ''
  })
})
it('sets information to existing object when state but no action', () => {
  const existing = {
    email: 'hello',
    profilePicture: '',
    token: '',
    provider: ''
  }
  const state = clientInformation(existing, { type: 'test' })
  expect(state).toEqual(existing)
})
it('updates information when action provided and existing state', () => {
  const existing = {
    email: 'goodbye',
    profilePicture: '',
    token: '',
    provider: ''
  }
  const state = clientInformation(existing, {
    type: UPDATE_CLIENT_INFORMATION,
    value: { email: 'hello' }
  })
  expect(state).toEqual({
    email: 'hello',
    profilePicture: '',
    token: '',
    provider: ''
  })
})
