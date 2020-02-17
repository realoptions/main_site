import React from 'react'
import App from './App'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { createStore } from 'redux'
//import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import FrontPage from './pages/FrontPage'
import Products from './pages/Products'
import Developers from './pages/Developers'
import awsApp from './reducers'
import * as SwaggerUI from 'swagger-ui-react' //overwride swagger
import * as SocialSpan from './components/SocialSpan'
SwaggerUI.default = () => <div />
SocialSpan.default = () => <div />
//const mockStore = configureStore([])
//note that there will be not be any actual API calls if catalog.free.id is defined at this level
describe('app', () => {
  it('renders app', () => {
    const store = createStore(awsApp)
    const app = mount(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    )
    expect(app.find('.app').length).toEqual(1)
  })
})

describe('navigating around app', () => {
  it('loads FrontPage by default', () => {
    const store = createStore(awsApp)
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
    const store = createStore(awsApp)
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
    const store = createStore(awsApp)
    const app = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/developers']}>
          <App />
        </MemoryRouter>
      </Provider>
    )
    expect(app.find(Developers).length).toEqual(1)
  })
})
