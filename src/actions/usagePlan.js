import { UPDATE_USAGE_PLAN } from './constants'

export const setUsagePlan = dispatch => value =>
  dispatch({
    type: UPDATE_USAGE_PLAN,
    value
  })
