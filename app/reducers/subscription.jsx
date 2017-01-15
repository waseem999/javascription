import axios from 'axios';
const ADD_SCHEDULE = "ADD_SCHEDULE";

export const logSchedule = schedule => ({
    type: ADD_SCHEDULE,
    schedule
});

const initialState = { 
    selecteddays: {}
  };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SCHEDULE: 
       return Object.assign({}, state, { selecteddays: action.schedule.frequencyObject });

    default: 
       return state;
  }
}

export const getSubscription = () => {
  return dispatch => {
    axios.get("/api/subscription/days")
      .then(response => {
        dispatch(logSchedule(response.data));
      })
      .catch((error)=> console.error(error));
  };
};

export default reducer


