import React from 'react'
import Loading from '../components/Loading'
import { Provider } from 'react-redux'
import { Form } from 'reactstrap'
import SignInComponent, {
  SignIn,
  checkIfRegisteringFromMarketplace,
  checkIfRegisteredPaid,
  getForm
} from './SignIn'
import configureStore from 'redux-mock-store'
const mockStore = configureStore([])
import { shallow, mount } from 'enzyme'
const gf = () => {}
const defaultParams = {
  register: gf,
  history: {
    goBack: gf,
    push: gf,
    length: 1
  },
  loginError: gf,
  updateLoggingIn: gf,
  updateSignIn: gf,
  addSubscription: gf,
  isFromMarketPlace: true,
  onLogIn: () => gf
}
it('renders without error', () => {
  const signIn = shallow(<SignIn {...defaultParams} isLoggingIn={false} />)
  expect(signIn).toBeDefined()
})

it('renders error message with error', () => {
  const signIn = shallow(
    <SignIn
      {...defaultParams}
      error={{ message: 'an error' }}
      isLoggingIn={false}
      isFromMarketPlace={true}
      isSignedIn={false}
      freeUsagePlanId="someid"
    />
  )
  expect(signIn.findWhere(v => v.text() === 'an error').length).toBeGreaterThan(
    0
  )
})
it('renders loading when is logging in', () => {
  const signIn = shallow(<SignIn {...defaultParams} isLoggingIn={true} />)
  expect(signIn.find(Loading).length).toEqual(1)
})

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
describe('getForm', () => {
  it('correctly executes functions similar to register', () => {
    const event = {
      preventDefault: jest.fn(),
      target: [
        {
          value: 'email'
        },
        {
          value: 'password'
        }
      ]
    }
    const mockRegister = jest.fn(obj => (email, password) =>
      Promise.resolve({ email, password })
    )
    return getForm(mockRegister)({ key: 'value' })(event)
      .then(({ email, password }) => {
        return Promise.all([
          expect(email).toEqual('email'),
          expect(password).toEqual('password')
        ])
      })
      .then(() => {
        return expect(mockRegister.mock.calls.length).toEqual(1)
      })
      .then(() => {
        return expect(mockRegister.mock.calls[0][0]).toEqual({ key: 'value' })
      })
  })
})
describe('SignInComponent', () => {
  it('shows progress when isMarketPlace but not signed in or catalog', () => {
    const usagePlan = {
      quota: {
        period: 'MONTH'
      }
    }
    const free = usagePlan
    const paid = { ...usagePlan, isSubscribed: true }
    const initialState = {
      catalog: {
        free,
        paid
      },
      auth: { isFromMarketPlace: true },
      loading: {
        isLoggingIn: false
      },
      errors: {
        loginError: null
      }
    }
    const history = {
      goBack: jest.fn,
      push: jest.fn,
      length: 4
    }
    const store = mockStore(initialState)
    const signIn = mount(
      <Provider store={store}>
        <SignInComponent history={history} />
      </Provider>
    )
    expect(signIn.find(Loading).length).toEqual(1)
  })
  it('shows form when not isMarketPlace and both signed in and catalog', () => {
    const usagePlan = {
      quota: {
        period: 'MONTH'
      },
      id: 'hello'
    }
    const free = usagePlan
    const paid = { ...usagePlan, isSubscribed: true }
    const initialState = {
      catalog: {
        free,
        paid
      },
      auth: { isFromMarketPlace: false, isSignedIn: true },
      loading: {
        isLoggingIn: false
      },
      errors: {
        loginError: null
      }
    }
    const history = {
      goBack: jest.fn,
      push: jest.fn,
      length: 4
    }
    const store = mockStore(initialState)
    const signIn = mount(
      <Provider store={store}>
        <SignInComponent history={history} />
      </Provider>
    )
    expect(signIn.find(Loading).length).toEqual(0)
    expect(signIn.find(Form).length).toEqual(1)
  })
})
