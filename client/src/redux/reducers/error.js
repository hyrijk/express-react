const initialState = {
  postError: {}
}

export default function(state=initialState, action={}) {
  switch(action.type) {
    case 'SET_POST_ERROR':
      return {
        ...state,
        postError: action.error
      }
    case 'CLEAR_POST_ERROR':
      return {
        ...state,
        postError: ''
      }
    default:
      return state
  }
}
