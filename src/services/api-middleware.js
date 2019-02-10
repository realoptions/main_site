import { url } from './aws'
const jsonRes = res => res.json()
export const createApiKeyAndSubscribe = ({
  email,
  usagePlanId,
  token,
  provider
}) =>
  fetch(`${url}/apikey`, {
    method: 'POST',
    body: JSON.stringify({ customerId: email, usagePlanId }),
    headers: new Headers({
      Authorization: `${provider} ${token}`
    })
  }).then(jsonRes)
export const getUsagePlans = ({ token, provider }) =>
  fetch(`${url}/usageplan`, {
    headers: new Headers({
      Authorization: `${provider} ${token}`
    })
  }).then(jsonRes)
export const getApiKey = ({ email, token, provider }) =>
  fetch(`${url}/apikey/${email}`, {
    headers: new Headers({
      Authorization: `${provider} ${token}`
    })
  }).then(jsonRes)
export const getUsage = ({ email, usagePlanId, token, provider }) =>
  fetch(`${url}/usageplan/${email}/${usagePlanId}`, {
    headers: new Headers({
      Authorization: `${provider} ${token}`
    })
  }).then(jsonRes)
