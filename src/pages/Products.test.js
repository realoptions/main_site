import React from 'react'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import FProducts, { Products } from './Products'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
const mockStore = configureStore([])
const genericFn = jest.fn()
it('shallowly renders', () => {
  const products = shallow(
    <Products
      profilePicture="pic"
      setUsagePlan={genericFn}
      setApiKey={genericFn}
      setClientInformation={genericFn}
    />
  )
  expect(products).toBeDefined()
})
it('fully mounts', () => {
  const initialState = {
    clientInformation: {
      profilePicture: 'pic'
    }
  }
  const store = mockStore(initialState)
  const products = mount(
    <Provider store={store}>
      <MemoryRouter>
        <FProducts />
      </MemoryRouter>
    </Provider>
  )
  expect(products).toBeDefined()
})
