import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default, 
  selectedCoffees: require('./changeselectedcoffee.jsx').default,
  modalVisible: require('./loginModal').default,
  subscription: require('./subscription').default,
  loginProb: require('./loginIssues.jsx').default,
  signinProb: require('./signinIssues.jsx').default,
  allCoffees: require('./allcoffeescreator.jsx').default,
  Quotes: require('./quote.jsx').default,
  singleCoffee: require('./singleCoffee.jsx').default,
  price: require('./pricereducer.jsx').default
})

export default rootReducer
