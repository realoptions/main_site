import { url } from './aws'

const convertJson = res => res.json()
export const getCatalog = () =>
  fetch(`${url}/catalog`)
    .then(convertJson)
    .then(({ items }) => items)

export const registerFree = (usagePlanId, client) =>
  client.invokeApi({}, `/subscriptions/${usagePlanId}`, 'PUT', {}, {})

const marketPlaceSubscribe = (usagePlanId, token, client) =>
  client.invokeApi(
    {},
    `/marketplace-subscriptions/${usagePlanId}`,
    'PUT',
    {},
    { token }
  )

//has to happen in order (cant do it in parallel)
export const registerPaid = (paidUsagePlanId, freeUsagePlanId, token, client) =>
  removeSubscription(freeUsagePlanId, client).then(() =>
    marketPlaceSubscribe(paidUsagePlanId, token, client)
  )

//has to happen in order (cant do it in parallel)
export const unregisterPaid = (paidUsagePlanId, freeUsagePlanId, client) =>
  removeSubscription(paidUsagePlanId, client).then(() =>
    registerFree(freeUsagePlanId, client)
  )

const removeSubscription = (usagePlanId, client) =>
  client.invokeApi({}, `/subscriptions/${usagePlanId}`, 'DELETE', {}, {})

const getCurrentMonth = () => {
  const date = new Date()
  const start = new Date(date.getFullYear(), date.getMonth(), 1)
    .toJSON()
    .split('T')[0]
  const end = new Date().toJSON().split('T')[0]
  return { start, end }
}

export const getUsage = (usagePlanId, client) =>
  client.invokeApi(
    {},
    `/subscriptions/${usagePlanId}/usage`,
    'GET',
    { queryParams: getCurrentMonth() },
    {}
  )

export const getSubscriptions = client =>
  client.invokeApi({}, '/subscriptions', 'GET', {}, {})
