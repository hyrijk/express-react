import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import BasicForm from './BasicForm'
import { connect } from 'react-redux'
import { getPost, clearPost, editPost } from '../../redux/actions/postActions'
import isEmpty from 'lodash/fp/isEmpty'
import { setPostError, clearPostError } from '../../redux/actions/errorActions'

class EditPost extends React.Component {
  componentWillMount() {
    this.props.getPost(this.props.params.post_id)
  }

  componentWillUnmount() {
    this.props.clearPost()
    this.props.clearPostError()
  }

  handleSubmit(e) {
    e.preventDefault()
    const basic = this.refs.basic.getBasicFormInputValue()
    this.props.editPost(basic, this.props.params.post_id)
  }

  getStyles() {
    return {
      root: {
        maxWidth: '720px',
        margin: '32px auto 0'
      },
      title: {
        textAlign: 'center',
        color: '#2e4453',
        fontSize: '1.3em'
      },
      submit: {
        textAlign: 'center',
        marginTop: '32px'
      }
    }
  }

  render () {
    const styles = this.getStyles()
    return (
      <div style={styles.root}>
        <p style={styles.title}>编辑文章</p>
        <form onSubmit={this.handleSubmit.bind(this)}>
          {isEmpty(this.props.post) ? '' : <BasicForm ref="basic" post={this.props.post} error={this.props.error}/>}
          <div style={styles.submit}>
            <RaisedButton type='submit' label='更新' primary={true}/>
          </div>
        </form>
      </div>
    )
  }
}

EditPost.propTypes = {
  post: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  post: state.post,
  error: state.error.postError
})

export default connect(mapStateToProps, {getPost, clearPost, editPost, setPostError, clearPostError})(EditPost)
