import React from 'react'
import App from './App'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import FrontPage from './pages/FrontPage'
import Products from './pages/Products'
import Demo from './pages/Demo'
//note that there will be not be any actual API calls if catalog.free.id is defined at this level
describe('app', () => {
  it('renders app', () => {
    const app = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    expect(app.find('.app').length).toEqual(1)
  })
})

describe('navigating around app', () => {
  it('loads FrontPage by default', () => {
    const app = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    expect(app.find(FrontPage).length).toEqual(1)
  })
  it('correctly loads Products when going to products', () => {
    const app = mount(
      <MemoryRouter initialEntries={['/products']}>
        <App />
      </MemoryRouter>
    )
    expect(app.find(Products).length).toEqual(1)
  })
  it('correctly loads Demo when going to Demo', () => {
    const app = mount(
      <MemoryRouter initialEntries={['/demo']}>
        <App />
      </MemoryRouter>
    )
    expect(app.find(Demo).length).toEqual(1)
  })
})
