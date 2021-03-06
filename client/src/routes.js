import React, { PropTypes } from 'react'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from './ui/App'
import LogIn from './ui/auth/LogIn'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { setCurrentUser } from './redux/actions/authActions'
import SingUp from './ui/auth/SignUp'
import NewPosts from './ui/posts/NewPost'
import Home from './ui/Home'
import ShowPost from './ui/posts/ShowPost'
import EditPost from './ui/posts/EditPost'

if (sessionStorage.jwtToken) {
  const user = JSON.parse(sessionStorage.user)
  store.dispatch(setCurrentUser(user))
}

function isLogin() {
  return sessionStorage.getItem('jwtToken') && sessionStorage.getItem('user')
}

function requiredAuth(nextState, replace) {
  if (!isLogin()) {
    replace('/login')
  }
}

export const renderRoutes = (props) => {
  return (
    <Provider store={store}>
      <Router history={hashHistory} >
        <Route path='/' component={App}>
          <IndexRoute component={Home} />
          <Route path='/login' component={LogIn} />
          <Route path='/signup' component={SingUp} />
          <Route path='/posts/new' component={NewPosts} onEnter={requiredAuth}/>
          <Route path='/posts/:post_id' component={ShowPost} />
          <Route path='/posts/:post_id/edit' component={EditPost} onEnter={requiredAuth}/>
        </Route>
      </Router>
    </Provider>
  )
}
