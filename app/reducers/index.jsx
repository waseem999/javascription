import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default, 
  subscription: require('./subscription').default 
})

export default rootReducer
