import { UPDATE_PROFILE_PICTURE } from '../actions/constants'

export default (state = '', action) => {
  switch (action.type) {
    case UPDATE_PROFILE_PICTURE:
      return action.value
    default:
      return state
  }
}
