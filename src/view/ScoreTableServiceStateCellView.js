import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/styles'
import { TableCell, Grid } from '@material-ui/core'
import { green, red, deepOrange, brown, grey } from '@material-ui/core/colors'

import moment from 'moment'

const styles = theme => ({
  root: {
    fontWeight: 'bold',
    fontSize: '0.7em',
    padding: '2px',
    fontVariant: 'small-caps',
    textAlign: 'center'
  },
  dim: {
    opacity: 0.5
  },
  stateUp: {
    color: green['700'],
    backgroundColor: green['50']
  },
  stateDown: {
    color: red['600'],
    backgroundColor: red['50']
  },
  stateCorrupt: {
    color: deepOrange['500'],
    backgroundColor: deepOrange['50']
  },
  stateMumble: {
    color: brown['600'],
    backgroundColor: brown['50']
  },
  stateNotAvailable: {
    color: grey['600'],
    backgroundColor: grey['100']
  },
  stateDefault: {
    color: grey['600'],
    backgroundColor: grey['100']
  }
})

class ScoreTableServiceStateCellView extends Component {
  getStateDescription (status) {
    switch (status) {
      case 1:
        return 'up'
      case 2:
        return 'down'
      case 3:
        return 'corrupt'
      case 4:
        return 'mumble'
      case 5:
        return 'err'
      default:
        return 'n/a'
    }
  }

  getStateClasses (data) {
    const classes = [this.props.classes.root]
    if (data.dim) {
      classes.push(this.props.classes.dim)
    }
    switch (data.value) {
      case 1:
        classes.push(this.props.classes.stateUp)
        break
      case 2:
        classes.push(this.props.classes.stateDown)
        break
      case 3:
        classes.push(this.props.classes.stateCorrupt)
        break
      case 4:
        classes.push(this.props.classes.stateMumble)
        break
      case 5:
        classes.push(this.props.classes.stateNotAvailable)
        break
      default:
        classes.push(this.props.classes.stateDefault)
        break
    }
    return classes
  }

  render () {
    const pushValue = this.props.value.push.value
    const pullValue = this.props.value.pull.value

    let pushUpdated = this.props.value.push.updated ? `Updated at ${moment(this.props.value.push.updated).format('HH:mm:ss')}` : 'Updated: never'
    let pullUpdated = this.props.value.pull.updated ? `Updated at ${moment(this.props.value.pull.updated).format('HH:mm:ss')}` : 'Updated: never'

    if (this.props.value.push.message) {
      pushUpdated += `\nMessage from the service checker:\n${this.props.value.push.message}`
    }

    if (this.props.value.pull.message) {
      pullUpdated += `\nMessage from the service checker:\n${this.props.value.pull.message}`
    }

    return (
      <TableCell>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <div title={pushUpdated} className={this.getStateClasses(this.props.value.push).join(' ')}>
              {`push${this.props.value.push.updated ? moment(this.props.value.push.updated).format(' HH:mm:ss') : ''}`}
              <br />
              {this.getStateDescription(pushValue)}
            </div>
          </Grid>
          <Grid item xs={6}>
            <div title={pullUpdated} className={this.getStateClasses(this.props.value.pull).join(' ')}>
              {`pull${this.props.value.pull.updated ? moment(this.props.value.pull.updated).format(' HH:mm:ss') : ''}`}
              <br />
              {this.getStateDescription(pullValue)}
            </div>
          </Grid>
        </Grid>
      </TableCell>
    )
  }
}

ScoreTableServiceStateCellView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ScoreTableServiceStateCellView)
