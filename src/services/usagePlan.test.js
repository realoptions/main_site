import {
  getFirstOfNestedOrNonsenseKey,
  convertUsage,
  getApplicablePlan
} from './usagePlan'
describe('getFirstOfNestedOrNonsenseKey', () => {
  it('returns "key" if arr is null', () => {
    const arr = null
    expect(getFirstOfNestedOrNonsenseKey(arr)).toEqual('key')
  })
  it('returns "key" if arr is empty', () => {
    const arr = []
    expect(getFirstOfNestedOrNonsenseKey(arr)).toEqual('key')
  })
  it('returns first element if arr has one element', () => {
    const arr = ['hello']
    expect(getFirstOfNestedOrNonsenseKey(arr)).toEqual('hello')
  })
  it('returns first element if arr has two elements', () => {
    const arr = ['hello', 'goodbye']
    expect(getFirstOfNestedOrNonsenseKey(arr)).toEqual('hello')
  })
})
describe('convertUsage', () => {
  it('throws err if items is null', () => {
    const items = null
    expect(() => convertUsage(items)).toThrow()
  })
  it('returns 0 if items is empty', () => {
    const items = {}
    expect(convertUsage(items)).toEqual(0)
  })
  it('returns 0 if items has an element of an empty array', () => {
    const items = { hello: [[]] }
    expect(convertUsage(items)).toEqual(0)
  })
  it('returns 0 if items has two element of an empty array', () => {
    const items = { hello: [[], []] }
    expect(convertUsage(items)).toEqual(0)
  })
  it('returns 0 if items has elements that are not arrays', () => {
    const items = { hello: [2, 3] }
    //expect(() => convertUsage(items)).toThrow()
    expect(convertUsage(items)).toEqual(0)
  })
  it('returns 2 if items has arrays of 1 and 2', () => {
    const items = { hello: [[1, 'something'], [2, 'something else']] }
    expect(convertUsage(items)).toEqual(2)
  })
})

describe('getApplicablePlan', () => {
  it('finds first element that does not contain admin when single element', () => {
    const plans = [{ name: 'hello', id: '5' }]
    expect(getApplicablePlan(plans)).toEqual({ name: 'hello', id: '5' })
  })
  it('finds first element that does not contain admin when multiple elements', () => {
    const plans = [
      { name: 'sdfsfAdmin', id: '5' },
      { name: 'somthing', id: '6' }
    ]
    expect(getApplicablePlan(plans)).toEqual({ name: 'somthing', id: '6' })
  })
  it('returns empty if everything is Admin', () => {
    const plans = [{ name: 'sdfsfAdmin', id: '5' }, { name: 'Admin', id: '6' }]
    expect(getApplicablePlan(plans)).toEqual(undefined)
  })
})
