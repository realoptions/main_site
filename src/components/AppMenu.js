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
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
  NavLink
} from 'reactstrap'
import {
  GoogleItem,
  FacebookItem,
  logout,
  handleSocialLogin
} from './SocialSpan'
import Logo from '../Logo.js'
import { HOME, DEVELOPERS, PRODUCTS, DEMO } from '../routes/names'
import { menuBarHeight } from '../styles/menu'
import { setApiKey } from '../actions/apiKey'
import { setClientInformation } from '../actions/clientInformation'
import { setUsagePlan } from '../actions/usagePlan'

const avatarStyle = {
  verticalAlign: 'middle',
  width: menuBarHeight,
  height: menuBarHeight,
  borderRadius: '50%'
}
const Avatar = ({ url }) => <img src={url} style={avatarStyle} alt="profile" />

const reset = ({ setUsagePlan, setApiKey, setClientInformation }) => () => {
  setUsagePlan() //back to default
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
  })
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
                <GoogleItem
                  onLogin={onLogin}
                  render={({ onClick }) => (
                    <DropdownItem onClick={onClick} tag="span">
                      Login with Google
                    </DropdownItem>
                  )}
                />
                <FacebookItem
                  onLogin={onLogin}
                  render={({ onClick }) => (
                    <DropdownItem onClick={onClick} tag="span">
                      Login with Facebook
                    </DropdownItem>
                  )}
                />
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
          {profilePicture ? (
            <NavItem>
              <NavLink
                onClick={() => logout(provider).then(resetAll)}
                to="#"
                tag={Link}
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
