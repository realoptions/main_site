import React from 'react'
import { NavLink as Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'
import Logo from '../Logo.js'
import {
  HOME,
  DEVELOPERS,
  PRODUCTS,
  REGISTER,
  LOGIN,
  MARKETPLACE,
  SUBSCRIPTIONS,
  DEMO
} from '../routes/names'
import { logout } from '../services/auth'
import { menuBarHeight } from '../styles/menu'
import Loading from './Loading'
import AsyncLoad from './AsyncLoad'
import { init } from '../services/auth'
import { updateSignIn } from '../actions/signIn'
import { toggleNavBar } from '../actions/menu'
import {
  getPossibleSubscriptions,
  addSubscriptionLocal
} from '../actions/subscriptions.js'
import { updateLogOut } from '../actions/auth'

const mapStateToPropsLogOut = ({ auth: { cognitoUser } }) => ({
  cognitoUser
})
const mapDispatchToPropsLogOut = dispatch => ({
  logout: logout(dispatch),
  updateLogOut: () => updateLogOut(dispatch)
})
//exported for testing
export const LogOut = connect(
  mapStateToPropsLogOut,
  mapDispatchToPropsLogOut
)(({ logout, updateLogOut, cognitoUser, history }) => (
  <NavLink
    href="#"
    onClick={() => {
      logout(cognitoUser)
      updateLogOut()
      history.push(HOME)
    }}
  >
    Log Out
  </NavLink>
))
LogOut.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

const mapStateToPropsLogInOrOut = ({
  auth: { isFromMarketPlace, token, isSignedIn },
  catalog: {
    free: { id: freeUsagePlanId }
  }
}) => ({
  isFromMarketPlace,
  token,
  isSignedIn,
  freeUsagePlanId
})
const mapDispatchToPropsLogInOrOut = dispatch => ({
  init: ({ token, isFromMarketPlace }) =>
    getPossibleSubscriptions(dispatch).then(
      ({
        value: {
          free: { id: freeUsagePlanId },
          paid: { id: paidUsagePlanId }
        }
      }) =>
        init({
          token,
          paidUsagePlanId,
          isFromMarketPlace,
          freeUsagePlanId
        })
    ),
  updateSignIn: updateSignIn(dispatch),
  addSubscription: addSubscriptionLocal(dispatch)
})

export const LogInOrOut = connect(
  mapStateToPropsLogInOrOut,
  mapDispatchToPropsLogInOrOut
)(
  ({
    init,
    token,
    isFromMarketPlace,
    freeUsagePlanId,
    isSignedIn,
    history,
    updateSignIn,
    addSubscription
  }) => (
    <AsyncLoad
      onLoad={() =>
        init({
          token,
          isFromMarketPlace
        }).then(([usagePlanId, client, cognitoUser]) =>
          Promise.all([
            addSubscription(usagePlanId),
            updateSignIn(client, cognitoUser)
          ])
        )
      }
      loading={Loading}
      requiredObject={freeUsagePlanId !== undefined}
      render={() =>
        isSignedIn ? (
          <LogOut history={history} />
        ) : (
          <NavLink to={LOGIN} tag={Link}>
            Log In
          </NavLink>
        )
      }
    />
  )
)
LogInOrOut.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}
//the "purchase" link will go to amazon web store
export const AppMenu = ({ toggleNavBar, isSignedIn, isOpen, history }) => (
  <Navbar color="light" light expand="md">
    <NavbarBrand>
      <Logo
        height={menuBarHeight}
        width={menuBarHeight}
        className="logo-primary"
      />
    </NavbarBrand>
    <NavbarToggler onClick={toggleNavBar} />
    <Collapse isOpen={isOpen} navbar>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink to={HOME} tag={Link}>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={PRODUCTS} tag={Link}>
            Products
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={DEVELOPERS} tag={Link}>
            Developers
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={MARKETPLACE} tag={Link}>
            Purchase
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={DEMO} tag={Link}>
            Demo
          </NavLink>
        </NavItem>
        {isSignedIn ? (
          <NavItem>
            <NavLink to={SUBSCRIPTIONS} tag={Link}>
              Subscriptions
            </NavLink>
          </NavItem>
        ) : null}
        <NavItem>
          <LogInOrOut history={history} />
        </NavItem>
        {isSignedIn ? null : (
          <NavItem>
            <NavLink to={REGISTER} tag={Link}>
              Sign Up
            </NavLink>
          </NavItem>
        )}
      </Nav>
    </Collapse>
  </Navbar>
)
AppMenu.propTypes = {
  toggleNavBar: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

const mapStateToProps = ({ auth: { isSignedIn }, menu }) => ({
  isSignedIn,
  isOpen: menu
})

const mapDispatchToProps = dispatch => ({
  toggleNavBar: toggleNavBar(dispatch)
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppMenu)
