import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

import { withRouter } from 'react-router'

import { withStyles } from '@material-ui/styles'
import { Paper, Typography } from '@material-ui/core'

import TeamScoreTableView from './TeamScoreTableView.js'

import TeamActions from '../actions/TeamActions.js'
import TeamStore from '../store/TeamStore.js'

import TeamScoreActions from '../actions/TeamScoreActions.js'
import { createTeamScoreStore } from '../store/TeamScoreStore.js'

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  }
})

class TeamScoreView extends Component {
  constructor (props) {
    super(props)
    this.teamId = null
    if (this.props.identity.isTeam()) {
      this.teamId = this.props.identity.getId()
    } else if (this.props.identity.isInternal()) {
      this.teamId = parseInt(this.props.match.params.teamIdStr)
    }

    this.teamScoreStore = createTeamScoreStore(this.teamId)
    this.state = {
      teams: TeamStore.getState(),
      teamScores: this.teamScoreStore.getState()
    }

    this.onUpdateTeams = this.onUpdateTeams.bind(this)
    this.onUpdateTeamScores = this.onUpdateTeamScores.bind(this)
  }

  onUpdateTeams (teams) {
    this.setState({
      teams: teams
    })
  }

  onUpdateTeamScores (teamScores) {
    this.setState({
      teamScores: teamScores
    })
  }

  calculateTable () {
    const order = [
      'round',
      'totalPoints',
      'attackPoints',
      'availabilityPoints',
      'defencePoints'
    ]

    const headers = {
      round: {
        title: 'Round'
      },
      totalPoints: {
        title: 'Score'
      },
      attackPoints: {
        title: 'Attack'
      },
      availabilityPoints: {
        title: 'Availability'
      },
      defencePoints: {
        title: 'Defence'
      }
    }

    const rows = []

    for (const score of this.state.teamScores.collection) {
      const row = {
        id: score.id,
        round: score.roundId,
        totalPoints: score.attackPoints + score.availabilityPoints + score.defencePoints,
        attackPoints: score.attackPoints,
        availabilityPoints: score.availabilityPoints,
        defencePoints: score.defencePoints
      }

      rows.push(row)
    }

    rows.sort(function (a, b) {
      return b.round - a.round
    })

    return {
      order: order,
      rows: rows,
      headers: headers
    }
  }

  componentDidMount () {
    TeamStore.listen(this.onUpdateTeams)
    this.teamScoreStore.listen(this.onUpdateTeamScores)

    TeamActions.fetch()
    TeamScoreActions.fetch(this.props.identity, this.teamId)
  }

  componentWillUnmount () {
    TeamStore.unlisten(this.onUpdateTeams)
    this.teamScoreStore.unlisten(this.onUpdateTeamScores)
  }

  isLoading () {
    return (
      this.state.teams.loading ||
      this.state.teamScores.loading
    )
  }

  isError () {
    return (
      this.state.teams.err ||
      this.state.teamScores.err
    )
  }

  render () {
    return (
      <DocumentTitle title={`${this.props.customContent.competitionTitle} :: Team stats`}>
        <Paper elevation={0} square className={this.props.classes.root}>
          {
            (() => {
              if (this.isLoading()) {
                return <p>Loading</p>
              }

              if (this.isError()) {
                return <p>Failed to fetch scoreboard data</p>
              }

              const team = this.state.teams.collection.find((team) => {
                return this.teamId === team.id
              })

              return (
                <div>
                  <Typography variant='h4' component='h1' gutterBottom>{team.name} &ndash; team stats</Typography>
                  <TeamScoreTableView identity={this.props.identity} table={this.calculateTable()} />
                </div>
              )
            })()
          }
        </Paper>
      </DocumentTitle>
    )
  }
}

TeamScoreView.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(TeamScoreView))
