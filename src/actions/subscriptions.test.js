import {
  ADD_SUBSCRIPTION,
  DELETE_SUBSCRIPTION,
  IS_UNREGISTERING,
  UPDATE_CATALOG,
  NO_SUBSCRIPTION_ERROR,
  SUBSCRIPTION_ERROR,
  UPDATE_USAGE
} from './constants'

import {
  addSubscriptionLocal,
  deleteSubscriptionLocal,
  updateUnSubscribing,
  subscribeError,
  noSubscribeError,
  getSubscriptionUsage,
  getPossibleSubscriptions
} from './subscriptions'

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
  let dispatch
  beforeEach(() => {
    dispatch = jest.fn()
  })

  it('dispatches catalog if no error', () => {
    global.fetch = () =>
      Promise.resolve({
        json: () => ({ items: [{ name: 'Paid subscription', id: 'hello' }] })
      })
    return getPossibleSubscriptions(dispatch)
      .then(() => {
        return expect(dispatch.mock.calls.length).toEqual(1)
      })
      .then(() => {
        return expect(dispatch.mock.calls[0][0]).toEqual({
          type: UPDATE_CATALOG,
          value: {
            paid: { name: 'Paid subscription', id: 'hello' }
          }
        })
      })
  })
})

/**global.fetch = () => {
            return new Promise((resolve, reject) => {
                process.nextTick(() => reject());
            });
        } */
