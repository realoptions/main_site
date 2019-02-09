import { UPDATE_EMAIL } from '../actions/constants'

export default (state = '', action) => {
  switch (action.type) {
    case UPDATE_EMAIL:
      return action.value
    default:
      return state
  }
}
