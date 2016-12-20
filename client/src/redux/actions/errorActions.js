export function setPostError(error) {
  return {
    type: 'SET_POST_ERROR',
    error
  }
}

export function clearPostError() {
  return {
    type: 'CLEAR_POST_ERROR'
  }
}
