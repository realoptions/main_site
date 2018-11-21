import { LOGOUT, UPDATE_API_KEY, UPDATE_AWS_CLIENT } from '../actions/constants'
import queryString from 'query-string'
const defaultQuery = {
  isSignedIn: false
}
export const splitHash = hash => {
  const split = hash.split('?')
  return split.length > 1 ? split[1] : ''
}
const getDefaultState = () => {
  const { token, usagePlanId } = queryString.parse(
    splitHash(window.location.hash)
  )
  return {
    ...defaultQuery,
    token,
    paidUsagePlanId: usagePlanId,
    isFromMarketPlace: !!(token && usagePlanId)
  }
}

export default (state = getDefaultState(), action) => {
  switch (action.type) {
    case UPDATE_API_KEY:
      return {
        ...state,
        apiKey: action.value
      }
    case UPDATE_AWS_CLIENT:
      return {
        ...state,
        isSignedIn: true,
        cognitoUser: action.user
      }
    case LOGOUT:
      return defaultQuery
    default:
      return state
  }
}
