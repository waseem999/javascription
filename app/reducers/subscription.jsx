import axios from 'axios';
const ADD_SCHEDULE = "ADD_SCHEDULE";
const ADD_SCHEDULE_FRONT_END = "ADD_SCHEDULE_FRONT_END";

export const addSchedule = schedule => ({
    type: ADD_SCHEDULE,
    schedule
});

export const addScheduleFrontEnd = schedule => ({
    type: ADD_SCHEDULE_FRONT_END,
    schedule
});


const initialState = { 
    selectedDays: {}
  };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SCHEDULE: 
       return Object.assign({}, state, { selectedDays: action.schedule.frequencyObject });
    case ADD_SCHEDULE_FRONT_END: 
       return Object.assign({}, state, { selectedDays: action.schedule });

    default: 
       return state;
  }
}

export const getSubscription = () => {
  return dispatch => {
    axios.get("/api/subscription/days")
      .then(response => {
        dispatch(addSchedule(response.data));
      })
      .catch((error)=> console.error(error));
  };
};

export default reducer


