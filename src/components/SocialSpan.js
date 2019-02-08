import React from 'react'
import SocialLogin from 'react-social-login'
import PropTypes from 'prop-types'
const BootstrapButton = ({ children, triggerLogin, ...props }) => (
  <span onClick={triggerLogin} {...props}>
    {children}
  </span>
)
BootstrapButton.propTypes = {
  children: PropTypes.node.isRequired
}
export default SocialLogin(BootstrapButton)
