import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import { blue, grey, green, brown, red, deepOrange, yellow } from '@material-ui/core/colors'

import CompetitionStageStore from '../store/CompetitionStageStore.js'
import CompetitionStageActions from '../actions/CompetitionStageActions.js'

const styles = theme => ({
  root: {
    display: 'inline-block',
    padding: theme.spacing(0.5, 1),
    marginRight: theme.spacing(1),
    cursor: 'default'
  },
  notStarted: {
    color: grey['600'],
    backgroundColor: grey['100']
  },
  starting: {
    color: blue['900'],
    backgroundColor: blue['50']
  },
  started: {
    color: green['700'],
    backgroundColor: green['50']
  },
  pausing: {
    color: yellow['800'],
    backgroundColor: yellow['50']
  },
  paused: {
    color: brown['600'],
    backgroundColor: brown['50']
  },
  finishing: {
    color: deepOrange['500'],
    backgroundColor: deepOrange['50']
  },
  finished: {
    color: red['600'],
    backgroundColor: red['50']
  },
  notAvailable: {
    color: grey['600'],
    backgroundColor: grey['100']
  }
})

class CompetitionStageView extends Component {
  constructor (props) {
    super(props)
    this.state = CompetitionStageStore.getState()

    this.onUpdate = this.onUpdate.bind(this)
  }

  componentDidMount () {
    CompetitionStageStore.listen(this.onUpdate)
    CompetitionStageActions.fetch()
  }

  componentWillUnmount () {
    CompetitionStageStore.unlisten(this.onUpdate)
  }

  onUpdate (state) {
    this.setState(state)
  }

  render () {
    if (this.state.loading) {
      return null
    }

    if (this.state.err) {
      return <span>Failed to fetch competition stage</span>
    }

    let text = null
    const classes = [this.props.classes.root]

    switch (this.state.model.value) {
      case 0:
        text = 'Competition: not started'
        classes.push(this.props.classes.notStarted)
        break
      case 1:
        text = 'Competition: starting'
        classes.push(this.props.classes.starting)
        break
      case 2:
        text = 'Competition: started'
        classes.push(this.props.classes.started)
        break
      case 3:
        text = 'Competition: pausing'
        classes.push(this.props.classes.pausing)
        break
      case 4:
        text = 'Competition: paused'
        classes.push(this.props.classes.paused)
        break
      case 5:
        text = 'Competition: finishing'
        classes.push(this.props.classes.finishing)
        break
      case 6:
        text = 'Competition: finished'
        classes.push(this.props.classes.finished)
        break
      default:
        text = 'Competition: n/a'
        classes.push(this.props.classes.notAvailable)
        break
    }

    return <Typography variant='body2' component='span' className={classes.join(' ')}>{text}</Typography>
  }
}

CompetitionStageView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CompetitionStageView)
