import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

import { withStyles } from '@material-ui/styles'
import { Button, Card, CardActions, CardContent, Typography, CardHeader } from '@material-ui/core'

import RemoveNotificationDialogView from './RemoveNotificationDialogView.js'
import AlterNotificationDialogView from './AlterNotificationDialogView.js'

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
  }
})

class NotificationView extends Component {
  constructor (props) {
    super(props)
    this.md = new MarkdownRenderer()
    this.handleAlterNotification = this.handleAlterNotification.bind(this)
    this.handleRemoveNotification = this.handleRemoveNotification.bind(this)
  }

  handleAlterNotification () {
    this.refs.alterDialog.start()
  }

  handleRemoveNotification () {
    this.refs.removeDialog.start()
  }

  render () {
    let title = this.props.title
    if (this.props.teamId != null) {
      if (this.props.identity.isInternal()) {
        const team = this.props.teams.find(x => x.id === this.props.teamId)
        title = `[${team.name}] ${this.props.title}`
      } else if (this.props.identity.isTeam()) {
        title = `[private] ${this.props.title}`
      }
    }
    return (
      <Card className={this.props.classes.root}>
        <CardHeader
          title={title}
          titleTypographyProps={{ gutterBottom: true, variant: 'h5', component: 'h2' }}
          subheader={moment(this.props.updatedAt).format('lll')}
          subheaderTypographyProps={{ variant: 'body2', color: 'textSecondary' }}
          classes={{ root: this.props.classes.header }}
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
              return ''
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
