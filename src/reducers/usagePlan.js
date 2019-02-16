import { UPDATE_USAGE_PLAN } from '../actions/constants'
import { defaultPlan } from '../actions/usagePlan'
export default (state = defaultPlan, action) => {
  switch (action.type) {
    case UPDATE_USAGE_PLAN:
      return action.value
    default:
      return state
  }
}
