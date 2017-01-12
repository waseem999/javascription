import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default, 
  subscription: require('./subscription').default ,
  selectedCoffees: require('./removeselectedcoffee.jsx').default
})

export default rootReducer
