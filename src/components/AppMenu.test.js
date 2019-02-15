import { AppMenu, getApplicablePlan } from './AppMenu'
import React from 'react'
import { NavLink, DropdownToggle } from 'reactstrap'
import { shallow } from 'enzyme'

const genericFn = () => {}

describe('AppMenu', () => {
  it('renders without profilePicture', () => {
    const appMenu = shallow(
      <AppMenu
        setUsagePlan={genericFn}
        setApiKey={genericFn}
        setClientInformation={genericFn}
        setProfilePicture={genericFn}
      />
    )
    expect(appMenu).toBeDefined()
  })
  it('renders with profilePicture', () => {
    const appMenu = shallow(
      <AppMenu
        profilePicture="hello"
        setUsagePlan={genericFn}
        setApiKey={genericFn}
        setClientInformation={genericFn}
        setProfilePicture={genericFn}
      />
    )
    expect(appMenu).toBeDefined()
  })
  it('does not have login link when signed in', () => {
    const appMenu = shallow(
      <AppMenu
        profilePicture="hello"
        setUsagePlan={genericFn}
        setApiKey={genericFn}
        setClientInformation={genericFn}
        setProfilePicture={genericFn}
      />
    )
    expect(
      appMenu.find(NavLink).findWhere(link => link.text() === 'Log In').length
    ).toEqual(0)
  })
  it('has login link when not signed in', () => {
    const appMenu = shallow(
      <AppMenu
        setUsagePlan={genericFn}
        setApiKey={genericFn}
        setClientInformation={genericFn}
        setProfilePicture={genericFn}
      />
    )
    expect(
      appMenu.find(DropdownToggle).findWhere(link => link.text() === 'Log In')
        .length
    ).toEqual(1)
  })
})

describe('getApplicablePlan', () => {
  it('finds first element that does not contain admin when single element', () => {
    const plans = [{ name: 'hello', id: '5' }]
    expect(getApplicablePlan(plans)).toEqual('5')
  })
  it('finds first element that does not contain admin when multiple elements', () => {
    const plans = [
      { name: 'sdfsfAdmin', id: '5' },
      { name: 'somthing', id: '6' }
    ]
    expect(getApplicablePlan(plans)).toEqual('6')
  })
  it('returns empty if everything is Admin', () => {
    const plans = [{ name: 'sdfsfAdmin', id: '5' }, { name: 'Admin', id: '6' }]
    expect(getApplicablePlan(plans)).toEqual(undefined)
  })
})
