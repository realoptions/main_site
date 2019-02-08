import { AppMenu } from './AppMenu'
import React from 'react'
import { NavLink, DropdownToggle } from 'reactstrap'
import { shallow } from 'enzyme'

const genericFn = () => {}

describe('AppMenu', () => {
  it('renders with signedIn and isOpen', () => {
    const appMenu = shallow(
      <AppMenu isOpen={true} isSignedIn={true} toggleNavBar={genericFn} />
    )
    expect(appMenu).toBeDefined()
  })
  it('renders with signedIn and isOpen=false', () => {
    const appMenu = shallow(
      <AppMenu isOpen={false} isSignedIn={true} toggleNavBar={genericFn} />
    )
    expect(appMenu).toBeDefined()
  })
  it('renders with signedIn=false and isOpen=true', () => {
    const appMenu = shallow(
      <AppMenu isOpen={true} isSignedIn={false} toggleNavBar={genericFn} />
    )
    expect(appMenu).toBeDefined()
  })
  it('renders with signedIn=false and isOpen=false', () => {
    const appMenu = shallow(
      <AppMenu isOpen={false} isSignedIn={false} toggleNavBar={genericFn} />
    )
    expect(appMenu).toBeDefined()
  })
  it('has subscription link when signed in', () => {
    const appMenu = shallow(
      <AppMenu isOpen={true} isSignedIn={true} toggleNavBar={genericFn} />
    )
    expect(
      appMenu.find(NavLink).findWhere(link => link.text() === 'Subscriptions')
        .length
    ).toEqual(1)
  })
  it('has register link when not signed in', () => {
    const appMenu = shallow(
      <AppMenu isOpen={true} isSignedIn={false} toggleNavBar={genericFn} />
    )
    expect(
      appMenu.find(DropdownToggle).findWhere(link => link.text() === 'Log In')
        .length
    ).toEqual(1)
  })
})
