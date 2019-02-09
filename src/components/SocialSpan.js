import React from 'react'
//import SocialLogin from 'react-social-login'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { DropdownItem } from 'reactstrap'
import PropTypes from 'prop-types'
const FACEBOOK_APP_ID = '1672160866222878'
const GOOGLE_APP_ID =
  '117231459701-omruogcepkcm1kfanp39g94n5qjptcc9.apps.googleusercontent.com'

const facebookHoc = ({ email, name, picture }) => ({
  email,
  name,
  profilePicture: picture.data.url,
  provider: 'facebook'
})

const googleHoc = res => ({
  ...res,
  provider: 'google'
})

export const GoogleItem = ({ children, onLogin, ...props }) => (
  <GoogleLogin
    clientId={GOOGLE_APP_ID}
    render={({ onClick }) => (
      <DropdownItem onClick={onClick} {...props} tag="span">
        {children}
      </DropdownItem>
    )}
    buttonText="Login"
    onSuccess={onLogin(googleHoc)}
    onFailure={data => console.log(data)}
  />
)
GoogleItem.propTypes = {
  children: PropTypes.node.isRequired,
  onLogin: PropTypes.func.isRequired
}
export const FacebookItem = ({ children, onLogin, ...props }) => (
  <FacebookLogin
    appId={FACEBOOK_APP_ID}
    autoLoad={true}
    fields="name,email,picture"
    callback={onLogin(facebookHoc)}
    render={({ onClick }) => (
      <DropdownItem onClick={onClick} {...props} tag="span">
        {children}
      </DropdownItem>
    )}
  />
)
FacebookItem.propTypes = {
  children: PropTypes.node.isRequired,
  onLogin: PropTypes.func.isRequired
}
