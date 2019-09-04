import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

import { withStyles } from '@material-ui/styles'
import { Typography, Paper } from '@material-ui/core'

import ScoreTableView from './ScoreTableView.js'

import TeamActions from '../actions/TeamActions.js'
import TeamStore from '../store/TeamStore.js'

import ServiceActions from '../actions/ServiceActions.js'
import ServiceStore from '../store/ServiceStore.js'

import TeamServicePushStateActions from '../actions/TeamServicePushStateActions.js'
import TeamServicePushStateStore from '../store/TeamServicePushStateStore.js'

import TeamServicePullStateActions from '../actions/TeamServicePullStateActions.js'
import TeamServicePullStateStore from '../store/TeamServicePullStateStore.js'

import ScoreboardActions from '../actions/ScoreboardActions.js'
import ScoreboardStore from '../store/ScoreboardStore.js'

import CompetitionRoundStore from '../store/CompetitionRoundStore.js'
import CompetitionRoundActions from '../actions/CompetitionRoundActions.js'

import CompetitionStageStore from '../store/CompetitionStageStore.js'
import CompetitionStageActions from '../actions/CompetitionStageActions.js'

import TeamLogoAlertView from './TeamLogoAlertView.js'

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  }
})

class ScoreboardView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      teams: TeamStore.getState(),
      services: ServiceStore.getState(),
      teamServicePushStates: TeamServicePushStateStore.getState(),
      teamServicePullStates: TeamServicePullStateStore.getState(),
      scoreboard: ScoreboardStore.getState(),
      round: CompetitionRoundStore.getState(),
      stage: CompetitionStageStore.getState()
    }

    this.onUpdateTeams = this.onUpdateTeams.bind(this)
    this.onUpdateServices = this.onUpdateServices.bind(this)
    this.onUpdateTeamServicePushStates = this.onUpdateTeamServicePushStates.bind(this)
    this.onUpdateTeamServicePullStates = this.onUpdateTeamServicePullStates.bind(this)
    this.onUpdateScoreboard = this.onUpdateScoreboard.bind(this)
    this.onUpdateRound = this.onUpdateRound.bind(this)
    this.onUpdateStage = this.onUpdateStage.bind(this)
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

  onUpdateTeamServicePushStates (teamServicePushStates) {
    this.setState({
      teamServicePushStates: teamServicePushStates
    })
  }

  onUpdateTeamServicePullStates (teamServicePullStates) {
    this.setState({
      teamServicePullStates: teamServicePullStates
    })
  }

  onUpdateScoreboard (scoreboard) {
    this.setState({
      scoreboard: scoreboard
    })
  }

  onUpdateRound (round) {
    this.setState({
      round: round
    })
  }

  onUpdateStage (stage) {
    this.setState({
      stage: stage
    })
  }

  calculateTable () {
    const order = [
      'rank',
      'team',
      'totalPoints',
      'attackPoints',
      'availabilityPoints',
      'defencePoints'
    ]

    const headers = {
      rank: {
        title: 'Rank'
      },
      team: {
        title: 'Team',
        team: true
      },
      totalPoints: {
        title: 'Score',
        freezable: true
      },
      attackPoints: {
        title: 'Attack',
        freezable: true
      },
      availabilityPoints: {
        title: 'Availability',
        freezable: true
      },
      defencePoints: {
        title: 'Defence',
        freezable: true
      }
    }

    const competitionStage = this.state.stage.model
    const competitionRound = this.state.round.model

    for (const service of this.state.services.collection) {
      const serviceId = `#service_${service.id}`
      headers[serviceId] = {
        service: true,
        name: service.name,
        meta: {
          attackPriority: service.attackPriority,
          awardDefenceAfter: service.awardDefenceAfter,
          enableIn: service.enableIn,
          disableIn: service.disableIn
        }
      }
      order.push(serviceId)
    }

    const rowData = []

    for (const position of this.state.scoreboard.model.positions) {
      const team = this.state.teams.collection.find((team) => {
        return position.teamId === team.id
      })

      let teamTrend = null
      if (competitionStage.isStarted() || competitionStage.isPausing() || competitionStage.isFinishing()) {
        teamTrend = position.trend
      }

      const row = {
        id: team.id,
        team: team.name,
        totalPoints: position.totalPoints,
        attackPoints: position.attackPoints,
        availabilityPoints: position.availabilityPoints,
        defencePoints: position.defencePoints,
        lastAttack: position.lastAttack,
        guest: team.guest,
        logoHash: team.logoHash,
        trend: teamTrend
      }

      for (const service of this.state.services.collection) {
        const serviceId = `#service_${service.id}`
        const teamServicePushState = this.state.teamServicePushStates.collection.find((state) => {
          return state.teamId === team.id && state.serviceId === service.id
        })
        const teamServicePullState = this.state.teamServicePullStates.collection.find((state) => {
          return state.teamId === team.id && state.serviceId === service.id
        })

        const pushEnabled = competitionStage.isStarted() && ((service.disableIn === null) ? true : competitionRound.value <= service.disableIn)
        const pullEnabled = competitionStage.isStarted() || competitionStage.isPausing() || competitionStage.isFinishing()

        row[serviceId] = {
          push: {
            value: teamServicePushState ? teamServicePushState.state : 0,
            updated: teamServicePushState ? teamServicePushState.updatedAt : null,
            message: teamServicePushState ? teamServicePushState.message : null,
            dim: !pushEnabled
          },
          pull: {
            value: teamServicePullState ? teamServicePullState.state : 0,
            updated: teamServicePullState ? teamServicePullState.updatedAt : null,
            message: teamServicePullState ? teamServicePullState.message : null,
            dim: !pullEnabled
          }
        }
      }

      rowData.push(row)
    }

    const rows = rowData.map(function (row, ndx) {
      row.rank = ndx + 1
      return row
    })

    return {
      order: order,
      rows: rows,
      headers: headers,
      muted: this.state.scoreboard.model.muted
    }
  }

  componentDidMount () {
    TeamStore.listen(this.onUpdateTeams)
    ServiceStore.listen(this.onUpdateServices)
    TeamServicePushStateStore.listen(this.onUpdateTeamServicePushStates)
    TeamServicePullStateStore.listen(this.onUpdateTeamServicePullStates)
    ScoreboardStore.listen(this.onUpdateScoreboard)
    CompetitionRoundStore.listen(this.onUpdateRound)
    CompetitionStageStore.listen(this.onUpdateStage)

    TeamActions.fetch()
    ServiceActions.fetch()
    TeamServicePushStateActions.fetch()
    TeamServicePullStateActions.fetch()
    ScoreboardActions.fetch()
    CompetitionRoundActions.fetch()
    CompetitionStageActions.fetch()
  }

  componentWillUnmount () {
    TeamStore.unlisten(this.onUpdateTeams)
    ServiceStore.unlisten(this.onUpdateServices)
    TeamServicePushStateStore.unlisten(this.onUpdateTeamServicePushStates)
    TeamServicePullStateStore.unlisten(this.onUpdateTeamServicePullStates)
    ScoreboardStore.unlisten(this.onUpdateScoreboard)
    CompetitionRoundStore.unlisten(this.onUpdateRound)
    CompetitionStageStore.unlisten(this.onUpdateStage)
  }

  isLoading () {
    return (
      this.state.teams.loading ||
      this.state.services.loading ||
      this.state.teamServicePushStates.loading ||
      this.state.teamServicePullStates.loading ||
      this.state.scoreboard.loading ||
      this.state.round.loading ||
      this.state.stage.loading
    )
  }

  isError () {
    return (
      this.state.teams.err ||
      this.state.services.err ||
      this.state.teamServicePushStates.err ||
      this.state.teamServicePullStates.err ||
      this.state.scoreboard.err ||
      this.state.round.err ||
      this.state.stage.err
    )
  }

  render () {
    return (
      <DocumentTitle title={`${this.props.customContent.competitionTitle} :: Scoreboard`}>
        <Paper elevation={0} square className={this.props.classes.root}>
          <Typography variant='h4' component='h1' gutterBottom>Scoreboard</Typography>
          {
            (() => {
              if (this.isLoading()) {
                return null
              }

              if (this.isError()) {
                return null
              }

              if (!this.props.identity.isTeam()) {
                return null
              }

              const team = this.state.teams.collection.find((team) => {
                return this.props.identity.getId() === team.id
              })

              if (team.logoHash) {
                return null
              } else {
                return <TeamLogoAlertView />
              }
            })()
          }
          {
            (() => {
              if (this.isLoading()) {
                return <p>Loading</p>
              }

              if (this.isError()) {
                return <p>Failed to fetch scoreboard data</p>
              }

              return <ScoreTableView identity={this.props.identity} table={this.calculateTable()} />
            })()
          }
        </Paper>
      </DocumentTitle>
    )
  }
}

ScoreboardView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ScoreboardView)
