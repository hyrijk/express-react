import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Radium from 'radium'
import axios from 'axios'
import { connect } from 'react-redux'
import { signUp, clearError } from '../../redux/actions/authActions'
import Error from '../../ui/shared/Error'

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: props.error
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({error: nextProps.error})
    }
  }

  componentWillUnmount() {
    this.props.clearError()
  }

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
    if (username.length < 2) {
      this.setState({ error: '用户名至少两个字符'})
      return
    }
    if (username.length > 12) {
      this.setState({ error: '用户名太长了, 不要超过12个字符'})
      return
    }
    if (password.length < 6) {
      this.setState({ error: '密码至少6位'})
      return
    }
    if (password !== confirmPassword) {
      this.setState({error: '两次密码不正确'})
      return
    }
    this.props.signUp({username, password})
  }

  render () {
    let styles = this.getStyles()
    return (
      <div style={styles.root}>
        <form onSubmit={this.handleSubmit.bind(this)}>
          {this.state.error ? <Error message={this.state.error} /> : ''}
          <TextField ref="username"
            style={styles.textField}
            floatingLabelText="用户名" />
          <TextField ref="password"
            style={styles.textField}
            floatingLabelText="密码"
            type="password" />
          <TextField ref="confirmPassword"
            style={styles.textField}
            floatingLabelText="确认密码"
            type="password" />
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


export default connect(mapStateToProps, {signUp, clearError})(Radium(SignUp))
