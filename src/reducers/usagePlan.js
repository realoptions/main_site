import { UPDATE_USAGE_PLAN } from '../actions/constants'

export default (state = '', action) => {
  switch (action.type) {
    case UPDATE_USAGE_PLAN:
      return action.value
    default:
      return state
  }
}
