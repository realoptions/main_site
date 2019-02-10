import apiKey from './apiKey'
import clientInformation from './clientInformation'
import usagePlan from './usagePlan'
import { combineReducers } from 'redux'
export default combineReducers({
  apiKey,
  clientInformation,
  usagePlan
})
