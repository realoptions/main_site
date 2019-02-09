import { UPDATE_EMAIL } from './constants'
import { setEmail } from './email'
it('dispatches value', () => {
  const value = 'hello'
  const dispatch = jest.fn()
  setEmail(dispatch)(value)
  expect(dispatch.mock.calls.length).toEqual(1)
  expect(dispatch.mock.calls[0][0]).toEqual({
    type: UPDATE_EMAIL,
    value
  })
})
