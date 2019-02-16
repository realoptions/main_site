import { UPDATE_USAGE_PLAN } from './constants'
//exported for usagePlan reducer
export const defaultPlan = null
export const setUsagePlan = dispatch => (value = defaultPlan) =>
  dispatch({
    type: UPDATE_USAGE_PLAN,
    value
  })
