import { UPDATE_EMAIL } from '../actions/constants'

export const setEmail = dispatch => value =>
  dispatch({
    type: UPDATE_EMAIL,
    value
  })
