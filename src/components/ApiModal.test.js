import React from 'react'
import { shallow } from 'enzyme'
import { ApiModal } from './ApiModal'
import { Button } from 'reactstrap'

it('renders without error', () => {
  const modal = shallow(<ApiModal />)
  expect(modal).toBeDefined()
})
it('renders open button and copy button when signed in', () => {
  const modal = shallow(
    <ApiModal
      email="myemail"
      usagePlan={{
        id: 'hello',
        quota: {
          limit: 5,
          period: 'DAY'
        }
      }}
      apiKey="key"
    />
  )
  expect(modal.find(Button).length).toEqual(2)
})
it('only shows copy button when not signed in', () => {
  const modal = shallow(<ApiModal />)
  expect(modal.find(Button).length).toEqual(1)
})
