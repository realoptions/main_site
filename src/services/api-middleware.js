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
    mode: 'cors',
    body: JSON.stringify({ customerId: email, usagePlanId }),
    headers: new Headers({
      Authorization: `${provider} ${token}`
    })
  }).then(jsonRes)
export const getUsagePlans = ({ token, provider }) =>
  fetch(`${url}/usageplan`, {
    mode: 'cors',
    headers: new Headers({
      Authorization: `${provider} ${token}`
    })
  }).then(jsonRes)
export const getApiKey = ({ email, token, provider }) =>
  fetch(`${url}/apikey/${email}`, {
    mode: 'cors',
    headers: new Headers({
      Authorization: `${provider} ${token}`
    })
  }).then(jsonRes)
export const getUsage = ({ email, usagePlanId, token, provider }) =>
  fetch(`${url}/usageplan/${email}/${usagePlanId}`, {
    mode: 'cors',
    headers: new Headers({
      Authorization: `${provider} ${token}`
    })
  }).then(jsonRes)
