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
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
  //Dropdown,
  NavLink
} from 'reactstrap'
import SocialSpan from './SocialSpan'
import Logo from '../Logo.js'
import {
  HOME,
  DEVELOPERS,
  PRODUCTS,
  MARKETPLACE,
  SUBSCRIPTIONS,
  DEMO
} from '../routes/names'
import { menuBarHeight } from '../styles/menu'
//import { init } from '../services/auth'
import { toggleNavBar } from '../actions/menu'

const handleSocialLogin = user => {
  console.log(user)
}

const handleSocialLoginFailure = err => {
  console.error(err)
}
const FACEBOOK_APP_ID = '1672160866222878'
const GOOGLE_APP_ID =
  '117231459701-omruogcepkcm1kfanp39g94n5qjptcc9.apps.googleusercontent.com'
const GITHUB_APP_ID = '3d5d9ef81f3e1e43c1ff'
//the "purchase" link will go to amazon web store
export const AppMenu = ({ toggleNavBar, isSignedIn, isOpen }) => (
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
        {isSignedIn ? null : (
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Log In
            </DropdownToggle>
            <DropdownMenu right>
              <SocialSpan
                provider="facebook"
                appId={FACEBOOK_APP_ID}
                onLoginSuccess={handleSocialLogin}
                onLoginFailure={handleSocialLoginFailure}
              >
                Login with Facebook
              </SocialSpan>
              <SocialSpan
                provider="google"
                appId={GOOGLE_APP_ID}
                onLoginSuccess={handleSocialLogin}
                onLoginFailure={handleSocialLoginFailure}
              >
                Login with Google
              </SocialSpan>
              <SocialSpan
                provider="github"
                appId={GITHUB_APP_ID}
                onLoginSuccess={handleSocialLogin}
                onLoginFailure={handleSocialLoginFailure}
              >
                Login with GitHub
              </SocialSpan>
            </DropdownMenu>
          </UncontrolledDropdown>
        )}
      </Nav>
    </Collapse>
  </Navbar>
)
AppMenu.propTypes = {
  toggleNavBar: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired
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
