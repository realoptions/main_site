import React from 'react'
//import ReactDOM from 'react-dom'
import App, {
  checkIfRegisteringFromMarketplace,
  checkIfRegisteredPaid
} from './App'
//import awsApp from './reducers'
//import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import Loading from './components/Loading'
import configureStore from 'redux-mock-store'
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom'
import SuccessMarketPlaceRegister from './pages/SuccessMarketPlaceRegister'
import Register from './pages/Register'
import FrontPage from './pages/FrontPage'
import Products from './pages/Products'
import Subscriptions from './pages/Subscriptions'
import Developers from './pages/Developers'
import * as Swagger from './components/Swagger' //overwride swagger
import { REGISTER } from './routes/names'
Swagger.default = () => <div />

describe('checkIfRegisteringFromMarketPlace', () => {
  it('returns true if isFromMarketPlace and not finished logging in: freeUsagePlanId', () => {
    expect(checkIfRegisteringFromMarketplace(true, true, undefined)).toEqual(
      true
    )
  })
  it('returns true if isFromMarketPlace and not finished logging in: isSignedIn', () => {
    expect(checkIfRegisteringFromMarketplace(true, undefined, 'hello')).toEqual(
      true
    )
  })
  it('returns true if isFromMarketPlace and not finished logging in: both', () => {
    expect(
      checkIfRegisteringFromMarketplace(true, undefined, undefined)
    ).toEqual(true)
  })
  it('returns false if isFromMarketPlace and finished logging in', () => {
    expect(checkIfRegisteringFromMarketplace(true, true, 'hello')).toEqual(
      false
    )
  })
  it('returns false if not isFromMarketPlace', () => {
    expect(
      checkIfRegisteringFromMarketplace(false, undefined, undefined)
    ).toEqual(false)
  })
})
describe('checkIfResteredPaid', () => {
  it('returns true if isFromMarketPlace and isSignedIn', () => {
    expect(checkIfRegisteredPaid(true, true)).toEqual(true)
  })
  it('returns false if isFromMarketPlace and not isSignedIn', () => {
    expect(checkIfRegisteredPaid(true, false)).toEqual(false)
  })

  it('returns false if not isFromMarketPlace and isSignedIn', () => {
    expect(checkIfRegisteredPaid(false, true)).toEqual(false)
  })
  it('returns false if not isFromMarketPlace and not isSignedIn', () => {
    expect(checkIfRegisteredPaid(false, false)).toEqual(false)
  })
})
const mockStore = configureStore([])
//note that there will be not be any actual API calls if catalog.free.id is defined at this level
describe('app', () => {
  it('renders loading if registering from marketplace', () => {
    const initialState = {
      auth: {
        isFromMarketPlace: true,
        isSignedIn: undefined
      },
      catalog: {
        free: {
          id: '123',
          quota: { period: 'month' }
        },
        paid: {
          quota: { period: 'month' },
          isSubscribed: false
        }
      },
      menu: false
    }
    const store = mockStore(initialState)
    const app = mount(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    )
    expect(app.find('.app').length).toEqual(0)
    expect(app.find(Loading).length).toEqual(1)
  })
  it('renders loading if registering from marketplace, is signedIn, but no catalog', () => {
    const initialState = {
      auth: {
        isFromMarketPlace: true,
        isSignedIn: true
      },
      catalog: {
        free: {
          quota: { period: 'month' }
        },
        paid: {
          quota: { period: 'month' },
          isSubscribed: false
        }
      },
      menu: false
    }
    const store = mockStore(initialState)
    const app = mount(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    )
    expect(app.find('.app').length).toEqual(0)
    expect(app.find(Loading).length).toEqual(1)
  })
  it('renders app if not registering from marketplace', () => {
    const initialState = {
      auth: {
        isFromMarketPlace: false,
        isSignedIn: undefined
      },
      catalog: {
        free: {
          id: '123', //required so doesnt try to call catalog
          quota: { period: 'month' }
        },
        paid: {
          quota: { period: 'month' },
          isSubscribed: false
        }
      },
      menu: false
    }
    const store = mockStore(initialState)
    const app = mount(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    )
    expect(app.find('.app').length).toEqual(1)
    expect(app.find(Loading).length).toEqual(0)
  })
  it('renders app if registering from marketplace and has signed in and has catalog', () => {
    const initialState = {
      auth: {
        isFromMarketPlace: true,
        isSignedIn: true
      },
      catalog: {
        free: {
          id: '123',
          quota: { period: 'month' }
        },
        paid: {
          quota: { period: 'month' },
          isSubscribed: false
        }
      },
      menu: false
    }
    const store = mockStore(initialState)
    const app = mount(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    )
    expect(app.find('.app').length).toEqual(1)
    expect(app.find(Loading).length).toEqual(0)
  })

  it('renders SuccessMarketPlaceRegister if registering from marketplace and has signed in and has catalog', () => {
    const initialState = {
      auth: {
        isFromMarketPlace: true,
        isSignedIn: true
      },
      catalog: {
        free: {
          id: '123',
          quota: { period: 'month' }
        },
        paid: {
          quota: { period: 'month' },
          isSubscribed: false
        }
      },
      menu: false
    }
    const store = mockStore(initialState)
    const app = mount(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    )
    expect(app.find(SuccessMarketPlaceRegister).length).toEqual(1)
  })

  it('renders register if not signed in and initial path is to register', () => {
    const initialState = {
      auth: {
        isFromMarketPlace: true,
        isSignedIn: false
      },
      catalog: {
        free: {
          id: '123',
          quota: { period: 'month' }
        },
        paid: {
          quota: { period: 'month' },
          isSubscribed: false
        }
      },
      menu: false,
      loading: {
        isLoggingIn: false
      },
      errors: {}
    }
    const store = mockStore(initialState)
    const app = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[REGISTER]}>
          <App />
        </MemoryRouter>
      </Provider>
    )

    expect(app.find(Register).length).toEqual(1)
  })
})

describe('navigating around app', () => {
  const initialState = {
    auth: {
      isFromMarketPlace: false,
      isSignedIn: false
    },
    catalog: {
      free: {
        id: '123',
        quota: { period: 'month' }
      },
      paid: {
        quota: { period: 'month' },
        isSubscribed: false
      }
    },
    menu: false,
    modal: {
      isOpen: false
    },
    loading: {
      isLoggingIn: false,
      isUnRegistering: false
    },
    errors: {}
  }
  it('loads FrontPage by default', () => {
    const store = mockStore(initialState)
    const app = mount(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    )
    expect(app.find(FrontPage).length).toEqual(1)
  })
  it('correctly loads Products when going to products', () => {
    const store = mockStore(initialState)
    const app = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/products']}>
          <App />
        </MemoryRouter>
      </Provider>
    )
    expect(app.find(Products).length).toEqual(1)
  })
  it('correctly loads Developers when going to developers', () => {
    const store = mockStore(initialState)
    const app = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/developers']}>
          <App />
        </MemoryRouter>
      </Provider>
    )
    expect(app.find(Developers).length).toEqual(1)
  })
  it('correctly loads Subscriptions when going to subscriptions', () => {
    const store = mockStore(initialState)
    const app = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/subscriptions']}>
          <App />
        </MemoryRouter>
      </Provider>
    )
    expect(app.find(Subscriptions).length).toEqual(1)
  })
})
