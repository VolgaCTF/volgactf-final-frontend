import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'
import withQueryParams from 'react-router-query-params'

import { withStyles } from '@material-ui/styles'
import { Paper, Typography } from '@material-ui/core'

import EventHistoryActions from '../actions/EventHistoryActions.js'
import EventHistoryStore from '../store/EventHistoryStore.js'

import TeamActions from '../actions/TeamActions.js'
import TeamStore from '../store/TeamStore.js'

import ServiceActions from '../actions/ServiceActions.js'
import ServiceStore from '../store/ServiceStore.js'

import EventListView from './EventListView.js'
import PaginationView from './PaginationView.js'

import { Update } from '@material-ui/icons'

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  },
  iconWrapper: {
    display: 'inline-block',
    marginLeft: theme.spacing(1)
  },
  icon: {
    verticalAlign: 'middle',
    cursor: 'pointer'
  }
})

class EventHistoryPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: false,
      eventHistory: EventHistoryStore.getState(),
      teams: TeamStore.getState(),
      services: ServiceStore.getState()
    }

    this.onUpdateTeams = this.onUpdateTeams.bind(this)
    this.onUpdateServices = this.onUpdateServices.bind(this)
    this.onUpdateEventHistory = this.onUpdateEventHistory.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleReload = this.handleReload.bind(this)
  }

  componentDidMount () {
    TeamStore.listen(this.onUpdateTeams)
    ServiceStore.listen(this.onUpdateServices)
    EventHistoryStore.listen(this.onUpdateEventHistory)

    TeamActions.fetch()
    ServiceActions.fetch()

    const timestamp = parseInt(this.props.queryParams.timestamp, 10)
    const page = parseInt(this.props.queryParams.page, 10)
    const pageSize = parseInt(this.props.queryParams.pageSize, 10)

    EventHistoryActions.fetch(timestamp, page, pageSize)
  }

  componentWillUnmount () {
    TeamStore.unlisten(this.onUpdateTeams)
    ServiceStore.unlisten(this.onUpdateServices)
    EventHistoryStore.unlisten(this.onUpdateEventHistory)
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

  onUpdateEventHistory (eventHistory) {
    this.setState({
      eventHistory: eventHistory
    })
  }

  handlePageChange (page) {
    const timestamp = parseInt(this.props.queryParams.timestamp, 10)
    const pageSize = parseInt(this.props.queryParams.pageSize, 10)
    this.props.setQueryParams({
      timestamp: timestamp.toString(),
      page: page.toString(),
      pageSize: pageSize.toString()
    })
    EventHistoryActions.fetch(timestamp, page, pageSize)
  }

  handleReload () {
    const now = new Date()
    const timestamp = Math.floor(now.getTime() / 1000)
    const page = parseInt(this.props.queryParams.page, 10)
    const pageSize = parseInt(this.props.queryParams.pageSize, 10)
    this.props.setQueryParams({
      timestamp: timestamp.toString(),
      page: page.toString(),
      pageSize: pageSize.toString()
    })
    EventHistoryActions.fetch(timestamp, page, pageSize)
  }

  isLoading () {
    return (
      this.state.eventHistory.loading ||
      this.state.teams.loading ||
      this.state.services.loading
    )
  }

  isError () {
    return (
      this.state.eventHistory.err ||
      this.state.teams.err ||
      this.state.services.err
    )
  }

  render () {
    return (
      <DocumentTitle title={`${this.props.customContent.competitionTitle} :: Event history`}>
        <Paper elevation={0} square className={this.props.classes.root}>
          <Typography variant='h4' component='h1'>
            Event history
            <span className={this.props.classes.iconWrapper} title='Load the latest version'>
              <Update className={this.props.classes.icon} onClick={this.handleReload} />
            </span>
          </Typography>
          {
            (() => {
              if (this.isLoading()) {
                return <p>Loading</p>
              }

              if (this.isError()) {
                return <p>Failed to fetch data</p>
              }

              return [
                <PaginationView key={0} onPageChange={this.handlePageChange} total={this.state.eventHistory.total} page={this.state.eventHistory.page} pageSize={this.state.eventHistory.pageSize} />,
                <EventListView key={1} logs={this.state.eventHistory.entries} teams={this.state.teams.collection} services={this.state.services.collection} />,
                <PaginationView key={2} onPageChange={this.handlePageChange} total={this.state.eventHistory.total} page={this.state.eventHistory.page} pageSize={this.state.eventHistory.pageSize} />
              ]
            })()
          }
        </Paper>
      </DocumentTitle>
    )
  }
}

EventHistoryPage.propTypes = {
  classes: PropTypes.object.isRequired,
  queryParams: PropTypes.object.isRequired,
  setQueryParams: PropTypes.func.isRequired
}

const StyledComponent = withStyles(styles)(EventHistoryPage)

export default withQueryParams({
  stripUnknownKeys: true,
  keys: {
    timestamp: {
      default: (value, props) => {
        const now = new Date()
        return Math.floor(now.getTime() / 1000)
      },
      validate: (value, props) => {
        const probe = parseInt(value, 10)
        return Number.isInteger(probe)
      }
    },
    page: {
      default: '1',
      validate: (value, props) => {
        const probe = parseInt(value, 10)
        return Number.isInteger(probe) && probe > 0
      }
    },
    pageSize: {
      default: '250',
      validate: (value, props) => {
        const probe = parseInt(value, 10)
        return Number.isInteger(probe) && probe > 0
      }
    }
  }
})(StyledComponent)
