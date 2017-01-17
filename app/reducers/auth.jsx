import axios from 'axios'
import {loginIssue} from './loginIssues';
import {getUsersCoffees} from 'APP/app/reducers/changeselectedcoffee.jsx';
/* eslint no-use-before-define: 0 */

const reducer = (state=null, action) => {
  switch(action.type) {
    case AUTHENTICATED:
      return action.user
  }
  return state
}

const AUTHENTICATED = 'AUTHENTICATED'
export const authenticated = user => ({
  type: AUTHENTICATED, user
})

export const login = (username, password) =>
  dispatch =>
    axios.post('/api/auth/local/login',
      {username, password})
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
        dispatch(getUsersCoffees(user.subscription_id))
      })
      .catch(failed => dispatch(authenticated(null)))

export default reducer
