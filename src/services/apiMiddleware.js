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
  }).then(jsonRes) //returns { keyValue: "somevalue", keyId: "someid"}
export const getUsagePlans = ({ token, provider }) =>
  fetch(`${url}/usageplans`, {
    headers: new Headers({
      Authorization: `${provider} ${token}`
    })
  }).then(jsonRes) //returns [{ id: "ko2ynl", name: "Admin Tier", description: "Unlimited Requests"}]
export const getApiKey = ({ email, token, provider }) =>
  fetch(`${url}/apikey/${email}`, {
    headers: new Headers({
      Authorization: `${provider} ${token}`
    })
  }).then(jsonRes) //returns { keyValue: "somevalue", keyId: "someid"}
export const getUsage = ({ email, usagePlanId, token, provider, start, end }) =>
  fetch(`${url}/usage/${email}/${usagePlanId}?end=${end}&start=${start}`, {
    headers: new Headers({
      Authorization: `${provider} ${token}`
    })
  }).then(jsonRes)
