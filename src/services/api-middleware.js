import { url } from './aws'
const jsonRes = res => res.json()
export const createApiKeyAndSubscribe = (email, usagePlanId) =>
  fetch(`${url}/apikey`, {
    method: 'POST',
    body: JSON.stringify({ customerId: email, usagePlanId })
  }).then(jsonRes)
export const getUsagePlans = () => fetch(`${url}/usageplan`).then(jsonRes)
export const getApiKey = email => fetch(`${url}/apikey/${email}`).then(jsonRes)
export const getUsage = (email, usagePlanId) =>
  fetch(`${url}/usageplan/${email}/${usagePlanId}`).then(jsonRes)
