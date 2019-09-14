import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

import { withStyles } from '@material-ui/styles'
import { Typography, Button, Paper } from '@material-ui/core'

import NotificationListView from './NotificationListView.js'
import NotificationStore from '../store/NotificationStore.js'
import NotificationActions from '../actions/NotificationActions.js'
import AddNotificationDialogView from './AddNotificationDialogView.js'
import NotificationStatusStore from '../store/NotificationStatusStore.js'
import NotificationStatusActions from '../actions/NotificationStatusActions.js'

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
      notificationStatus: NotificationStatusStore.getState(),
      teams: TeamStore.getState()
    }

    this.onUpdateTeams = this.onUpdateTeams.bind(this)
    this.onUpdateNotifications = this.onUpdateNotifications.bind(this)
    this.onUpdateNotificationStatus = this.onUpdateNotificationStatus.bind(this)
    this.handleAddDialog = this.handleAddDialog.bind(this)
  }

  componentDidMount () {
    TeamStore.listen(this.onUpdateTeams)
    NotificationStore.listen(this.onUpdateNotifications)
    NotificationStatusStore.listen(this.onUpdateNotificationStatus)
    TeamActions.fetch()
    NotificationActions.fetch()
    if (this.props.identity.isInternal() || this.props.identity.isTeam()) {
      NotificationStatusActions.fetch()
    }
  }

  componentWillUnmount () {
    TeamStore.unlisten(this.onUpdateTeams)
    NotificationStore.unlisten(this.onUpdateNotifications)
    NotificationStatusStore.unlisten(this.onUpdateNotificationStatus)
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

  onUpdateNotificationStatus (notificationStatus) {
    this.setState({
      notificationStatus: notificationStatus
    })
  }

  handleAddDialog () {
    this.refs.addDialog.start()
  }

  isLoading () {
    return (
      this.state.notifications.loading ||
      this.state.teams.loading ||
      this.state.notificationStatus.loading
    )
  }

  isError () {
    return (
      this.state.notifications.err ||
      this.state.teams.err ||
      this.state.notificationStatus.err
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
                return <NotificationListView notifications={sortedNotifications} readItems={this.state.notificationStatus.read} teams={this.state.teams.collection} identity={this.props.identity} />
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
