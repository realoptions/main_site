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
import { setApiKey } from '../actions/apiKey'
import { setClientInformation } from '../actions/clientInformation'
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
  setClientInformation
}) => providerHoc => res => {
  console.log(res)
  const { email, profilePicture, token, provider } = providerHoc(res)
  console.log(email)
  console.log(profilePicture)
  setClientInformation({
    email,
    provider,
    token,
    profilePicture
  })
  return getUsagePlans({ token, provider })
    .then(data => {
      console.log(data)
      const plan = getApplicablePlan(data)
      return Promise.all([
        setUsagePlan(plan),
        createApiKeyAndSubscribe({ email, plan, token, provider })
      ])
    })
    .then(([_, { keyValue }]) => setApiKey(keyValue))
}

const reset = ({ setUsagePlan, setApiKey, setClientInformation }) => () => {
  setUsagePlan('')
  setApiKey('')
  setClientInformation() //back to default
}

export const AppMenu = ({
  profilePicture,
  provider,
  setUsagePlan,
  setApiKey,
  setClientInformation
}) => {
  const [open, setOpen] = useState(false)
  const onLogin = handleSocialLogin({
    setUsagePlan,
    setApiKey,
    setClientInformation
  }).catch(err => console.log(err))
  const resetAll = reset({
    setUsagePlan,
    setApiKey,
    setClientInformation
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
                onClick={() => logout(provider).then(resetAll)}
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
  provider: PropTypes.string,
  setUsagePlan: PropTypes.func.isRequired,
  setApiKey: PropTypes.func.isRequired,
  setClientInformation: PropTypes.func.isRequired
}

const mapStateToProps = ({
  clientInformation: { profilePicture, provider }
}) => ({
  profilePicture,
  provider
})

const mapDispatchToProps = dispatch => ({
  setApiKey: setApiKey(dispatch),
  setClientInformation: setClientInformation(dispatch),
  setUsagePlan: setUsagePlan(dispatch)
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppMenu)
