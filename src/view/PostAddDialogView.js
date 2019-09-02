import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/styles'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Typography, Card, CardActions, CardContent, Grid } from '@material-ui/core'

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

class PostAddDialogView extends Component {
  constructor (props) {
    super(props)

    this.md = new MarkdownRenderer()

    this.onOK = this.onOK.bind(this)
    this.onCancel = this.onCancel.bind(this)

    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)

    this.state = {
      title: '',
      description: '',
      open: false
    }
  }

  onCancel () {
    this.dismiss()
  }

  onOK () {
    PostActions.add(this.state.title, this.state.description)
    this.dismiss()
  }

  onChangeTitle (event) {
    this.setState({
      title: event.target.value
    })
  }

  onChangeDescription (event) {
    this.setState({
      description: event.target.value
    })
  }

  start () {
    this.setState({
      title: '',
      description: '',
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
      <Dialog open={this.state.open} fullWidth={true} maxWidth="md">
        <DialogTitle>Add post</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField variant="outlined" margin="normal" label="Title" fullWidth autoFocus value={this.state.title} onChange={this.onChangeTitle} />
              <TextField variant="outlined" margin="normal" label="Description" fullWidth multiline rows={4} rowsMax={8} value={this.state.description} onChange={this.onChangeDescription} />
            </Grid>
            <Grid item xs={6}>
              <div className={this.props.classes.previewWrapper}>
                <Card className={this.props.classes.preview}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {this.state.title || '<todo>: write a title'}
                    </Typography>
                    <Typography variant="body1" dangerouslySetInnerHTML={{__html: this.md.render(this.state.description || '<todo>: write a description')}}>
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={this.onCancel}>Cancel</Button>
          <Button size="small" color="primary" onClick={this.onOK}>Save</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

PostAddDialogView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PostAddDialogView)
