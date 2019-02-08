import React from 'react'
import SocialLogin from 'react-social-login'
import { DropdownItem } from 'reactstrap'
import PropTypes from 'prop-types'
const BootstrapButton = ({ children, triggerLogin, ...props }) => (
  <DropdownItem onClick={triggerLogin} {...props} tag="span">
    {children}
  </DropdownItem>
)
BootstrapButton.propTypes = {
  children: PropTypes.node.isRequired
}
export default SocialLogin(BootstrapButton)
