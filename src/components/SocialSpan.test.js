import * as middleware from '../services/apiMiddleware'
import * as usagePlan from '../services/usagePlan'
import { handleSocialLogin } from './SocialSpan'

describe('handleSocialLogin', () => {
  it('gets results', () => {
    middleware.createApiKeyAndSubscribe = jest.fn(() =>
      Promise.resolve({ keyValue: 'hello' })
    )
    middleware.getUsagePlans = jest.fn(() =>
      Promise.resolve({ items: 'goodbye' })
    )
    usagePlan.getApplicablePlan = jest.fn(() => ({ id: 'plan' }))
    const setUsagePlan = jest.fn(() => Promise.resolve('does not matter'))
    const setApiKey = jest.fn()
    const setClientInformation = jest.fn()
    const profileInfo = {
      email: 'email',
      profilePicture: 'profile',
      token: 'token',
      provider: 'google'
    }
    const providerHoc = jest.fn(() => profileInfo)
    const instFn = handleSocialLogin({
      setUsagePlan,
      setApiKey,
      setClientInformation
    })

    return instFn(providerHoc)('arg')
      .then(() => {
        return expect(providerHoc.mock.calls[0][0]).toEqual('arg')
      })
      .then(() => {
        return expect(setClientInformation.mock.calls[0][0]).toEqual(
          profileInfo
        )
      })
      .then(() => {
        return expect(middleware.getUsagePlans.mock.calls[0][0]).toEqual({
          token: 'token',
          provider: 'google'
        })
      })
      .then(() => {
        return expect(usagePlan.getApplicablePlan.mock.calls[0][0]).toEqual(
          'goodbye'
        )
      })
      .then(() => {
        return expect(setUsagePlan.mock.calls[0][0]).toEqual({ id: 'plan' })
      })
      .then(() => {
        return expect(
          middleware.createApiKeyAndSubscribe.mock.calls[0][0]
        ).toEqual({
          email: 'email',
          usagePlanId: 'plan',
          token: 'token',
          provider: 'google'
        })
      })
      .then(() => {
        return expect(setApiKey.mock.calls[0][0]).toEqual('hello')
      })
  })
})
