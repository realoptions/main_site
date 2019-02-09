import { UPDATE_PROFILE_PICTURE } from './constants'
import { setProfilePicture } from './profilePicture'
it('dispatches value', () => {
  const value = 'hello'
  const dispatch = jest.fn()
  setProfilePicture(dispatch)(value)
  expect(dispatch.mock.calls.length).toEqual(1)
  expect(dispatch.mock.calls[0][0]).toEqual({
    type: UPDATE_PROFILE_PICTURE,
    value
  })
})
