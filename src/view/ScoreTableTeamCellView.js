import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router'

import { withStyles } from '@material-ui/styles'
import { TableCell, Typography } from '@material-ui/core'
import { Poll, Language } from '@material-ui/icons'

import UploadTeamLogoDialogView from './UploadTeamLogoDialogView.js'

const styles = theme => ({
  root: {
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  teamMarked: {
    fontWeight: 'bold'
  },
  teamStatsWrapper: {
    display: 'inline-block',
    marginLeft: theme.spacing(1)
  },
  teamStats: {
    verticalAlign: 'middle',
    cursor: 'pointer'
  },
  guestWrapper: {
    display: 'inline-block',
    marginLeft: theme.spacing(1)
  },
  guest: {
    verticalAlign: 'middle',
    cursor: 'help'
  },
  teamLogo: {
    width: '40px',
    height: '40px',
    verticalAlign: 'middle',
    marginRight: theme.spacing(1)
  },
  teamLogoActive: {
    cursor: 'pointer'
  }
})

class ScoreTableTeamCellView extends Component {
  constructor (props) {
    super(props)
    this.onChangeTeamLogoDialog = this.onChangeTeamLogoDialog.bind(this)
    this.onOpenTeamStats = this.onOpenTeamStats.bind(this)
  }

  onChangeTeamLogoDialog () {
    this.refs.changeTeamLogoDialog.start()
  }

  onOpenTeamStats (e) {
    this.props.history.push(`/team/${this.props.teamId}/stats`)
  }

  render () {
    const teamClasses = [this.props.classes.root]
    let className = 'volgactf-final-team'
    const exactTeam = this.props.identity.isTeam() && this.props.identity.getId() === this.props.teamId

    if (exactTeam) {
      teamClasses.push(this.props.classes.teamMarked)
    }

    let logoSrc = `/api/team/logo/${this.props.teamId}.png`
    if (this.props.teamLogoHash) {
      logoSrc += `?${this.props.teamLogoHash}`
    }

    return (
      <TableCell>
        {
          (() => {
            if (exactTeam && this.props.teamLogoHash) {
              return <UploadTeamLogoDialogView ref='changeTeamLogoDialog'/>
            }
            return null
          })()
        }
        {
          (() => {
            if (exactTeam  && this.props.teamLogoHash) {
              return <img className={`${this.props.classes.teamLogo} ${this.props.classes.teamLogoActive}`} src={logoSrc} onClick={this.onChangeTeamLogoDialog} />
            } else {
              return <img className={this.props.classes.teamLogo} src={logoSrc}/>
            }
          })()
        }
        <Typography variant="body2" component="span" className={teamClasses.join(' ')}>{this.props.value}</Typography>
        {
          (() => {
            if (this.props.identity.isInternal()) {
              return (
                <span className={this.props.classes.teamStatsWrapper} title="Show team stats">
                  <Poll className={this.props.classes.teamStats} onClick={this.onOpenTeamStats}/>
                </span>
              )
            }
            return null
          })()
        }
        {
          (() => {
            if (this.props.guest) {
              return (
                <span className={this.props.classes.guestWrapper} title="Guest team">
                  <Language className={this.props.classes.guest}/>
                </span>
              )
            }
            return null
          })()
        }
      </TableCell>
    )
  }
}

ScoreTableTeamCellView.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(ScoreTableTeamCellView))
