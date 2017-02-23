import React, { Component } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import PostActionList from './PostActionList'
import { Link } from 'react-router'
import setting from '../../setting'
import isEmpty from 'lodash/fp/isEmpty'


class PostItem extends Component {
  getStyles() {
    return {
      root: {
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#fff',
        border: '1px solid rgba(200, 215, 225, 0.5)',
        boxShadow: ' 0 1px 2px #e9eff3',
        marginBottom: '24px',
        position: 'relative'
      },
      content: {
        padding: '16px 24px 12px',
        lineHeight: '1.3em'
      },
      name: {
        color: '#2e4453',
        fontWeight: '600',
        fontSize: '1.2em',
        textDecoration: 'none'
      },
      image: {
        display: 'block',
        width: '100%'
      },
      cover: {
        borderBottom: 'solid 1px rgba(200, 215, 225, 0.5)',
        maxHeight: '300px',
        overflowY: 'hidden'
      }
    }
  }

  canEdit() {
    let { user, post } = this.props
    return !isEmpty(user) && (user._id === post.userId || !!user.admin)
  }

  render() {
    const Cover = () => (
      <div style={styles.cover}>
        <img src={`${setting.host}/uploads/posts/` + this.props.post.cover}
          style={styles.image}/>
      </div>
    )
    const styles = this.getStyles();
    return (
      <div style={styles.root}>
        {
          this.props.post && this.props.post.cover
          ? <Cover/>
          : ''
        }
        <div style={styles.content}>
          <div style={styles.name}>
            <Link to={`/posts/${this.props.post._id}`} style={styles.name}>
              {this.props.post.name}
            </Link>
          </div>
        </div>
        { this.canEdit() ? <PostActionList post={this.props.post} /> : ''}
      </div>
    );
  }
}

PostItem.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  user: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.currentUser
})

export default connect(mapStateToProps)(Radium(PostItem))
