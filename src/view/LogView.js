import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/styles'
import { blue, cyan, purple, red, grey, green, deepOrange, brown, teal, lightBlue, pink } from '@material-ui/core/colors'

import moment from 'moment'

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  },
  grey600: {
    color: grey['600']
  },
  blue900: {
    color: blue['900']
  },
  cyan900: {
    color: cyan['900']
  },
  purple900: {
    color: purple['900']
  },
  red900: {
    color: red['900']
  },
  green900: {
    color: green['900']
  },
  lightBlue900: {
    color: lightBlue['900']
  },
  pink900: {
    color: pink['900']
  },
  brown900: {
    color: brown['900']
  },
  teal900: {
    color: teal['900']
  },
  grey600: {
    color: grey['600']
  },
  green700: {
    color: green['700']
  },
  red600: {
    color: red['600']
  },
  deepOrange500: {
    color: deepOrange['500']
  },
  brown600: {
    color: brown['600']
  }
})

class LogView extends Component {
  renderDefault (params) {
    return <span className={this.props.classes.grey600}>{JSON.stringify(params)}</span>
  }

  renderCompetitionStageUpdate (stage) {
    let status = null
    switch (stage) {
      case 0:
        status = 'initial'
        break
      case 1:
        status = 'starting'
        break
      case 2:
        status = 'started'
        break
      case 3:
        status = 'pausing'
        break
      case 4:
        status = 'paused'
        break
      case 5:
        status = 'finishing'
        break
      case 6:
        status = 'finished'
        break
      default:
        status = 'n/a'
        break
    }

    return <span className={this.props.classes.blue900}>Competition stage changed to <code className={this.props.classes.cyan900}>{status}</code></span>
  }

  renderRoundUpdate (round) {
    return <span className={this.props.classes.purple900}>Round <code className={this.props.classes.red900}>{round}</code> has started!</span>
  }

  renderAttack (params) {
    const actorTeam = this.props.teams.find(x => x.id === params.actor_team_id)
    const targetTeam = this.props.teams.find(x => x.id === params.target_team_id)
    const targetService = this.props.services.find(x => x.id === params.target_service_id)
    if (actorTeam != null && targetTeam != null && targetService != null) {
      return <span className={this.props.classes.green900}>Team <code className={this.props.classes.lightBlue900}>{actorTeam.name}</code> has attacked team <code className={this.props.classes.lightBlue900}>{targetTeam.name}</code>, service <code className={this.props.classes.pink900}>{targetService.name}</code>!</span>
    }
    return this.renderDefault(params)
  }

  renderTeamServicePushStateUpdate (params) {
    let team = this.props.teams.find(x => x.id === params.team_id)
    let service = this.props.services.find(x => x.id === params.service_id)
    if (team != null && service != null) {
      let statusClass = this.props.classes.grey600
      let statusText = null

      switch (params.state) {
        case 1:
          statusText = 'up'
          statusClass = this.props.classes.green700
          break
        case 2:
          statusText = 'down'
          statusClass = this.props.classes.red600
          break
        case 3:
          statusText = 'corrupt'
          statusClass = this.props.classes.deepOrange500
          break
        case 4:
          statusText = 'mumble'
          statusClass = this.props.classes.brown600
          break
        case 5:
          statusText = 'err'
          statusClass = this.props.classes.grey600
          break
        default:
          statusText = 'n/a'
          statusClass = this.props.classes.grey600
          break
      }
      return <span className={this.props.classes.brown900}>Team <code className={this.props.classes.teal900}>{team.name}</code>, service <code className={this.props.classes.pink900}>{service.name}</code> push state is <code className={statusClass}>{statusText}</code></span>
    }
    return this.renderDefault(params)
  }

  renderTeamServicePullStateUpdate (params) {
    const team = this.props.teams.find(x => x.id === params.team_id)
    const service = this.props.services.find(x => x.id === params.service_id)
    if (team != null && service != null) {
      let statusClass = this.props.classes.grey600
      let statusText = null

      switch (params.state) {
        case 1:
          statusText = 'up'
          statusClass = this.props.classes.green700
          break
        case 2:
          statusText = 'down'
          statusClass = this.props.classes.red600
          break
        case 3:
          statusText = 'corrupt'
          statusClass = this.props.classes.deepOrange500
          break
        case 4:
          statusText = 'mumble'
          statusClass = this.props.classes.brown600
          break
        case 5:
          statusText = 'err'
          statusClass = this.props.classes.grey600
          break
        default:
          statusText = 'n/a'
          statusClass = this.props.classes.grey600
          break
      }
      return <span className={this.props.classes.brown900}>Team <code className={this.props.classes.teal900}>{team.name}</code>, service <code className={this.props.classes.pink900}>{service.name}</code> pull state is <code className={statusClass}>{statusText}</code></span>
    }
    return this.renderDefault(params)
  }

  renderServiceEnable (params) {
    return <span>Service <code>{params.service_name}</code> is enabled</span>
  }

  renderServiceDisable (params) {
    return <span>Service <code>{params.service_name}</code> is disabled</span>
  }

  renderServiceModifyEnableIn(params) {
    return <span>Service <code>{params.service_name}</code> is set to be enabled in round {params.service_enable_in}</span>
  }

  renderServiceModifyDisableIn(params) {
    return <span>Service <code>{params.service_name}</code> is set to be disabled in round {params.service_disable_in}</span>
  }

  renderServiceModifyAwardDefenceAfter(params) {
    return <span>Service <code>{params.service_name}</code> &ndash; defence points are to be awarded after round {params.service_award_defence_after} ends</span>
  }

  render () {
    let text = ''
    switch (this.props.type) {
      case 1:
        text = this.renderCompetitionStageUpdate(this.props.params.value)
        break
      case 2:
        text = this.renderRoundUpdate(this.props.params.value)
        break
      case 31:
        text = this.renderTeamServicePushStateUpdate(this.props.params)
        break
      case 32:
        text = this.renderTeamServicePullStateUpdate(this.props.params)
        break
      case 4:
        text = this.renderAttack(this.props.params)
        break
      case 41:
        text = this.renderServiceEnable(this.props.params)
        break
      case 42:
        text = this.renderServiceDisable(this.props.params)
        break
      case 43:
        text = this.renderServiceModifyEnableIn(this.props.params)
        break
      case 44:
        text = this.renderServiceModifyDisableIn(this.props.params)
        break
      case 45:
        text = this.renderServiceModifyAwardDefenceAfter(this.props.params)
        break
      default:
        text = this.renderDefault(this.props.params)
        break
    }

    return (
      <div>
        <code>{moment(this.props.updatedAt).format('HH:mm:ss.SSS')}</code>
        &nbsp;
        {text}
      </div>
    )
  }
}

LogView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LogView)
