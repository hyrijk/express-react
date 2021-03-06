import axios from 'axios'
import { hashHistory } from 'react-router'
import setting from '../../setting'
import { setPostError } from '../actions/errorActions'
import { setAuthError } from '../actions/authActions'

function handleError(error, dispatch) {
  if (error.response) {
    const { status, data } = error.response
    if (status === 401 || status === 403) {
      hashHistory.push('/login')
      dispatch(setAuthError(data.error))
    }
    else {
      dispatch(setPostError(data.error))
    }
  } else {
    console.log(error)
  }
}

export function newPost(data) {
  return dispatch => {
    let formData = new FormData()
    formData.append('name', data.name)
    formData.append('content', data.content)
    formData.append('post', data.file)
    axios.post(`${setting.host}/posts`, formData, {
      headers: {
        'Authorization' : sessionStorage.getItem('jwtToken')
      }
    }).then(res => {
      dispatch({type: 'Add_POST', post: res.data.post})
      hashHistory.push('/')
      console.log(res.data.message)
    }).catch(err => {
      handleError(err, dispatch)
    })
  }
}

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${setting.host}/posts`).then(response => {
      dispatch({
        type: 'LOAD_POSTS',
        posts: response.data.posts.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
      });
    }).catch(error => {
      handleError(error);
    });
  }
}

export function getPost(id) {
  return (dispatch) => {
    axios.get(`${setting.host}/posts/${id}`).then(response => {
      dispatch({type: 'LOAD_POST', post: response.data.post})
    }).catch(error => {
      handleError(error, dispatch)
    })
  }
}

export function clearPost() {
  return {
    type: 'CLEAR_POST'
  }
}

export function editPost(data, id) {
  let formData = new FormData()
  formData.append('name', data.name)
  formData.append('content', data.content)
  formData.append('post', data.file)
  return dispatch => {
    axios.put(`${setting.host}/posts/${id}`, formData, {
      headers: {'Authorization': sessionStorage.getItem('jwtToken')}
    }).then(response => {
      dispatch({type: 'EDIT_POST', post: response.data.post})
      hashHistory.push('/')
      console.log(response.data.message)
    }).catch(error => {
      handleError(error, dispatch)
    })
  }
}

export function deletePost(id) {
  return dispatch =>{
    axios.delete(`${setting.host}/posts/${id}`, {
      headers: { 'Authorization': sessionStorage.getItem('jwtToken')}
    })
    .then(response => {
      dispatch({type: 'DELETE_POST', id: response.data.id})
      console.log(response.data.message)
    })
    .catch(error => {
      handleError(error, dispatch)
    })
  }
}
