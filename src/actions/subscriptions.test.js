import {
  ADD_SUBSCRIPTION,
  DELETE_SUBSCRIPTION,
  IS_UNREGISTERING,
  UPDATE_CATALOG,
  NO_SUBSCRIPTION_ERROR,
  SUBSCRIPTION_ERROR,
  UPDATE_USAGE,
  UPDATE_AWS_CLIENT,
  IS_LOGGING_IN,
  NO_LOGIN_ERROR,
  LOGIN_ERROR
} from './constants'

import {
  addSubscriptionLocal,
  deleteSubscriptionLocal,
  updateUnSubscribing,
  subscribeError,
  noSubscribeError,
  getSubscriptionUsage,
  getPossibleSubscriptions,
  onPageLoad,
  onLogIn,
  removePaidSubscription,
  subscribeAndLogin
} from './subscriptions'

import * as auth from '../services/auth'

describe('addSubscriptionLocal', () => {
  let dispatch
  beforeEach(() => {
    dispatch = jest.fn()
  })
  it('dispatches usage plan when usage plan exists', () => {
    addSubscriptionLocal(dispatch)('hello')
    expect(dispatch.mock.calls.length).toEqual(1)
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: ADD_SUBSCRIPTION,
      value: 'hello'
    })
  })
  it('does nothing when usage plan does not exists', () => {
    addSubscriptionLocal(dispatch)()
    expect(dispatch.mock.calls.length).toEqual(0)
  })
})
describe('deleteSubscriptionLocal', () => {
  let dispatch
  beforeEach(() => {
    dispatch = jest.fn()
  })
  it('dispatches usage plan', () => {
    deleteSubscriptionLocal(dispatch)('hello')
    expect(dispatch.mock.calls.length).toEqual(1)
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: DELETE_SUBSCRIPTION,
      value: 'hello'
    })
  })
})
describe('updateUnsubscribing', () => {
  let dispatch
  beforeEach(() => {
    dispatch = jest.fn()
  })
  it('dispatches value', () => {
    updateUnSubscribing(dispatch)('hello')
    expect(dispatch.mock.calls.length).toEqual(1)
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: IS_UNREGISTERING,
      value: 'hello'
    })
  })
})
describe('subscribeError', () => {
  let dispatch
  beforeEach(() => {
    dispatch = jest.fn()
  })
  it('dispatches error', () => {
    subscribeError(dispatch)('error')
    expect(dispatch.mock.calls.length).toEqual(1)
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: SUBSCRIPTION_ERROR,
      value: 'error'
    })
  })
})
describe('noSubscribeError', () => {
  let dispatch
  beforeEach(() => {
    dispatch = jest.fn()
  })
  it('dispatches error', () => {
    noSubscribeError(dispatch)()
    expect(dispatch.mock.calls.length).toEqual(1)
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: NO_SUBSCRIPTION_ERROR
    })
  })
})
describe('getSubscriptionUsage', () => {
  let dispatch
  beforeEach(() => {
    dispatch = jest.fn()
  })
  it('dispatches subscription usage if no error', () => {
    const client = {
      invokeApi: jest.fn(() => Promise.resolve({ data: 'hello' }))
    }
    return getSubscriptionUsage(dispatch)('plan', client)
      .then(() => {
        return expect(dispatch.mock.calls.length).toEqual(2)
      })
      .then(() => {
        return expect(dispatch.mock.calls[0][0]).toEqual({
          type: UPDATE_USAGE,
          value: 'hello'
        })
      })
      .then(() => {
        return expect(dispatch.mock.calls[1][0]).toEqual({
          type: NO_SUBSCRIPTION_ERROR
        })
      })
  })
  it('dispatches error if error', () => {
    const client = {
      invokeApi: jest.fn(() => Promise.reject('an error'))
    }
    getSubscriptionUsage(dispatch)('plan', client)
      .then(() => {
        return expect(dispatch.mock.calls.length).toEqual(1)
      })
      .then(() => {
        return expect(dispatch.mock.calls[0][0]).toEqual({
          type: SUBSCRIPTION_ERROR,
          value: 'an error'
        })
      })
  })
})

describe('getPossibleSubscriptions', () => {
  it('correctly parses catalog', () => {
    global.fetch = () =>
      Promise.resolve({
        json: () => ({ items: [{ name: 'Paid subscription', id: 'hello' }] })
      })
    return getPossibleSubscriptions().then(v => {
      return expect(v).toEqual({
        paid: { name: 'Paid subscription', id: 'hello' }
      })
    })
  })
})

describe('subscribeAndLogin', () => {
  let dispatch
  let promiseFn = jest.fn(() =>
    Promise.resolve(['usagePlan', 'client', 'user'])
  )
  beforeEach(() => {
    dispatch = jest.fn()
  })
  it('correctly dispatches on no error', () => {
    const subAndLogin = subscribeAndLogin(dispatch)
    return subAndLogin(promiseFn)
      .then(() => {
        return expect(dispatch.mock.calls.length).toEqual(2)
      })
      .then(() => {
        return expect(dispatch.mock.calls[0][0]).toEqual({
          type: ADD_SUBSCRIPTION,
          value: 'usagePlan'
        })
      })
      .then(() => {
        return expect(dispatch.mock.calls[1][0]).toEqual({
          type: UPDATE_AWS_CLIENT,
          client: 'client',
          user: 'user'
        })
      })
  })
})
describe('onPageLoad', () => {
  let dispatch
  beforeEach(() => {
    dispatch = jest.fn()
    global.fetch = () =>
      Promise.resolve({
        json: () => ({
          items: [
            { name: 'Paid subscription', id: 'hello' },
            { name: 'Free subscription', id: 'goodbye' }
          ]
        })
      })
    auth.init = jest.fn(() => Promise.resolve(['usagePlan', 'client', 'user']))
  })
  it('correctly dispatches on no error', () => {
    const pageLoadInstance = onPageLoad(dispatch)
    return pageLoadInstance({ token: 'token', isFromMarketPlace: true })()
      .then(() => {
        return expect(dispatch.mock.calls.length).toEqual(3)
      })
      .then(() => {
        return expect(dispatch.mock.calls[1][0]).toEqual({
          type: ADD_SUBSCRIPTION,
          value: 'usagePlan'
        })
      })
      .then(() => {
        return expect(dispatch.mock.calls[2][0]).toEqual({
          type: UPDATE_AWS_CLIENT,
          client: 'client',
          user: 'user'
        })
      })
      .then(() => {
        return expect(dispatch.mock.calls[0][0]).toEqual({
          type: UPDATE_CATALOG,
          value: {
            free: { name: 'Free subscription', id: 'goodbye' },
            paid: { name: 'Paid subscription', id: 'hello' }
          }
        })
      })
  })
})
describe('onLogin', () => {
  let dispatch
  let fn
  let successFn
  beforeEach(() => {
    dispatch = jest.fn()
    successFn = jest.fn()
  })
  it('correctly dispatches on no error', () => {
    const logInInstance = onLogIn(dispatch)
    fn = jest.fn(() => Promise.resolve(['usagePlan', 'client', 'user']))
    return logInInstance(fn, successFn)('my event')
      .then(() => {
        return expect(dispatch.mock.calls.length).toEqual(5)
      })
      .then(() => {
        return expect(successFn.mock.calls.length).toEqual(1)
      })
      .then(() => {
        return expect(fn.mock.calls.length).toEqual(1)
      })
      .then(() => {
        return expect(fn.mock.calls[0][0]).toEqual('my event')
      })
      .then(() => {
        return expect(dispatch.mock.calls[0][0]).toEqual({
          type: IS_LOGGING_IN,
          value: true
        })
      })
      .then(() => {
        return expect(dispatch.mock.calls[1][0]).toEqual({
          type: ADD_SUBSCRIPTION,
          value: 'usagePlan'
        })
      })
      .then(() => {
        return expect(dispatch.mock.calls[2][0]).toEqual({
          type: UPDATE_AWS_CLIENT,
          client: 'client',
          user: 'user'
        })
      })
      .then(() => {
        return expect(dispatch.mock.calls[3][0]).toEqual({
          type: NO_LOGIN_ERROR
        })
      })
      .then(() => {
        return expect(dispatch.mock.calls[4][0]).toEqual({
          type: IS_LOGGING_IN,
          value: false
        })
      })
  })
  it('correctly dispatches when error', () => {
    const logInInstance = onLogIn(dispatch)
    fn = jest.fn(() => Promise.reject('error'))
    return logInInstance(fn, successFn)('my event')
      .then(() => {
        return expect(dispatch.mock.calls.length).toEqual(3)
      })
      .then(() => {
        return expect(successFn.mock.calls.length).toEqual(0)
      })
      .then(() => {
        return expect(fn.mock.calls.length).toEqual(1)
      })
      .then(() => {
        return expect(fn.mock.calls[0][0]).toEqual('my event')
      })
      .then(() => {
        return expect(dispatch.mock.calls[0][0]).toEqual({
          type: IS_LOGGING_IN,
          value: true
        })
      })
      .then(() => {
        return expect(dispatch.mock.calls[1][0]).toEqual({
          type: LOGIN_ERROR,
          value: 'error'
        })
      })
      .then(() => {
        return expect(dispatch.mock.calls[2][0]).toEqual({
          type: IS_LOGGING_IN,
          value: false
        })
      })
  })
})

describe('removePaidSubscription', () => {
  let dispatch
  beforeEach(() => {
    dispatch = jest.fn()
  })
  it('dispatches correctly with no error', () => {
    const client = {
      invokeApi: jest.fn(() => Promise.resolve({ data: 'hello' }))
    }
    const rps = removePaidSubscription(dispatch)
    return rps('paidPlan', 'freePlan', client)()
      .then(() => {
        return expect(client.invokeApi.mock.calls.length).toEqual(2)
      })
      .then(() => {
        return expect(client.invokeApi.mock.calls[0][1]).toEqual(
          '/subscriptions/paidPlan'
        )
      })
      .then(() => {
        return expect(client.invokeApi.mock.calls[0][2]).toEqual('DELETE')
      })
      .then(() => {
        return expect(client.invokeApi.mock.calls[1][1]).toEqual(
          '/subscriptions/freePlan'
        )
      })
      .then(() => {
        return expect(client.invokeApi.mock.calls[1][2]).toEqual('PUT')
      })
      .then(() => {
        return expect(dispatch.mock.calls.length).toEqual(5)
      })
      .then(() => {
        return expect(dispatch.mock.calls[0][0]).toEqual({
          type: IS_UNREGISTERING,
          value: true
        })
      })
      .then(() => {
        return expect(dispatch.mock.calls[1][0]).toEqual({
          type: ADD_SUBSCRIPTION,
          value: 'freePlan'
        })
      })
      .then(() => {
        return expect(dispatch.mock.calls[2][0]).toEqual({
          type: DELETE_SUBSCRIPTION,
          value: 'paidPlan'
        })
      })
      .then(() => {
        return expect(dispatch.mock.calls[3][0]).toEqual({
          type: NO_SUBSCRIPTION_ERROR
        })
      })
      .then(() => {
        return expect(dispatch.mock.calls[4][0]).toEqual({
          type: IS_UNREGISTERING,
          value: false
        })
      })
  })
  it('dispatches correctly with error', () => {
    const client = {
      invokeApi: jest.fn(() => Promise.reject('error'))
    }
    const rps = removePaidSubscription(dispatch)
    return rps('paidPlan', 'freePlan', client)()
      .then(() => {
        return expect(client.invokeApi.mock.calls.length).toEqual(1)
      })
      .then(() => {
        return expect(client.invokeApi.mock.calls[0][1]).toEqual(
          '/subscriptions/paidPlan'
        )
      })
      .then(() => {
        return expect(client.invokeApi.mock.calls[0][2]).toEqual('DELETE')
      })
      .then(() => {
        return expect(dispatch.mock.calls.length).toEqual(3)
      })
      .then(() => {
        return expect(dispatch.mock.calls[0][0]).toEqual({
          type: IS_UNREGISTERING,
          value: true
        })
      })
      .then(() => {
        return expect(dispatch.mock.calls[1][0]).toEqual({
          type: SUBSCRIPTION_ERROR,
          value: 'error'
        })
      })
      .then(() => {
        return expect(dispatch.mock.calls[2][0]).toEqual({
          type: IS_UNREGISTERING,
          value: false
        })
      })
  })
})
