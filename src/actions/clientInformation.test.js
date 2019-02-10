import { UPDATE_CLIENT_INFORMATION } from './constants'
import { setClientInformation } from './clientInformation'
it('dispatches value', () => {
  const value = 'hello'
  const dispatch = jest.fn()
  setClientInformation(dispatch)(value)
  expect(dispatch.mock.calls.length).toEqual(1)
  expect(dispatch.mock.calls[0][0]).toEqual({
    type: UPDATE_CLIENT_INFORMATION,
    value
  })
})
