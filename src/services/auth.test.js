import { filterSubscriptions, handleSubscriptionLogic } from './auth'

describe('filterSubscriptions', () => {
  it('produces both false when empty array', () => {
    expect(
      filterSubscriptions({
        paidUsagePlanId: 5,
        freeUsagePlanId: 6
      })({ data: [] })
    ).toEqual({
      isSubscribedPaid: false,
      isSubscribedFree: false
    })
  })
  it('produces both false when array does not include id', () => {
    expect(
      filterSubscriptions({
        paidUsagePlanId: 5,
        freeUsagePlanId: 6
      })({ data: [{ id: 7 }] })
    ).toEqual({
      isSubscribedPaid: false,
      isSubscribedFree: false
    })
  })
  it('produces paid true when data contains paid id', () => {
    expect(
      filterSubscriptions({
        paidUsagePlanId: 5,
        freeUsagePlanId: 6
      })({ data: [{ id: 5 }] })
    ).toEqual({
      isSubscribedPaid: true,
      isSubscribedFree: false
    })
  })
  it('produces free true when data contains free id', () => {
    expect(
      filterSubscriptions({
        paidUsagePlanId: 5,
        freeUsagePlanId: 6
      })({ data: [{ id: 6 }] })
    ).toEqual({
      isSubscribedPaid: false,
      isSubscribedFree: true
    })
  })
  it('produces both true when data contains both id', () => {
    expect(
      filterSubscriptions({
        paidUsagePlanId: 5,
        freeUsagePlanId: 6
      })({ data: [{ id: 5 }, { id: 6 }] })
    ).toEqual({
      isSubscribedPaid: true,
      isSubscribedFree: true
    })
  })
})

describe('handleSubscriptionLogic', () => {
  it('returns NEED_TO_DESCRIBE_PAID when isMarketPlace is true and isSubscribed paid is false and isSubscribed free is false', () => {
    expect(
      handleSubscriptionLogic({
        isSubscribedFree: false, //doesnt matter the value
        isSubscribedPaid: false,
        isFromMarketPlace: true
      })
    ).toEqual('NEED_TO_SUBSCRIBE_PAID')
  })
  it('returns NEED_TO_DESCRIBE_PAID when isMarketPlace is true and isSubscribed paid is false and isSubscribed free is true', () => {
    expect(
      handleSubscriptionLogic({
        isSubscribedFree: true, //doesnt matter the value
        isSubscribedPaid: false,
        isFromMarketPlace: true
      })
    ).toEqual('NEED_TO_SUBSCRIBE_PAID')
  })
  it('returns IS_SUBSCRIBED_PAID when isMarketPlace is true and isSubscribed paid is true', () => {
    expect(
      handleSubscriptionLogic({
        isSubscribedFree: false,
        isSubscribedPaid: true,
        isFromMarketPlace: true
      })
    ).toEqual('IS_SUBSCRIBED_PAID')
  })
  it('returns NEED_TO_SUBSCRIBE_FREE when isSubscribed free and isSubscribed paid is false', () => {
    expect(
      handleSubscriptionLogic({
        isSubscribedFree: false,
        isSubscribedPaid: false,
        isFromMarketPlace: false
      })
    ).toEqual('NEED_TO_SUBSCRIBE_FREE')
  })
  it('returns IS_SUBSCRIBED_FREE when isSubscribed free is true and not from marketplace', () => {
    expect(
      handleSubscriptionLogic({
        isSubscribedFree: true,
        isSubscribedPaid: false,
        isFromMarketPlace: false
      })
    ).toEqual('IS_SUBSCRIBED_FREE')
  })
  it('cannot return empty string', () => {
    const allPossibilities = [
      {
        isSubscribedFree: true,
        isSubscribedPaid: true,
        isFromMarketPlace: true
      },
      {
        isSubscribedFree: false,
        isSubscribedPaid: true,
        isFromMarketPlace: true
      },
      {
        isSubscribedFree: true,
        isSubscribedPaid: true,
        isFromMarketPlace: false
      },
      {
        isSubscribedFree: true,
        isSubscribedPaid: false,
        isFromMarketPlace: true
      },
      {
        isSubscribedFree: true,
        isSubscribedPaid: false,
        isFromMarketPlace: false
      },
      {
        isSubscribedFree: false,
        isSubscribedPaid: true,
        isFromMarketPlace: false
      },
      {
        isSubscribedFree: false,
        isSubscribedPaid: false,
        isFromMarketPlace: true
      },
      {
        isSubscribedFree: false,
        isSubscribedPaid: false,
        isFromMarketPlace: false
      }
    ]
    allPossibilities.forEach(v => {
      expect(handleSubscriptionLogic(v).length).toBeGreaterThan(0)
    })
  })
  it('correctl returns value for every combination', () => {
    const allPossibilities = [
      {
        isSubscribedFree: true,
        isSubscribedPaid: true,
        isFromMarketPlace: true,
        expected: 'IS_SUBSCRIBED_FREE'
      },
      {
        isSubscribedFree: false,
        isSubscribedPaid: true,
        isFromMarketPlace: true,
        expected: 'IS_SUBSCRIBED_PAID'
      },
      {
        isSubscribedFree: true,
        isSubscribedPaid: true,
        isFromMarketPlace: false,
        expected: 'IS_SUBSCRIBED_FREE'
      },
      {
        isSubscribedFree: true,
        isSubscribedPaid: false,
        isFromMarketPlace: true,
        expected: 'NEED_TO_SUBSCRIBE_PAID'
      },
      {
        isSubscribedFree: true,
        isSubscribedPaid: false,
        isFromMarketPlace: false,
        expected: 'IS_SUBSCRIBED_FREE'
      },
      {
        isSubscribedFree: false,
        isSubscribedPaid: true,
        isFromMarketPlace: false,
        expected: 'IS_SUBSCRIBED_PAID'
      },
      {
        isSubscribedFree: false,
        isSubscribedPaid: false,
        isFromMarketPlace: true,
        expected: 'NEED_TO_SUBSCRIBE_PAID'
      },
      {
        isSubscribedFree: false,
        isSubscribedPaid: false,
        isFromMarketPlace: false,
        expected: 'NEED_TO_SUBSCRIBE_FREE'
      }
    ]
    allPossibilities.forEach(v => {
      expect(handleSubscriptionLogic(v)).toEqual(v.expected)
    })
  })
})
