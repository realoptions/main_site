import { getCurrentMonth } from './dateHandlers'

describe('getCurrentMonth', () => {
  it('returns next day if given date in middle of month', () => {
    const date = new Date('2018-06-15')
    expect(getCurrentMonth(date)).toEqual({
      start: '2018-06-01',
      end: '2018-06-16'
    })
  })
  it('returns next day if given date at end of month', () => {
    const date = new Date('2018-06-30')
    expect(getCurrentMonth(date)).toEqual({
      start: '2018-06-01',
      end: '2018-07-01'
    })
  })
  it('returns values when not provided an argument', () => {
    const result = getCurrentMonth()
    expect(result.start).toBeDefined()
    expect(result.end).toBeDefined()
  })
})
