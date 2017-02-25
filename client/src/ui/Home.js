import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import PostItem from './posts/PostItem'
import { fetchPosts } from '../redux/actions/postActions'

class Home extends Component {
  componentWillMount() {
    if(this.props.posts.length === 0) {
      this.props.fetchPosts();
    }
  }

  isLogin() {
    return sessionStorage.getItem('jwtToken') && sessionStorage.getItem('user')
  }

  styles = {
    root: {
      maxWidth: '720px',
      margin: '30px auto'
    },
    actions: {
      marginTop: '32px',
      marginBottom: '32px',
      textAlign: 'center'
    }
  }

  renderAction() {
    return (
      <div style={this.styles.actions}>
        <Link to='/posts/new'>
          <RaisedButton label='添加新文章' primary={true} />
        </Link>
      </div>
    )
  }

  render() {
    const PostList = this.props.posts.map((post, i) => {
      return <PostItem key={i} post={post} />
    })

    return (
      <div style={this.styles.root}>
        { this.isLogin() ?  this.renderAction() : '' }
        { PostList }
      </div>
    )
  }
}

Home.propTypes = {
  posts: React.PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps, {fetchPosts})(Home)
