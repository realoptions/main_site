import profilePicture from './profilePicture'
import { UPDATE_PROFILE_PICTURE } from '../actions/constants'

it('sets profilePicture to empty string when no state', () => {
  const state = profilePicture(undefined, { type: 'test' })
  expect(state).toEqual('')
})
it('sets profilePicture to string when action provided and no state', () => {
  const state = profilePicture(undefined, {
    type: UPDATE_PROFILE_PICTURE,
    value: 'hello'
  })
  expect(state).toEqual('hello')
})
it('sets profilePicture to existing string when state but no action', () => {
  const state = profilePicture('hello', { type: 'test' })
  expect(state).toEqual('hello')
})
it('sets profilePicture to string when action provided and existing state', () => {
  const state = profilePicture('goodbye', {
    type: UPDATE_PROFILE_PICTURE,
    value: 'hello'
  })
  expect(state).toEqual('hello')
})
