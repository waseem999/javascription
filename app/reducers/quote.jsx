import axios from 'axios';
const LOAD_QUOTE = "LOAD_QUOTE";


export const loadQuote = quote => ({
    type: LOAD_QUOTE,
    quote
});


const initialState = { 
    Quotes: {}
  };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_QUOTE: 
    console.log("action", action)
       return Object.assign({}, state, { Quotes: action.quote});

    default: 
       return state;
  }
}

export const getQuote = () => {
  return dispatch => {
    axios.get("/api/quote")
      .then(response => {
        dispatch(loadQuote(response.data));
      })
      .catch((error)=> console.error(error));
  };
};

export default reducer