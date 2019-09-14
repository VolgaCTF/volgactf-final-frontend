import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

import { withStyles } from '@material-ui/styles'
import { Button, Card, CardActions, CardContent, Typography, CardHeader } from '@material-ui/core'
import { red, grey, green } from '@material-ui/core/colors'
import { Done, DoneAll } from '@material-ui/icons'

import RemoveNotificationDialogView from './RemoveNotificationDialogView.js'
import AlterNotificationDialogView from './AlterNotificationDialogView.js'

import NotificationStatusActions from '../actions/NotificationStatusActions.js'

import MarkdownRenderer from '../util/MarkdownRenderer.js'

const styles = theme => ({
  root: {
    marginTop: theme.spacing(2)
  },
  header: {
    paddingBottom: theme.spacing(0)
  },
  content: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  special: {
    color: theme.palette.primary.main
  },
  iconWrapperUnread: {
    padding: theme.spacing(1),
    cursor: 'pointer',
    color: grey['600']
  },
  iconWrapperRead: {
    padding: theme.spacing(1),
    color: green['A700']
  }
})

class NotificationView extends Component {
  constructor (props) {
    super(props)
    this.md = new MarkdownRenderer()
    this.handleAlterNotification = this.handleAlterNotification.bind(this)
    this.handleRemoveNotification = this.handleRemoveNotification.bind(this)
    this.handleMarkAsRead = this.handleMarkAsRead.bind(this)
  }

  handleAlterNotification () {
    this.refs.alterDialog.start()
  }

  handleRemoveNotification () {
    this.refs.removeDialog.start()
  }

  handleMarkAsRead () {
    NotificationStatusActions.markAsRead(this.props.id)
  }

  render () {
    let title = <Typography variant='h5' component='h2'>{this.props.title}</Typography>
    if (this.props.teamId != null) {
      if (this.props.identity.isInternal()) {
        const team = this.props.teams.find(x => x.id === this.props.teamId)
        title = (
          <Typography variant='h5' component='h2'>
            <span className={this.props.classes.special}>[{team.name}]</span>
            &nbsp;
            {this.props.title}
          </Typography>
        )
      } else if (this.props.identity.isTeam()) {
        title = (
          <Typography variant='h5' component='h2'>
            <span className={this.props.classes.special}>[private]</span>
            &nbsp;
            {this.props.title}
          </Typography>
        )
      }
    }

    let action = null
    if (this.props.identity.isInternal() || this.props.identity.isTeam()) {
      if (this.props.read) {
        action = (
          <span className={this.props.classes.iconWrapperRead} title='Read'>
            <DoneAll />
          </span>
        )
      } else {
        action = (
          <span className={this.props.classes.iconWrapperUnread} title='Mark as read' onClick={this.handleMarkAsRead}>
            <Done />
          </span>
        )
      }
    }

    return (
      <Card className={this.props.classes.root}>
        <CardHeader
          title={title}
          subheader={moment(this.props.updatedAt).format('lll')}
          subheaderTypographyProps={{ variant: 'body2', color: 'textSecondary' }}
          classes={{ root: this.props.classes.header }}
          action={action}
        />
        <CardContent classes={{ root: this.props.classes.content }}>
          <Typography variant='body1' dangerouslySetInnerHTML={{ __html: this.md.render(this.props.description) }} />
        </CardContent>
        {
          (() => {
            if (this.props.identity.isInternal()) {
              return (
                <CardActions>
                  <Button size='small' onClick={this.handleAlterNotification}>Alter</Button>
                  <Button size='small' onClick={this.handleRemoveNotification}>Remove</Button>
                </CardActions>
              )
            } else {
              return null
            }
          })()
        }
        <AlterNotificationDialogView ref='alterDialog' id={this.props.id} title={this.props.title} description={this.props.description} teams={this.props.teams} teamId={this.props.teamId} />
        <RemoveNotificationDialogView ref='removeDialog' id={this.props.id} title={this.props.title} />
      </Card>
    )
  }
}

NotificationView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NotificationView)
