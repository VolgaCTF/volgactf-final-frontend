import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/styles'
import { Paper } from '@material-ui/core'

import CompetitionRoundView from './CompetitionRoundView.js'
import CompetitionStageView from './CompetitionStageView.js'
import StreamStatusView from './StreamStatusView.js'

const styles = theme => ({
  root: {
    padding: theme.spacing(2, 3)
  }
})

class CompetitionInfoBarView extends Component {
  render () {
    return (
      <Paper elevation={0} square={true} className={this.props.classes.root}>
        <CompetitionRoundView />
        <CompetitionStageView />
        <StreamStatusView />
      </Paper>
    )
  }
}

CompetitionInfoBarView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CompetitionInfoBarView)
