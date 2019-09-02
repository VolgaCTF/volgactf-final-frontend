import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/styles'
import { Typography, TableCell } from '@material-ui/core'
import { TrendingFlat, TrendingUp, TrendingDown, LooksOne, LooksTwo, Looks3 } from '@material-ui/icons'
import { red, green, grey } from '@material-ui/core/colors'

const styles = theme => ({
  root: {
    fontWeight: 'bold',
    marginLeft: theme.spacing(1)
  },
  rankFirst: {
    color: '#d4af37',
    verticalAlign: 'middle'
  },
  rankSecond: {
    color: '#c0c0c0',
    verticalAlign: 'middle'
  },
  rankThird: {
    color: '#cd7f32',
    verticalAlign: 'middle'
  },
  trending: {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginLeft: theme.spacing(1),
    cursor: 'pointer'
  },
  frozen: {
    opacity: 0.5
  },
  trendingUp: {
    color: green['600']
  },
  trendingDown: {
    color: red['600']
  },
  trendingFlat: {
    color: grey['600']
  }
})

class ScoreTablePositionCellView extends Component {
  render () {
    return (
      <TableCell>
        {
          (() => {
            const classes = []
            if (this.props.muted) {
              classes.push(this.props.classes.frozen)
            }
            switch (this.props.value) {
              case 1:
                classes.push(this.props.classes.rankFirst)
                return <LooksOne className={classes.join(' ')}/>
              case 2:
                classes.push(this.props.classes.rankSecond)
                return <LooksTwo className={classes.join(' ')}/>
              case 3:
                classes.push(this.props.classes.rankThird)
                return <Looks3 className={classes.join(' ')}/>
              default:
                classes.push(this.props.classes.root)
                return <Typography variant="body2" component="span" className={classes.join(' ')}>{this.props.value}</Typography>
            }
          })()
        }
        {
          (() => {
            if (this.props.trend === null) {
              return null
            }
            const trendingClasses = [this.props.classes.trending]
            if (this.props.muted) {
              trendingClasses.push(this.props.classes.frozen)
            }
            let trendingCaption = null
            let trendingIcon = null

            if (this.props.trend < 0) {
              trendingClasses.push(this.props.classes.trendingDown)
              trendingCaption = 'Position is on the decrease'
              trendingIcon = <TrendingDown/>
            } else if (this.props.trend > 0) {
              trendingClasses.push(this.props.classes.trendingUp)
              trendingCaption = 'Position is on the increase'
              trendingIcon = <TrendingUp/>
            } else {
              trendingClasses.push(this.props.classes.trendingFlat)
              trendingCaption = 'Position is unlikely to change'
              trendingIcon = <TrendingFlat/>
            }
            return <span className={trendingClasses.join(' ')} title={trendingCaption}>{trendingIcon}</span>
          })()
        }
      </TableCell>
    )
  }
}

ScoreTablePositionCellView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ScoreTablePositionCellView)
