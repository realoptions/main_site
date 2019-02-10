import { UPDATE_CLIENT_INFORMATION } from './constants'

export const setClientInformation = dispatch => value =>
  dispatch({
    type: UPDATE_CLIENT_INFORMATION,
    value
  })
