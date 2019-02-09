import { UPDATE_PROFILE_PICTURE } from './constants'

export const setProfilePicture = dispatch => value =>
  dispatch({
    type: UPDATE_PROFILE_PICTURE,
    value
  })
