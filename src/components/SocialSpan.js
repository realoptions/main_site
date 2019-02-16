import React from 'react'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { DropdownItem } from 'reactstrap'
import PropTypes from 'prop-types'
const GOOGLE_APP_ID = process.env.REACT_APP_GoogleClientID
const FACEBOOK_APP_ID = process.env.REACT_APP_FacebookAppID
const GOOGLE_PROVIDER = 'google'
const FACEBOOK_PROVIDER = 'facebook'
const facebookHoc = ({ email, name, picture, accessToken }) => ({
  email,
  name,
  profilePicture: picture.data.url,
  provider: FACEBOOK_PROVIDER,
  token: accessToken
})

const googleHoc = ({ profileObj, tokenId }) => ({
  ...profileObj,
  profilePicture: profileObj.imageUrl,
  provider: GOOGLE_PROVIDER,
  token: tokenId
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

const logoutFB = () =>
  new Promise(res => {
    if (window.FB && window.FB.logout) {
      try {
        window.FB.logout(response => {
          console.log(response)
          res(response)
        })
      } catch (err) {
        console.log(err)
        res()
      }
    } else {
      res()
    }
  })
const logoutGoogle = () => {
  if (window.gapi) {
    const auth2 = window.gapi.auth2.getAuthInstance()
    if (auth2 && auth2.signOut) {
      return auth2
        .signOut()
        .then(auth2.disconnect())
        .catch(err => {
          console.log(err)
        })
    }
    return Promise.resolve()
  } else {
    return Promise.resolve()
  }
}
const logoutProvider = provider => {
  switch (provider) {
    case GOOGLE_PROVIDER: {
      return logoutGoogle()
    }
    case FACEBOOK_PROVIDER: {
      return logoutFB()
    }
    default: {
      return Promise.reject('No provider')
    }
  }
}

export const logout = provider => {
  return logoutProvider(provider)
    .then(() => {
      localStorage.clear()
    })
    .catch(err => {
      console.log(err)
    })
}
