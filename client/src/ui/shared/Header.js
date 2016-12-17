import React, { PropTypes } from 'react'
import Radium from 'radium'
import ActionHome from 'material-ui/svg-icons/action/home'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { logout } from '../../redux/actions/authActions'

class Header extends React.Component {
  logout(e) {
    e.preventDefault()
    this.props.logout()
  }

  render () {
    const { isAuthenticated, currentUser } = this.props.auth
    const styles = {
      header: {
        backgroundColor: '#00bcd4',
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        zIndex: '100',
        borderBottom: '1px solid #0079aa',
        height: '47px',
        paddingLeft: '16px',
        paddingRight: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      nav: {
        color: 'white',
        opacity: '.8',
        fontWeight: '600',
        fontSize: '1em',
        textDecoration: 'none',
        paddingLeft: '20px',
        ':hover': {
          cursor: 'pointer',
          textDecoration: 'underline'
        }
      }
    }

    const LogoutLink = (
      <div>
        <span style={{color: 'rgb(255,226,0)', paddingRight: '15px'}}>
          {currentUser.username}
        </span>
        <Link to="/" style={styles.nav} onClick={this.logout.bind(this)}>
          退出
        </Link>
      </div>
    )

    const LogInLink = (
      <div>
        <Link to="/signup" style={styles.nav}>
          注册
        </Link>
        <Link to="/login" style={styles.nav}>
          登录
        </Link>
      </div>
    )

    return (
      <header style={styles.header}>
        <div>
          <Link to='/' key="1" >
            <ActionHome color="#fff" />
          </Link>
        </div>
        { isAuthenticated ? LogoutLink : LogInLink}
      </header>
    )
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

Header.propsTypes = {
  auth: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { logout })(Radium(Header))
