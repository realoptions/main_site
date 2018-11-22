import { AppMenu, LogOut, LogInOrOut } from './AppMenu'
import React from 'react'
import { NavLink } from 'reactstrap'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
const mockStore = configureStore([])

const genericFn = () => {}
const genericHistory = {
  push: genericFn,
  location: {
    pathname: 'hello'
  }
}
describe('AppMenu', () => {
  it('renders with signedIn and isOpen', () => {
    const appMenu = shallow(
      <AppMenu
        isOpen={true}
        isSignedIn={true}
        history={genericHistory}
        toggleNavBar={genericFn}
      />
    )
    expect(appMenu).toBeDefined()
  })
  it('renders with signedIn and isOpen=false', () => {
    const appMenu = shallow(
      <AppMenu
        isOpen={false}
        isSignedIn={true}
        history={genericHistory}
        toggleNavBar={genericFn}
      />
    )
    expect(appMenu).toBeDefined()
  })
  it('renders with signedIn=false and isOpen=true', () => {
    const appMenu = shallow(
      <AppMenu
        isOpen={true}
        isSignedIn={false}
        history={genericHistory}
        toggleNavBar={genericFn}
      />
    )
    expect(appMenu).toBeDefined()
  })
  it('renders with signedIn=false and isOpen=false', () => {
    const appMenu = shallow(
      <AppMenu
        isOpen={false}
        isSignedIn={false}
        history={genericHistory}
        toggleNavBar={genericFn}
      />
    )
    expect(appMenu).toBeDefined()
  })
  it('has subscription link when signed in', () => {
    const appMenu = shallow(
      <AppMenu
        isOpen={true}
        isSignedIn={true}
        history={genericHistory}
        toggleNavBar={genericFn}
      />
    )
    expect(
      appMenu.find(NavLink).findWhere(link => link.text() === 'Subscriptions')
        .length
    ).toEqual(1)
  })
  it('has register link when not signed in', () => {
    const appMenu = shallow(
      <AppMenu
        isOpen={true}
        isSignedIn={false}
        history={genericHistory}
        toggleNavBar={genericFn}
      />
    )
    expect(
      appMenu.find(NavLink).findWhere(link => link.text() === 'Sign Up').length
    ).toEqual(1)
  })
})

describe('LogInOrOut', () => {
  it('renders', () => {
    const initialState = {
      auth: {
        isSignedIn: true,
        isFromMarketPlace: false,
        token: '',
        cognitoUser: {}
      },
      catalog: {
        free: {
          id: 5
        }
      }
    }
    const store = mockStore(initialState)
    const logInOrOut = mount(
      <Provider store={store}>
        <LogInOrOut history={genericHistory} />
      </Provider>
    )
    expect(logInOrOut).toBeDefined()
  })
  it('has login link when not signed in', () => {
    const initialState = {
      auth: {
        isSignedIn: false,
        isFromMarketPlace: false,
        token: '',
        cognitoUser: {}
      },
      catalog: {
        free: {
          id: 5
        }
      }
    }
    const store = mockStore(initialState)
    const logInOrOut = mount(
      <Provider store={store}>
        <MemoryRouter>
          <LogInOrOut history={genericHistory} />
        </MemoryRouter>
      </Provider>
    )
    expect(
      logInOrOut.find(NavLink).findWhere(link => link.text() === 'Log In')
        .length
    ).toBeGreaterThan(0)
  })
})
describe('LogOut', () => {
  it('renders', () => {
    const initialState = {
      auth: {
        cognitoUser: 5
      }
    }
    const store = mockStore(initialState)
    const logOut = mount(
      <Provider store={store}>
        <LogOut history={genericHistory} />
      </Provider>
    )
    expect(logOut).toBeDefined()
  })
})
