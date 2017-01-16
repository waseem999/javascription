/* eslint no-use-before-define: 0 */

const reducer = (state=false, action) => {
  switch(action.type) {
    case SIGNIN_ISSUE:
      return action.issue
  }
  return state
}

const SIGNIN_ISSUE = 'SIGNIN_ISSUE'

export const signinIssue = () => ({
  type: SIGNIN_ISSUE, 
  issue: true
})

export default reducer