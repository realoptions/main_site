import { url } from './aws'
import queryString from 'query-string'
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

export const getUsage = ({ email, usagePlanId, token, provider, start, end }) =>
  fetch(
    `${url}/usage/${usagePlanId}?${queryString.stringify({
      end,
      start,
      customerId: email
    })}`,
    {
      headers: new Headers({
        Authorization: `${provider} ${token}`
      })
    }
  ).then(jsonRes) //returns {}
