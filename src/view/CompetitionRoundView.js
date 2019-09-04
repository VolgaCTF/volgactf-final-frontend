import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import { blueGrey } from '@material-ui/core/colors'

import CompetitionRoundStore from '../store/CompetitionRoundStore.js'
import CompetitionRoundActions from '../actions/CompetitionRoundActions.js'

const styles = theme => ({
  root: {
    display: 'inline-block',
    padding: theme.spacing(0.5, 1),
    marginRight: theme.spacing(1),
    color: blueGrey['600'],
    backgroundColor: blueGrey['50'],
    cursor: 'default'
  }
})

class CompetitionRoundView extends Component {
  constructor (props) {
    super(props)
    this.state = CompetitionRoundStore.getState()

    this.onUpdate = this.onUpdate.bind(this)
  }

  componentDidMount () {
    CompetitionRoundStore.listen(this.onUpdate)
    CompetitionRoundActions.fetch()
  }

  componentWillUnmount () {
    CompetitionRoundStore.unlisten(this.onUpdate)
  }

  onUpdate (state) {
    this.setState(state)
  }

  render () {
    if (this.state.loading) {
      return null
    }

    if (this.state.err) {
      return <span>Failed to fetch competition round</span>
    }

    if (this.state.model.value == null) {
      return null
    }

    const { classes } = this.props

    return (
      <Typography variant='body2' component='span' className={classes.root}>{`Round ${this.state.model.value}`}</Typography>
    )
  }
}

CompetitionRoundView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CompetitionRoundView)
