import React, { PropTypes } from 'react'

class Error extends React.Component {
  constructor(props) {
    super(props)
  }

  getStyles() {
    return {
      root: {
        boxSizing: 'border-box',
        borderLeft: '3px solid rgb(244, 67, 54)',
        backgroundColor: 'rgb(252, 248, 242)',
        width: '100%',
        padding: '20px',
      },
      message: {
        fontSize: '14px',
        lineHeight: '18px',
        color: 'rgb(244, 67, 54)',
        textAlign: 'left'
      }
    }
  }

  render () {
    const styles = this.getStyles()
    return (
      <div style={styles.root}>
        <div style={styles.message}>{this.props.message}</div>
      </div>
    )
  }
}

export default Error;
