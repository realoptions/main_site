import { url } from './aws'
import { API_NAME } from './configureAws'
import API from '@aws-amplify/api'
const convertJson = res => res.json()
export const getCatalog = () =>
  fetch(`${url}/catalog`)
    .then(convertJson)
    .then(({ items }) => items)

export const registerFree = usagePlanId =>
  API.put(API_NAME, `/subscriptions/${usagePlanId}`)

const marketPlaceSubscribe = (usagePlanId, token) =>
  API.put(API_NAME, `/marketplace-subscriptions/${usagePlanId}`, {
    body: { token }
  })
/*client.invokeApi(
    {},
    `/marketplace-subscriptions/${usagePlanId}`,
    'PUT',
    {},
    { token }
  )*/

//has to happen in order (cant do it in parallel)
export const registerPaid = (paidUsagePlanId, freeUsagePlanId, token) =>
  removeSubscription(freeUsagePlanId).then(() =>
    marketPlaceSubscribe(paidUsagePlanId, token)
  )

//has to happen in order (cant do it in parallel)
export const unregisterPaid = (paidUsagePlanId, freeUsagePlanId) =>
  removeSubscription(paidUsagePlanId).then(() => registerFree(freeUsagePlanId))

const removeSubscription = usagePlanId =>
  API.delete(API_NAME, `/subscriptions/${usagePlanId}`)
//client.invokeApi({}, `/subscriptions/${usagePlanId}`, 'DELETE', {}, {})

//exported for testing
export const getCurrentMonth = (date = new Date()) => {
  const start = new Date(date.getFullYear(), date.getMonth(), 1)
    .toJSON()
    .split('T')[0]
  let end = date
  end.setDate(end.getDate() + 1)
  end = end.toJSON().split('T')[0]
  return { start, end }
}
const additionalParameters = {
  queryStringParameters: {
    // OPTIONAL
    queryParams: getCurrentMonth()
  }
}
export const getUsage = usagePlanId =>
  API.get(API_NAME, `/subscriptions/${usagePlanId}/usage`, additionalParameters)
/* client.invokeApi(
    {},
    `/subscriptions/${usagePlanId}/usage`,
    'GET',
    { queryParams: getCurrentMonth() },
    {}
  )
*/
export const getSubscriptions = () => API.get(API_NAME, '/subscriptions')

export const showApiKey = () =>
  API.get(API_NAME, '/apikey').then(({ data: { value } }) => value)
/*client
    .invokeApi({}, '/apikey', 'GET', {}, {})
    .then(({ data: { value } }) => value)*/
//client.invokeApi({}, '/subscriptions', 'GET', {}, {})
