import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

import { withStyles } from '@material-ui/styles'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Typography, Card, CardContent, Grid, CardHeader } from '@material-ui/core'

import NotificationActions from '../actions/NotificationActions.js'
import MarkdownRenderer from '../util/MarkdownRenderer.js'

import TeamSelectView from './TeamSelectView.js'

const styles = theme => ({
  previewWrapper: {
    height: '100%',
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(1)
  },
  preview: {
    height: '100%',
    '& .emoji': {
      verticalAlign: 'middle',
      maxHeight: '1em'
    }
  },
  previewHeader: {
    paddingBottom: theme.spacing(0)
  },
  previewContent: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  special: {
    color: theme.palette.primary.main
  }
})

class AlterNotificationDialogView extends Component {
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
    NotificationActions.alter(this.props.id, this.state.title, this.state.description)
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
    const titleOrPlaceholder = this.state.title || '<todo>: create a title'
    let title = <Typography variant='h5' component='h2'>{titleOrPlaceholder}</Typography>
    if (this.props.teamId != null) {
      const team = this.props.teams.find(x => x.id === this.props.teamId)
      title = (
        <Typography variant='h5' component='h2'>
          <span className={this.props.classes.special}>[{team.name}]</span>
          &nbsp;
          {titleOrPlaceholder}
        </Typography>
      )
    }

    return (
      <Dialog open={this.state.open} fullWidth maxWidth='md'>
        <DialogTitle>Alter notification</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TeamSelectView disabled value={(this.props.teamId == null) ? 0 : this.props.teamId} teams={this.props.teams} />
              <TextField variant='outlined' margin='normal' label='Title' fullWidth autoFocus value={this.state.title} onChange={this.handleChangeTitle} />
              <TextField variant='outlined' margin='normal' label='Description' fullWidth multiline rows={4} rowsMax={8} value={this.state.description} onChange={this.handleChangeDescription} />
            </Grid>
            <Grid item xs={6}>
              <div className={this.props.classes.previewWrapper}>
                <Card className={this.props.classes.preview}>
                  <CardHeader
                    title={title}
                    subheader={moment(new Date()).format('lll')}
                    subheaderTypographyProps={{ variant: 'body2', color: 'textSecondary' }}
                    classes={{ root: this.props.classes.previewHeader }}
                  />
                  <CardContent classes={{ root: this.props.classes.previewContent }}>
                    <Typography variant='body1' dangerouslySetInnerHTML={{ __html: this.md.render(this.state.description || '<todo>: create a description') }} />
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

AlterNotificationDialogView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AlterNotificationDialogView)
