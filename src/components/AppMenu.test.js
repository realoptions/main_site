import { AppMenu } from './AppMenu'
import React from 'react'
import { shallow } from 'enzyme'

describe('AppMenu', () => {
  it('renders ', () => {
    const appMenu = shallow(<AppMenu />)
    expect(appMenu).toBeDefined()
  })
})
