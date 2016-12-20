import axios from 'axios'
import {browserHistory} from 'react-router'
import setting from '../../setting'
import { setPostError } from '../actions/errorActions'

function handleError(error, dispatch) {
  if (error.response) {
    dispatch(setPostError(error.response.data.error))
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
      browserHistory.push('/dashboard')
      console.log(res.data.message)
    }).catch(err => {
      handleError(err, dispatch)
    })
  }
}

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${setting.host}/posts`).then(response => {
      dispatch({ type: 'LOAD_POSTS', posts: response.data.posts });
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
      browserHistory.push('/dashboard')
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
