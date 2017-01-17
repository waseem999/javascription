const LOAD_ALL_COFFEES = 'LOAD_ALL_COFFEES';


export default function reducer(state = [], action){
    switch(action.type){
        case LOAD_ALL_COFFEES:
            return action.coffees;
        default:
            return state;
    }
};

export function loadAllCoffees(coffeeList){
    return {
        type: LOAD_ALL_COFFEES,
        coffees: coffeeList
    }
}