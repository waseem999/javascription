/* eslint no-use-before-define: 0 */

const reducer = (state=false, action) => {
  switch(action.type) {
    case LOGIN_ISSUE:
      return action.issue
  }
  return state
}

const LOGIN_ISSUE = 'LOGIN_ISSUE'

export const loginIssue = () => ({
  type: LOGIN_ISSUE, 
  issue: true
})

// const SIGNIN_ISSUE = 'SIGNIN_ISSUE'

// export const signinIssue = () => ({
//   type: SIGNIN_ISSUE, 
//   issue: true
// })

export default reducer
