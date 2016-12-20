import { combineReducers } from 'redux'
import auth from './reducers/auth'
import posts from './reducers/posts'
import post from './reducers/post'
import error from './reducers/error'

export default combineReducers({
  auth,
  posts,
  post,
  error
})
