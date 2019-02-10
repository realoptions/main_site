import { AppMenu } from './AppMenu'
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
