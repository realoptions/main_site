import React from 'react'
//import ReactDOM from 'react-dom'
import App from './App'
//import awsApp from './reducers'
//import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import Loading from './components/Loading'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import FrontPage from './pages/FrontPage'
import Products from './pages/Products'
import Subscriptions from './pages/Subscriptions'
import Developers from './pages/Developers'
import * as Swagger from './components/Swagger' //overwride swagger
import * as SocialSpan from './components/SocialSpan'
import { REGISTER } from './routes/names'
Swagger.default = () => <div />
SocialSpan.default = () => <div />
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
    expect(app.find('.app').length).toEqual(1)
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
    expect(app.find('.app').length).toEqual(1)
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
