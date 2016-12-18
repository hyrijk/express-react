import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Radium from 'radium'
import axios from 'axios'
import { connect } from 'react-redux'
import { signUp } from '../../redux/actions/authActions'
import Error from '../../ui/shared/Error'

class SignUp extends React.Component {
  getStyles() {
    return {
      root: {
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        boxShadow: '0 0 0 1px rgba(200, 215, 225, 0.5), 0 1px 2px #e9eff3',
        margin: '30px 16px',
        padding: '1em',
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
    let confirmPassword = this.refs.confirmPassword.getValue()
    if (password !== confirmPassword) {
      console.log('密码不匹配')
      return
    }
    console.log(username, password, confirmPassword);
    this.props.signUp({username, password})
  }

  render () {
    let styles = this.getStyles()
    return (
      <div style={styles.root}>
        <form onSubmit={this.handleSubmit.bind(this)}>
          {this.props.error ? <Error message={this.props.error} /> : ''}
          <TextField ref="username" style={styles.textField} floatingLabelText="用户名" />
          <TextField ref="password" style={styles.textField} floatingLabelText="密码" type="password" />
          <TextField ref="confirmPassword" style={styles.textField} floatingLabelText="确认密码" type="password" />
          <RaisedButton primary={true} style={styles.button} labelStyle={styles.label} label="注册" type="submit" />
        </form>
      </div>
    )
  }
}

SignUp.propsTypes = {
  signUp: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  error: state.auth.error
})


export default connect(mapStateToProps, {signUp})(Radium(SignUp))
