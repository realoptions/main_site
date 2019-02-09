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
  NavLink
} from 'reactstrap'
import { GoogleItem, FacebookItem, logout } from './SocialSpan'
import Logo from '../Logo.js'
import { HOME, DEVELOPERS, PRODUCTS, DEMO } from '../routes/names'
import { menuBarHeight } from '../styles/menu'
//import { init } from '../services/auth'
import { setEmail } from '../actions/email'
import { setApiKey } from '../actions/apiKey'
import { setProfilePicture } from '../actions/profilePicture'
import { setUsagePlan } from '../actions/usagePlan'
import {
  createApiKeyAndSubscribe,
  getUsagePlans
} from '../services/api-middleware'

//exported for testing
export const getApplicablePlan = plans => {
  console.log(plans)
  return plans.find(v => !v.plan.includes('Admin')).key
}
const avatarStyle = {
  verticalAlign: 'middle',
  width: menuBarHeight,
  height: menuBarHeight,
  borderRadius: '50%'
}
const Avatar = ({ url }) => <img src={url} style={avatarStyle} alt="profile" />

const handleSocialLogin = ({
  setUsagePlan,
  setApiKey,
  setEmail,
  setProfilePicture
}) => providerHoc => res => {
  console.log(res)
  const { email, profilePicture } = providerHoc(res)
  console.log(email)
  console.log(profilePicture)
  setEmail(email)
  setProfilePicture(profilePicture)
  return getUsagePlans()
    .then(data => {
      const plan = getApplicablePlan(data)
      return Promise.all([
        setUsagePlan(plan),
        createApiKeyAndSubscribe(email, plan)
      ])
    })
    .then(([_, { keyValue }]) => setApiKey(keyValue))
}

const reset = ({
  setUsagePlan,
  setApiKey,
  setEmail,
  setProfilePicture
}) => () => {
  setUsagePlan('')
  setApiKey('')
  setEmail('')
  setProfilePicture('')
}

export const AppMenu = ({
  profilePicture,
  setUsagePlan,
  setApiKey,
  setEmail,
  setProfilePicture
}) => {
  const [open, setOpen] = useState(false)
  const onLogin = handleSocialLogin({
    setUsagePlan,
    setApiKey,
    setEmail,
    setProfilePicture
  })
  const resetAll = reset({
    setUsagePlan,
    setApiKey,
    setEmail,
    setProfilePicture
  })
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
            <NavLink to={DEMO} tag={Link}>
              Demo
            </NavLink>
          </NavItem>
          {profilePicture ? null : (
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Log In
              </DropdownToggle>
              <DropdownMenu right>
                <GoogleItem onLogin={onLogin}>Login with Google</GoogleItem>
                <FacebookItem onLogin={onLogin}>
                  Login with Facebook
                </FacebookItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
          {profilePicture ? (
            <NavItem>
              <NavLink
                onClick={() => logout().then(resetAll)}
                tag={Link}
                to="#"
              >
                Sign Out
              </NavLink>
            </NavItem>
          ) : null}
        </Nav>
        {profilePicture && !open ? (
          <NavbarBrand>
            <Avatar url={profilePicture} />
          </NavbarBrand>
        ) : null}
      </Collapse>
    </Navbar>
  )
}
AppMenu.propTypes = {
  profilePicture: PropTypes.string,
  setUsagePlan: PropTypes.func.isRequired,
  setApiKey: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setProfilePicture: PropTypes.func.isRequired
}

const mapStateToProps = ({ profilePicture }) => ({
  profilePicture
})

const mapDispatchToProps = dispatch => ({
  setApiKey: setApiKey(dispatch),
  setEmail: setEmail(dispatch),
  setProfilePicture: setProfilePicture(dispatch),
  setUsagePlan: setUsagePlan(dispatch)
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppMenu)
