import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/styles'
import { Typography, TableRow, TableCell } from '@material-ui/core'
import { Info, Warning, VisibilityOff } from '@material-ui/icons'
import { lightBlue, orange, red } from '@material-ui/core/colors'

const styles = theme => ({
  root: {
    fontWeight: 'bold'
  },
  teamLogoPlaceholder: {
    display: 'inline-block',
    width: '40px',
    height: '1px',
    marginRight: theme.spacing(1)
  },
  iconWrapper: {
    marginLeft: theme.spacing(0.5),
    cursor: 'pointer'
  },
  infoIcon: {
    color: lightBlue['500'],
    width: '20px',
    height: '20px',
    verticalAlign: 'bottom'
  },
  warningIcon: {
    color: orange['500'],
    width: '20px',
    height: '20px',
    verticalAlign: 'bottom'
  },
  visibilityOffIcon: {
    color: red['500'],
    width: '20px',
    height: '20px',
    verticalAlign: 'bottom'
  }
})

class ScoreTableHeaderView extends Component {
  render () {
    let cells = this.props.order.map((column, ndx) => {
      const header = this.props.headers[column]
      if (typeof header.service != undefined && header.service) {
        return (
          <TableCell key={ndx} align="center">
            <Typography variant="body2" component="span" color="textPrimary" className={this.props.classes.root}>
              {header.name}
            </Typography>
            {
              (() => {
                if (header.meta.attackPriority && header.meta.awardDefenceAfter === null) {
                  return (
                    <span className={this.props.classes.iconWrapper} title="Defence points will be awarded after the first attack">
                      <Info className={this.props.classes.infoIcon}/>
                    </span>
                  )
                }
                return null
              })()
            }
            {
              (() => {
                if (header.meta.disableIn !== null) {
                  return (
                    <span className={this.props.classes.iconWrapper} title={`The service will be disabled after the end of round ${header.meta.disableIn}`}>
                      <Warning className={this.props.classes.warningIcon}/>
                    </span>
                  )
                }
                return null
              })()
            }
          </TableCell>
        )
      } else if (typeof header.team != undefined && header.team) {
        return (
          <TableCell key={ndx} align="left">
            <span className={this.props.classes.teamLogoPlaceholder}></span>
            <Typography variant="body2" component="span" color="textPrimary" className={this.props.classes.root}>
              {header.title}
            </Typography>
          </TableCell>
        )
      } if (typeof header.freezable != undefined && this.props.muted) {
        return (
          <TableCell key={ndx} align="left">
            <Typography variant="body2" component="span" color="textPrimary" className={this.props.classes.root}>
              {header.title}
            </Typography>
            <span className={this.props.classes.iconWrapper} title="Scoreboard is frozen">
              <VisibilityOff className={this.props.classes.visibilityOffIcon}/>
            </span>
          </TableCell>
        )
      }
      return (
        <TableCell key={ndx} align="left">
          <Typography variant="body2" component="span" color="textPrimary" className={this.props.classes.root}>
            {header.title}
          </Typography>
        </TableCell>
      )
    })

    return (
      <TableRow>
        {cells}
      </TableRow>
    )
  }
}

ScoreTableHeaderView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ScoreTableHeaderView)
