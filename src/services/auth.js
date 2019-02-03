//import AWS from 'aws-sdk'
import Auth from '@aws-amplify/auth'

//import API from '@aws-amplify/api'
//import { url, awsRegion } from './aws'
/*import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
} from 'amazon-cognito-identity-js'*/
/*import {
  cognitoIdentityPoolId,
  cognitoUserPoolId,
  cognitoClientId,
  cognitoRegion
} from './aws'
import apigClientFactory from 'aws-api-gateway-client'*/
/*import {
  //signUp,
  credentialRefresh,
  //authenticateUser,
  //getSession
} from './helpers/promisifyAuth'*/

import { registerFree, registerPaid, getSubscriptions } from './api-catalog'
/*import auth from '../reducers/auth';

const POOL_DATA = {
  UserPoolId: cognitoUserPoolId,
  ClientId: cognitoClientId
}

const COGNITO_LOGIN_KEY = `cognito-idp.${cognitoRegion}.amazonaws.com/${cognitoUserPoolId}`*/

//returns promise
//on success, returns client instance, else error
/*const getClient = jwtToken => {
  const Logins = {
    [COGNITO_LOGIN_KEY]: jwtToken
  }
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: cognitoIdentityPoolId,
    Logins
  })
  return credentialRefresh(AWS.config.credentials).then(() => {
    const {
      accessKeyId,
      sessionToken,
      secretAccessKey
    } = AWS.config.credentials
    const apigClient = apigClientFactory.newClient({
      accessKey: accessKeyId,
      secretKey: secretAccessKey,
      sessionToken,
      region: awsRegion,
      invokeUrl: url
    })
    return signIn(apigClient).then(() => {
      return apigClient
    })
  })
}*/

//returns promise
//if success, returns client instance and cognitorUser, else error
const login = (email, password) => {
  return Auth.signUp({
    username: email,
    password,
    attributes: {
      email
    }
  }).then(user => {
    console.log(user)
    return user
  }) /*({
    user,
    userConfirmed: boolean;
    userSub: string;
  }))*/

  /*const authenticationData = {
    Username: email,
    Password: password
  }
  const authDetails = new AuthenticationDetails(authenticationData)
  const userPool = new CognitoUserPool(POOL_DATA)
  const userData = {
    Username: email,
    Pool: userPool
  }
  const cognitoUser = new CognitoUser(userData)
  return authenticateUser(cognitoUser, authDetails)
    .then(result => {
      const jwtToken = result.getIdToken().getJwtToken()
      return getClient(jwtToken)
    })
    .then(client => ({
      client,
      cognitoUser
    }))*/
}

/*
const rethrowNoLoginError = err => {
  if (err.code !== 'UsernameExistsException') {
    throw err
  }
}*/

const userDoesNotExist = signUpIfUserDoesNotExist => err => {
  if (err.code === 'UserNotFoundException') {
    return signUpIfUserDoesNotExist()
  } //UserNotConfirmedException
  throw err
}

//export for testing
//returns {isSubscribedPaid:bool, isSubscribedFree:bool}
export const filterSubscriptions = ({ paidUsagePlanId, freeUsagePlanId }) => ({
  data
}) =>
  data.reduce(
    (aggr, { id }) => {
      switch (id) {
        case paidUsagePlanId: {
          return { ...aggr, isSubscribedPaid: true }
        }
        case freeUsagePlanId: {
          return { ...aggr, isSubscribedFree: true }
        }
        default: {
          return aggr
        }
      }
    },
    { isSubscribedPaid: false, isSubscribedFree: false }
  )
const NEED_TO_SUBSCRIBE_PAID = 'NEED_TO_SUBSCRIBE_PAID'
const NEED_TO_SUBSCRIBE_FREE = 'NEED_TO_SUBSCRIBE_FREE'
const IS_SUBSCRIBED_FREE = 'IS_SUBSCRIBED_FREE'
const IS_SUBSCRIBED_PAID = 'IS_SUBSCRIBED_PAID'

//export for testing
export const handleSubscriptionLogic = ({
  isSubscribedFree,
  isSubscribedPaid,
  isFromMarketPlace
}) => {
  if (isFromMarketPlace && !isSubscribedPaid) {
    return NEED_TO_SUBSCRIBE_PAID
  } else if (!isSubscribedFree && !isSubscribedPaid) {
    return NEED_TO_SUBSCRIBE_FREE
  } else if (isSubscribedFree) {
    return IS_SUBSCRIBED_FREE
  } else if (isSubscribedPaid) {
    return IS_SUBSCRIBED_PAID
  }
  return '' //should never get here, see auth.test.js
}
//exported for testing
//returns promise
//if success, then returns current subscription OR nothing
export const conditionalSubscription = ({
  paidUsagePlanId,
  freeUsagePlanId,
  token,
  isFromMarketPlace
}) => API => {
  return getSubscriptions(API)
    .then(
      filterSubscriptions({
        paidUsagePlanId,
        freeUsagePlanId
      })
    )
    .then(({ isSubscribedFree, isSubscribedPaid }) => {
      switch (
        handleSubscriptionLogic({
          isFromMarketPlace,
          isSubscribedFree,
          isSubscribedPaid
        })
      ) {
        case NEED_TO_SUBSCRIBE_FREE:
          return registerFree(freeUsagePlanId).then(() => freeUsagePlanId)
        case NEED_TO_SUBSCRIBE_PAID:
          return registerPaid(paidUsagePlanId, freeUsagePlanId, token).then(
            () => paidUsagePlanId
          )
        case IS_SUBSCRIBED_FREE:
          return Promise.resolve(freeUsagePlanId)
        case IS_SUBSCRIBED_PAID:
          return Promise.resolve(paidUsagePlanId)
        default:
          //should never get here
          return Promise.resolve()
      }
    })
}

/**Always "register" instead of logging in.
 * Login will just fail on already registered
 * and then login.
 * Returns [subscription, cognitoUser] */

//returns
export const register = ({
  paidUsagePlanId,
  freeUsagePlanId,
  token,
  isFromMarketPlace
}) => {
  //const userPool = new CognitoUserPool(POOL_DATA)
  const subscriptionInstance = conditionalSubscription({
    paidUsagePlanId,
    freeUsagePlanId,
    token,
    isFromMarketPlace
  })
  /*return (email, password) => {
    return signUp(userPool, email, password)
      .catch(rethrowNoLoginError)
      .then(() => login(email, password))
      .then(({ client, cognitoUser }) =>
        Promise.all([subscriptionInstance(client), client, cognitoUser])
      )
  }*/
  return (email, password) => {
    return Auth.signIn(email, password) //if signin, then never get to singup
      .then(user => {
        console.log(user)
        return Promise.all([subscriptionInstance(), user])
      })
      .catch(userDoesNotExist(() => login(email, password))) //user doesn't exist, then signup
  }
  //.catch(rethrowNoLoginError)
  // .then(() => login(email, password))
  //.then(user=>Promise.all([subscriptionInstance(), user]))
  /*.then(({ client, cognitoUser }) =>
      Promise.all([subscriptionInstance(client), client, cognitoUser])
    )*/
}
/**
 * Returns [subscription, client, cognitoUser] */
export const init = ({
  paidUsagePlanId,
  freeUsagePlanId,
  token,
  isFromMarketPlace
}) => {
  //const userPool = new CognitoUserPool(POOL_DATA)
  //const cognitoUser = userPool.getCurrentUser()
  const subscriptionInstance = conditionalSubscription({
    paidUsagePlanId,
    freeUsagePlanId,
    token,
    isFromMarketPlace
  })
  return subscriptionInstance()

  /*return (cognitoUser
    ? getSession(cognitoUser).then(session => {
        const token = session.getIdToken().getJwtToken()
        return getClient(token)
      })
    : Promise.resolve()
  ).then(client =>
    Promise.all([subscriptionInstance(client), client, cognitoUser])
  )*/
}

export const logout = () => Auth.signOut()

//const signIn = client => client.invokeApi({}, '/signin', 'POST', {}, {})
