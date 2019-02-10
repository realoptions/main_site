import React from 'react'
import { Provider } from 'react-redux'
import * as Swagger from '../components/Swagger' //overwride swagger
import { shallow, mount } from 'enzyme'
import Developers from './Developers'
import configureStore from 'redux-mock-store'
const mockStore = configureStore([])
it('shallowly renders', () => {
  const developer = shallow(<Developers />)
  expect(developer).toBeDefined()
})
it('fully mounts', () => {
  const initialState = {
    clientInformation: {
      email: 'hello',
      provider: 'google',
      token: 'hello'
    },
    usagePlan: 'hello',
    apiKey: 'hello'
  }
  const store = mockStore(initialState)
  Swagger.default = () => <div />
  const developer = mount(
    <Provider store={store}>
      <Developers />
    </Provider>
  )
  expect(developer).toBeDefined()
})
