import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/styles'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Typography, Card, CardContent, Grid } from '@material-ui/core'

import PostActions from '../actions/PostActions.js'
import MarkdownRenderer from '../util/MarkdownRenderer.js'

const styles = theme => ({
  previewWrapper: {
    height: '100%',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1)
  },
  preview: {
    height: '100%',
    '& .emoji': {
      verticalAlign: 'middle',
      maxHeight: '1em'
    }
  }
})

class PostEditDialogView extends Component {
  constructor (props) {
    super(props)

    this.md = new MarkdownRenderer()

    this.handleOK = this.handleOK.bind(this)
    this.handleCancel = this.handleCancel.bind(this)

    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleChangeDescription = this.handleChangeDescription.bind(this)

    this.state = {
      title: this.props.title,
      description: this.props.description,
      open: false
    }
  }

  handleCancel () {
    this.dismiss()
  }

  handleOK () {
    PostActions.edit(this.props.id, this.state.title, this.state.description)
    this.dismiss()
  }

  handleChangeTitle (event) {
    this.setState({
      title: event.target.value
    })
  }

  handleChangeDescription (event) {
    this.setState({
      description: event.target.value
    })
  }

  start () {
    this.setState({
      title: this.props.title,
      description: this.props.description,
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
      <Dialog open={this.state.open} fullWidth maxWidth='md'>
        <DialogTitle>Edit post</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField variant='outlined' margin='normal' label='Title' fullWidth autoFocus value={this.state.title} onChange={this.handleChangeTitle} />
              <TextField variant='outlined' margin='normal' label='Description' fullWidth multiline rows={4} rowsMax={8} value={this.state.description} onChange={this.handleChangeDescription} />
            </Grid>
            <Grid item xs={6}>
              <div className={this.props.classes.previewWrapper}>
                <Card className={this.props.classes.preview}>
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                      {this.state.title}
                    </Typography>
                    <Typography variant='body1' dangerouslySetInnerHTML={{ __html: this.md.render(this.state.description) }} />
                  </CardContent>
                </Card>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button size='small' onClick={this.handleCancel}>Cancel</Button>
          <Button size='small' color='primary' onClick={this.handleOK}>Update</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

PostEditDialogView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PostEditDialogView)
