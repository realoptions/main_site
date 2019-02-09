import React, { useState } from 'react'
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
import { GoogleItem, FacebookItem } from './SocialSpan'
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

//const handleSocialLogin = user => {
////console.log(user)
//{_profile:{email, firstName, lastName, id, name, profilePicUrl}}

//}

export const AppMenu = ({ isSignedIn }) => {
  const [open, setOpen] = useState(false)
  //const [loginState, setLoginState]=useState('logOut')
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand>
        <Logo
          height={menuBarHeight}
          width={menuBarHeight}
          className="logo-primary"
        />
      </NavbarBrand>
      <NavbarToggler onClick={() => setOpen(!open)} />
      <Collapse isOpen={open} navbar>
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
                <GoogleItem>Login with Google</GoogleItem>
                <FacebookItem>Login with Facebook</FacebookItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  )
}
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
