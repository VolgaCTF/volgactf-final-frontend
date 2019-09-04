import React, { Component } from 'react'

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@material-ui/core'

import PostActions from '../actions/PostActions.js'

export default class PostRemoveDialog extends Component {
  constructor (props) {
    super(props)

    this.handleOK = this.handleOK.bind(this)
    this.handleCancel = this.handleCancel.bind(this)

    this.state = {
      open: false
    }
  }

  handleCancel () {
    this.dismiss()
  }

  handleOK () {
    PostActions.remove(this.props.id)
    this.dismiss()
  }

  start () {
    this.setState({
      open: true
    })
  }

  dismiss () {
    this.setState({
      open: false
    })
  }

  render () {
    return (
      <Dialog open={this.state.open}>
        <DialogTitle>Remove post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to remove post <i>{this.props.title}</i>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size='small' onClick={this.handleCancel}>No</Button>
          <Button size='small' color='primary' onClick={this.handleOK}>Yes</Button>
        </DialogActions>
      </Dialog>
    )
  }
}
