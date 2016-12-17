import axios from 'axios'
import { browserHistory } from 'react-router'


export function login(data) {
  return dispatch => {
    axios.post('http://localhost:4000/auth/login', data)
    .then(res => {
      const token = res.data.token
      const user = res.data.user
      sessionStorage.setItem('jwtToken', token)
      sessionStorage.setItem('user', JSON.stringify(user))
      dispatch(setCurrentUser(user))
      user.admin ? browserHistory.push('/dashboard') : browserHistory.push('/')
      console.log('登录成功了!')
    })
    .catch(err => {
      handleError(err)
    })
  }
}

export function signUp(data) {
  return dispatch => {
    axios.post('http://localhost:4000/auth/signup', data)
    .then(res => {
      const token = res.data.token
      const user = res.data.user
      sessionStorage.setItem('jwtToken', token)
      sessionStorage.setItem('user', JSON.stringify(user))
      dispatch(setCurrentUser(user))
      browserHistory.push('/')
      console.log('注册成功了!')
    })
    .catch(err => {
      handleError(err)
    })
  }
}

export function logout() {
  return dispatch => {
    sessionStorage.removeItem('jwtToken')
    sessionStorage.removeItem('user')
    dispatch(setCurrentUser({}))
    browserHistory.push('/')
  }
}

export function setCurrentUser(user) {
  return {
    type: 'AUTH_USER',
    user
  }
}

function handleError(error) {
  if (error.response) {
    console.log(error.response.data.error)
  } else {
    console.log(error)
  }
}
