import { UPDATE_USAGE_PLAN } from './constants'
import { setUsagePlan } from './usagePlan'
describe('setUsagePlan', () => {
  it('dispatches value', () => {
    const value = 'hello'
    const dispatch = jest.fn()
    setUsagePlan(dispatch)(value)
    expect(dispatch.mock.calls.length).toEqual(1)
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: UPDATE_USAGE_PLAN,
      value
    })
  })
})
