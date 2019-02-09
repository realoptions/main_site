import { UPDATE_API_KEY } from '../actions/constants'

export default (state = '', action) => {
  switch (action.type) {
    case UPDATE_API_KEY:
      return action.value
    default:
      return state
  }
}
