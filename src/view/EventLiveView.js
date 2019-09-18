import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

import { withStyles } from '@material-ui/styles'
import { Paper, Typography } from '@material-ui/core'

import EventLiveStore from '../store/EventLiveStore.js'

import EventListView from './EventListView.js'

import TeamActions from '../actions/TeamActions.js'
import TeamStore from '../store/TeamStore.js'

import ServiceAdminActions from '../actions/ServiceAdminActions.js'
import ServiceAdminStore from '../store/ServiceAdminStore.js'

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  }
})

class EventLiveView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      logs: EventLiveStore.getState(),
      teams: TeamStore.getState(),
      services: ServiceAdminStore.getState()
    }

    this.onUpdateTeams = this.onUpdateTeams.bind(this)
    this.onUpdateServices = this.onUpdateServices.bind(this)
    this.onUpdateLogs = this.onUpdateLogs.bind(this)
  }

  componentDidMount () {
    TeamStore.listen(this.onUpdateTeams)
    ServiceAdminStore.listen(this.onUpdateServices)
    EventLiveStore.listen(this.onUpdateLogs)

    TeamActions.fetch()
    ServiceAdminActions.fetch()
  }

  componentWillUnmount () {
    TeamStore.unlisten(this.onUpdateTeams)
    ServiceAdminStore.unlisten(this.onUpdateServices)
    EventLiveStore.unlisten(this.onUpdateLogs)
  }

  onUpdateTeams (teams) {
    this.setState({
      teams: teams
    })
  }

  onUpdateServices (services) {
    this.setState({
      services: services
    })
  }

  onUpdateLogs (logs) {
    this.setState({
      logs: logs
    })
  }

  isLoading () {
    return (
      this.state.logs.loading ||
      this.state.teams.loading ||
      this.state.services.loading
    )
  }

  isError () {
    return (
      this.state.logs.err ||
      this.state.teams.err ||
      this.state.services.err
    )
  }

  render () {
    return (
      <DocumentTitle title={`${this.props.customContent.competitionTitle} :: Event live`}>
        <Paper elevation={0} square className={this.props.classes.root}>
          <Typography variant='h4' component='h1'>Event live</Typography>
          {
            (() => {
              if (this.isLoading()) {
                return <p>Loading</p>
              }

              if (this.isError()) {
                return <p>Failed to fetch data</p>
              }

              return <EventListView logs={this.state.logs.collection} teams={this.state.teams.collection} services={this.state.services.collection} />
            })()
          }
        </Paper>
      </DocumentTitle>
    )
  }
}

EventLiveView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EventLiveView)
