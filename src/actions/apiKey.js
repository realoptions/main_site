import { UPDATE_API_KEY } from './constants'

export const setApiKey = dispatch => value =>
  dispatch({
    type: UPDATE_API_KEY,
    value
  })
