import { UPDATE_API_KEY } from './constants'
import { setApiKey } from './apiKey'
it('dispatches value', () => {
  const value = 'hello'
  const dispatch = jest.fn()
  setApiKey(dispatch)(value)
  expect(dispatch.mock.calls.length).toEqual(1)
  expect(dispatch.mock.calls[0][0]).toEqual({
    type: UPDATE_API_KEY,
    value
  })
})
