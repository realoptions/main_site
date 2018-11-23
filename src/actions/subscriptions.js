import {
  ADD_SUBSCRIPTION,
  DELETE_SUBSCRIPTION,
  IS_UNREGISTERING,
  UPDATE_CATALOG,
  NO_SUBSCRIPTION_ERROR,
  SUBSCRIPTION_ERROR,
  UPDATE_USAGE
} from './constants'
import { getUsage, getCatalog } from '../services/api-catalog'
import { keys } from '../reducers/catalog'
const containsString = (match, string) => match.toLowerCase().includes(string)
const checkKey = name => keys.find(key => containsString(name, key))

export const addSubscriptionLocal = dispatch => usagePlanId =>
  usagePlanId &&
  dispatch({
    type: ADD_SUBSCRIPTION,
    value: usagePlanId
  })

export const deleteSubscriptionLocal = dispatch => usagePlanId =>
  dispatch({
    type: DELETE_SUBSCRIPTION,
    value: usagePlanId
  })

export const updateUnSubscribing = dispatch => value =>
  dispatch({
    type: IS_UNREGISTERING,
    value
  })

export const subscribeError = dispatch => err =>
  dispatch({
    type: SUBSCRIPTION_ERROR,
    value: err
  })
export const noSubscribeError = dispatch => () =>
  dispatch({
    type: NO_SUBSCRIPTION_ERROR
  })
/*
export const removePaidSubscription = dispatch => (
  paidUsagePlanId,
  freeUsagePlanId,
  client
) => {
  dispatch({
    type: IS_UNREGISTERING,
    value: true
  })
  unregisterPaid(paidUsagePlanId, freeUsagePlanId, client)
    .then(() => {
      addSubscriptionLocal(dispatch)(freeUsagePlanId)
      deleteSubscriptionLocal(dispatch)(paidUsagePlanId)
      dispatch({ type: NO_SUBSCRIPTION_ERROR })
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: SUBSCRIPTION_ERROR,
        err
      })
    })
    .then(() =>
      dispatch({
        type: IS_UNREGISTERING,
        value: false
      })
    )
}*/

export const getSubscriptionUsage = dispatch => (usagePlanId, client) =>
  getUsage(usagePlanId, client)
    .then(({ data }) => dispatch({ type: UPDATE_USAGE, value: data }))
    .then(noSubscribeError(dispatch))
    .catch(subscribeError(dispatch))
//TODO!! test by mocking jest
export const getPossibleSubscriptions = dispatch =>
  getCatalog()
    .then(arr =>
      arr.reduce((aggr, curr) => {
        const key = checkKey(curr.name)
        if (key) {
          return { ...aggr, [key]: curr }
        } else {
          return aggr
        }
      }, {})
    )
    .then(value => dispatch({ type: UPDATE_CATALOG, value }))
