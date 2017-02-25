import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import BasicForm from './BasicForm'
import { connect } from 'react-redux'
import { newPost } from '../../redux/actions/postActions'
import { setPostError, clearPostError } from '../../redux/actions/errorActions'

class NewPosts extends React.Component {
  componentWillMount() {
    this.props.clearPostError()
  }
  componentWillUnmount() {
    this.props.clearPostError()
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

  handleSubmit(e) {
    e.preventDefault();
    const basic = this.refs.basic.getBasicFormInputValue();
    this.props.newPost(basic);
  }

  render () {
    const styles = this.getStyles()
    return (
    <div style={styles.root}>
      <p style={styles.title}>添加新文章</p>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <BasicForm ref="basic" error={this.props.error} />
        <div style={styles.submit}>
          <RaisedButton type="submit" label="发布" primary={true} />
        </div>
      </form>
    </div>
  )
  }
}

const mapStateToProps = (state) => ({
  error: state.error.postError
})

export default connect(mapStateToProps, { newPost, setPostError, clearPostError })(NewPosts);
