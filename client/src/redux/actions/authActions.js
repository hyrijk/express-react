import axios from 'axios'
import { hashHistory } from 'react-router'
import setting from '../../setting'

export function login(data) {
  return dispatch => {
    axios.post(`${setting.host}/auth/login`, data)
    .then(res => {
      const token = res.data.token
      const user = res.data.user
      sessionStorage.setItem('jwtToken', token)
      sessionStorage.setItem('user', JSON.stringify(user))
      dispatch(setCurrentUser(user))
      hashHistory.push('/dashboard')
      console.log('登录成功了!')
    })
    .catch(err => {
      handleError(err, dispatch)
    })
  }
}

export function signUp(data) {
  return dispatch => {
    axios.post(`${setting.host}/auth/signup`, data)
    .then(res => {
      const token = res.data.token
      const user = res.data.user
      sessionStorage.setItem('jwtToken', token)
      sessionStorage.setItem('user', JSON.stringify(user))
      dispatch(setCurrentUser(user))
      hashHistory.push('/dashboard')
      console.log('注册成功了!')
    })
    .catch(err => {
      handleError(err, dispatch)
    })
  }
}

export function logout() {
  return dispatch => {
    sessionStorage.removeItem('jwtToken')
    sessionStorage.removeItem('user')
    dispatch(setCurrentUser({}))
    hashHistory.push('/')
  }
}

export function setCurrentUser(user) {
  return {
    type: 'AUTH_USER',
    user
  }
}

export function setAuthError(error) {
  return {
    type: 'AUTH_ERROR',
    error
  }
}

export function clearError() {
  return {
    type: 'CLEAR_ERROR'
  }
}

function handleError(error, dispatch) {
  if (error.response) {
    dispatch(setAuthError(error.response.data.error))
  } else {
    console.log(error)
  }
}
