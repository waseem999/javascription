const reducer = (state=false, action) => {
  switch(action.type) {
  case SHOW_MODAL:
    return action.modal  
  case HIDE_MODAL:
    return action.modal
  }
  return state
}

const SHOW_MODAL = 'SHOW_MODAL'
const HIDE_MODAL = 'HIDE_MODAL'

export const showModal = () => ({
  type: SHOW_MODAL,
  modal: true
})

export const hideModal = () => ({
  type: HIDE_MODAL,
  modal: false
})


export default reducer
