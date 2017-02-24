import React, { PropTypes } from 'react'
import ContentAdd from 'material-ui/svg-icons/content/add'
import setting from  '../../setting'

class CoverImageUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: this.props.image ? `${setting.host}/uploads/posts/${this.props.image}` : ''
    }
  }

  getStyles() {
    return {
      uploadWrapper: {
        marginTop: '20px',
        marginBottom: '30px',
        width: '180px',
        height: '180px',
        backgroundColor: '#f8f8f8',
        textAlign: 'center',
        backgroundImage: `url(${this.state.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      },
      uploadLabel: {
        display: this.state.image ? 'none' : 'block',
        height: '20px',
        paddingTop: '80px',
        paddingBottom: '80px',
        cursor: 'pointer'
      },
      svg: {
        width: '20px',
        height: '20px'
      },
      uploadText: {
        display: 'inline-block',
        verticalAlign: 'top'
      },
      uploadButton: {
        display: 'none'
      },
      uploadLabelAdd: {
        display: this.state.image ? 'block' : 'none',
        backgroundColor: '#ddd',
        height: '24px',
        cursor: 'pointer',
        position: 'absolute',
        top: '0',
        right: '0'
      }
    }
  }

  handleChange(e) {
    const file = e.target.files[0]
    if (!file.type.match('image.*')) {
      console.log('请上传图片')
    } else {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.setState({
          image: e.target.result
        })
        this.props.handleImage(file)
      }
      reader.readAsDataURL(file)
    }
  }

  render () {
    const styles = this.getStyles()
    return (
    <div style={styles.uploadWrapper} >
      <label style={styles.uploadLabel} htmlFor="imageUploadBtn">
        <ContentAdd style={styles.svg}/>
        <span style={styles.uploadText}>{this.props.tip}</span>
      </label>
      <label style={styles.uploadLabelAdd} htmlFor='imageUploadBtn'>
        <ContentAdd />
      </label>
      <input
        style={styles.uploadButton}
        type="file"
        id="imageUploadBtn"
        onChange={this.handleChange.bind(this)}/>
    </div>
  )
  }
}

export default CoverImageUpload
