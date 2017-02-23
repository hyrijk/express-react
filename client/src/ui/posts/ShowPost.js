import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { getPost, clearPost } from '../../redux/actions/postActions'
import isEmpty from 'lodash/fp/isEmpty'
import { host } from '../../setting'


class ShowPost extends React.Component {
  componentWillMount() {
    this.props.getPost(this.props.params.post_id)
  }

  componentWillUnmount() {
    this.props.clearPost()
  }

  render () {
    const styles = {
      cover: {
        backgroundImage: isEmpty(this.props.post) ? 'none' : `url(${host}/uploads/posts/${this.props.post.cover})`,
        height: '500px',
        position: 'relative',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
      },
      container: {
        maxWidth: '960px',
        margin: '56px auto 0'
      },
      content: {
        color: '#666'
      },
      name: {
        fontSize: '28px',
        lineHeight: '28px',
        color: '#2e4453',
        paddingBottom: '48px'
      }
    }
    return (
      <div>
        {this.props.post && this.props.post.cover
          ? <div style={styles.cover}></div>
        : ''
        }
        <div style={styles.container}>
          <div style={styles.name}>{this.props.post.name}</div>
          <div style={styles.content}>{this.props.post.content}</div>
        </div>
      </div>
    )
  }
}

ShowPost.propTypes = {
  post: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  post: state.post
})

export default connect(mapStateToProps, {getPost, clearPost})(ShowPost)
