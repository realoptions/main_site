import { UPDATE_AWS_CLIENT, LOGOUT } from '../actions/constants'

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_AWS_CLIENT:
      return action.client
    case LOGOUT:
      return {}
    default:
      return state
  }
}
