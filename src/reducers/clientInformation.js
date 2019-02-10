import { UPDATE_CLIENT_INFORMATION } from '../actions/constants'

const defaultClient = {
  email: '',
  profilePicture: '',
  token: '',
  provider: ''
}

export default (state = defaultClient, action) => {
  switch (action.type) {
    case UPDATE_CLIENT_INFORMATION:
      return { ...state, ...action.value }
    default:
      return state
  }
}
