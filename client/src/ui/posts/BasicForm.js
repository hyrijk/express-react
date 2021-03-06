import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import CoverImageUpload from './CoverImageUpload'

class BasicForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      file: ''
    };
  }

  getBasicFormInputValue() {
    const name = this.refs.name.getValue();
    const content = this.refs.content.getValue();
    const file = this.state.file
    return { name, content, file }
  }

  getImage(file) {
    this.setState({
      file:file
    })
  }

  render () {
    const styles = {
      root: {
        padding: '20px',
        marginTop: '32px',
        backgroundColor: '#fff',
        boxShadow: '0 0 0 1px rgba(200, 215, 225, 0.5), 0 1px 2px #e9eff3',
      },
      textField: {
        display: 'block',
        fontSize: '.85em',
        width: '100%'
      }
    }

    const { post, error } = this.props
    return (
      <div style={styles.root}>
        <TextField ref="name"
          errorText={error.name && error.name.message}
          defaultValue={post && post.name}
          floatingLabelText="标题"
          style={styles.textField}/>
        <div style={{marginTop: '15px', marginBottom: '15px'}}>
          <TextField ref="content"
            defaultValue={post && post.content}
            errorText={error.content && error.content.message}
            floatingLabelText="内容"
            multiLine={true} rows={3}
            style={styles.textField}/>
        </div>
        <CoverImageUpload image={ post && post.cover ? post.cover :'' } handleImage={this.getImage.bind(this)} tip="上传图片"/>
      </div>
    )
  }
}

export default BasicForm
