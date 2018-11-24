import {
  ADD_SUBSCRIPTION,
  DELETE_SUBSCRIPTION,
  IS_UNREGISTERING,
  UPDATE_CATALOG,
  NO_SUBSCRIPTION_ERROR,
  SUBSCRIPTION_ERROR,
  UPDATE_USAGE
} from './constants'
import { getUsage, getCatalog, unregisterPaid } from '../services/api-catalog'
import { keys } from '../reducers/catalog'
import { init } from '../services/auth'
import {
  updateSignIn,
  updateLoggingIn,
  noLoginError,
  loginError
} from './signIn'
const containsString = (match, string) => match.toLowerCase().includes(string)
const checkKey = name => keys.find(key => containsString(name, key))

//export for testing
export const addSubscriptionLocal = dispatch => usagePlanId =>
  usagePlanId &&
  dispatch({
    type: ADD_SUBSCRIPTION,
    value: usagePlanId
  })

//export for testing
export const deleteSubscriptionLocal = dispatch => usagePlanId =>
  dispatch({
    type: DELETE_SUBSCRIPTION,
    value: usagePlanId
  })

//export for testing
export const updateUnSubscribing = dispatch => value =>
  dispatch({
    type: IS_UNREGISTERING,
    value
  })

//export for testing
export const subscribeError = dispatch => err =>
  dispatch({
    type: SUBSCRIPTION_ERROR,
    value: err
  })

//export for testing
export const noSubscribeError = dispatch => () =>
  dispatch({
    type: NO_SUBSCRIPTION_ERROR
  })

//export for testing
export const subscribeAndLogin = dispatch => {
  const addSubscription = addSubscriptionLocal(dispatch)
  const signIn = updateSignIn(dispatch)
  return fn =>
    fn().then(([usagePlanId, client, cognitoUser]) =>
      Promise.all([addSubscription(usagePlanId), signIn(client, cognitoUser)])
    )
}

//replaces "init" in AppMenu
export const onPageLoad = dispatch => {
  const subAndLogin = subscribeAndLogin(dispatch)
  return ({ token, isFromMarketPlace }) => () =>
    getPossibleSubscriptions().then(possibleSubscriptions =>
      Promise.all([
        subAndLogin(() =>
          init({
            paidUsagePlanId: possibleSubscriptions.paid.id,
            freeUsagePlanId: possibleSubscriptions.free.id,
            token,
            isFromMarketPlace
          })
        ),
        dispatch({
          type: UPDATE_CATALOG,
          value: possibleSubscriptions
        })
      ])
    )
}

//replaces "logInAndGoHome" in SignIn
export const onLogIn = dispatch => {
  const subAndLogin = subscribeAndLogin(dispatch)
  const updateLogin = updateLoggingIn(dispatch)
  const updateNoLoginError = noLoginError(dispatch)
  const updateLoginError = loginError(dispatch)
  return (fn, successFn) => e => {
    updateLogin(true)
    return subAndLogin(() => fn(e))
      .then(updateNoLoginError)
      .then(successFn)
      .catch(updateLoginError)
      .then(() => updateLogin(false))
  }
}

export const removePaidSubscription = dispatch => {
  const updateUnSubscribe = updateUnSubscribing(dispatch)
  const addSubscription = addSubscriptionLocal(dispatch)
  const deleteSubscription = deleteSubscriptionLocal(dispatch)
  const subError = subscribeError(dispatch)
  const noSubError = noSubscribeError(dispatch)
  return (paidUsagePlanId, freeUsagePlanId, client) => () => {
    updateUnSubscribe(true)
    return unregisterPaid(paidUsagePlanId, freeUsagePlanId, client)
      .then(() =>
        Promise.all([
          addSubscription(freeUsagePlanId),
          deleteSubscription(paidUsagePlanId),
          noSubError()
        ])
      )
      .catch(subError)
      .then(() => updateUnSubscribe(false))
  }
}

export const getSubscriptionUsage = dispatch => (usagePlanId, client) =>
  getUsage(usagePlanId, client)
    .then(({ data }) => dispatch({ type: UPDATE_USAGE, value: data }))
    .then(noSubscribeError(dispatch))
    .catch(subscribeError(dispatch))

//export for testing
export const getPossibleSubscriptions = () =>
  getCatalog().then(arr =>
    arr.reduce((aggr, curr) => {
      const key = checkKey(curr.name)
      if (key) {
        return { ...aggr, [key]: curr }
      } else {
        return aggr
      }
    }, {})
  )
