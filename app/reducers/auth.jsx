import axios from 'axios'
import {loginIssue} from './loginIssues';
import {getUsersCoffees} from 'APP/app/reducers/changeselectedcoffee.jsx';
import {hideModal} from './loginModal'

/* eslint no-use-before-define: 0 */

const reducer = (state=null, action) => {
  switch(action.type) {
    case AUTHENTICATED:
      return action.user
    case APPLY_USER_CHANGES:
      console.log(action);
      return state ? Object.assign({}, state, action.user) : null;
  }
  return state
}

const AUTHENTICATED = 'AUTHENTICATED'
export const authenticated = user => ({
  type: AUTHENTICATED, user
})

const APPLY_USER_CHANGES = 'APPLY_USER_CHANGES';
export const applyUserChanges = user => ({
  type: APPLY_USER_CHANGES, user
});

export const login = (username, password) =>
  dispatch =>
    axios.post('/api/auth/local/login',
      {username, password})
      .then(() => {
        dispatch(hideModal())
        dispatch(whoami())
      })
      .catch(() => {
        dispatch(loginIssue())
        dispatch(whoami())
      })

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        if(response.data){
          const user = response.data
          dispatch(authenticated(user))
          dispatch(getUsersCoffees(user.subscription_id))
        }
      })
      .catch(failed => dispatch(authenticated(null)))

export const updateUser = (id, data) =>
  dispatch =>
    axios.put(`/api/users/${id}`, {data})
      .then(({data}) => dispatch(applyUserChanges(data.data)))
      .catch(console.log.bind(console));

export default reducer
