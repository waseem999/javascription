const CHANGE_PRICE = 'CHANGE_PRICE';


export default function reducer(state = 0, action){
    switch(action.type){
        case CHANGE_PRICE:
            return action.price;
        default:
            return state;
    }
};

export function changePrice(price){
    return {
        type: CHANGE_PRICE,
        price
    }
}