import map from 'lodash/fp/map'
import filter from 'lodash/fp/filter'

export default (state =[], action={}) => {
  switch(action.type) {
    case 'Add_POST':
      return [action.post, ...state]
    case 'LOAD_POSTS':
      return action.posts
    case 'EDIT_POST':
      return map((post, index) => {
        if (post._id === action.post._id) {
          return action.post
        } else {
          return post
        }
      }, state)
    case 'DELETE_POST':
    console.log(action)
    return filter((post) => {
      return post._id !== action.id
    }, state)
    default:
      return state
  }
}
