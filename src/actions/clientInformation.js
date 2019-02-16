import { UPDATE_CLIENT_INFORMATION } from './constants'
//exported for clientInformation reducer
export const defaultClient = {
  email: '',
  profilePicture: '',
  token: '',
  provider: ''
}
export const setClientInformation = dispatch => (value = defaultClient) =>
  dispatch({
    type: UPDATE_CLIENT_INFORMATION,
    value
  })
