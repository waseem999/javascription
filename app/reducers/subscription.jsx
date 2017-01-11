import axios from 'axios';
const ADD_DAY = "ADD_DAY";

export const logDay = day => ({
    type: ADD_DAY,
    day
});

const initialState = { 
    dayselected: []
  };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DAY: 

       return Object.assign({}, state, { dayselected: action.days });
        break;


    default: 
       return state;
  }
}

export const getUserSubscriptionDays = () => {
  return dispatch => {
    axios.get("/api/subscription")
      .then(response => {
        dispatch(logDay(response.data));
      })
      .catch((error)=> console.error(error));
  };
};

export default reducer


