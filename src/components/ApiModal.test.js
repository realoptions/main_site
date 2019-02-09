import React from 'react'
import { shallow } from 'enzyme'
import { ApiModal } from './ApiModal'
import { Button } from 'reactstrap'

it('renders without error', () => {
  const modal = shallow(<ApiModal />)
  expect(modal).toBeDefined()
})
it('renders button when signed in', () => {
  const modal = shallow(
    <ApiModal email="myemail" usagePlan="usage" apiKey="key" />
  )
  expect(modal.find(Button).length).toEqual(1)
})
it('does not render button when notsigned in', () => {
  const modal = shallow(<ApiModal />)
  expect(modal.find(Button).length).toEqual(0)
})
