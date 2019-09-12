import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

import { withStyles } from '@material-ui/styles'
import { Typography, Button, Paper } from '@material-ui/core'

import NotificationListView from './NotificationListView.js'
import NotificationStore from '../store/NotificationStore.js'
import NotificationActions from '../actions/NotificationActions.js'
import AddNotificationDialogView from './AddNotificationDialogView.js'

import TeamActions from '../actions/TeamActions.js'
import TeamStore from '../store/TeamStore.js'

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  },
  topGutter: {
    marginTop: theme.spacing(2)
  }
})

class NotificationListPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      notifications: NotificationStore.getState(),
      teams: TeamStore.getState()
    }

    this.onUpdateTeams = this.onUpdateTeams.bind(this)
    this.onUpdateNotifications = this.onUpdateNotifications.bind(this)
    this.handleAddDialog = this.handleAddDialog.bind(this)
  }

  componentDidMount () {
    TeamStore.listen(this.onUpdateTeams)
    NotificationStore.listen(this.onUpdateNotifications)
    TeamActions.fetch()
    NotificationActions.fetch()
  }

  componentWillUnmount () {
    TeamStore.unlisten(this.onUpdateTeams)
    NotificationStore.unlisten(this.onUpdateNotifications)
  }

  onUpdateTeams (teams) {
    this.setState({
      teams: teams
    })
  }

  onUpdateNotifications (notifications) {
    this.setState({
      notifications: notifications
    })
  }

  handleAddDialog () {
    this.refs.addDialog.start()
  }

  isLoading () {
    return (
      this.state.notifications.loading ||
      this.state.teams.loading
    )
  }

  isError () {
    return (
      this.state.notifications.err ||
      this.state.teams.err
    )
  }

  render () {
    return (
      <DocumentTitle title={`${this.props.customContent.competitionTitle} :: Notifications`}>
        <Paper elevation={0} square className={this.props.classes.root}>
          <Typography variant='h4' component='h1'>Notifications</Typography>
          {
            (() => {
              if (this.props.identity.isInternal()) {
                if (this.isLoading()) {
                  return <Typography variant='body1' className={this.props.classes.topGutter}>Loading</Typography>
                }

                if (this.isError()) {
                  return <Typography variant='body1' className={this.props.classes.topGutter}>Failed to fetch teams</Typography>
                }

                return (
                  <div className={this.props.classes.topGutter}>
                    <Button variant='contained' color='primary' onClick={this.handleAddDialog}>Add</Button>
                    <AddNotificationDialogView ref='addDialog' teams={this.state.teams.collection} />
                  </div>
                )
              } else {
                return null
              }
            })()
          }
          {
            (() => {
              if (this.isLoading()) {
                return <Typography variant='body1' className={this.props.classes.topGutter}>Loading</Typography>
              }

              if (this.isError()) {
                return <Typography variant='body1' className={this.props.classes.topGutter}>Failed to fetch notifications</Typography>
              }

              if (this.state.notifications.collection.isEmpty()) {
                return <Typography variant='body1' className={this.props.classes.topGutter}>No notifications yet</Typography>
              } else {
                const sortedNotifications = this.state.notifications.collection.sortBy(x => x.updatedAt.getTime()).reverse()
                return <NotificationListView notifications={sortedNotifications} teams={this.state.teams.collection} identity={this.props.identity} />
              }
            })()
          }
        </Paper>
      </DocumentTitle>
    )
  }
}

NotificationListPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NotificationListPage)
