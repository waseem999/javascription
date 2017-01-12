

const REMOVE_SELECTED_COFFEES = 'REMOVE_SELECTED_COFFEES';
const ADD_COFFEES_TO_SELECTED = 'ADD_COFFEES_TO_SELECTED'

export default function reducer(state = [], action){
    switch(action.type){
        case REMOVE_SELECTED_COFFEES:
            return action.coffees;
        case ADD_COFFEES_TO_SELECTED:
            return [...state.selectedCoffees, action.coffees];
        default:
            return state;
    }
};


export function removeCoffeesCreator(coffeeList){
    return {
        type: REMOVE_SELECTED_COFFEES,
        coffees: coffeeList
    }
}

export function addCoffeesCreator(coffeeList){
    return {
        type: ADD_COFFEES_TO_SELECTED,
        coffees: coffeeList
    }
}