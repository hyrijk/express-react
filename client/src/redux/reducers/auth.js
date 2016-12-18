import isEmpty from 'lodash/fp/isEmpty'

const initialState = {
  isAuthenticated: false,
  currentUser: {},
  error: ''
}

export default (state=initialState, action={}) => {
  switch (action.type) {
    case 'AUTH_USER':
      return {
        isAuthenticated: !isEmpty(action.user),
        currentUser: action.user
      }
    case 'AUTH_ERROR':
      return {
        ...state,
        error: action.error
      }
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: ''
      }
    default:
      return state
  }
}
