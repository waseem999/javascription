import { combineReducers } from 'redux'
import modalReducer from './loginModal'

const rootReducer = combineReducers({
  auth: require('./auth').default, 
  modalVisible: modalReducer 
})

export default rootReducer
