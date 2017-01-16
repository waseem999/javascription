import { combineReducers } from 'redux'
import modalReducer from './loginModal'

const rootReducer = combineReducers({
  auth: require('./auth').default, 
  selectedCoffees: require('./removeselectedcoffee.jsx').default,
  modalVisible: modalReducer,
  subscription: require('./subscription').default,
  loginProb: require('./loginIssues.jsx').default,
  signinProb: require('./signinIssues.jsx').default
})

export default rootReducer
