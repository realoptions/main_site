import {
  ADD_SUBSCRIPTION,
  DELETE_SUBSCRIPTION,
  IS_UNREGISTERING,
  UPDATE_CATALOG,
  NO_SUBSCRIPTION_ERROR,
  SUBSCRIPTION_ERROR,
  UPDATE_USAGE
} from './constants'
import { unregisterPaid, getUsage, getCatalog } from '../services/api-catalog'
import { keys } from '../reducers/catalog'
const containsString = (match, string) => match.toLowerCase().includes(string)
const checkKey = name => keys.find(key => containsString(name, key))

export const addSubscriptionLocal = dispatch => usagePlanId =>
  usagePlanId &&
  dispatch({
    type: ADD_SUBSCRIPTION,
    value: usagePlanId
  })

const deleteSubscriptionLocal = dispatch => usagePlanId =>
  dispatch({
    type: DELETE_SUBSCRIPTION,
    value: usagePlanId
  })

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
}

export const getSubscriptionUsage = dispatch => (usagePlanId, client) =>
  getUsage(usagePlanId, client)
    .then(({ data }) => dispatch({ type: UPDATE_USAGE, value: data }))
    .then(() => dispatch({ type: NO_SUBSCRIPTION_ERROR }))
    .catch(err => dispatch({ type: SUBSCRIPTION_ERROR, err }))

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
