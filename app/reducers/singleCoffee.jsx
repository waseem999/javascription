import axios from 'axios';

const initialState = {
  coffeeModalOpen: false,
  selectedCoffee: null
}

const reducer = (state=initialState, action) => {
  const newState = Object.assign({}, state)
  switch(action.type) {
  case SHOW_COFFEE_MODAL:
    newState.coffeeModalOpen = action.modal
    break; 
  case HIDE_COFFEE_MODAL:
    newState.coffeeModalOpen = action.modal
    break;
  case SET_SELECTED_COFFEE:
    newState.selectedCoffee = action.selectedCoffee
  default: 
    return state;
  }
  return newState
}

const SHOW_COFFEE_MODAL = 'SHOW_COFFEE_MODAL'
const HIDE_COFFEE_MODAL = 'HIDE_COFFEE_MODAL'
const SET_SELECTED_COFFEE = 'SET_SELECTED_COFFEE'


export const showCoffeeModal = () => ({
  type: SHOW_COFFEE_MODAL,
  modal: true
})

export const hideCoffeeModal = () => ({
  type: HIDE_COFFEE_MODAL,
  modal: false
})

export const loadCoffee = function(selectedCoffee){
  return {
    type: SET_SELECTED_COFFEE,
    selectedCoffee
  }
};

export const getCoffee = (coffeeId) => {
  return(dispatch) => {
    axios.get(`/api/coffee/singleCoffee/${coffeeId}`)
    .then( res => {
      dispatch(loadCoffee(res.data))
    })
    .catch(err => {
      console.log(err)
    })
  }
}


export default reducer