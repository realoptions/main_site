import apiKey from './apiKey'
import email from './email'
import usagePlan from './usagePlan'
import profilePicture from './profilePicture'
import { combineReducers } from 'redux'
export default combineReducers({
  apiKey,
  email,
  profilePicture,
  usagePlan
})
