import React from 'react'
import { shallow, mount } from 'enzyme'
import FProducts, { Products } from './Products'
import { MemoryRouter } from 'react-router-dom'

it('shallowly renders', () => {
  const products = shallow(<Products />)
  expect(products).toBeDefined()
})
it('fully mounts', () => {
  const products = mount(
    <MemoryRouter>
      <FProducts />
    </MemoryRouter>
  )
  expect(products).toBeDefined()
})
