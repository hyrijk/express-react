import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Radium from 'radium'
import axios from 'axios'
import { connect } from 'react-redux'
import { login } from '../../redux/actions/authActions'
import Error from '../../ui/shared/Error'

class LogIn extends React.Component {
  getStyles() {
    return {
      root: {
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        boxShadow: '0 0 0 1px rgba(200, 215, 225, 0.5), 0 1px 2px #e9eff3',
        margin: '30px 16px',
        padding: '1em 1em 1em',
        textAlign: 'center',
        '@media (min-width: 400px)': {
          width: '400px',
          margin: '30px auto'
        }
      },
      textField: {
        display: 'block',
        width: '100%',
        fontSize: '.9em'
      },
      label: {
        fontWeight: '600',
        fontSize: '1em',
        lineHeight: '40px'
      },
      button: {
        width: '130px',
        height: '40px',
        marginTop: '30px',
        marginBottom: '15px'
      },
      a: {
        fontSize: '.8em',
        textDecoration: 'none',
        color: 'gray',
        ':hover': {color: '#00bcd4'}
      }

    }
  }

  handleSubmit(e) {
    e.preventDefault()
    let username = this.refs.username.getValue()
    let password = this.refs.password.getValue()
    this.props.login({username, password})
  }

  render () {
    let styles = this.getStyles()
    return (
      <div style={styles.root}>
        <form onSubmit={this.handleSubmit.bind(this)}>
          {this.props.error ? <Error message={this.props.error}/> : ''}
          <TextField ref="username" style={styles.textField} floatingLabelText="用户名" />
          <TextField ref="password" style={styles.textField} floatingLabelText="密码" type="password" />
          <RaisedButton primary={true} style={styles.button} labelStyle={styles.label} label="登录" type="submit" />
        </form>
      </div>
    )
  }
}

LogIn.propsTypes = {
  login: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error
  }
}

export default connect(mapStateToProps, {login})(Radium(LogIn))
