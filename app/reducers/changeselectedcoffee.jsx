import axios from 'axios';

const RESET_SELECTED_COFFEES = 'RESET_SELECTED_COFFEES';
const ADD_COFFEES_TO_SELECTED = 'ADD_COFFEES_TO_SELECTED';


export default function reducer(state = [], action){
    switch(action.type){
        case RESET_SELECTED_COFFEES:
            return action.coffees;
        case ADD_COFFEES_TO_SELECTED:
            let arr = [...state, ...action.coffees]
            return arr;
        default:
            return state;
    }
};


export function removeCoffeesCreator(coffeeList){
    return {
        type: RESET_SELECTED_COFFEES,
        coffees: coffeeList
    }
}

export function addCoffeesCreator(coffeeList){
    return {
        type: ADD_COFFEES_TO_SELECTED,
        coffees: coffeeList
    }
}

export const getUsersCoffees = (id) => {
  return dispatch => {
    axios.get(`/api/subscription/selectedCoffees/${id}`)
      .then(response => {
        dispatch(addCoffeesCreator(response.data[0].products))
      })
      .catch((error)=> console.error(error));
  };
};

