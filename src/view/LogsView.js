import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

import { withStyles } from '@material-ui/styles'
import { Paper, Typography } from '@material-ui/core'

import LogStore from '../store/LogStore.js'

import LogListView from './LogListView.js'

import TeamActions from '../actions/TeamActions.js'
import TeamStore from '../store/TeamStore.js'

import ServiceActions from '../actions/ServiceActions.js'
import ServiceStore from '../store/ServiceStore.js'

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  }
})

class LogsView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      logs: LogStore.getState(),
      teams: TeamStore.getState(),
      services: ServiceStore.getState()
    }

    this.onUpdateTeams = this.onUpdateTeams.bind(this)
    this.onUpdateServices = this.onUpdateServices.bind(this)
    this.onUpdateLogs = this.onUpdateLogs.bind(this)
  }

  componentDidMount () {
    TeamStore.listen(this.onUpdateTeams)
    ServiceStore.listen(this.onUpdateServices)
    LogStore.listen(this.onUpdateLogs)

    TeamActions.fetch()
    ServiceActions.fetch()
  }

  componentWillUnmount () {
    TeamStore.unlisten(this.onUpdateTeams)
    ServiceStore.unlisten(this.onUpdateServices)
    LogStore.unlisten(this.onUpdateLogs)
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
      <DocumentTitle title={`${this.props.customContent.competitionTitle} :: Logs`}>
        <Paper elevation={0} square className={this.props.classes.root}>
          <Typography variant='h4' component='h1'>Logs</Typography>
          {
            (() => {
              if (this.isLoading()) {
                return <p>Loading</p>
              }

              if (this.isError()) {
                return <p>Failed to fetch data</p>
              }

              return <LogListView logs={this.state.logs.collection} teams={this.state.teams.collection} services={this.state.services.collection} />
            })()
          }
        </Paper>
      </DocumentTitle>
    )
  }
}

LogsView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LogsView)
