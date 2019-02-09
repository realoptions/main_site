import React from 'react'
//import SocialLogin from 'react-social-login'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { DropdownItem } from 'reactstrap'
import PropTypes from 'prop-types'
const FACEBOOK_APP_ID = '1672160866222878'
const GOOGLE_APP_ID =
  '117231459701-omruogcepkcm1kfanp39g94n5qjptcc9.apps.googleusercontent.com'

/**<GoogleLogin
    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
    render={renderProps => (
      <button onClick={renderProps.onClick}>This is my custom Google button</button>
    )}
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
  /> */

/**<FacebookLogin
    appId="1088597931155576"
    autoLoad={true}
    fields="name,email,picture"
    onClick={componentClicked}
    callback={responseFacebook} /> */
const response = provider => res => {
  console.log(res)
  console.log(provider)
}

const facebookHoc = ({ email, name, picture }) => ({
  email,
  name,
  picture: picture.data.url,
  provider: 'facebook'
})

const exampleResponse = providerHoc => res => {
  console.log(providerHoc(res))
}

export const GoogleItem = ({ children, ...props }) => (
  <GoogleLogin
    clientId={GOOGLE_APP_ID}
    render={({ onClick }) => (
      <DropdownItem onClick={onClick} {...props} tag="span">
        {children}
      </DropdownItem>
    )}
    buttonText="Login"
    onSuccess={response('google')}
    onFailure={response('google')}
  />
)
GoogleItem.propTypes = {
  children: PropTypes.node.isRequired
}
export const FacebookItem = ({ children, ...props }) => (
  <FacebookLogin
    appId={FACEBOOK_APP_ID}
    autoLoad={true}
    fields="name,email,picture"
    callback={exampleResponse(facebookHoc)}
    render={({ onClick }) => (
      <DropdownItem onClick={onClick} {...props} tag="span">
        {children}
      </DropdownItem>
    )}
  />
)
FacebookItem.propTypes = {
  children: PropTypes.node.isRequired
}
