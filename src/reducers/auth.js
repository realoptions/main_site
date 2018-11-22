import { LOGOUT, UPDATE_API_KEY, UPDATE_AWS_CLIENT } from '../actions/constants'
import { getQueryString } from '../services/helpers/queryString'
const defaultQuery = {
  isSignedIn: false
}
export const splitHash = hash => {
  const split = hash.split('?')
  return split.length > 1 ? split[1] : ''
}
export const getDefaultState = (hash = window.location.hash) => {
  const { token, usagePlanId } = getQueryString(splitHash(hash))
  return {
    ...defaultQuery,
    token,
    isFromMarketPlace: !!(token && usagePlanId)
  }
}

const defaultState = getDefaultState()

export default (state = defaultState, action) => {
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
