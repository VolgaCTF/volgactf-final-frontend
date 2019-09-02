import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/styles'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, Typography } from '@material-ui/core'
import { red } from '@material-ui/core/colors'

const styles = theme => ({
  fileInput: {
    display: 'none'
  },
  errorMessage: {
    color: red['600']
  },
  browseButton: {
    marginTop: theme.spacing(1)
  }
})

class UploadTeamLogoDialogView extends Component {
  constructor (props) {
    super(props)

    this.onUpload = this.onUpload.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onChoose = this.onChoose.bind(this)
    this.onChange = this.onChange.bind(this)

    this.state = {
      open: false,
      error: null,
      filename: ''
    }
  }

  onCancel () {
    this.dismiss()
  }

  simulateClick(elem) {
    const evt = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    })
    const canceled = !elem.dispatchEvent(evt)
  }

  onChoose () {
    const fileInput = ReactDOM.findDOMNode(this.refs.fileInput)
    this.simulateClick(fileInput)
  }

  onChange () {
    const fileInput = ReactDOM.findDOMNode(this.refs.fileInput)
    let fieldVal = ''
    if (fileInput.files.length > 0 && fileInput.files[0].name) {
      fieldVal = fileInput.files[0].name
    }
    fieldVal = fieldVal.replace('C:\\fakepath\\', '')

    if (typeof fieldVal !== 'undefined' || fieldVal !== '') {
      this.setState({
        filename: fieldVal,
        error: null
      })
    } else {
      this.setState({
        filename: '',
        error: null
      })
    }
  }

  onUpload () {
    const fileInput = ReactDOM.findDOMNode(this.refs.fileInput)
    if (fileInput.files.length === 0) {
      this.setState({
        error: 'No file chosen'
      })
      return
    }

    const formData = new FormData()
    formData.append('file', fileInput.files[0])
    let savedResponse = null
    fetch('/api/team/logo', {
      method: 'POST',
      body: formData
    })
    .then((response) => {
      savedResponse = response
      return response.text()
    })
    .then((text) => {
      if (savedResponse.status >= 200 && savedResponse.status < 300) {
        return ''
      } else if (savedResponse.status === 400) {
        const err = new Error(savedResponse.statusText)
        err.message = text
        throw err
      } else if (savedResponse.status === 413) {
        const err = new Error(savedResponse.statusText)
        err.message = 'Image size must not exceed 1 Mb'
        throw err
      } else {
        const err = new Error(savedResponse.statusText)
        err.message = savedResponse.statusText
        throw err
      }
    })
    .then(() => {
      this.dismiss()
    })
    .catch((err) => {
      this.setState({
        error: err.message
      })
    })
  }

  start () {
    this.setState({
      open: true,
      error: null,
      filename: ''
    })
  }

  dismiss () {
    this.setState({
      open: false,
      error: null,
      filename: ''
    })
  }

  render () {
    return (
      <Dialog open={this.state.open} fullWidth={true} maxWidth="sm">
        <DialogTitle>Upload a logo</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={9}>
              <input className={this.props.classes.fileInput} type="file" accept="image/jpeg,image/png,image/gif" ref="fileInput" onChange={this.onChange}/>
              <TextField disabled={true} variant="outlined" margin="none" label="Image file" fullWidth value={this.state.filename}/>
            </Grid>
            <Grid item xs={3}>
              <Button className={this.props.classes.browseButton} variant="contained" color="primary" onClick={this.onChoose}>Browse</Button>
            </Grid>
          </Grid>
          {
            (() => {
              if (this.state.error) {
                return <Typography variant="body1" component="p" className={this.props.classes.errorMessage}>{this.state.error}</Typography>
              }
              return null
            })()
          }
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={this.onCancel}>Cancel</Button>
          <Button size="small" color="primary" onClick={this.onUpload}>Upload</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

UploadTeamLogoDialogView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(UploadTeamLogoDialogView)
