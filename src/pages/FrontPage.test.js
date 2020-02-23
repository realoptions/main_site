import React from 'react'
import { shallow, mount } from 'enzyme'
import FrontPage from './FrontPage'
import { MemoryRouter } from 'react-router-dom'
it('shallowly renders', () => {
  const frontPage = shallow(<FrontPage />)
  expect(frontPage).toBeDefined()
})
it('fully mounts', () => {
  const frontPage = mount(
    <MemoryRouter>
      <FrontPage />
    </MemoryRouter>
  )
  expect(frontPage).toBeDefined()
})
