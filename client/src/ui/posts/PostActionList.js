import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import ActionLaunch from 'material-ui/svg-icons/action/launch'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import Radium from 'radium'
import { connect } from 'react-redux'
import { deletePost } from '../../redux/actions/postActions'

class PostActionList extends React.Component {
  getStyles() {
    return {
      actions: {
        borderTop: 'solid 1px rgba(200, 215, 225, 0.5)',
        // overflow: 'hidden',
        display: 'flex',
        width: '100%',
        height: '44px'
      },
      action: {
        flexGrow: '1',
        borderLeft: 'solid 1px rgba(200, 215, 225, .5)',
        textAlign: 'center',
        lineHeight: '44px'
      },
      a: {
        textDecoration: 'none',
        fontSize: '.8em',
        color: '#668eaa',
        padding: '0.8em 0'
      },
      svg: {
        marginRight: '6px',
        width: '16px',
        height: '16px',
        top: '3px',
        position: 'relative'
      }
    }
  }

  handleClick() {
    this.props.deletePost(this.props.post._id)
  }

  render () {
    const styles = this.getStyles()
    return (
      <div style={styles.actions}>
        <div style={[styles.action, {borderLeft: 'none'}]}>
          <Link to={`/posts/${this.props.post._id}/edit`} style={styles.a}>
            <EditorModeEdit color='#668eaa' style={styles.svg} />
            <span>编辑</span>
          </Link>
        </div>
        <div style={styles.action}>
          <Link to={`/posts/${this.props.post._id}`} style={styles.a}>
            <ActionLaunch color='#668eaa' style={styles.svg} />
            <span>查看</span>
          </Link>
        </div>
        <div style={styles.action} onClick={this.handleClick.bind(this)}>
          <Link to='/' style={styles.a}>
            <ActionDelete color='#668eaa' style={styles.svg} />
            <span>删除</span>
          </Link>
        </div>
      </div>
    )
  }
}

export default connect(null, { deletePost })(Radium(PostActionList))
